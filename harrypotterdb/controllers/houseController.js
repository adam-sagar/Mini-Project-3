"use strict";
const Models = require("../models");
const axios = require("axios");

// gets data from external API and puts it into the database
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

// lists all houses on the endpoint /houses
const getHouses = (res) => {
    Models.House.findAll({})
        .then(function (data) {
            res.send({ result: 200, data: data })
        })
        .catch(err => {
            res.status(500).send({ error: 'Unable to retrieve houses. Please try again later.' });
        })
}

// request a single house using its id
const getHouseById = (req, res) => {

    const id = req.params.id;

    Models.House.findOne({
        where: { id: id }
    })
        .then(function (house) {
            if (!house) {
                //if true, there is no house with the specified id so it returns an error message, otherwise it sends the corresponding house.
                res.status(404).send({ error: `House with id ${id} not found.` })
            } else {
                res.send({ result: 200, data: house });
            }
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
    getHouses, createHouses, updateHouse, deleteHouse, importHouses, getHouseById
}