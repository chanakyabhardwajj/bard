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
        clientID: "52ee66670a0e32576c0000c8",
        clientSecret: "00aa9787e86cfd4a5af92bf3b424e512",
        callbackURL: "http://thebard.herokuapp.com/auth/bufferapp/callback"
    }
}