"use strict";
const Models = require("../models");
const axios = require("axios");

const initialiseHouses = (res) => {
    axios.get('https://wizard-world-api.herokuapp.com/Houses')
        .then((response) => {
            console.log(response.data);
            res.send(response.data);
        })
        .catch(err => {res.send(err.message)})
}

const getHouses = (res) => {
    Models.House.findAll({}).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}

const createHouses = (data, res) => {
    Models.House.create(data).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}

const updateHouse = (req, res) => {
    Models.House.update(req.body, {
        where: { id: req.params.id }
    }).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}

const deleteHouse = (req, res) => {
    Models.House.destroy({
        where: { id: req.params.id }
    }).then(function (data) {
        res.send({ result: 200, data: data })
    }).catch(err => {
        throw err
    })
}

module.exports = {
    getHouses, createHouses, updateHouse, deleteHouse, initialiseHouses
}