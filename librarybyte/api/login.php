<?php
require_once __DIR__ . '/../config/auth.php';

$d = corpo_json();
$tipo  = $d['tipo'] ?? '';
$email = strtolower(trim((string)($d['email'] ?? '')));
$senha = (string)($d['senha'] ?? '');

$tabelas = [
    'aluno'     => ['g02_aluno',     'id_aluno'],
    'professor' => ['g02_professor', 'id_professor'],
];
if (!isset($tabelas[$tipo]) || $email === '' || $senha === '') {
    erro('Informe e-mail e senha.');
}
[$tabela, $colId] = $tabelas[$tipo];

try {
    $st = conectar()->prepare("SELECT $colId AS id, nome_completo AS nome, senha FROM $tabela WHERE email_institucional = ?");
    $st->execute([$email]);
    $u = $st->fetch();

  
    $hashSalvo = $u['senha'] ?? '$2y$12$usesomesillystringforsaltuQZ0MhYQ1V9p5mWm4mVKc2xBbQ4oXjC';
    $confere = password_verify($senha, $hashSalvo);

    if (!$u || !$confere) {
        usleep(300000);
        erro('E-mail ou senha incorretos.', 401);
    }

    iniciar_sessao();
    session_regenerate_id(true);  
    $_SESSION['usuario'] = ['tipo' => $tipo, 'id' => (int)$u['id'], 'nome' => $u['nome']];

    responder(['ok' => true, 'nome' => $u['nome'], 'tipo' => $tipo]);
} catch (Throwable $e) {
    erro_interno($e);
}
