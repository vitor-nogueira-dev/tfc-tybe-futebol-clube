import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { leaderBoard, leaderBoardHome, leaderBoardAway } from './mocks/leaderboard';

import { app } from '../app';

chai.use(chaiHttp);
const { expect } = chai;

describe('Using method GET /leaderboard', function () {
  it('should return status 200 and table classification', async function () {
    const response = await chai.request(app).get('/leaderboard');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(leaderBoard);
  });
});
describe('Using method GET /leaderboard/home', function () {
  it('shoud return table home', async function () {
    const response = await chai.request(app).get('/leaderboard/home');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(leaderBoardHome);
  });
});
describe('Using method GET em /leaderboard/away', function () {
  it('shoud return table away', async function () {
    const response = await chai.request(app).get('/leaderboard/away');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(leaderBoardAway);
  });
});