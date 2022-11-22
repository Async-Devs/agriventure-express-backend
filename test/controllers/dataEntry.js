let chai = require("chai");
let chaiHttp = require("chai-http");
let setver = require("../../index");
const {response} = require("express");

chai.should();
chai.use(chaiHttp);

const api = "http://localhost:3001" + process.env.API_URL;

describe("Data Entry controller",()=>{
    describe("getAllDataEntry", ()=>{
        it("Test: get data entry status code",()=>{

            chai
                .request(api)
                .get("/guestUsers/getAllDataEntry")
                .then((err,response)=>{
                    response.should.have.status(200);
                });
        });

        it("Test: get data entry datas",()=>{

            chai
                .request(api)
                .get("/guestUsers/getAllDataEntry")
                .then((err,response)=>{
                    response.should.have.property("dataList");
                });
        });


    });

    describe("getAllDistrict", ()=>{
        it("Test: get district status code",()=>{

            chai
                .request(api)
                .get("/guestUsers/getAllLocations")
                .then((err,response)=>{
                    response.should.have.status(200);
                });
        });

        it("Test: get district data",()=>{

            chai
                .request(api)
                .get("/guestUsers/getAllLocations")
                .then((err,response)=>{
                    response.should.have.property("dataList");
                });
        });


    });

    describe("getAllDistrict", ()=>{
        it("Test: get crop types status code",()=>{

            chai
                .request(api)
                .get("/guestUsers/cropDetails")
                .then((err,response)=>{
                    response.should.have.status(200);
                });
        });

        it("Test: get crop types data",()=>{

            chai
                .request(api)
                .get("/guestUsers/cropDetails")
                .then((err,response)=>{
                    response.should.have.property("dataList");
                });
        });


    });


});
