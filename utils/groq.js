const { Groq } = require("groq-sdk");

const groq = new Groq({apiKey: require("../config.json").groq});

module.exports = groq;