const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get('/', (req, res) => {
    Controllers.spellController.getPosts(res);
})

router.post('/create', (req, res) => {
    Controllers.spellController.createPosts(req.body, res)
})

router.put('/:id', (req, res) => {
    Controllers.spellController.updatePost(req, res)
})
router.delete('/:id', (req, res) => {
    Controllers.spellController.deletePost(req, res)
})

module.exports = router;