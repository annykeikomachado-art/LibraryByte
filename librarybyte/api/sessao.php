<?php
require_once __DIR__ . '/../config/auth.php';
iniciar_sessao();
$u = $_SESSION['usuario'] ?? null;
if (!is_array($u)) {
    responder(['ok' => true, 'logado' => false]);
}
responder(['ok' => true, 'logado' => true, 'nome' => $u['nome'], 'tipo' => $u['tipo']]);
