/** Auth-related routes. */
const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const createToken = require('../helpers/createToken');
const ExpressError = require("../helpers/expressError");

/** Register user; return token.
 *
 *  Accepts {username, first_name, last_name, email, phone, password}.
 *
 *  Returns {token: jwt-token-string}.
 *
 *  If incorrect username/password given, should raise 401.
 *
 */

router.post('/register', async function(req, res, next) {
  try {
        const { username, password, first_name, last_name, email, phone } = req.body;
    
    let user = await User.register({username, password, first_name, last_name, email, phone});
    const token = createToken(username, user.admin);
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
}); // end

/** Log in user; return token.
 *
 *  Accepts {username, password}.
 *
 *  Returns {token: jwt-token-string}.
 *
 *  If incorrect username/password given, should raise 401.
 *
 */

/* Bug 2 - await was missing  in login*/

router.post('/login', async function(req, res, next) {
  try {
    const { username, password } = req.body;
    let user = await User.authenticate(username, password);
    const token = createToken(username, user.admin);
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
}); // end

module.exports = router;
