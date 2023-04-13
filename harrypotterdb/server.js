const express = require("express");
const app = express();
require("dotenv").config();
const Controllers = require("./controllers");

// parse requests of content-type - application / json
app.use(express.json());

let houseRoutes = require('./routes/houseRoutes')
app.use('/api/houses', houseRoutes)

let spellRoutes = require('./routes/spellRoutes')
app.use('/api/spells', spellRoutes)

let wizardRoutes = require('./routes/wizardRoutes')
app.use('/api/wizards', wizardRoutes)

app.get("/", (req, res) => {
    res.json({ message: "Welcome to my Harry Potter database." });
});

// set port, listen for requests
// populates the database with external API data upon startup
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    Controllers.houseController.importHouses();
    Controllers.spellController.importSpells();
    Controllers.wizardController.importWizards();
});   