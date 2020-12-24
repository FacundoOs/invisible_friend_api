const express = require("express");
const passport = require("passport");
const router = express.Router();

// @desc    Auth with Google
// @route   GET /auth/google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);
// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // req.session.user = req.user.displayName;
    // let token = req.user.displayName;
    res.redirect("http://localhost:3000");
  }
);

// @desc    Logout user
// @route   /auth/logout
router.get("/logout", (req, res) => {
  req.logout();
  // res.send(req.user);
  res.redirect('http://localhost:3000/')
});

router.get("/current_user", (req, res) => {
  console.log(req.user);
  res.send(req.user);
});

module.exports = router;
