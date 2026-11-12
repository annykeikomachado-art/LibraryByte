<?php

const DB_HOSTS = ['localhost', 'srv1545.hstgr.io'];
const DB_NAME  = 'u704608208_turma_tarde';
const DB_USER  = 'u704608208_turma_tarde';
const DB_PASS  = '3176@fatecSCS';

function conectar(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $hosts = getenv('LB_DB_HOST') ? [getenv('LB_DB_HOST')] : DB_HOSTS; 
    $nome  = getenv('LB_DB_NAME') ?: DB_NAME;
    $user  = getenv('LB_DB_USER') ?: DB_USER;
    $pass  = getenv('LB_DB_PASS') ?: DB_PASS;

    $ultimoErro = null;
    foreach ($hosts as $host) {
        try {
            $pdo = new PDO(
                "mysql:host=$host;dbname=$nome;charset=utf8mb4",
                $user,
                $pass,
                [
                    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES   => false,
                    PDO::ATTR_TIMEOUT            => 5,
                    PDO::MYSQL_ATTR_INIT_COMMAND => "SET time_zone = '-03:00'",
                ]
            );
            return $pdo;
        } catch (PDOException $e) {
            $ultimoErro = $e;
        }
    }
    throw $ultimoErro;
}
