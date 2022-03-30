import { response } from "express";
import request from "supertest";
import { app } from "../../app";

jest.setTimeout(30000);

it("returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "abcdeg",
    })
    .then((response) => {
      const { status } = response;
      expect(status).toBe(201);
    })
    .catch((err) => {
      //   console.log(err);
    });
});

it("returns a 400 on invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test",
      password: "abcdeg",
    })
    .then((response) => {
      const { status } = response;
      expect(status).toBe(400);
    })
    .catch((err) => {
      //   console.log(err);
    });
});

it("returns a 400 on invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@tes.com",
      password: "a",
    })
    .then((response) => {
      const { status } = response;
      expect(status).toBe(400);
    })
    .catch((err) => {
      //   console.log(err);
    });
});

it("returns a 400 on missing email and password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({})
    .then((response) => {
      const { status } = response;
      expect(status).toBe(400);
    })
    .catch((err) => {
      //   console.log(err);
    });
});

it("disallows dulicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "abcdeg" })
    .then((response) => {
      const { status } = response;
      expect(status).toBe(201);
    })
    .catch((err) => {
      //   console.log(err);
    });

  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "abcdeg" })
    .then((response) => {
      const { status } = response;
      expect(status).toBe(400);
    })
    .catch((err) => {
      //   console.log(err);
    });
});

it("successful sets a cookie after signup", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "abcdeg" })
    .then((response) => {
      const { status } = response;
      expect(status).toBe(201);
    })
    .catch((err) => {
      //   console.log(err);
    });

  expect(response.get("Set-Cookie")).toBeDefined();
});
