<?php
require('../vendor/autoload.php');
use Bluerhinos\phpMQTT;
require('./secrets.php');

$client_id = rand(5, 15);

$mqtt = new Bluerhinos\phpMQTT($server, $port, $client_id);

?>