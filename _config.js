var config = {}

config.mongoURI = {
    production = 'mongodb+srv://moorings:tech-xir-R43@cluster0.lltah.mongodb.net/darkroom?retryWrites=true&w=majority',
    development = 'mongodb+srv://moorings:tech-xir-R43@cluster0.lltah.mongodb.net/darkroom-dev?retryWrites=true&w=majority',
    test = 'mongodb+srv://moorings:tech-xir-R43@cluster0.lltah.mongodb.net/darkroom-test?retryWrites=true&w=majority',
}
module.exports = config;
