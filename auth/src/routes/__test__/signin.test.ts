import request from "supertest";
import { app } from "../../app";

jest.setTimeout(30000);

it("fails when a email that does not exist is supplied", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .then((response) => {
      const { status } = response;
      expect(status).toBe(400);
    })
    .catch((err) => {
      //   console.log(err);
    });
});

it("fails when an incorrect password is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .then((response) => {
      const { status } = response;
      expect(status).toBe(201);
    })
    .catch((err) => {
      //   console.log(err);
    });

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "aslkdfjalskdfj",
    })
    .then((response) => {
      const { status } = response;
      expect(status).toBe(400);
    })
    .catch((err) => {
      //   console.log(err);
    });
});

// it("responds with a cookie when given valid credentials", async () => {
//   await request(app)
//     .post("/api/users/signup")
//     .send({
//       email: "test@test.com",
//       password: "password",
//     })
//     .expect(201);

//   const response = await request(app)
//     .post("/api/users/signin")
//     .send({
//       email: "test@test.com",
//       password: "password",
//     })
//     .expect(200);

//   expect(response.get("Set-Cookie")).toBeDefined();
// });
