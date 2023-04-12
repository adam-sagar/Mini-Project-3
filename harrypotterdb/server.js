const express = require("express");
const app = express();
require("dotenv").config();

// parse requests of content-type - application / json
app.use(express.json());

let houseRoutes = require('./routes/houseRoutes')
app.use('/api/houses', houseRoutes)

let spellRoutes = require('./routes/spellRoutes')
app.use('/api/spells', spellRoutes)

app.get("/", (req, res) => {
    res.json({ message: "Welcome to my Harry Potter database." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});