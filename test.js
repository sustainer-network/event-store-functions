const { expect } = require("chai");
const { post } = require("@roof/request");

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
          commandIssuedTimestamp: "345"
        },
        payload: {
          a: 1,
          b: 2
        }
      }
    });

    expect(response.statusCode).to.equal(200);
    expect(response.body).to.equal({});
  });
  it("should return an error if incorrect params", async () => {
    const response = await post(address, {});
    expect(response.statusCode).to.be.greaterThan(400);
  });
});