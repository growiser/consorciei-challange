
Esta é a documentação da aplicação. Para que os processos de IaC ocorram, é necessário que haja a instalação do [Terraform](https://learn.hashicorp.com/terraform/getting-started/install.html), [Serverless](https://github.com/serverless/serverless), além de ter configurado em seu computador o [AWS cli](https://docs.aws.amazon.com/pt_br/cli/latest/userguide/cli-chap-install.html). 

Gabriel Braga Costa
[LinkedIn](https://learn.hashicorp.com/terraform/getting-started/install.html) | [E-mail](mailto:gabriel.bragavera@gmail.com)

## 1. Subindo a infraestrutura na AWS com Terraform
 Por meio do Terraform, iremos subir toda a infraestrutura da nossa aplicação. Esta que consiste basicamente em um `Cluster Aurora`, 
 `s3Bucket` para o deploy das funções Lambda, uma `VPC` com `Subnets`, e `Parâmetros SSM`.
 
 1) Configurar acessos do novo Aurora Cluster no arquivo `config_db.tf` (`raiz do projeto`)
 ```HCL
 # config_db.tf
 
 # Alteração opcional
variable "region" {
  default = "us-east-2"
}
 
 # Ex: main_db 
variable "username" {
  default = "YOUR DB USERNAME"
}

# Ex: consorciei
variable "database_name" {
  default = "YOUR DB NAME"
}

# Ex: ALPRO1asa27paADnpie
variable "password" {
  default = "YOUR DB PASSWORD"
}

```
 > A metodologia adotada para o armazenamento pode ser aprimorada. Entretanto, visando a segurança, é necessário que `o usuário que irá
 fazer o uso deste defina os dados de acesso do novo cluster`.
 
 
 2) Inicializar o Terraform (`executar o comando via console na raiz do projeto`):
 
 ```console
terraform init
```
> É necessário que a sua máquina já tenha, além do Terraform, o AWS cli configurado.

3) Aplicar configurações e subir infraestrutura na AWS (`executar o comando via console na raiz do projeto`):
 ```console
terraform apply
```

![iam](https://i.imgur.com/uAlyutl.png)

Após o Terraform concluir a criação das instâncias, teremos a nossa aplicação devidamente funcionando. Quando finalizada, 
serão retornadas algumas `outputs` que disponibilizam acessos/informações da nossa aplicação. `Iremos precisar do endpoint (host) de acesso do Aurora para os próximos passos`.
> Por meio do Endpoint (além dos dados de acesso como: password, username, etc) é possível acessar o nosso cluster em plataformas de gerenciamento mais sofisticadas. 
Um ótimo exemplo é o [MySQL Workbench](https://www.mysql.com/products/workbench/), aonde podemos ter uma melhor visualização das tabelas bem como seus dados.

NOTE: O Endpoint de acesso (host) do Aurora retornado no output será necessário para o próximo passo.


## 2. Migração de tabelas e população do banco de dados
Já com a infraestrutura montada, iremos utilizar o [Sequelize](https://sequelize.org) para realizar as migrações (criar as tabelas e relacionamentos no Aurora) e semear (inserir os grupos de acesso e usuários iniciais) o banco de dados. [Ler mais sobre migrations](https://sequelize.org/master/manual/migrations.html)

1) Instalar o Sequelize e Mysql2 (`executar via console na raiz do projeto`)
 ```console
npm i --save sequelize mysql2
```
> Isso irá permitir a utilização do `sequelize-cli` (depende do mysql2) para executar as migrations/seeders nos próximos passos.

2) Configurar arquivo de conexão com o Banco (`config/config.json`)
 ```JSON
 # config/config_db.tf
 
 {
  "development": {
    "username": "USERNAME configurado no Terraform",
    "password": "SENHA configurado no Terraform",
    "database": "DATABASE configurado no Terraform",
    "host": "HOST retornado na Output Endpoint no Terraform",
    "dialect": "mysql",
    "operatorsAliases": false
  }
}

```
> Leia o passo anterior caso não tenha armazenado o host do Aurora

3) Executar as migrações (`executar via console na raiz do projeto`)
 ```console
npx sequelize-cli db:migrate
```
> Irá criar as tabelas e relacionamentos do banco dedos

4) Executar os seeders (`executar via console na raiz do projeto`)
 ```console
npx sequelize-cli db:seed:all
```
> Irá inserir os grupos de acesso e perfis iniciais


