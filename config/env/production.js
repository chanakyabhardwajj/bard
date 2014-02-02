'use strict';

module.exports = {
    db: "mongodb://chanakyabhardwajj:bardadmin@troup.mongohq.com:10048/bard",
    app: {
        name: "bard"
    },
    facebook: {
        clientID: "621077091262153",
        clientSecret: "4f9d9f12c366b6d3fa108a1df1d5cc62",
        callbackURL: "http://thebard.herokuapp.com/auth/facebook/callback"
    },
    twitter: {
        clientID: "lDr2ruEINuyOMGGVTRWQ",
        clientSecret: "SBUD7jDUOeg8jFUzEfMSSz0qCEydsdvT1kx1zezQw8",
        callbackURL: "http://thebard.herokuapp.com/auth/twitter/callback"
    },
    bufferapp: {
        clientID: "52c9635211243a2774000162",
        clientSecret: "b5ea1037c89f092e40876d29ec780465",
        callbackURL: "http://localhost:3000/auth/bufferapp/callback"
    }
}