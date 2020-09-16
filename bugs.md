Bug 1: middleware/auth.js, authUser function should verify token against SECRET_KEY instead of using jwt.decode

Bug 2: await was missing for async function in login router (routes/auth.js)

Bug 3: await keyword was used without async keyword in models/user.js for update function.

Bug 4: getAll() in models/user.js does not require parameters. It is called in the router.get as getAll()

Bug 5: dotenv was not configured correctly in config.js
changed to - require("dotenv").config();

 Bug 6: User's router.patch had requireAdmin middleware func, which prevents regular users from updating their records.

Bug 7:  Users are able to change admin property which is fixed by throwing error message.
