const eventStoreService = require("@sustainer-network/event-store-service");
const tokenFromReq = require("@sustainer-network/token-from-req");

exports.add = (req, res) => {
  eventStoreService
    .add({ body: req.body, token: tokenFromReq(req) })
    .then(() => res.send({}))
    .catch(e => res.status(e.statusCode).send(e));
};

exports.aggregate = (req, res) => {
  eventStoreService
    .hydrate({ query: req.query, token: tokenFromReq(req) })
    .then(aggregateRoot => {
      res.send(aggregateRoot);
    })
    .catch(e => {
      res.status(e.statusCode).send(e);
    });
};
