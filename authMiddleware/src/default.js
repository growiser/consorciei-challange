myHandler = require("../index")

myHandler.handler({
    authorizationToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZnVsbF9uYW1lIjoiSEVDVE9SIEdSRUNDTyBNT1JBRVMgQkFQVElTVEEgTU9SRUlSQSIsImFjY2Vzc19ncm91cF9pZCI6IlsxLDIsM10iLCJpYXQiOjE1NjUwMjQyODYsImV4cCI6MTU2NTAyNzg4Nn0.Hoov4-KfywJY8Mb2-ryPbaRhkGY88O90I4Oif97sEq4',
    methodArn: 'arn:aws:execute-api:us-east-1:465723213600:j5kxnacygl/dev/POST/cms/posts'
})