const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    // get the token from the authorization header
    const token = await req.headers.authorization.split(' ')[1];

    // check if the token matches the original token
    const decodedToken = await jwt.verify(token, 'RANDOM-TOKEN');

    // retrive the user details from the decoded token
    const user = await decodedToken;

    // pass the user down to the endpoints
    req.user = user;

    // proceed to the next middleware
    next();
  } catch (err) {
    res.status(401).json({
      err: new Error('invalid request'),
    });
  }
};

module.exports = auth;
