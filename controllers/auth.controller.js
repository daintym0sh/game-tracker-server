const { userService } = require('../services');
const { logger } = require('../utils');  
const passport = require('passport');
const jwt = require('jsonwebtoken');
const localStrategy = require('passport-local').Strategy;

const login = async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {     
      try {
          if(!user){
            const message = 'User not found';
              logger.error(message);
              return res.json(message);
          }

          req.login(
            user, 
            { session : false }, 
            async (error) => {
              if( error ){
                return next(error)
              }

              const body = { _id : user.id, username : user.username };
              const token = jwt.sign({ user : body },'top_secret');

              return res.json({ token });
          });     
      } catch (error) {
          logger.error(e.message);
          return next(error);
      }
  })(req, res, next);
}

passport.use('login', new localStrategy({
  usernameField : 'username',
  passwordField : 'password'
}, async (username, password, done) => {
  try {
    const user = await userService.getUser(username);
    if( !user ){
      return done(null, false, { message : 'User not found'});
    }

    const validate = await user.validatePassword(password);
    if( !validate ){
      return done(null, false, { message : 'Wrong Password'});
    }
    
    return done(null, user, { message : 'Logged in Successfully'});
  } catch (error) {
    return done(error);
  }
}));

const signup = async (req, res, next) => {
  const user = req.body
  try{
    const userId = await userService.createUser(user)

    if(userId > 0){
      res.send(
        {
          id: userId,
          message: `new user created with ${userId}`
        }
      );
    }
    
  } catch(e) {
    logger.error(e.message);
    res.status(500).end(e.message);
  }
}
 
module.exports = {
    login,
    signup
};