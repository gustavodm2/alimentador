<?php
include '../connect.php';
date_default_timezone_set('America/Sao_Paulo'); 
try {
    $repetir = $_SESSION['repeat'];
    $data_hora = date("Y-m-d H:i:s");
    $query = "INSERT INTO horarios_alimentados (data_hora, repetir) VALUES (?, false)";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$data_hora]);
    echo "Horário alimentado com sucesso!";
} catch (PDOException $e) {
    echo "Erro ao inserir dados: " . $e->getMessage();
}


$pdo = null;
?>
