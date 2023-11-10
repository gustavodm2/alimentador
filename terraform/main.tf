terraform {
  required_version = ">= 1.0.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.67.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}


resource "aws_db_instance" "psql_database" {
  allocated_storage    = 20
  storage_type         = "gp2"
  engine               = "postgres"
  engine_version       = "15.3"
  instance_class       = "db.t3.micro"
  username             = var.rds_user
  password             = var.rds_password
  parameter_group_name = "default.postgres15"
  skip_final_snapshot  = true
  db_name              = var.rds_db_name
  vpc_security_group_ids = [aws_security_group.sg-rds.id]
  db_subnet_group_name   = aws_db_subnet_group.group_rds.name
  publicly_accessible = false

  tags = {
    Name = "psql_database"
  }
}