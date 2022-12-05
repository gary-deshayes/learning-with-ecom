import app from "../../index";

describe("User routes", () => {
  test("Get all users", async () => {
    const res = await request(app).get("/users");
    expect(res.body).toEqual(["Goon", "Tsuki", "Joe"]);
  });
});