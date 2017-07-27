/* eslint-disable no-unused-vars */
const path = require('path');
const _ = require('lodash');

/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable')
  }
  return process.env[name]
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv-safe')
  dotenv.load({
    path: path.join(__dirname, './.env.example'),
    sample: path.join(__dirname, './.env.example')
  })
}

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port: process.env.PORT || 9000,
    ip: process.env.IP || '0.0.0.0',
    masterKey: requireProcessEnv('MASTER_KEY'),
    jwtSecret: requireProcessEnv('JWT_SECRET'),
    mongo: {
      options: {
        db: {
          safe: true
        }
      }
    }
  },
  test: {
    mongo: {
      uri: 'https://swasimportfolio-sahercastic.c9users.io:8080',
      options: {
        debug: false
      }
    }
  },
  development: {
    mongo: {
      uri: 'https://swasimportfolio-sahercastic.c9users.io:8080',
      options: {
        debug: true
      }
    }
  },
  production: {
    ip: process.env.IP || undefined,
    port: process.env.PORT || 3000,
    mongo: {
      uri: process.env.MONGOLAB_URI 
    }
  }
}

module.exports = _.merge(config.all, config[config.all.env])
