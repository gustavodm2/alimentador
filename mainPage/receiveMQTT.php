<?php
require('./connectMQTT.php');

// Check if the connection was successful
if (!$mqtt->connect(true, NULL, $username, $password)) {
    echo "Failed to connect to the MQTT server";
    exit(1);
}

// $mqtt->debug = true;

$topics['arduino-data/peso'] = array('qos' => 0, 'function' => 'procMsg');
$mqtt->subscribe($topics, 0);
// Process incoming messages for a limited time (adjust as needed)
$timeout = 5;  // seconds
$start_time = time();

while (time() - $start_time < $timeout) {
    $mqtt->proc();
    usleep(5000); // Sleep for 100 milliseconds to avoid high CPU usage
}

$mqtt->close();

function procMsg($topic, $msg) {
    echo $msg;
}
?>
