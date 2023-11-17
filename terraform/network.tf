//Cria a vpc
resource "aws_vpc" "vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true //permite que as instancias reconheçam dns (necessário para que o efs possa ser montado via dns)
  enable_dns_hostnames = true //cria dns para as instancias, usando seus ips

  tags = {
    "Name" = "vpc-alimentador"
  }
}

//Cria o Internet-Gateway
resource "aws_internet_gateway" "internet_gateway" {
  vpc_id = aws_vpc.vpc.id

  tags = {
    "Name" = "gw-pub"
  }
}
//Cria as subnets publicas
resource "aws_subnet" "subnet-pub" {
  count             = 2
  vpc_id            = aws_vpc.vpc.id
  cidr_block        = "10.0.${count.index}.0/24"
  availability_zone = count.index == 0 ? "us-east-1a" : "us-east-1b" //Define onde elas são disponiveis 

  tags = {
    "Name" = "subnet-pub-${count.index}" //Ex: subnet-pub-0
  }
  map_public_ip_on_launch = true //define se elas terão um ip público (como elas são públicas, precisam de um)
}
//Route Table das subnets publicas
resource "aws_route_table" "public_route_table" {
  vpc_id = aws_vpc.vpc.id //Define qual a vpc

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.internet_gateway.id //Define qual o Internet-Gateway
  }

  tags = {
    Name = "rt-pub"
  }
}
//Cria o SG do rds
resource "aws_security_group" "sg-rds" {
  name        = "sgrds"
  description = "sgrds"
  vpc_id      = aws_vpc.vpc.id

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.sg-principal.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

//Cria o subnet-group para o rds
resource "aws_db_subnet_group" "group_rds" {
  name        = "group_rds"
  description = "group_rds"
  subnet_ids = [
    aws_subnet.subnet-pub[0].id,
    aws_subnet.subnet-pub[1].id
  ]
}

//Cria uma Route-Table-Association para as subnets publicas
resource "aws_route_table_association" "rta_pub" {
  count          = 2
  subnet_id      = aws_subnet.subnet-pub[count.index].id
  route_table_id = aws_route_table.public_route_table.id
}

//Cria o Ip elastico para o Nat-Gateway
resource "aws_eip" "nat_eip" {

  instance = aws_instance.principal.id

  tags = {
    "Name" = "eip-nat"
  }
}