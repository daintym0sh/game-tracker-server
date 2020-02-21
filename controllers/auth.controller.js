const { userService } = require('../services');
const { logger } = require('../utils');  
const passport = require('passport');
const jwt = require('jsonwebtoken');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const tokenSecret = 'top_secret';

const login = async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {     
      try {

          if(!user){
              logger.error(info.message);
              return res.status(500).json(info.message);
          }

          req.login(
            user, 
            { session : false }, 
            async (error) => {
              if(error){
                return next(error)
              }

              const body = { id : user.id, username : user.username, test: "test" };
              const token = jwt.sign({ user : body }, tokenSecret);

              return res.json({ token });
            }
          );     
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

    if(!user){
      return done(null, false, { message : 'User not found'});
    }

    const valid = await user.validatePassword(password);

    if(!valid){
      return done(null, false, { message : 'Wrong Password'});
    }
    
    return done(null, user, { message : 'Logged in Successfully'});
  } catch (error) {
    return done(error);
  }
}));

passport.use(new JWTstrategy({
  secretOrKey : tokenSecret,
  jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken()
}, async (token, done) => {
  try {
    return done(null, token.user);
  } catch (error) {
    done(error);
  }
}));

const signup = async (req, res, next) => {
  const user = req.body
  try{
    const newUser =
      await userService.createUser(user)

    res.status(200)
      .json(
        `New user ${newUser.username} created with id ${newUser.id}`
      );
    
  } catch(e) {
    const errorMessage = 'User already exists'
    logger.error(e.message + ': ' + errorMessage);
    res.status(500).end(errorMessage);
  }
}

const test = async (req, res, next) => {
  res.json({
    message : 'You made it to the secure route',
    user : req.user
  })
}
 
module.exports = {
    login,
    signup,
    test
};