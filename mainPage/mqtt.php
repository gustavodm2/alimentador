<?php
require('../vendor/autoload.php');
require('./secrets.php');

use \PhpMqtt\Client\MqttClient;
use \PhpMqtt\Client\ConnectionSettings;


$clientId = rand(5, 15);
$clean_session = false;
$mqtt_version = MqttClient::MQTT_3_1_1;

$connectionSettings = (new ConnectionSettings)
->setUsername($username)
->setPassword($password)
->setKeepAliveInterval(60)
->setLastWillTopic('arduino-data/last-will')
->setLastWillMessage('client disconnect')
->setLastWillQualityOfService(1);


$mqtt = new MqttClient($server, $port, $clientId, $mqtt_version);

$mqtt->connect($connectionSettings, $clean_session);
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