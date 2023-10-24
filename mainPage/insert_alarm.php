<?php
session_start();
include '../connect.php';

if (isset($_POST['alarm-time']) && isset($_POST['repeat-daily'])) {
    $alarm_time = $_POST['alarm-time'];

    $query = "INSERT INTO alarm (alarm_time, repeat_daily) VALUES ('$alarm_time', " . ($_POST['repeat-daily'] == "true" ? "1" : "0") . ") RETURNING id";
    $result = pg_query($conn, $query);

    if ($result) {
        $row = pg_fetch_assoc($result);
        $alarm_id = $row['id'];

        if ($_POST['repeat-daily'] == "true") {
            for ($i = 1; $i < 7; $i++) {
                $query = "INSERT INTO alarm (user_id, alarm_time, repeat_daily) VALUES ($user_id, TIME(NOW() + interval '$i day'), 1)";
                pg_query($pdo, $query);
            }
        }
    }
}
?>
