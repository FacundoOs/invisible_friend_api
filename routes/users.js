// const router = require("express").Router();
const express = require('express')
const router = express.Router()
// require("dotenv").config();
// const { response } = require("express");
// const { OAuth2Client } = require("google-auth-library");
const passport = require('../passport')

const User = require("../models/user.model");

// const client = new OAuth2Client(
//   "1021930562113-djpn8e3ktb7ank5of09fadbc2982f73m.apps.googleusercontent.com"
// );

// router.route("/").get((req, res) => {
//   User.find()
//     .then((users) => res.json(users))
//     .catch((err) => res.status(400).json("Error: " + err));
// });


router.post('/', (req, res) => {
  console.log('user signup');

  const { username, email, password } = req.body
  // ADD VALIDATION
  User.findOne({ email: email }, (err, user) => {
      if (err) {
          console.log('User.js post error: ', err)
      } else if (user) {
          res.json({
              error: `Sorry, already a user with the username: ${username}`
          })
      }
      else {
        let newuser= { username: username, email: email, password: password}
        console.log('User created')

        let newUser = new User(newuser)

        newUser.save(function(err) {
          if(err) 
              res.send(err); 
              })
          // res.json(newUser)
          // res.send('Phone data recived successfully');
          // console.log(req.body);

          // const newUser = new User({
          //     username: username,
          //     password: password
          // })
          // newUser.save((err, savedUser) => {
          //     if (err) return res.json(err)
          //     res.json(savedUser)
          // })
      }
  })
})

router.post(
  '/login',
  function (req, res) {
      console.log('routes/user.js, login, req.body: ');
      console.log(req.body)
      // next()
      const { email, password } = req.body

      User.findOne({ email: email }, (err, user) => {
        if (err) {
          return (err)
        }
        if (!user) {
          return  { message: 'Incorrect username' }
        }
        if (!user.checkPassword(password)) {
          return  { message: 'Incorrect password' }
        }
        console.log(user)
        
        return res.json(user)
      })
  },
  
  passport.authenticate('local'),
  (req, res) => {
      console.log('logged in', req.user);
      const userInfo = {
          emsil: req.user.email
      };
      res.send(userInfo);
  }
)

router.get('/', (req, res, next) => {
  console.log('===== user!!======')
  console.log(req.user)
  if (req.user) {
      res.json({ user: req.user })
  } else {
      res.json({ user: null })
  }
})

router.post('/logout', (req, res) => {
  if (req.user) {
      req.logout()
      res.send({ msg: 'logging out' })
  } else {
      res.send({ msg: 'no user to log out' })
  }
})









// router.route("/googlelogin").post((req, res) => {
//   const { tokenId } = req.body;

//   client
//     .verifyIdToken({
//       idToken: tokenId,
//       audience:
//         "1021930562113-djpn8e3ktb7ank5of09fadbc2982f73m.apps.googleusercontent.com",
//     })
//     .then((response) => {
//       const { email_verified, name, email, picture } = response.payload;

//       if (email_verified) {
//         User.findOne({ email }).exec((err, user) => {
//           if (err) {
//             return res.status(400).json({
//               error: "Something went wrong",
//             });
//           } else {
//             if (user) {
//               const { _id, name, email } = user;
//               res.json({
//                 user: { _id, name, email, picture },
//               });
//             } else {
//               const newUser = new User({ name, email, picture });

//               newUser
//                 .save()
//                 .then(() => res.json("User added!"))
//                 .catch((err) => res.status(400).json("Error: " + err));
//             }
//           }
//         });
//       }
//       console.log(response.payload);
//     });
// });

module.exports = router;
