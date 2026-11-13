<?php
require_once __DIR__ . '/../config/auth.php';

$d = corpo_json();
$email = strtolower(trim((string)($d['email'] ?? '')));
$senha = (string)($d['senha'] ?? '');

$tabelas = [
    'aluno'     => ['g02_aluno',     'id_aluno'],
    'professor' => ['g02_professor', 'id_professor'],
];
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || $senha === '') {
    erro('Informe e-mail e senha.');
}
$tipo = perfil_institucional_por_email($email);
if ($tipo === null) {
    erro('Use um e-mail cujo domínio comece com prof. ou aluno.');
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
