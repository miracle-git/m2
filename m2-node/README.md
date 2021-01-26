## m2-nodejs

[![](https://img.shields.io/badge/m2--nodejs-v1.0.1-green.svg)](https://github.com/hmiinyu/m2-nodejs.git) <br/>
The package is provided utilities and facilities for nodejs.

### Usage
 - Install
```bash
npm install m2-nodejs
yarn add m2-nodejs
```
### APIs
- mysql Provide nodejs how to connect to mysql
#### 
| prop or func | type | description | example |
| ------------ | ------------ | ------------ | ------------ |
| connect | func | Get the mysql connection instance for the params **config** | |
| escape | func | Prevent SQL-inject attack to escape the params | |
| execSql | func | Exec the sql statement for the params **connection**, **sql** | |
- redis Provide nodejs how to connect to redis
#### 
| prop or func | type | description | example |
| ------------ | ------------ | ------------ | ------------ |
| connect | func | Get the redis client instance for the params **config** | |
| setItem | func | Set the item into redis for the params **client**, **key**, **val** | |
| getItem | func | Get the item from redis for the params **client**, **key** | |
| delItem | func | Remove the item from redis for the params **client**, **key** | |
- cookie Provide how to operate cookie in the server
#### 
| prop or func | type | description | example |
| ------------ | ------------ | ------------ | ------------ |
| getCookieExpire | func | Get the cookie expire time for the params **{type,offset}}** | |
| setServerCookie | func | Set the cookie in the server for the params **res**, **key**, **val**, **options** | |
- http Provide how to http request and response in the server
#### 
| prop or func | type | description | example |
| ------------ | ------------ | ------------ | ------------ |
| getPostData | func | Get post data via stream for the params **req** | |
| parseQuery | func | Parse query data or the params **req** | |
| parseCookie | func | Parse cookie data for the params **req** | |
| parseSession | func | Parse session data for the params **req**,**redis** | |
- model Provide data response model include SuccessModel, ErrorModel
#### 
| prop or func | type | description | example |
| ------------ | ------------ | ------------ | ------------ |
| SuccessModel | class | Provide the data model when data will be fetched | |
| ErrorModel | class | Provide the error model when data will be rejected | |
- util Provide node util function in the server
#### 
| prop or func | type | description | example |
| ------------ | ------------ | ------------ | ------------ |
| readline | func | Provide the readline instance based on read stream | |
| writeLog | func | Write the appending log into file | |
| md5 | func | Encrypt the content by md5 | |
| encryptPassword | func | Encrypt the password by md5 and key | |
