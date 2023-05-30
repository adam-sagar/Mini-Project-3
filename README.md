===== HARRY POTTER DATABASE README =====

Welcome to my Harry Potter Database! This project was developed as part of the Institute of Data's Software Engineering bootcamp. It is a back-end-focused application that provides information about houses, spells, and wizards from the magical world of Harry Potter. The site retrieves data from an external API using Axios and populates the MySQL database upon server startup. Users can then retrieve, add, update, and delete data through Postman. This readme will guide you through the key features and technologies used in this project.


----- TECHNOLOGIES USED -----

The Harry Potter Database utilizes the following technologies:

    -   Node.js: A JavaScript runtime environment used for server-side scripting.

    -   Express: A web application framework for Node.js used to build the server and handle HTTP requests.

    -   MySQL: A relational database management system used to store and retrieve data.

    -   Sequelize: A promise-based ORM (Object-Relational Mapping) for Node.js used for database management and query operations.

    -   Axios: A library used to make HTTP requests to fetch data from an external API.

    -   Postman: A popular API development and testing tool used for interacting with the back-end APIs.

    -   External API: An API that provides data related to the Harry Potter universe.


----- FEATURES -----

The Harry Potter Database offers the following key features:

    -   House Information:

    Explore detailed information about the different houses in the Harry Potter series.

    -   Spell Information:

    Access a comprehensive list of spells used in the wizarding world. Additionally, users can hit a specific route to get a random spell.

    -   Wizard Information:

    Discover information about the various wizards and witches that inhabit the magical world. By utilizing request queries, users can effortlessly search for a particular character by their first, last, or full name.

    -   Adding to Favorite House:

    Users can bypass the unpredictable sorting hat and join their favourite Hogwarts house directly.


----- DEPLOYMENT -----

To use the Harry Potter Database, follow these steps:

    1   Clone the repository or download the source code.

    2   Open the project in your preferred code editor.

    3   Ensure you have Node.js and MySQL installed on your machine.

    4   Create a .env file and add the following:

            DB_NAME=harrypotterdb
            DB_USER= *your MySQL user goes here*
            DB_PASSWORD= *your MySQL password goes here*
            DB_HOST=localhost
            DB_PORT=3307

            PORT=8001

    5   Open MySQL Workbench and create a new schema called harrypotterdb.

    6   Install the required dependencies by running npm install in the project directory.

    7   Start the server by running npm start.

    8   Open Postman or a similar API testing tool.

    9   Explore the code to understand the available routes and request formats.
        They will all start with: http://localhost:8001/api/<route>
        To visit a specific route, replace <route> with the desired route name.

    10  Interact with the different API endpoints to retrieve, add, update, or delete data.

    11  Enjoy exploring the magical world of Harry Potter!


----- CREDITS -----

The Harry Potter Database was created by Adam Sagar. It utilizes data from an external API. Special thanks to MossPiglets the API provider for making this project possible and enabling us to delve into the enchanting realm of Harry Potter.

Mischief managed