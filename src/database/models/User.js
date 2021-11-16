module.exports = (Sequelize, DataTypes) => {
    let alias = 'Users';
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        cart: {
            type: DataTypes.INTEGER
        }
    }
    let config = {
        tableName: 'users',
        timestamps: false,
    }

    let User = Sequelize.define(alias, cols, config);

    User.associate = (models)=> {
        User.belongsToMany(models.Products, {
            as: 'products',
            through: 'users_products',
            foreignKey: 'user_id',
            otherKey: 'product_id',
            timestamps: false
        });
    }

    return User;
}