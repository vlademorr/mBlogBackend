const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const UserModel = require("../models/user");

passport.serializeUser(function(user, done) {
    console.log(user)
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    console.log(id)
    UserModel.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password"
        },
        function(username, password, done) {
            UserModel.findOne({ email: username })
                .then(user => {
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                    // bcrypt.compare(password, user.password).then(confirmPassword => {
                    //     if (!confirmPassword) {
                    //         return done(null, false);
                    //     }
                    //
                    //     delete user._doc.password;
                    //     return done(null, user);
                    // });
                })
                .catch(err => done(err, null));
        }
    )
);