const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class Wizard extends Model { }

//Sequelize will create this table if it doesn't exist on startup
Wizard.init({
    ID: {
        type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING, allowNull: true, required: true
    },
    lastName: {
        type: DataTypes.STRING, allowNull: true, required: true
    },
    house: {
        type: DataTypes.STRING, allowNull: true, required: true, defaultValue: 'unknown' // added house field to make wizard data more interesting. Set to unknown by default because the external API data doesn't provide that information. Can be updated with the updateWizard function.
    }
},
    {
        sequelize: sequelizeInstance, modelName: 'wizards', //use lowercase plural format
        timestamps: true, freezeTableName: true
    }
) 

module.exports = Wizard;   