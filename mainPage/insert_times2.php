<?php
include '../connect.php';
date_default_timezone_set('America/Sao_Paulo');

if(isset($_POST['data']) && isset($_POST['repeatDaily'])) {
    try {
        $dataHora = $_POST['data'];
        $repeatDaily = ($_POST['repeatDaily'] === 'true'); // Convert to boolean

        $query = "INSERT INTO horarios_alimentados (data_hora, repetir) VALUES (?, ?)";
        $stmt = $pdo->prepare($query);
        $stmt->execute([$dataHora, $repeatDaily]);
        echo "Success"; 
    } catch (PDOException $e) {
        echo "Erro ao inserir dados: " . $e->getMessage();
    }
} else {
    echo "Data not received";
}
?>