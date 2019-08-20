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
  console.log("DOING THE HYDRATING DANCE body: ", req.body);
  // eslint-disable-next-line no-console
  console.log("DOING THE HYDRATING DANCE params: ", req.params);
  // eslint-disable-next-line no-console
  console.log("DOING THE HYDRATING DANCE query: ", req.query);
  eventStoreHandler
    .hydrate({ query: req.query, token: tokenFromReq(req) })
    .then(aggregateRoot => {
      // eslint-disable-next-line no-console
      console.log("dooooon: ", aggregateRoot);
      res.send(aggregateRoot);
    })
    .catch(e => {
      // eslint-disable-next-line no-console
      console.log("nooooo: ", e);
      res.status(e.statusCode).send(e);
    });
};
