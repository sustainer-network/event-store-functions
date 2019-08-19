const eventStoreHandler = require("@sustainer-network/event-store-handler");
const tokenFromReq = require("@sustainer-network/token-from-req");

exports.hydrate = hydrate;

exports.add = (req, res) => {
  eventStoreHandler
    .add({ body: req.body, token: tokenFromReq(req) })
    .then(() => res.send({}))
    .catch(e => res.send(e));
};

exports.hydrate = (req, res) => {
  eventStoreHandler
    .hydrate({ body: req.body, token: tokenFromReq(req) })
    .then(aggregateRoot => res.send(aggregateRoot))
    .catch(e => res.send(e));
};
