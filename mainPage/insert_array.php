<?php
include '../connect.php'; 
date_default_timezone_set('America/Sao_Paulo');

if (isset($_SESSION['user_id'])){
    $query = "SELECT data_hora FROM horarios_alimentados";
    $stmt = $pdo->query($query);
    
    if ($stmt) {
        $times = array();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            array_push($times, $row);
        }

        header('Content-Type: application/json');
        echo json_encode($times);
    } else {
        echo 'Error executing the query.';
    }
} else {
    echo 'Entre com sua conta para ver o histórico';
}
?>
