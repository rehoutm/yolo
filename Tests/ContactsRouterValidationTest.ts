import * as bodyParser from "body-parser";
import { expect } from "chai";
import * as e from "express";
import * as sinon from "sinon";
import * as supertest from "supertest";
import ContactsController from "../src/Controllers/ContactsController";
import AuthenticationMiddleware from "../src/Middleware/AuthenticationMiddleware";
import ContactsRouter from "../src/Routes/ContactsRouter";

describe("ContactsRouterValidation", () => {
    before(() => {
        sinon.stub(AuthenticationMiddleware.prototype, "Handle").callsFake((req, res, next) => {
            return next();
        });
        sinon.stub(ContactsController.prototype, "HandlePost").callsFake((req, res: e.Response) => {
            res.status(201).end();
        });
    });
    it("Request should be denied when no name is provided", (done) => {
        const app = e();
        app.use("/contacts", ContactsRouter);
        app.use(bodyParser.json());
        supertest(app)
            .post("/contacts")
            .send({ name: "" })
            .end((err: any, res: supertest.Response) => {
                expect(res.status).to.equal(422);
                done();
            });
    });
    it("Request should be processed when name is provided", (done) => {
        const app = e();
        app.use(bodyParser.json());
        app.use("/contacts", ContactsRouter);
        supertest(app)
            .post("/contacts")
            .send({ name: "Test Name" })
            .end((err: any, res: supertest.Response) => {
                expect(res.status).to.equal(201);
                done();
            });
    });
});
