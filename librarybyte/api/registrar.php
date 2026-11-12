<?php
require_once __DIR__ . '/../config/auth.php';

$d = corpo_json();
$tipo  = $d['tipo']  ?? '';
$nome  = trim((string)($d['nome']  ?? ''));
$email = strtolower(trim((string)($d['email'] ?? '')));
$senha = (string)($d['senha'] ?? '');
$nasc  = trim((string)($d['data_nascimento'] ?? ''));

if (!in_array($tipo, ['aluno', 'professor'], true)) erro('Escolha se você é aluno ou professor.');
if ($nome === '' || tam($nome) > 100)         erro('Informe seu nome (até 100 caracteres).');
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || tam($email) > 100) erro('Informe um e-mail válido.');

if (strlen($senha) < 8 || strlen($senha) > 72 || !preg_match('/[A-Za-z]/', $senha) || !preg_match('/\d/', $senha)) {
    erro('A senha deve ter de 8 a 72 caracteres, com letras e números.');
}

if ($tipo === 'aluno') {
    $dt = DateTime::createFromFormat('Y-m-d', $nasc);
    if (!$dt || $dt->format('Y-m-d') !== $nasc || $dt > new DateTime('today')) {
        erro('Informe uma data de nascimento válida.');
    }
    $digitos = preg_replace('/\D/', '', $senha);
    if (in_array($digitos, [$dt->format('dmY'), $dt->format('Ymd'), $dt->format('dmy')], true)) {
        erro('A senha não pode ser a sua data de nascimento.');
    }
}

try {
    $pdo = conectar();

    $existe = $pdo->prepare(
        'SELECT 1 FROM g02_aluno WHERE email_institucional = ?
         UNION SELECT 1 FROM g02_professor WHERE email_institucional = ?'
    );
    $existe->execute([$email, $email]);
    if ($existe->fetchColumn()) erro('Este e-mail já está cadastrado.', 409);

    $hash = password_hash($senha, PASSWORD_BCRYPT, ['cost' => 12]);

    if ($tipo === 'aluno') {
        $pdo->prepare(
            'INSERT INTO g02_aluno (id_instituicao, nome_completo, email_institucional, data_nascimento, senha)
             VALUES (1, ?, ?, ?, ?)'
        )->execute([$nome, $email, $nasc, $hash]);
    } else {
        $pdo->prepare(
            'INSERT INTO g02_professor (id_instituicao, nome_completo, email_institucional, senha)
             VALUES (1, ?, ?, ?)'
        )->execute([$nome, $email, $hash]);
    }
    responder(['ok' => true], 201);
} catch (PDOException $e) {
    if ($e->getCode() === '23000') erro('Este e-mail já está cadastrado.', 409);
    erro_interno($e);
} catch (Throwable $e) {
    erro_interno($e);
}
