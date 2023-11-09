<?php
include 'security.php';
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

try {
    $pdo = new PDO("pgsql:host=$host;dbname=$database", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    var_dump($e->getMessage());
    die("Erro de conexão com o banco de dados: " . $e->getMessage());
}

?>