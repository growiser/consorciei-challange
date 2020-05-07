
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

# Ex: ALPRO1asa27paADnpie
variable "password" {
  default = "YOUR DB PASSWORD"
}

# O campo database_name é estático e não deve ser alterado (Padrão = "consorciei")

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
 # config/config.json
 
 {
  "development": {
    "username": "USERNAME configurado no Terraform",
    "password": "SENHA configurado no Terraform",
    "database": "consorciei", 
    "host": "HOST retornado na Output Endpoint no Terraform",
    "dialect": "mysql",
    "operatorsAliases": false
  }
}

```
> O database é estático e definido por padrão como `consorciei`. Leia o passo anterior caso não tenha armazenado o host do Aurora

3) Executar as migrações (`executar via console na raiz do projeto`)
 ```console
npx sequelize-cli db:migrate
```
> Irá criar as tabelas e relacionamentos do banco de dados

4) Executar os seeders (`executar via console na raiz do projeto`)
 ```console
npx sequelize-cli db:seed:all
```
> Irá inserir os grupos de acesso e perfis iniciais

## 3. Deploy das funções lambda com Serverless
Por fim, este passo irá realizar o deploy das funções lambda para o AWS. Dessa forma, será possível acessar os endpoints de qualquer lugar. É necessário ter instalado o [Serverless cli](https://github.com/serverless/serverless).

1) Executar o deploy do Serverless (`executar via console na raiz do projeto`)
 ```console
sls deploy
```
> O serverless irá nos retornar os endpoints que foram criados. Isso pode agilizar o nosso tempo ao invés de abrirmos o painel AWS

E com isso, nossa aplicação está no ar! Essa é a mágica da [IaC](https://danieldonda.com/2018/04/17/infra-as-code-iac/). Com poucos comandos, foi possível subir uma aplicação inteiramente na Cloud! Leia abaixo mais especificações a respeito de Lambdas, grupos e acesso e outras informações.

## Grupos de Acesso e funções Lambda

| Função Lambda | Descrição | Required Acess Group |
| --- | --- | --- | 
| authMiddleware | Responsável por realizar gerar/negar permissões de acesso para outras funções | null
| /login | Retornar um Token de acesso contendo as informações do usuário, futuramente usado para funções que necessitem de autenticação | null
| /user | Criar um novo usuário, inserir as informações no banco de dados | User manager (ID 1)

## Usuário Padrão
Usuário temporário gerado a partir da seed. Visto que para registrar novos usuários (`Lambda /user`) é necessário que o requisitante tenha o grupo de acesso `User manager (ID 1)`, a partir desse usuário, é possível `realizar o login`, obter o `Token de acesso` e acessar a função `/user` para gerar novos usuários.

| Username | Password | Access Group | Give Access To
| --- | --- | --- | -- |
| user-manager | default | User manager (ID 1) | Lambda /user
> Com esse usuário é possível gerar outros users, e posteriormente, deletar por motivos de segurança, este usuário padrão.

# Postman Collection para testes de Endpoints
![postman-logo text-320x132](https://user-images.githubusercontent.com/4249709/29496848-63ad446c-85b1-11e7-904e-a4ddad25e9db.png)

Afim de não estender demasiadamente esta documentação e por conta da alta disponibilidades de recursos oferecidos pelo [Postman](https://www.postman.com), todas as especificações/requerimentos dos endpoints estão disponibilizados no arquivo `postman-collection.json` na raiz do projeto.

A aplicação suportaria novas funcionalidades de forma escalável e organizada. Foi um desafio muito interessante no qual dediquei alguns dias de pesquisa.

See you soon!
