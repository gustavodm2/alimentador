<?php
include '../connect.php';

$sql = "SELECT * FROM horarios_alimentados";
$result = $pdo->query($sql);

$times = array();

while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    array_push($times, $row);
}

header('Content-Type: application/json');
echo json_encode($times);
?>

