'use strict';

module.exports = {
    db: "mongodb://localhost/bard-dev",
    app: {
        name: "bard - Development"
    },
    facebook: {
        clientID: "1455157534697493",
        clientSecret: "30b51f2bb84b2fc20373fd4caec5d7f6",
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    twitter: {
        clientID: "lDr2ruEINuyOMGGVTRWQ",
        clientSecret: "SBUD7jDUOeg8jFUzEfMSSz0qCEydsdvT1kx1zezQw8",
        callbackURL: "http://localhost:3000/auth/twitter/callback"
    }/*,
    github: {
        clientID: "APP_ID",
        clientSecret: "APP_SECRET",
        callbackURL: "http://localhost:3000/auth/github/callback"
    },
    google: {
        clientID: "APP_ID",
        clientSecret: "APP_SECRET",
        callbackURL: "http://localhost:3000/auth/google/callback"
    }*/
}