myHandler = require("../index")

myHandler.handler({
    authorizationToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzgsImFjY2Vzc19ncm91cF9pZCI6WzEsMl0sImlhdCI6MTU4ODc4NDc5MywiZXhwIjoxNTg4Nzg4MzkzfQ.xq3tLjneWbRMD9IaLpDy_Twf8MBaGRMVkOuXcQT-6CA',
    methodArn: 'arn:aws:lambda:us-east-2:764978587799:function:dev-consorciei-createUser'
})