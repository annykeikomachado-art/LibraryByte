<?php
require_once __DIR__ . '/../config/auth.php';

$usuario = exigir_login();

try {
    $pdo = conectar();

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if ($usuario['tipo'] === 'professor') {
            $st = $pdo->prepare(
                'SELECT t.id_turma, t.nome_turma, t.codigo_acesso, t.semestre,
                        p.nome_completo AS professor, a.nome_completo AS aluno
                   FROM g02_turma t
                   JOIN g02_professor p ON p.id_professor = t.id_professor
                   LEFT JOIN g02_turma_aluno ta ON ta.id_turma = t.id_turma
                   LEFT JOIN g02_aluno a ON a.id_aluno = ta.id_aluno
                  WHERE t.id_professor = ?
                  ORDER BY t.id_turma, a.nome_completo'
            );
            $st->execute([$usuario['id']]);
        } elseif ($usuario['tipo'] === 'aluno') {
            $st = $pdo->prepare(
                'SELECT t.id_turma, t.nome_turma, t.semestre,
                        p.nome_completo AS professor, a.nome_completo AS aluno
                   FROM g02_turma t
                   JOIN g02_professor p ON p.id_professor = t.id_professor
                   JOIN g02_turma_aluno propria ON propria.id_turma = t.id_turma
                                                AND propria.id_aluno = ?
                   LEFT JOIN g02_turma_aluno ta ON ta.id_turma = t.id_turma
                   LEFT JOIN g02_aluno a ON a.id_aluno = ta.id_aluno
                  ORDER BY t.id_turma, a.nome_completo'
            );
            $st->execute([$usuario['id']]);
        } else {
            erro('Perfil sem acesso às turmas.', 403);
        }

        $turmas = [];
        while ($linha = $st->fetch()) {
            $id = (int)$linha['id_turma'];
            if (!isset($turmas[$id])) {
                $turmas[$id] = [
                    'id' => $id,
                    'name' => $linha['nome_turma'],
                    'teacher' => $linha['professor'],
                    'semester' => $linha['semestre'],
                    'code' => $usuario['tipo'] === 'professor' ? $linha['codigo_acesso'] : null,
                    'students' => [],
                ];
            }
            if ($linha['aluno'] !== null) {
                $turmas[$id]['students'][] = ['name' => $linha['aluno']];
            }
        }

        responder(['ok' => true, 'turmas' => array_values($turmas)]);
    }

    $dados = corpo_json();
    $acao = $dados['acao'] ?? '';

    if ($acao === 'criar') {
        if ($usuario['tipo'] !== 'professor') {
            erro('Somente professores podem criar turmas.', 403);
        }

        $nome = trim((string)($dados['nome'] ?? ''));
        $semestre = trim((string)($dados['semestre'] ?? ''));
        if ($nome === '' || tam($nome) > 100) {
            erro('Informe um nome de turma com até 100 caracteres.');
        }
        if ($semestre === '' || tam($semestre) > 10) {
            erro('Informe um semestre com até 10 caracteres.');
        }

        $alfabeto = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        for ($tentativa = 0; $tentativa < 5; $tentativa++) {
            $codigo = '';
            for ($i = 0; $i < 6; $i++) {
                $codigo .= $alfabeto[random_int(0, strlen($alfabeto) - 1)];
            }

            try {
                $st = $pdo->prepare(
                    'INSERT INTO g02_turma (id_professor, nome_turma, codigo_acesso, semestre)
                     VALUES (?, ?, ?, ?)'
                );
                $st->execute([$usuario['id'], $nome, $codigo, $semestre]);
                responder([
                    'ok' => true,
                    'id' => (int)$pdo->lastInsertId(),
                    'nome' => $nome,
                    'codigo' => $codigo,
                ], 201);
            } catch (PDOException $e) {
                if (($e->errorInfo[1] ?? 0) !== 1062) {
                    throw $e;
                }
            }
        }

        throw new RuntimeException('Não foi possível gerar um código de turma exclusivo.');
    }

    if ($acao === 'entrar') {
        if ($usuario['tipo'] !== 'aluno') {
            erro('Somente alunos podem entrar em uma turma.', 403);
        }

        $codigo = strtoupper(trim((string)($dados['codigo'] ?? '')));
        if ($codigo === '' || tam($codigo) > 10) {
            erro('Informe um código de turma válido.');
        }

        $st = $pdo->prepare('SELECT id_turma, nome_turma FROM g02_turma WHERE codigo_acesso = ?');
        $st->execute([$codigo]);
        $turma = $st->fetch();
        if (!$turma) {
            erro('Não encontramos uma turma com esse código. Confira o código com seu professor.', 404);
        }

        try {
            $st = $pdo->prepare('INSERT INTO g02_turma_aluno (id_turma, id_aluno) VALUES (?, ?)');
            $st->execute([(int)$turma['id_turma'], $usuario['id']]);
        } catch (PDOException $e) {
            if (($e->errorInfo[1] ?? 0) === 1062) {
                erro('Você já está cadastrado nesta turma.', 409);
            }
            throw $e;
        }

        responder([
            'ok' => true,
            'id' => (int)$turma['id_turma'],
            'nome' => $turma['nome_turma'],
        ], 201);
    }

    erro('Ação inválida.');
} catch (Throwable $e) {
    erro_interno($e);
}