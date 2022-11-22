let chai = require("chai");
let chaiHttp = require("chai-http");
let setver = require("../../index");
const {response} = require("express");

chai.should();
chai.use(chaiHttp);

const api = "http://localhost:3001" + process.env.API_URL;

describe("District controller",()=>{
    describe("getDistrictById", ()=>{
        it("Test: get district success status code",()=>{

            chai
                .request(api)
                .get("/guestUsers/getDistrictById/1")
                .then((err,response)=>{
                    response.should.have.status(200);
                });
        });

        it("Test: get district fail status code",()=>{

            chai
                .request(api)
                .get("/guestUsers/getDistrictById/50")
                .then((err,response)=>{
                    response.should.have.status(500);
                });
        });

        it("Test: get district success datas",()=>{

            chai
                .request(api)
                .get("/guestUsers/getDistrictById/1")
                .then((err,response)=>{
                    response.should.have.property("district");
                });
        });



    });


});
