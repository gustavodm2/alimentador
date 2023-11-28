<?php
require('./connectMQTT.php');

if ($mqtt->connect(true, NULL, $username, $password)) {
	$mqtt->publish('arduino-data/IsSendUnits', '0', 0, false);
	$mqtt->close();
} else {
    echo "Time out!\n";
}

printf("client connected\n");
?>