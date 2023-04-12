'use strict'
const House = require('./house')
const Spell = require('./spell') //require the model

async function init() {
    await House.sync(); //sync the model
    await Spell.sync();
};
init();

module.exports = {
    House, Spell //export the model
};