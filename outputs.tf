############################
# Endpoints Aurora 
############################
# Cluster Endpoint
output "this_rds_cluster_endpoint" {
  description = "The cluster endpoint"
  value       = module.aurora.this_rds_cluster_endpoint
}

# Reader Endpoint
output "this_rds_cluster_reader_endpoint" {
  description = "The cluster reader endpoint"
  value       = module.aurora.this_rds_cluster_reader_endpoint
}




############################
# Access/Security Aurora
############################
# RDS Database Name
output "this_rds_cluster_database_name" {
  description = "Name for an automatically created database on cluster creation"
  value       = module.aurora.this_rds_cluster_database_name
}

# RDS Password
output "this_rds_cluster_master_password" {
  description = "The master password"
  value       = module.aurora.this_rds_cluster_master_password
}
# RDS Port
output "this_rds_cluster_port" {
  description = "The port"
  value       = module.aurora.this_rds_cluster_port
}

# RDS Username
output "this_rds_cluster_master_username" {
  description = "The master username"
  value       = module.aurora.this_rds_cluster_master_username
}

# Vinculated Security Group
output "this_security_group_id" {
  description = "The security group ID of the cluster"
  value       = module.aurora.this_security_group_id
}



############################
# Other Aurora Instances
############################
# Cluster ID
output "this_rds_cluster_id" {
  description = "The ID of the cluster"
  value       = module.aurora.this_rds_cluster_id
}

# Cluster Resource ID
output "this_rds_cluster_resource_id" {
  description = "The Resource ID of the cluster"
  value       = module.aurora.this_rds_cluster_resource_id
}

# Cluster Instance
output "this_rds_cluster_instance_endpoints" {
  description = "A list of all cluster instance endpoints"
  value       = module.aurora.this_rds_cluster_instance_endpoints
}

