
const service_gtw1 = require('../services/gateway1.service');
const service_gtw2 = require('../services/gateway2.service');

//A route to create Clients.
exports.create_client = async(req, res) => {
  try {
    
    const gtw1 = await service_gtw1.create_client(req.body);
    const gtw2 = await service_gtw2.create_client(req.body);
    res.status(201);
    res.send({gtw1, gtw2});  
  } catch(err) {
    console.log(err.message);
    res.status(err.statusCode || 400);
    res.send({error: err.message});
  }
  
};

//A route to create Transactions.
//A transaction should be created in only one payment service (randomly choosed in each request).
exports.create_transaction = async(req, res) => {
  try {
    const services = [service_gtw1, service_gtw2];
    const index = Math.floor(Math.random() * 2);
    const result =
      await services[index].create_transaction(req.body, req.params.CID)
    res.status(201)
    res.send(result)
  } catch(err) {
    console.log(err.message);
    res.status(err.statusCode || 400);
    res.send({error: err.message});

  }
};

// A route to retrieve clients.
exports.get_client = async(req, res) => {
  try {
    const result =
      await service_gtw1.get_client(req.params.CID) ||
      await service_gtw2.get_client(req.params.CID);
    
    res.status(200);
    res.send(result);
  } catch(err) {
    console.log(err.message);
    res.status(err.statusCode);
    res.send({error: err.message});

  }
  
};

// A route to retrieve transactions. It shall allows filtering by clients or payment service used.
exports.get_transactions = async(req, res) => {
  try {
    const [res1, res2] = await Promise.all([
      service_gtw1.get_transactions(req.params.CID)
        .catch(e => console.log(e.message)),
      service_gtw2.get_transactions(req.params.CID)
        .catch(e => console.log(e.message))
    ])
    res.status(200);
    res.send(res1 || res2);
  } catch(err) {
    console.log(err.message);
    res.status(err.statusCode);
    res.send({error: err.message});
  }
};

