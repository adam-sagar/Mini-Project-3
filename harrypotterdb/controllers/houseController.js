"use strict";
const Models = require("../models");
const axios = require("axios");

const importHouses = async () => {
    let response = await axios.get('https://wizard-world-api.herokuapp.com/Houses')
    console.log(response.data);
    for (let house of response.data) {
        let houseObject = {
            name: house.name,
            houseColours: house.houseColours,
            founder: house.founder,
            animal: house.animal,
            ghost: house.ghost,
            commonRoom: house.commonRoom
        }
        console.log(houseObject)
        console.log(house)
        const [houseResult, created] = await Models.House.findOrCreate({
            where: { name: house.name },
            defaults: houseObject
        });
    }
    console.log('Successfully imported houses');
}

const getHouses = (res) => {
    Models.House.findAll({})
    .then(function (data) {
        res.send({ result: 200, data: data })
    })
    .catch(err=> {
        res.status(500).send({ error: 'Unable to retrieve houses. Please try again later.' });
    })
}

const createHouses = (data, res) => {
    Models.House.create(data)
    .then(function (data) {
        res.send({ result: 200, data: data })
    })
    .catch(err => {
        res.status(500).send({ error: 'Unable to create house. Please try again later.' });
    })
}

const updateHouse = (req, res) => {
    Models.House.update(req.body, {
        where: { id: req.params.id }
    })
    .then(function (data) {
        res.send({ result: 200, data: data })
    })
    .catch(err => {
        res.status(500).send({ error: 'Unable to update house. Please try again later.' });
    })
}

const deleteHouse = (req, res) => {
    Models.House.destroy({
        where: { id: req.params.id }
    })
    .then(function (data) {
        res.send({ result: 200, data: data })
    })
    .catch(err => {
        res.status(500).send({ error: 'Unable to delete house. Please try again later.' });
    })
}

module.exports = {
    getHouses, createHouses, updateHouse, deleteHouse, importHouses
}