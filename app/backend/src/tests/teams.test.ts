// import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { teamsMock } from './mocks/teamsMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Usando o método GET em /teams & /teams/:id', function () {
  it('Retorna a quantidade total de teams', async function () {
    const response = await chai.request(app).get('/teams');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(teamsMock);
  });
});

