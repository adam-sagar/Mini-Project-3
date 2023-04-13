'use strict'
const House = require('./house')
const Spell = require('./spell')
const Wizard = require('./wizard') //require the model

async function init() {
    await House.sync(); //sync the model
    await Spell.sync();
    await Wizard.sync();
};
init();

module.exports = {
    House, Spell, Wizard //export the model
};