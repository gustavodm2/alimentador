#!/bin/bash
echo "$nrconf{restart} = 'a';" >>/etc/needrestart/needrestart.conf

# Update the package list and upgrade installed packages
sudo apt-get update -y
sudo apt-get upgrade -y

# Install Mosquitto
sudo apt-get install -y mosquitto mosquitto-clients
apt install -y postgresql-client
apt-get -y install php8.1-pgsql
sudo apt install -y libapache2-mod-php
apt install -y apache2

 psql -h your_host -U your_username -d your_database -W

echo "${psqlPassword}" | psql -h "${psqlEndpoint}" -U "${psqlUser}" -W -d "${psqlName}" -f "/home/ubuntu/db.sql"

# Start Mosquitto service and enable it to start on boot
sudo systemctl start mosquitto
sudo systemctl enable mosquitto

mosquitto_passwd -b /etc/mosquitto/passwd_file.txt "${USERMQTT}" "${PASSWORDMQTT}"

git clone "https://github.com/gustavodm2/alimentador.git" /alimentador

mv -f "/home/ubuntu/apache2.conf" "/etc/apache2/apache2.conf"
mv -f "/home/ubuntu/mosquitto.conf" "/etc/mosquitto/mosquitto.conf"
mv -f "/home/ubuntu/000-default.conf" "/etc/apache2/sites-available/000-default.conf"

cat<< 'EOF' >/alimentador/security.php
<?php
$host = "${psqlEndpoint}";
$database = "${psqlName}";
$username = "${psqlUser}";
$password = "${psqlPassword}";
?>
EOF

cat<< 'EOF' >/alimentador/mainPage/secrets.php
<?php
$username = "${USERMQTT}";
$password = "${PASSWORDMQTT}";
$server   = 'localhost';
$port     = 1883;
?>
EOF

systemctl restart apache2
systemctl restart mosquitto