"use strict";
const Models = require("../models");
const axios = require("axios");

const importSpells = (res) => {
    axios.get('https://wizard-world-api.herokuapp.com/Spells')
        .then((response) => {
            console.log(response.data);
            res.send(response.data);
        })
        .catch(err => { res.send(err.message) })
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