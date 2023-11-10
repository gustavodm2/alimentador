<?php
require('./connectMQTT.php');
printf("client connected\n");

$mqtt->publish(
    // topic
    'arduino-data',
    // payload
    "1",
    // qos
    0,
    // retain
    true
  );
?>