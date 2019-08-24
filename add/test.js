// const { expect } = require("chai");
// const { post } = require("@sustainer-network/request");
// const uuid = require("@sustainer-network/uuid");

// const rootAddress = "https://event-store.core.staging.sustainer.network/v1";

// const domain = "domain";
// const _service = "the-service-which-stores-this-event";
// const service = "the-service-from-which-this-event-originated";

// describe("Event store", () => {
//   it("should return successfully from adding", async () => {
//     const response = await post(`${rootAddress}/add`, {
//       domain,
//       service: _service,
//       event: {
//         fact: {
//           root: uuid(),
//           topic: "some-topic",
//           service,
//           version: 0,
//           traceId: "a-trace-id",
//           command: {
//             id: "123",
//             action: "some-action",
//             domain,
//             service: _service,
//             issuedTimestamp: 123
//           },
//           createdTimestamp: 123
//         },
//         payload: {
//           a: 1,
//           b: 2
//         }
//       }
//     });

//     expect(response.statusCode).to.equal(200);
//     expect(response.body).to.deep.equal(JSON.stringify({}));
//   });
//   it("should return an error if add is sent incorrect params", async () => {
//     const response = await post(`${rootAddress}/add`, {});
//     expect(response.statusCode).to.be.at.least(400);
//   });
// });
