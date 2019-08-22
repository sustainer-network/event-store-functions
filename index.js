const eventStoreService = require("@sustainer-network/event-store-service");
const tokensFromReq = require("@sustainer-network/tokens-from-req");

exports.add = (req, res) => {
  eventStoreService
    .add({ body: req.body, tokens: tokensFromReq(req) })
    .then(() => res.send({}))
    .catch(e => res.status(e.statusCode).send(e));
};

exports.aggregate = (req, res) => {
  eventStoreService
    .hydrate({ query: req.query, token: tokensFromReq(req) })
    .then(aggregateRoot => {
      res.send(aggregateRoot);
    })
    .catch(e => {
      res.status(e.statusCode).send(e);
    });
};
