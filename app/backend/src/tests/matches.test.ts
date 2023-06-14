import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as sinon from 'sinon';

// @ts-ignore
import chaiHttp = require('chai-http');
import matches, { allMatches, matchFail, matchesInProgress, newMatch, resultCreateMatch, successTeam1, successTeam2, updateGoals } from './mocks/matches.mocks';

import { app } from '../app';
import MatchesModel from '../database/models/MatchesModel';
import { jwtPayload } from './mocks/login.mocks';
import TeamsModel from '../database/models/TeamsModel';

chai.use(chaiHttp);
const { expect } = chai;

describe('Matches', function () {
  afterEach(() => sinon.restore());
  describe('testing router GET /matches', () => {
    it('should return status 200 and list all matches', async function () {
      const response = await chai.request(app).get('/matches');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.deep.equal(matches);
    });
    it('should return status 200 and matches in progress', async () => {
      sinon.stub(MatchesModel, 'findAll').resolves(matchesInProgress as MatchesModel[]);

      const response = await chai.request(app).get('/matches')
        .query({ inProgress: 'true' });

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(matchesInProgress);
    });
    it('should return status 200 and matches don\'t progress', async () => {
      sinon.stub(MatchesModel, 'findAll').resolves(matchesInProgress as MatchesModel[]);

      const response = await chai.request(app).get('/matches')
        .query({ inProgress: 'false' });

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(matchesInProgress);
    });
  });

  describe('testing router PATCH /matches/:id/finish', () => {
    it('should return status 200 and a message', async () => {
      sinon.stub(jwt, 'verify').callsFake(() => jwtPayload);
      sinon.stub(MatchesModel, 'findOne').resolves(allMatches[1] as MatchesModel);
      sinon.stub(MatchesModel, 'update').resolves([1]);

      const response = await chai.request(app).patch('/matches/1/finish')
        .set('Authorization', 'token-valid');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal({ message: 'Finished' });
    });
  });
  describe('testing router PATCH /matches/:id', () => {
    it('should return status 400 and a message', async () => {
      sinon.stub(jwt, 'verify').callsFake(() => jwtPayload);

      const response = await chai.request(app).patch('/matches/1')
        .set('Authorization', 'token-valid');

      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
    });
    it('should return status 200 and a message', async () => {
      sinon.stub(jwt, 'verify').callsFake(() => jwtPayload);
      sinon.stub(MatchesModel, 'findOne').resolves(allMatches[1] as MatchesModel);
      sinon.stub(MatchesModel, 'update').resolves([1]);

      const response = await chai.request(app).patch('/matches/1')
        .set('Authorization', 'token-valid')
        .send(updateGoals);

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal({ message: 'Updated' });
    });
  });
  describe('testing router POST /matches', () => {
    it('Deve retornar 404 e uma mensagem caso não exista algum dos times passados', async () => {
      sinon.stub(jwt, 'verify').callsFake(() => jwtPayload);
      sinon.stub(TeamsModel, 'findOne')
        .onFirstCall().resolves(successTeam1.message as TeamsModel)
        .onSecondCall().resolves(undefined);

      const response = await chai.request(app).post('/matches')
        .set('Authorization', 'token-valid')
        .send(matchFail);

      expect(response.status).to.be.equal(404);
      expect(response.body).to.be.deep.equal({ message: 'There is no team with such id!' });
    });
    it('Deve retornar 201 e o novo time criado', async () => {
      sinon.stub(jwt, 'verify').callsFake(() => jwtPayload);

      const createMatch = { ...newMatch, inProgress: true };
      const resolvedCreateMatch = MatchesModel.build(createMatch)
      const resolvedResultCreateMatch = MatchesModel.build(resultCreateMatch)
      sinon.stub(MatchesModel, 'create').resolves(resolvedCreateMatch);
      sinon.stub(MatchesModel, 'findOne').resolves(resolvedResultCreateMatch);


      const response = await chai.request(app).post('/matches')
        .set('Authorization', 'token-valid')
        .send(newMatch);

      const { id, ...rest } = response.body;
      expect(response.status).to.be.equal(201);
      expect(response.body).to.be.deep.equal({ ...rest, id: 51 });
    });
  });
})
