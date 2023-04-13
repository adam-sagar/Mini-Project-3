"use strict";
const Models = require("../models");
const axios = require("axios");

const importSpells = async () => {
    let response = await axios.get('https://wizard-world-api.herokuapp.com/Spells')
    for (let spell of response.data) {
        let spellObject = {
            name: spell.name,
            incantation: spell.incantation,
            effect: spell.effect,
            type: spell.type,
            creator: spell.creator
        }
        console.log(spellObject)
        console.log(spell)
        const [spellResult, created] = await Models.Spell.findOrCreate({
            where: { name: spell.name },
            defaults: spellObject
        });
    }
    console.log('Successfully imported spells');
}

const getRandomSpell = () => {
    return axios.get('https://wizard-world-api.herokuapp.com/Spells')
        .then(response => {
            const randomIndex = Math.floor(Math.random() * response.data.length);
            const randomSpell = response.data[randomIndex];
            return randomSpell;
        });
};

const getSpells = (res) => {
    Models.Spell.findAll({}).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}

const createSpells = (data, res) => {
    Models.Spell.create(data).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}

const updateSpell = (req, res) => {
    Models.Spell.update(req.body, {
        where: { id: req.params.id }
    }).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}

const deleteSpell = (req, res) => {
    Models.Spell.destroy({
        where: { id: req.params.id }
    }).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}

module.exports = {
    getSpells, createSpells, updateSpell, deleteSpell, importSpells, getRandomSpell
}