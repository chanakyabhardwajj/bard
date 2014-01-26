'use strict';

module.exports = {
    db: "mongodb://chanakyabhardwajj:bardadmin@troup.mongohq.com:10048/bard",
    app: {
        name: "bard - Production"
    },
    facebook: {
        clientID: "621077091262153",
        clientSecret: "4f9d9f12c366b6d3fa108a1df1d5cc62",
        callbackURL: "http://sheltered-brook-2177.herokuapp.com/auth/facebook/callback"
    },
    twitter: {
        clientID: "lDr2ruEINuyOMGGVTRWQ",
        clientSecret: "SBUD7jDUOeg8jFUzEfMSSz0qCEydsdvT1kx1zezQw8",
        callbackURL: "http://sheltered-brook-2177.herokuapp.com/auth/twitter/callback"
    },
    github: {
        clientID: "APP_ID",
        clientSecret: "APP_SECRET",
        callbackURL: "http://localhost:3000/auth/github/callback"
    },
    google: {
        clientID: "APP_ID",
        clientSecret: "APP_SECRET",
        callbackURL: "http://localhost:3000/auth/google/callback"
    }
}