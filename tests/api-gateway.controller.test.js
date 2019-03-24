const expect = require('chai').expect;
const sinon = require("sinon");
const request = require('../util/request');
const gtw2 = require('../services/gateway2.service');

require('dotenv').config();

const api_gateway = require('../controllers/api-gateway.controller');

describe('Controller', () => {
    
    let res;
    let request_with_retry;
    let request_only;
    
    beforeEach(() => {
        res = {
            status: sinon.spy(),
            send: sinon.spy()
        };
        request_with_retry = sinon.stub(request, 'request_with_retry');
        request_only = sinon.stub(request, 'request_only');
    })

    afterEach(() => {
        request_with_retry.restore();
        request_only.restore();
    });

    describe('create_client() function', () => {

        it('Should miss a required parameter', async() => {

            const req = {
                body: {},
            };

            await api_gateway.create_client(req, res);

            expect(res.status.firstCall.args[0]).eq(400);
            expect(res.send.firstCall.args[0].error).to.contain('required');
        });


        it('Should create Clients', async() => {

            const req = {
                body: {
                    first_name: "Test",
                    last_name: "Anon", 
                    email:"test@test.com2",
                    fullname:"Test Anon"
                }
            }

            await api_gateway.create_client(req, res);

            expect(res.status.firstCall.args[0]).eq(201);
            expect(res.send.calledOnce).to.be.true
            sinon.assert.calledTwice(request_with_retry);
        });
    });
    

    describe('get_client() function', () => {


        it('Should retrieve clients', async() => {
        
            const req = {
                params: { CID: "5c9229e7337b3f104802307d" }
            };

            await api_gateway.get_client(req, res);

            expect(res.status.firstCall.args[0]).eq(200);
            expect(res.send.calledOnce).to.be.true
            sinon.assert.calledTwice(request_only);
        })
    })

    describe('create_transaction() function', () => {

        it('Should miss a required parameter', async() => {

            const req = {
                params: {CID: "5c9229e7337b3f104802307d"},
                body: { 
                    "creditcard": { 
                        "number": "4190914684237062", 
                        "issuer": "VISA",
                        "expire_month": "01", 
                        "expire_year": "2028", 
                        "cvv": "692"
                    }
                }
            };

            await api_gateway.create_transaction(req, res);

            expect(res.status.firstCall.args[0]).eq(400);
            expect(res.send.firstCall.args[0].error).to.contain('required');
        });

        it('Should create Transactions', async() => {
            const create_card = sinon.stub(gtw2, 'create_card')
            .onCall(0).returns({hash: '2131231'});

            const req = {
                params: {CID: "5c9229e7337b3f104802307d"},
                body: { 
                    "amount": 1000, 
                    "creditcard": { 
                        "number": "4190914684237062", 
                        "issuer": "VISA",
                        "expire_month": "01", 
                        "expire_year": "2028", 
                        "cvv": "692"
                    }
                }
            };

            await api_gateway.create_transaction(req, res);
            create_card.restore();

            expect(res.status.firstCall.args[0]).eq(201);
            expect(res.send.calledOnce).to.be.true
            sinon.assert.called(request_with_retry);
        })

    })


    describe('get_transaction() function', () => {

        it('Should get Transactions', async() => {

            const req = {
                params: {CID: "5c9229e7337b3f104802307d"}
            };

            await api_gateway.get_transactions(req, res);

            expect(res.status.firstCall.args[0]).eq(200);
            expect(res.send.calledOnce).to.be.true
            sinon.assert.calledTwice(request_only);
        })
    })

   
});