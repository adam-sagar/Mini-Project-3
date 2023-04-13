"use strict";
const Models = require("../models");
const axios = require("axios");

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
 
// lists all wizards on the endpoint /wizards
const getWizards = (res) => {
    Models.Wizard.findAll({})
        .then(function (data) {
            res.send({ result: 200, data: data })
        })
        .catch(err => {
            res.status(500).send({ error: 'Unable to retrieve wizards. Please try again later.' });
        })
}

// modified getHouseById function to get a wizard by their first name instead
const getWizardByFirstName = (req, res) => {

    const firstName = req.params.firstName;

    Models.Wizard.findOne({
        where: { firstName: firstName }
    })
        .then(function (wizard) {
            if (!wizard) {
                res.status(404).send({ error: `Wizard with first name ${firstName} not found.` })
            } else {
                res.send({ result: 200, data: wizard });
            }
        })
}

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
    getWizards, createWizards, updateWizard, deleteWizard, importWizards, getWizardByFirstName
}