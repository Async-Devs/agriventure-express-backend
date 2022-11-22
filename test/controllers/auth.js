let chai = require("chai");
let chaiHttp = require("chai-http");
let setver = require("../../index");
const {response} = require("express");

chai.should();
chai.use(chaiHttp);

const api = "http://localhost:3001" + process.env.API_URL;

describe("User controller",()=>{
    describe("Sign in", ()=>{
        it("Test: invalid user sign-in status code",()=>{
            const login = {
                userName: "wrong user",
                password: "wrong password"
            };

            chai
                .request(api)
                .post("/auth/login")
                .field("userName",login.userName)
                .field("password",login.password)
                .then((err,response)=>{
                    response.should.have.status(200);

                });

        });

        it("Test: invalid user sign-in return message",()=>{
            const login = {
                userName: "wrong user",
                password: "wrong password"
            };

            chai
                .request(api)
                .post("/auth/login")
                .field("userName",login.userName)
                .field("password",login.password)
                .then((err,response)=>{
                    response.msg.should.equal('Invalid Username or password');

                });

        });

        it("Test: invalid user password return status",()=>{
            const login = {
                userName: "supun",
                password: "wrong password"
            };

            chai
                .request(api)
                .post("/auth/login")
                .field("userName",login.userName)
                .field("password",login.password)
                .then((err,response)=>{
                    response.should.have.status(401);

                });

        });

        it("Test: invalid user password return message",()=>{
            const login = {
                userName: process.env.TEST_USER,
                password: "wrong password"
            };

            chai
                .request(api)
                .post("/auth/login")
                .field("userName",login.userName)
                .field("password",login.password)
                .then((err,response)=>{
                    response.msg.should.equal("Invalid Username or password");

                });

        });

        it("Test: valid user password return status",()=>{
            const login = {
                userName: process.env.TEST_USER,
                password: process.env.TEST_PASSWORD
            };

            chai
                .request(api)
                .post("/auth/login")
                .field("userName",login.userName)
                .field("password",login.password)
                .then((err,response)=>{
                    response.should.have.status(200);

                });

        });

        it("Test: valid user password return fields",()=>{
            const login = {
                userName: process.env.TEST_USER,
                password: process.env.TEST_PASSWORD
            };

            chai
                .request(api)
                .post("/auth/login")
                .field("userName",login.userName)
                .field("password",login.password)
                .then((err,response)=>{
                    response.should.have.property("accessToken");
                    response.should.have.property("success");
                });

        });

    });

    describe("Create user",()=>{
        const login = {
            userName: "testUser",
            password: "testPassword",
            userType: 1,
            isActive: 0
        };
        it("Test: create user correct return status",()=>{


            chai
                .request(api)
                .post("/auth/addUser")
                .field("userName",login.userName)
                .field("password",login.password)
                .field("userType",login.userType)
                .field("isActive",login.isActive)
                .then((err,response)=>{
                    response.should.have.status(200);
                });

        });

        it("Test: create user incorrect return status",()=>{


            chai
                .request(api)
                .post("/auth/addUser")
                .field("userName","")
                .field("password",login.password)
                .field("userType",login.userType)
                .field("isActive",login.isActive)
                .then((err,response)=>{
                    response.should.have.status(500);
                });

        });


        it("Test: create user correct return values",()=>{


            chai
                .request(api)
                .post("/auth/addUser")
                .field("userName",login.userName)
                .field("password",login.password)
                .field("userType",login.userType)
                .field("isActive",login.isActive)
                .then((err,response)=>{
                    response.should.have.property("user");
                });

        });

    })

});
