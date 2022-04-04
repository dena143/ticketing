"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../app");
jest.setTimeout(30000);
it("returns a 201 on successful signup", () => __awaiter(void 0, void 0, void 0, function* () {
    return (0, supertest_1.default)(app_1.app)
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
}));
it("returns a 400 on invalid email", () => __awaiter(void 0, void 0, void 0, function* () {
    return (0, supertest_1.default)(app_1.app)
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
}));
it("returns a 400 on invalid password", () => __awaiter(void 0, void 0, void 0, function* () {
    return (0, supertest_1.default)(app_1.app)
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
}));
it("returns a 400 on missing email and password", () => __awaiter(void 0, void 0, void 0, function* () {
    return (0, supertest_1.default)(app_1.app)
        .post("/api/users/signup")
        .send({})
        .then((response) => {
        const { status } = response;
        expect(status).toBe(400);
    })
        .catch((err) => {
        //   console.log(err);
    });
}));
it("disallows dulicate emails", () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
        .post("/api/users/signup")
        .send({ email: "test@test.com", password: "abcdeg" })
        .then((response) => {
        const { status } = response;
        expect(status).toBe(201);
    })
        .catch((err) => {
        //   console.log(err);
    });
    yield (0, supertest_1.default)(app_1.app)
        .post("/api/users/signup")
        .send({ email: "test@test.com", password: "abcdeg" })
        .then((response) => {
        const { status } = response;
        expect(status).toBe(400);
    })
        .catch((err) => {
        //   console.log(err);
    });
}));
it("successful sets a cookie after signup", () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, supertest_1.default)(app_1.app)
        .post("/api/users/signup")
        .send({ email: "test@test.com", password: "abcdeg" })
        .then((response) => {
        const { status } = response;
        expect(status).toBe(201);
    })
        .catch((err) => {
        //   console.log(err);
    });
    expect(express_1.response.get("Set-Cookie")).toBeDefined();
}));
