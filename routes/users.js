const router = require("express").Router();
require("dotenv").config();
const { response } = require("express");
const { OAuth2Client } = require("google-auth-library");

let User = require("../models/user.model");

const client = new OAuth2Client("1021930562113-djpn8e3ktb7ank5of09fadbc2982f73m.apps.googleusercontent.com");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/googlelogin").post((req, res) => {
  const { tokenId } = req.body;

  client
    .verifyIdToken({
      idToken: tokenId,
      audience:
      process.env.GOOGLE_CLIENT,
    })
    .then((response) => {
      const { email_verified, name, email, picture } = response.payload;

      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          if (err) {
            return res.status(400).json({
              error: "Something went wrong",
            });
          } else {
            if (user) {
              const { _id, name, email } = user;
              res.json({
                user: { _id, name, email, picture },
              });
            } else {
              const newUser = new User({ name, email, picture });

              newUser
                .save()
                .then(() => res.json("User added!"))
                .catch((err) => res.status(400).json("Error: " + err));
            }
          }
        });
      }
      console.log(response.payload);
    });
});

module.exports = router;
