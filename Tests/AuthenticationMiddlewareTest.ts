import { expect } from "chai";
import { sign as jwtSign } from "jsonwebtoken";
import * as httpMocks from "node-mocks-http";
import AuthenticationMiddleware from "../src/Middleware/AuthenticationMiddleware";

describe("AuthenticationMiddleware", () => {
    const jwtSecret = "testSecret";
    it("Request without auth token must be denied with HTTP status code 401", (done) => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const middleware = new AuthenticationMiddleware(jwtSecret);
        middleware.Handle(req, res, null);
        expect(res.statusCode).to.equal(401);
        done();
    });
    it("Request with auth token must call next()", (done) => {
        const req = httpMocks.createRequest({
            headers: {
                Authorization: `Bearer ${jwtSign("test", jwtSecret)}`,
            },
        });
        const res = httpMocks.createResponse();
        const middleware = new AuthenticationMiddleware("testSecret");
        let nextCalled = false;
        middleware.Handle(req, res, () => {
            nextCalled = true;
        });
        expect(nextCalled).to.equal(true);
        done();
    });
});
