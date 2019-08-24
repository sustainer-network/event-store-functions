const add = require("@sustainer-network/event-store-add-service");
const tokensFromReq = require("@sustainer-network/tokens-from-req");

exports.add = (req, res) => {
  add({ params: req.body, tokens: tokensFromReq(req) })
    .then(() => res.send({}))
    .catch(e => {
      //eslint-disable-next-line no-console
      console.log("EEE: ", { e, stack: e.stack });
      res.status(e.statusCode).send(e);
    });
};
