<?php
require_once __DIR__ . '/../config/auth.php';

$usuario = exigir_login();
$col = coluna_dono($usuario);        
$dono = $usuario['id'];

try {
    $pdo = conectar();

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $st = $pdo->prepare("SELECT id_ebook FROM g02_favoritos WHERE $col = ? ORDER BY id_favorito");
        $st->execute([$dono]);
        responder(['ok' => true, 'ids' => array_map('intval', $st->fetchAll(PDO::FETCH_COLUMN))]);
    }

    $d = corpo_json();
    $acao = $d['acao'] ?? '';
    $idEbook = id_ebook_valido($d['id_ebook'] ?? null);

    if ($acao === 'adicionar') {
        try {
            $pdo->prepare("INSERT INTO g02_favoritos ($col, id_ebook) VALUES (?, ?)")->execute([$dono, $idEbook]);
        } catch (PDOException $e) {
            $codigoMysql = $e->errorInfo[1] ?? 0;
            if ($codigoMysql === 1062) responder(['ok' => true]);              
            if ($codigoMysql === 1452) erro('Livro não encontrado.', 404);  
            throw $e;
        }
        responder(['ok' => true]);
    }
    if ($acao === 'remover') {
        $pdo->prepare("DELETE FROM g02_favoritos WHERE $col = ? AND id_ebook = ?")->execute([$dono, $idEbook]);
        responder(['ok' => true]);
    }
    erro('Ação inválida.');
} catch (Throwable $e) {
    erro_interno($e);
}
