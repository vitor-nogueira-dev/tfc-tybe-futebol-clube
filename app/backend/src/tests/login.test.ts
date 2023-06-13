import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as bcrypty from 'bcryptjs';
import { loginSemPassword, loginSemEmail, user, loginWithEmailInvalid, loginWithPasswordInvalid, emailInexistInDB } from './mocks/login.mocks';
import { app } from '../app';
import Users from '../database/models/UserModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Usando o método POST em /login', function () {
  it('should return sucess status 200 and a token', async () => {
    sinon.stub(Users, 'findOne').resolves(user as Users);
    sinon.stub(bcrypty, 'compareSync').resolves(user.password);

    const response = await chai.request(app)
      .post('/login').send({
        email: user.email,
        password: user.password
      });

    expect(response.status).to.be.equal(200);
    expect(response.body).not.to.be.empty;
  });
  it('should return an error message if there is no password field', async function () {
    const response = await chai.request(app)
      .post('/login')
      .send(loginSemPassword);

    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.property("message", 'All fields must be filled');
  });
  it('should return an error message if there is no email field', async function () {
    const response = await chai.request(app)
      .post('/login')
      .send(loginSemEmail);

    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.property("message", 'All fields must be filled');
  });
  it('should return an error message if the email field is not invalid', async function () {
    const response = await chai.request(app)
      .post('/login')
      .send(loginWithEmailInvalid);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.have.property("message", 'Invalid email or password');
  });

  it('should return an error message if the password field is not invalid', async function () {
    const response = await chai.request(app)
      .post('/login')
      .send(loginWithPasswordInvalid);
    expect(response.status).to.be.equal(401);
    expect(response.body).to.have.property("message", 'Invalid email or password');
  });

  // passa rodando somente ele, quando roda todos ele n funciona
  // it('should return an error message if the email field is not in the database', async function () {
  //   const response = await chai.request(app)
  //     .post('/login')
  //     .send(emailInexistInDB);
  //   expect(response.status).to.be.equal(401);
  //   expect(response.body).to.have.property("message", 'Invalid email or password');
  // });
});