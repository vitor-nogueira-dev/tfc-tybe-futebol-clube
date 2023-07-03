// import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as sinon from 'sinon';

import { app } from '../app';

import { teamsMock, teamIdMock } from './mocks/teamsMock';
import TeamsModel from '../database/models/TeamsModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Usando o método GET em /teams & /teams/:id', function () {
  it('Retorna a quantidade total de teams', async function () {
    sinon.stub(TeamsModel, 'findAll').resolves(teamsMock as TeamsModel[])
    const response = await chai.request(app).get('/teams');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(teamsMock);
  });
  it.only('Retorna a team baseado no ID', async function () {
    sinon.stub(TeamsModel, 'findByPk').resolves(teamsMock[0] as TeamsModel)
    const response = await chai.request(app).get('/teams/1');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(teamIdMock);
  });
});

