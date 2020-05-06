provider "aws" {
  region = "us-east-2"
}

#############
# RDS Aurora
#############
module "aurora" {
  source                              = "terraform-aws-modules/rds-aurora/aws"
  name                                = "aurora-example-mysql"
  engine                              = "aurora-mysql"
  engine_version                      = "5.7.12"

  subnets                             = data.aws_subnet_ids.all.ids
  vpc_id                              = data.aws_vpc.default.id
  allowed_security_groups             = ["${module.aurora.this_security_group_id}"]
  replica_count                       = 1
  instance_type                       = "db.t2.medium"
  apply_immediately                   = true
  skip_final_snapshot                 = true
  db_parameter_group_name             = aws_db_parameter_group.aurora_db_57_parameter_group.id
  db_cluster_parameter_group_name     = aws_rds_cluster_parameter_group.aurora_57_cluster_parameter_group.id
  iam_database_authentication_enabled = true
  enabled_cloudwatch_logs_exports     = ["audit", "error", "general", "slowquery"]
  allowed_cidr_blocks                 = ["0.0.0.0/0"] # Allow access from outside
  publicly_accessible                 = true

  # Access Configs
  database_name                       = "${var.database_name}"  
  username                            = "${var.username}" 
  password                            = "${var.password}" 
}

######################################
# Data sources to get VPC and subnets
######################################
data "aws_vpc" "default" {
  default = true
}

data "aws_subnet_ids" "all" {
  vpc_id = data.aws_vpc.default.id
}

############################
# DB Parameters Configs
############################
resource "aws_db_parameter_group" "aurora_db_57_parameter_group" {
  name        = "test-aurora-db-57-parameter-group"
  family      = "aurora-mysql5.7"
  description = "test-aurora-db-57-parameter-group"
}

resource "aws_rds_cluster_parameter_group" "aurora_57_cluster_parameter_group" {
  name        = "test-aurora-57-cluster-parameter-group"
  family      = "aurora-mysql5.7"
  description = "test-aurora-57-cluster-parameter-group"
}

############################
# RDS Security Group
############################
resource "aws_security_group" "app_servers" {
  name_prefix  = "app-servers-"
  description  = "For application servers"
  vpc_id       = data.aws_vpc.default.id
} 

############################
# s3Bucket (Store Lambda deployments)
############################
resource "aws_s3_bucket" "mainbucket" {
  bucket        = "consorciei-lambdas"
  acl           = "private"
  force_destroy = true

  tags          = {
    Name        = "Deploy Lambdas"
    Environment = "Dev"
  }
}

############################
# SSM Parameters (Used to share key:values with Serverless)
############################
# Writer Endpoint
resource "aws_ssm_parameter" "db_host" {
  name  = "DB_HOST"
  type  = "String"
  value = "${module.aurora.this_rds_cluster_endpoint}"
}

# DB User
resource "aws_ssm_parameter" "db_user" {
  name  = "DB_USER"
  type  = "String"
  value = "${module.aurora.this_rds_cluster_master_username}"
}

# DB Password
resource "aws_ssm_parameter" "db_password" {
  name  = "DB_PASSWORD"
  type  = "String"
  value = "${module.aurora.this_rds_cluster_master_password}"
}

# Database Name
resource "aws_ssm_parameter" "db_database" {
  name  = "DB_DATABASE"
  type  = "String"
  value = "${module.aurora.this_rds_cluster_database_name}"
}