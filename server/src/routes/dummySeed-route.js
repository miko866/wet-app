'use strict';

const express = require('express');
const {createDummyData, createCleverData} = require('../controllers/seeder-controller');
const env = require('env-var');

const router = express.Router();

/**
 * SEEDER Dummy Data
 */
router.post('/dummy-seed', (req, res, next) => {
  try {
    if (env.get('NODE_ENV').required().asString() === 'development') {
      createDummyData();
      res.status(200).send({ message: 'Seed successfully' });
    } else {
      res.status(403).send({ message: 'Cannot run dummy seed!' });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/clever-seed', (req, res, next) => {
  try{
      const { timeFrom, gatewayId } = req.query;

      createCleverData(timeFrom, gatewayId)
      .then((roundedTimestamp) => {
        res.status(200).send({ message: `Seed successfully ${roundedTimestamp}` });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  } catch (error) {
    next(error);
  }
});

module.exports = {
  dummySeedRoute: router,
};
