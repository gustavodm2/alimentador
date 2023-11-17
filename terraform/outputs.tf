output "ip_instance" {
  value = aws_instance.principal.public_ip
}

output "rds_endpoint" {
  value = aws_db_instance.psql_database.endpoint
}