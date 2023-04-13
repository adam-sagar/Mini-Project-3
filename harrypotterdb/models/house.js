const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const sequelizeInstance = dbConnect.Sequelize;

class House extends Model { }

//Sequelize will create this table if it doesn't exist on startup
House.init({
    ID: {
        type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true
    },
    name: {
        type: DataTypes.STRING, allowNull: true, required: true
    },
    houseColours: {
        type: DataTypes.STRING, allowNull: true, required: true
    },
    founder: {
        type: DataTypes.STRING, allowNull: true, required: true
    },
    animal: {
        type: DataTypes.STRING, allowNull: true, required: true
    },
    ghost: {
        type: DataTypes.STRING, allowNull: true, required: true
    },
    commonRoom: {
        type: DataTypes.STRING, allowNull: true, required: true
    }
},
    {
        sequelize: sequelizeInstance, modelName: 'houses', //use lowercase plural format
        timestamps: true, freezeTableName: true
    }
)

module.exports = House;