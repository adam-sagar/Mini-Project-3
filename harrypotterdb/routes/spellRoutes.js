const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get('/', (req, res) => {
    Controllers.spellController.getSpells(res);
})

router.get('/init', (req, res) => {
    Controllers.spellController.importSpells(res);
})

router.post('/create', (req, res) => {
    Controllers.spellController.createSpells(req.body, res)
})

router.put('/:id', (req, res) => {
    Controllers.spellController.updateSpell(req, res)
})

router.delete('/:id', (req, res) => {
    Controllers.spellController.deleteSpell(req, res)
})

router.get('/random', (req, res) => {
    Controllers.spellController.getRandomSpell()
        .then((randomSpell) => {
            res.send(randomSpell);
        })
        .catch((err) => {
            res.send(err.message);
        });
});
   
module.exports = router;