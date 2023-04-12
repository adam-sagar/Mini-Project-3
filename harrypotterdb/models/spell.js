const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class Spell extends Model { }

//Sequelize will create this table if it doesn't exist on startup
Spell.init({
    ID: {
        type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true
    },
    name: {
        type: DataTypes.STRING, allowNull: true, required: true
    },
    incantation: {
        type: DataTypes.STRING, allowNull: true, required: true
    },
    effect: {
        type: DataTypes.STRING, allowNull: true, required: true
    },
    type: {
        type: DataTypes.STRING, allowNull: true, required: true
    },
    creator: {
        type: DataTypes.STRING, allowNull: true, required: true
    }
},
    {
        sequelize: sequelizeInstance, modelName: 'spells', //use lowercase plural format
        timestamps: true, freezeTableName: true
    }
)

module.exports = Spell;