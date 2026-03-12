const mongoose = require('mongoose');
const { create } = require('./user.models');

const blacklistSchema = new mongoose.Schema({
    token:{
        type: String,
        required: true
    }
}, {
    timestamps: true
})


const blacklistModel = mongoose.model("BlacklistTokens", blacklistSchema);

module.exports = blacklistModel;
