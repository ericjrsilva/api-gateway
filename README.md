## Api-gateway
[![Build Status](https://travis-ci.org/ericjrsilva/api-gateway.svg?branch=master)](https://travis-ci.org/ericjrsilva/api-gateway)

Node and Express api-gateway that integrates two different services.

To install it, use:
```
npm install
```
To test it, use:
```
npm test
```
To start it (default port 3000), use:
```
npm start
```
To read docs, use: 
```
http://localhost:3000/api-docs
```

To run it in a container (nginx plus three instances, basepath /api default port 8080), use:
```

docker-compose up --build
```

To use it in the cloud, use:
```
https://api-gateway-payment.herokuapp.com/api-docs

GET https://api-gateway-payment.herokuapp.com/clients/:cid

GET|POST https://api-gateway-payment.herokuapp.com/clients/:cid/transactions

POST https://api-gateway-payment.herokuapp.com/clients/:cid

```