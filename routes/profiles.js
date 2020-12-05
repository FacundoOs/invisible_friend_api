const router = require("express").Router();
let Profile = require("../models/profile.model");

router.route("/").get((req, res) => {
  Profile.find()
    .then((profiles) => res.json(profiles))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;

  const newProfile = new Profile({
    username,
    description,
  });

  newProfile
    .save()
    .then(() => res.json("Profile created!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
