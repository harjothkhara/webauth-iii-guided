const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization; //read the token from the authorization header

  jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => { //called the verify method passing token and secrets,  
    if(err) {
      // token is not valid or expired
      res.status(401).json({ you: 'shall not pass!!!' })
    } else {
      // the token is valid and we can read the decodedToken
      req.decodedToken = decodedToken; //grabbed the decoded token on success and if  there was an error "you shall not pass"... error could be changing the token

      next();
    }
  });
};

// api/users -> grabbed the token from login and added it to the headers with the authorization as the key.

// users---> roles <-----> permissions