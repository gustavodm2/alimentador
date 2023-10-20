<?php
date_default_timezone_set('America/Sao_Paulo'); 

$host = "localhost";
$database = "alimentador2";
$username = "postgres";
$password = "123";

try {
    $pdo = new PDO("pgsql:host=$host;dbname=$database", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Conexão com o banco de dados bem-sucedida!"; 
} catch (PDOException $e) {
    var_dump($e->getMessage());
    die("Erro de conexão com o banco de dados: " . $e->getMessage());
}
try {
    $data_hora = date("Y-m-d H:i:s");
    $query = "INSERT INTO horarios_alimentados (data_hora) VALUES (?)";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$data_hora]);
    echo "Horário alimentado com sucesso!";
} catch (PDOException $e) {
    echo "Erro ao inserir dados: " . $e->getMessage();
}




$pdo = null;
?>
