const auth = require('basic-auth');
const { User } = require('../models');
const bcrypt = require('bcrypt');

/**
 * Middleware to authenticate using basic authentication
 * 
 */
 exports.authenticateUser = async (req, res, next) => {
    let message;
    const credentials = auth(req);
    if (credentials) {
      const user = await User.findOne({ where: {emailAddress: credentials.email} });
      if (user) {
        const authenticated = bcrypt
          .compareSync(credentials.password, user.confirmedPassword);
        if (authenticated) {
          console.log(`Authentication successful for email address: ${user.emailAddress}`);
  
          req.currentUser = user;
        } else {
          message = `Authentication failure for email address: ${user.emailAddress}`;
        }
      } else {
        message = `User not found for email address: ${credentials.email}`;
      }
    } else {
      message = 'Auth header not found';
    }
    if (message) {
      console.warn(message);
      res.status(401).json({ message: 'Access Denied' });
    } else {
      next();
    }
  };