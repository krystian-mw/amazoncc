### `config/passport.js line 2`

```javascript
var LocalStrategy = require("passport-local").Strategy();
```

should be

```javascript
var LocalStrategy = require("passport-local").Strategy;
```

### `routes/users.js line 13`

```javascript
router.post("/login", passport.authentication('local-login'
```

should be

```javascript
router.post("/login", passport.authenticate('local-login'
```
