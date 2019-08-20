const eventStoreHandler = require("@sustainer-network/event-store-handler");
const tokenFromReq = require("@sustainer-network/token-from-req");

exports.add = (req, res) => {
  eventStoreHandler
    .add({ body: req.body, token: tokenFromReq(req) })
    .then(() => res.send({}))
    .catch(e => res.status(e.statusCode).send(e));
};

exports.hydrate = (req, res) => {
  // eslint-disable-next-line no-console
  console.log("DOING THE HYDRATING DANCE");
  eventStoreHandler
    .hydrate({ query: req.query, token: tokenFromReq(req) })
    .then(aggregateRoot => res.send(aggregateRoot))
    .catch(e => res.status(e.statusCode).send(e));
};
