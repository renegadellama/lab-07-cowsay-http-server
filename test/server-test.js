'use strict';

const server = require('../server');
const cowsay = require('cowsay');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;

chai.use(http);

describe('Server module', function(){
  before(done => {
    server.listen(3000);
    done();
  });

  describe('POST method', function() {
    describe('/endpoint', function() {
      it('should respond with 400 on bad request', done => {
        chai.request(server)
        .post('/derp')
        .send({})
        .end((err,res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
    describe('/cowsay endpoint', function(){
      it('should respond with a 200 on proper request', done => {
        chai.request(server)
        .post('/cowsay')
        .send({text: 'yo'})
        .end((err,res) => {
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
    it('should respond with 400 on bad request', done => {
      chai.request(server)
      .get('/cowsay')
      .send({})
      .end((err,res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('Get method', function() {
    describe('/endpoint', function() {
      it('should respond with a 400 on bad request', done => {
        chai.request(server)
        .post('/darf')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
    it('should respond with a 200 on proper request', done => {
      chai.request(server)
      .post('/cowsay')
      .send({text: 'hey there'})
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });
  });
  it('should respond with a 400 on bad request', done => {
    chai.request(server)
    .get('/cowsay')
    .send({})
    .end((err, res) => {
      expect(res.status).to.equal(400);
      done();
    });
  });
});
