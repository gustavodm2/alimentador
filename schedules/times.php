<?php
include '../connect.php';

if (isset($_SESSION['user_id'])){
    $sql = "SELECT * FROM horarios_alimentados";
    $result = $pdo->query($sql);

    $times = array();

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        array_push($times, $row);
    }

    header('Content-Type: application/json');
    echo json_encode($times);
}else{
    echo 'Entre com sua conta para ver o histórico';
}
?>

