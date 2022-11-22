let chai = require("chai");
let chaiHttp = require("chai-http");
let setver = require("../../index");
const {response} = require("express");

chai.should();
chai.use(chaiHttp);

const api = "http://localhost:3001" + process.env.API_URL;

describe("Buyer controller",()=>{
    describe("getNoOfBuyers", ()=>{
        it("Test: get buyer numbers success status code",()=>{

            chai
                .request(api)
                .get("/guestUsers/noOfBuyers")
                .then((err,response)=>{
                    response.should.have.status(200);
                });
        });

        it("Test: get buyer numbers success data",()=>{

            chai
                .request(api)
                .get("/guestUsers/noOfBuyers")
                .then((err,response)=>{
                    response.should.have.property("dataList");
                });
        });



    });


});
