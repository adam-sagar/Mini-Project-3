"use strict";
const Models = require("../models");
const axios = require("axios");
const { Op } = require("sequelize");

// gets data from external API and puts it into the database
const importWizards = async () => {

    let response = await axios.get('https://wizard-world-api.herokuapp.com/Wizards')
    console.log(response.data);
    for (let wizard of response.data) {
        let wizardObject = {
            firstName: wizard.firstName,
            lastName: wizard.lastName
        }
        console.log(wizardObject)
        console.log(wizard)
        const [wizardResult, created] = await Models.Wizard.findOrCreate({
            where: { firstName: wizard.firstName },
            defaults: wizardObject
        });
    }
    console.log('Successfully imported wizards');
}

const getWizards = (res) => {

    Models.Wizard.findAll({})
        .then(function (data) {
            res.send({ result: 200, data: data })
        })
        .catch(err => {
            res.status(500).send({ error: 'Unable to retrieve wizards. Please try again later.' });
        })
}

const getWizardBySearch = (req, res) => {

    // retrieve the search query parameter from the request
    const { search } = req.query;

    // define the initial where condition as an empty object
    let whereCondition = {};

    // check if a search query is provided
    if (search) {
        // split the search query into individual words
        const names = search.split(' ');

        // check the number of words in the search query
        if (names.length === 1) {
            // perform partial match search on firstName or lastName
            whereCondition = {
                [Op.or]: [
                    { firstName: { [Op.like]: `%${search}%` } },
                    { lastName: { [Op.like]: `%${search}%` } }
                ]
            };
        } else if (names.length === 2) {
            const [firstName, lastName] = names;
            // perform separate partial match search on firstName and lastName
            whereCondition = {
                firstName: { [Op.like]: `%${firstName}%` },
                lastName: { [Op.like]: `%${lastName}%` }
            };
        }
    }

    Models.Wizard.findAll({
        where: whereCondition
    })
        .then(function (wizard) {
            if (!wizard) {
                res.status(404).send({ error: `Wizard not found.` });
            } else {
                res.send({ result: 200, data: wizard });
            }
        })
        .catch(err => {
            console.error('Error retrieving wizard:', err);
            res.status(500).send({ error: 'Unable to retrieve wizard. Please try again later.' });
        });
};

const createWizards = (data, res) => {
    Models.Wizard.create(data)
        .then(function (data) {
            res.send({ result: 200, data: data })
        })
        .catch(err => {
            res.status(500).send({ error: 'Unable to create wizard. Please try again later.' });
        })
}

const updateWizard = (req, res) => {
    Models.Wizard.update(req.body, {
        where: { id: req.params.id }
    })
        .then(function (data) {
            res.send({ result: 200, data: data })
        })
        .catch(err => {
            res.status(500).send({ error: 'Unable to update wizard. Please try again later.' });
        })
}

const deleteWizard = (req, res) => {
    Models.Wizard.destroy({
        where: { id: req.params.id }
    })
        .then(function (data) {
            res.send({ result: 200, data: data })
        })
        .catch(err => {
            res.status(500).send({ error: 'Unable to delete wizard. Please try again later.' });
        })
}

module.exports = {
    getWizards, createWizards, updateWizard, deleteWizard, importWizards, getWizardBySearch
}