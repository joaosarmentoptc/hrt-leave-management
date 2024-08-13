const request = require("supertest");
const app = require("../app");
const jwt = require("./utils/jwtToken");

describe("GET /leaves/balance", () => {
  const endpoint = "/leaves/balance";
  it("given the user is not authenticated, when requesting the endpoint, then a 401 is received", async () => {
    const response = await request(app).get(endpoint);
    expect(response.status).toBe(401);
  });

  it("given the user is authenticated but has no balance, when requesting the endpoint, then a 404 is received", async () => {
    const token = await jwt.getUserWithNoBalance();
    const response = await request(app)
      .get(endpoint)
      .set("Authorization", token);
    expect(response.status).toBe(404);
  });
});
