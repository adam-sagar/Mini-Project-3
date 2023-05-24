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

const getWizardBySearch = (req, res) => {
    

    const { firstName, lastName, fullName } = req.query; // extracts the firstName, lastName, and fullName from the request query

    let whereCondition = {}; // initializes an empty object to store the search conditions

    if (firstName) {
        whereCondition.firstName = firstName; // adds the firstName to the search conditions
    }

    if (lastName) {
        whereCondition.lastName = lastName; // adds the lastName to the search conditions
    }

    if (fullName) {
        const fullNameParts = fullName.split(' '); // splits the fullName into an array of its parts (first name and last name)
        whereCondition.firstName = fullNameParts[0]; // assigns the first part of the fullName as the firstName in the search conditions

        if (fullNameParts.length > 1) {
            whereCondition.lastName = fullNameParts.slice(1).join(' '); // if the fullName has more than one part, assigns the remaining parts as the lastName in the search conditions (if more than one last name)
        }
    }

    Models.Wizard.findOne({
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