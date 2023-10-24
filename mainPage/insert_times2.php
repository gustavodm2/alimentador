<?php
include '../connect.php';
date_default_timezone_set('America/Sao_Paulo');

if(isset($_POST['data'])) {
    try {
        $dataHora = $_POST['data'];
        $query = "INSERT INTO horarios_alimentados (data_hora) VALUES (?)";
        $stmt = $pdo->prepare($query);
        $stmt->execute([$dataHora]);
        echo "Success"; 
    } catch (PDOException $e) {
        echo "Erro ao inserir dados: " . $e->getMessage();
    }
} else {
    echo "Data not received";
}
?>
