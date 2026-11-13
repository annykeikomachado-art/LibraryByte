<?php
require_once __DIR__ . '/../config/auth.php';
iniciar_sessao();
$u = $_SESSION['usuario'] ?? null;
if (!is_array($u) || !in_array($u['tipo'] ?? '', ['aluno', 'professor'], true)) {
    if (is_array($u)) {
        $_SESSION = [];
        session_destroy();
    }
    responder(['ok' => true, 'logado' => false]);
}
responder(['ok' => true, 'logado' => true, 'nome' => $u['nome'], 'tipo' => $u['tipo']]);
