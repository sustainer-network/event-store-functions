const { expect } = require("chai");
const { post, get } = require("@sustainer-network/request");
const uuid = require("@sustainer-network/uuid");

const rootAddress = "https://event-store.staging.sustainer.network/v1";
describe("Event store", () => {
  it("should return successfully from adding", async () => {
    const response = await post(`${rootAddress}/add`, {
      storeId: "some-staging-store-id",
      service: "some-service",
      event: {
        fact: {
          root: uuid(),
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

    expect(response.statusCode).to.equal(200);
    expect(response.body).to.deep.equal(JSON.stringify({}));
  });
  it("should return an error if add is sent incorrect params", async () => {
    const response = await post(`${rootAddress}/add`, {});
    expect(response.statusCode).to.be.at.least(400);
  });
  it("should hydrate successfully", async () => {
    const root = uuid();
    const storeId = "some-store-id";
    const service = "some-service";
    const payload1 = {
      a: 1,
      b: 1
    };
    const payload2 = {
      b: 2,
      c: 1
    };
    await post(`${rootAddress}/add`, {
      storeId,
      service,
      event: {
        fact: {
          root,
          topic: "some-topic",
          version: 0,
          traceId: "a-trace-id",
          command: "a.command",
          commandInstanceId: "123",
          commandIssuedTimestamp: 123,
          createdTimestamp: 123
        },
        payload: payload1
      }
    });
    const aggregate0 = await get(`${rootAddress}/hydrate`, {
      storeId,
      service,
      root
    });
    // eslint-disable-next-line no-console
    console.log("AGGREGATE 0: ", aggregate0);
    expect(JSON.parse(aggregate0)).to.deep.equal(payload1);

    await post(`${rootAddress}/add`, {
      storeId,
      service,
      event: {
        fact: {
          root,
          topic: "some-topic",
          version: 0,
          traceId: "a-trace-id",
          command: "a.command",
          commandInstanceId: "123",
          commandIssuedTimestamp: 123,
          createdTimestamp: 123
        },
        payload: payload2
      }
    });

    const aggregate1 = await get(`${rootAddress}/hydrate`, {
      storeId,
      service,
      root
    });
    // eslint-disable-next-line no-console
    console.log("HYDRATED 1: ", aggregate1);
    expect(JSON.parse(aggregate1)).to.deep.equal({ a: 1, b: 2, c: 1 });
  });
  it("should return an error if hydrate incorrect params", async () => {
    const response = await get(`${rootAddress}/hydrate`, {});
    expect(response.statusCode).to.be.at.least(400);
  });
});
