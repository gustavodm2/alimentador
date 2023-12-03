<?php
require('./connectMQTT.php');

if ($mqtt->connect(true, NULL, $username, $password)) {
	$mqtt->publish('arduino-data', '1', 0, false);
	$mqtt->close();
	echo "mandado";
} else {
    echo "Time out!\n";
}

printf("client connected\n");
?>