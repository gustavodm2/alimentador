<?php
include '../connect.php';
date_default_timezone_set('America/Sao_Paulo'); 
try {
    $data_hora = date("Y-m-d H:i:s");
    $query = "INSERT INTO horarios_alimentados (data_hora) VALUES (?)";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$data_hora]);
    echo "Horário alimentado com sucesso!";
} catch (PDOException $e) {
    echo "Erro ao inserir dados: " . $e->getMessage();
}


if (isset($_POST['horario'])) {
    $horario = $_POST['horario'];

    $pdo = new PDO("pgsql:host=$host;dbname=$database", $username, $password);

    $stmt = $pdo->prepare("INSERT INTO horarios_alimentados (data_hora) VALUES (:horario)");
    $stmt->bindParam(':horario', $horario);
    $stmt->execute();

    $pdo = null;

    echo "Horário inserido com sucesso!";
} else {
    echo "Erro: Horário não foi recebido.";
}

$pdo = null;
?>
