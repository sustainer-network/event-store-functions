const { expect } = require("chai");
const { post, get } = require("@sustainer-network/request");

const rootAddress = "https://event-store.staging.sustainer.network/v1";
describe("Event store", () => {
  it("should return successfully", async () => {
    const response = await post(`${rootAddress}/add`, {
      storeId: "some-staging-store-id",
      event: {
        fact: {
          root: "some-uuid",
          topic: "some-topic",
          version: 0,
          traceId: "a-trace-id",
          command: "a.command",
          commandInstanceId: "123",
          commandIssuedTimestamp: 123,
          createdTimestamp: 123
        },
        payload: {
          a: 1,
          b: 2
        }
      }
    });

    console.log("ONE RESPONSE: ", response);

    expect(response.statusCode).to.equal(200);
    expect(response.body).to.deep.equal(JSON.stringify({}));
  });
  it("should return an error if incorrect params", async () => {
    const response = await get(`${rootAddress}/hydrate`, {});
    console.log("TWO RESPONSE: ", response);
    expect(response.statusCode).to.be.greaterThan(400);
  });
});
