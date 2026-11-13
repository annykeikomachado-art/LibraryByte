<?php
/*verificação de login. */
require_once __DIR__ . '/conexao.php';

function iniciar_sessao(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }
    $https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
          || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');
    session_set_cookie_params([
        'lifetime' => 0,
        'path'     => '/',
        'secure'   => $https,
        'httponly' => true,    
        'samesite' => 'Lax',   
    ]);
    session_name('LIBRARYBYTE');
    session_start();
}

function responder(array $dados, int $codigo = 200): void
{
    http_response_code($codigo);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($dados, JSON_UNESCAPED_UNICODE);
    exit;
}

function erro(string $mensagem, int $codigo = 400): void
{
    responder(['ok' => false, 'erro' => $mensagem], $codigo);
}

function corpo_json(): array
{
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        header('Allow: POST');
        erro('Método não permitido.', 405);
    }
    $tipo = $_SERVER['CONTENT_TYPE'] ?? '';
    if (stripos($tipo, 'application/json') !== 0) {
        erro('Requisição inválida.', 415);
    }
    $dados = json_decode(file_get_contents('php://input') ?: '', true);
    if (!is_array($dados)) {
        erro('JSON inválido.', 400);
    }
    return $dados;
}

function exigir_login(): array
{
    iniciar_sessao();
    $u = $_SESSION['usuario'] ?? null;
    if (!is_array($u) || !in_array($u['tipo'] ?? '', ['aluno', 'professor'], true)) {
        $_SESSION = [];
        session_destroy();
        erro('Você precisa entrar para continuar.', 401);
    }
    return $u;
}

function coluna_dono(array $usuario): string
{
    if ($usuario['tipo'] === 'professor') {
        return 'id_professor';
    }
    if ($usuario['tipo'] === 'aluno') {
        return 'id_aluno';
    }
    erro('Perfil sem acesso a este recurso.', 403);
}

function perfil_institucional_por_email(string $email): ?string
{
    $separador = strrpos($email, '@');
    if ($separador === false) {
        return null;
    }

    $dominio = strtolower(substr($email, $separador + 1));
    if (preg_match('/^prof(?:\.|$)/', $dominio) === 1) {
        return 'professor';
    }
    if (preg_match('/^aluno(?:\.|$)/', $dominio) === 1) {
        return 'aluno';
    }
    return null;
}

function tam(string $s): int
{
    return preg_match_all('/./su', $s);
}

function id_ebook_valido($valor): int
{
    $id = filter_var($valor, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);
    if ($id === false) {
        erro('Livro inválido.', 400);
    }
    return $id;
}

function erro_interno(Throwable $e): void
{
    error_log('[LibraryByte] ' . $e->getMessage());  
    erro('Erro no servidor. Tente novamente em instantes.', 500);
}
