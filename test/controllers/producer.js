let chai = require("chai");
let chaiHttp = require("chai-http");
let setver = require("../../index");
const {response} = require("express");

chai.should();
chai.use(chaiHttp);

const api = "http://localhost:3001" + process.env.API_URL;

describe("District controller",()=>{
    describe("getDistrictById", ()=>{
        it("Test: get producer numbers success status code",()=>{

            chai
                .request(api)
                .get("/guestUsers/noOfProducers")
                .then((err,response)=>{
                    response.should.have.status(200);
                });
        });

        it("Test: get producer numbers success data",()=>{

            chai
                .request(api)
                .get("/guestUsers/noOfProducers")
                .then((err,response)=>{
                    response.should.have.property("dataList");
                });
        });



    });


});
