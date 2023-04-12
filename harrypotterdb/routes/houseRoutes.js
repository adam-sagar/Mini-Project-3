const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get('/', (req, res) => {
    Controllers.houseController.getUsers(res);
})

router.post('/create', (req, res) => {
    Controllers.houseController.createUsers(req.body, res)
})

router.put('/:id', (req, res) => {
    Controllers.houseController.updateUser(req, res)
})
router.delete('/:id', (req, res) => {
    Controllers.houseController.deleteUser(req, res)
})

module.exports = router;