var config = {}

config.mongoURI = {
    production = 'mongodb+srv://photoman:alc-at3-P1x@cluster0.lltah.mongodb.net/darkroom?retryWrites=true&w=majority',
    development = 'mongodb+srv://photoman:alc-at3-P1x@cluster0.lltah.mongodb.net/darkroom-dev?retryWrites=true&w=majority',
    test = 'mongodb+srv://photoman:alc-at3-P1x@cluster0.lltah.mongodb.net/darkroom-test?retryWrites=true&w=majority',
}
module.exports = config;
