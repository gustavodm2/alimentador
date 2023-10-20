<?php
$host = "localhost";
$database = "alimentador2";
$username = "postgres";
$password = "123";

try {
    $pdo = new PDO("pgsql:host=$host;dbname=$database", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    var_dump($e->getMessage());
    die("Erro de conexão com o banco de dados: " . $e->getMessage());
}
?>