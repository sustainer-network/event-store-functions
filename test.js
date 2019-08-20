const { expect } = require("chai");
const { post, get } = require("@sustainer-network/request");
const uuid = require("@sustainer-network/uuid");

const rootAddress = "https://event-store.staging.sustainer.network/v1";
describe("Event store", () => {
  it("should return successfully from adding", async () => {
    const response = await post(`${rootAddress}/add`, {
      store: "some-staging-store-id",
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
  it("should get aggregates successfully", async () => {
    const root = uuid();
    const store = "some-store-id";
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
      store,
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
    const { body: aggregate0 } = await get(`${rootAddress}/aggregate`, {
      store,
      service,
      root
    });
    expect(aggregate0).to.deep.equal(JSON.stringify({ a: "1", b: "1" }));

    await post(`${rootAddress}/add`, {
      store,
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
          createdTimestamp: 124
        },
        payload: payload2
      }
    });

    const { body: aggregate1 } = await get(`${rootAddress}/aggregate`, {
      store,
      service,
      root
    });
    expect(aggregate1).to.deep.equal(
      JSON.stringify({ a: "1", b: "2", c: "1" })
    );
  });
  it("should get aggregates successfully when two events with the same timestamp are inserted", async () => {
    const root = uuid();
    const store = "some-store-id";
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
      store,
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
    const { body: aggregate0 } = await get(`${rootAddress}/aggregate`, {
      store,
      service,
      root
    });
    expect(aggregate0).to.deep.equal(JSON.stringify({ a: "1", b: "1" }));

    await post(`${rootAddress}/add`, {
      store,
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

    const { body: aggregate1 } = await get(`${rootAddress}/aggregate`, {
      store,
      service,
      root
    });
    expect(aggregate1).to.deep.equal(JSON.stringify({ b: "2", c: "1" }));
  });
  it("should return an error if aggregate has incorrect query params", async () => {
    const response = await get(`${rootAddress}/aggregate`, {});
    expect(response.statusCode).to.be.at.least(400);
  });
});
