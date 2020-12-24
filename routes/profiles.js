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
  // const picture = req.body.picture;
  console.log(username, description)
  const newProfile = new Profile({
    username,
    description
  });

  newProfile
    .save()
    .then(() => res.json("Profile created!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  console.log(req.params.id)
  Profile.findById(req.params.id)
    .then((profile) => res.json(profile))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Profile.findByIdAndDelete(req.params.id)
    .then(() => res.json("Profile deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/update/:id").post((req, res) => {
  Profile.findById(req.params.id)
    .then((profile) => {
      profile.username = req.body.name;
      profile.description = req.body.description;

      profile
        .save()
        .then(() => res.json("Profile updated."))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
