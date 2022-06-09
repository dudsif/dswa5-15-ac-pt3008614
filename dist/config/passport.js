var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var mongoose = require('mongoose');

module.exports = function() {
    var Usuario = mongoose.model('Usuario');

    passport.use(new GitHubStrategy({
        clientID: '65b98d222617fc427b9b',
        clientSecret: '7b96f624538f76f1dd42814d1a614b4458e33725',
        callbackURL: 'https://dswa5-14-ac-pt3008614.herokuapp.com/auth/github/callback'
    }, function(accessToken, refreshToken, profile, done) {
        Usuario.findOrCreate(
            { "login" : profile.username},
            { "nome" : profile.username},
            function(erro, usuario) {
            if(erro){
                console.log(erro);
                return done(erro);
            }
            return done(null, usuario);
            }
        );
    }));
    passport.serializeUser(function(usuario, done) {
        done(null, usuario._id);
    });
    passport.deserializeUser(function(id, done) {
        Usuario.findById(id).exec()
        .then(function(usuario) {
        done(null, usuario);
        });
    });
};


