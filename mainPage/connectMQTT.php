<?php
require('../vendor/autoload.php');
use Bluerhinos\phpMQTT;
require('./secrets.php');

$client_id = rand(0, 99999999999999);

$mqtt = new Bluerhinos\phpMQTT($server, $port, $client_id);

?>