let chai = require("chai");
let chaiHttp = require("chai-http");
let setver = require("../../index");
const {response} = require("express");

chai.should();
chai.use(chaiHttp);

const api = "http://localhost:3001" + process.env.API_URL;

describe("Officer controller",()=>{
    describe("getNoOfOfficers", ()=>{
        it("Test: get officer numbers success status code",()=>{

            chai
                .request(api)
                .get("/guestUsers/noOfOfficers")
                .then((err,response)=>{
                    response.should.have.status(200);
                });
        });

        it("Test: get officers numbers success data",()=>{

            chai
                .request(api)
                .get("/guestUsers/noOfOfficers")
                .then((err,response)=>{
                    response.should.have.property("dataList");
                });
        });



    });


});
