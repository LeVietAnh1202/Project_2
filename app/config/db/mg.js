const mongoose = require('mongoose');

async function connect() {
    try {
        // await mongoose.connect('mongodb://localhost/nodejs_f8_dev', {
        await mongoose.connect('mongodb+srv://user_mongodb:haylaaetot1183@cluster0.txov4.mongodb.net/nodejs_f8_dev?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connect successfully');
    } catch (error) {
        console.log('Connect failure');
    }
}

module.exports = { connect };