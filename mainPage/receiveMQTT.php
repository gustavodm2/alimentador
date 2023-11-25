<?php
require('./connectMQTT.php');

if (!$mqtt->connect(true, NULL, $username, $password)) {
    echo "Failed to connect to the MQTT server";
    exit(1);
}

// $mqtt->debug = true;

$lastMessage = '';

$topics['arduino-data/peso'] = array('qos' => 0, 'function' => 'procMsg');
$mqtt->subscribe($topics, 0);
$timeout = 5; 
$start_time = time();

while (time() - $start_time < $timeout) {
    $mqtt->proc();
    usleep(100);
}

$mqtt->close();

echo $lastMessage;

function procMsg($topic, $msg) {
    global $lastMessage;
    $lastMessage = $msg;
}
?>
