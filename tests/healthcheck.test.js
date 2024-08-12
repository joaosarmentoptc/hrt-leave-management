const request = require("supertest");
const app = require("../app");

describe("GET /healthcheck", () => {
  const endpoint = "/healthcheck";

  afterEach(() => {
    jest.restoreAllMocks();
  });
  it("given the server is healthy, when requesting the endpoint, then a 200 is received", async () => {
    const response = await request(app).get(endpoint);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("uptime");
    expect(response.body).toHaveProperty("timestamp");
  });
});
