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
    return Models.Spell.findAll({})
        .then(spells => {
            const randomIndex = Math.floor(Math.random() * spells.length);
            const randomSpell = spells[randomIndex];
            return randomSpell;
        })
        .catch(err => {
            throw err;
        });
};

const getSpells = (res) => {
    Models.Spell.findAll({})
    .then(function (data) {
        res.send({ result: 200, data: data })
    })
     .catch(err=> {
        res.status(500).send({ error: 'Unable to retrieve spells. Please try again later.' });
    })
}

const createSpells = (data, res) => {
    Models.Spell.create(data)
    .then(function (data) {
        res.send({ result: 200, data: data })
    })
    .catch(err=> {
        res.status(500).send({ error: 'Unable to create spell. Please try again later.' });
    })
}

const updateSpell = (req, res) => {
    Models.Spell.update(req.body, {
        where: { id: req.params.id }
    })
    .then(function (data) {
        res.send({ result: 200, data: data })
    })
    .catch(err=> {
        res.status(500).send({ error: 'Unable to update spell. Please try again later.' });
    })
}

const deleteSpell = (req, res) => {
    Models.Spell.destroy({
        where: { id: req.params.id }
    })
    .then(function (data) {
        res.send({ result: 200, data: data })
    })
    .catch(err=> {
        res.status(500).send({ error: 'Unable to delete spell. Please try again later.' });
    })
}

module.exports = {
    getSpells, createSpells, updateSpell, deleteSpell, importSpells, getRandomSpell
}