const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get('/', (req, res) => {
    Controllers.wizardController.getWizards(res);
})

router.get('/firstName/:firstName', (req, res) => {
    Controllers.wizardController.getWizardByFirstName(req, res);
})

router.post('/create', (req, res) => {
    Controllers.wizardController.createWizards(req.body, res)
})

router.put('/:id', (req, res) => {
    Controllers.wizardController.updateWizard(req, res)
})

router.delete('/:id', (req, res) => {
    Controllers.wizardController.deleteWizard(req, res)
})

module.exports = router;