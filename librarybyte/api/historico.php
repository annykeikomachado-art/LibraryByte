<?php
require_once __DIR__ . '/../config/auth.php';

$usuario = exigir_login();
$col = coluna_dono($usuario);
$dono = $usuario['id'];

try {
    $pdo = conectar();

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $st = $pdo->prepare(
            "SELECT id_ebook, UNIX_TIMESTAMP(data_acesso) AS ts
               FROM g02_historico_acesso WHERE $col = ?
              ORDER BY data_acesso DESC, id_historico DESC LIMIT 100"
        );
        $st->execute([$dono]);
        $itens = array_map(fn($r) => ['id_ebook' => (int)$r['id_ebook'], 'ts' => (int)$r['ts']], $st->fetchAll());
        responder(['ok' => true, 'itens' => $itens]);
    }

    $d = corpo_json();
    $acao = $d['acao'] ?? '';

    if ($acao === 'registrar') {
        $idEbook = id_ebook_valido($d['id_ebook'] ?? null);
        try {
            $pdo->prepare("INSERT INTO g02_historico_acesso ($col, id_ebook) VALUES (?, ?)")->execute([$dono, $idEbook]);
        } catch (PDOException $e) {
            if ($e->getCode() === '23000') erro('Livro não encontrado.', 404);
            throw $e;
        }
        responder(['ok' => true], 201);
    }
    if ($acao === 'limpar') {
        $pdo->prepare("DELETE FROM g02_historico_acesso WHERE $col = ?")->execute([$dono]);
        responder(['ok' => true]);
    }
    erro('Ação inválida.');
} catch (Throwable $e) {
    erro_interno($e);
}
