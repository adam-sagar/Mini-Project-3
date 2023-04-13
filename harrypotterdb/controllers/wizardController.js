"use strict";
const Models = require("../models");
const axios = require("axios");

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

const getWizardById = (req, res) => {

    const id = req.params.id;

    Models.Wizard.findOne({
        where: { id: id }
    })
        .then(function (wizard) {
            if (!wizard) {
                //if true, there is no wizard with the specified id so it returns an error message, otherwise it sends the corresponding wizard.
                res.status(404).send({ error: `Wizard with id ${id} not found.` })
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
    getWizards, createWizards, updateWizard, deleteWizard, importWizards, getWizardById
}