//Cria um SG para a instancia privada
resource "aws_security_group" "sg-principal" {
  name        = "sgprincipal"
  description = "sgprincipal"
  vpc_id      = aws_vpc.vpc.id

  //SSH
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  //Database
  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  //HTTP
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 1883
    to_port     = 1883
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 1883
    to_port     = 1883
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  //Permite saida para qualquer lugar
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "principal" {
  ami           = "ami-0fc5d935ebf8bc3bc" #Ubuntu
  instance_type = "t2.micro"
  key_name      = "chavinha"
  tags = {
    Name = "test"
  }

  vpc_security_group_ids = [aws_security_group.sg-principal.id]
  subnet_id              = aws_subnet.subnet-pub[0].id

  user_data = templatefile("./userdata.sh", { psqlEndpoint = aws_db_instance.psql_database.db_hostname, psqlUser = var.rds_user, psqlPassword = var.rds_password, psqlName = var.rds_db_name, USERMQTT = var.mqtt_user, PASSWORDMQTT = var.mqtt_password })

  provisioner "file" {
    source      = "files/db.sql"
    destination = "/home/ubuntu/db.sql"
  }

  provisioner "file" {
    source      = "files/apache2.conf"
    # destination = "/etc/apache2/apache2.conf"
    destination = "/home/ubuntu/apache2.conf"
  }
  
  provisioner "file" {
    source      = "files/000-default.conf"
    destination = "/home/ubuntu/000-default.conf"
    # destination = "/etc/apache2/sites-available/000-default.conf"
  }
  provisioner "file" {
    source      = "files/mosquitto.conf"
    destination = "/home/ubuntu/mosquitto.conf"
    # destination = "/etc/mosquitto/mosquitto.conf"
  }

  volume_tags = {
    Name = "test"
  }
  connection {
    type        = "ssh"
    user        = "ubuntu"
    private_key = file("./files/chavinha.pem") //Mude para o nome de sua chave
    host        = self.public_ip
  }
}