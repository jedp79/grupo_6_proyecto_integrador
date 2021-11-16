module.exports = (sequelize, dataTypes)=> {
    let alias = 'Products';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        price: {
            type: dataTypes.INTEGER
        },
        img: {
            type: dataTypes.STRING
        },
        category: {
            type: dataTypes.STRING
        },
        description: {
            type: dataTypes.STRING
        }
    }
    let config = {
        tableName: 'products',
        timestamps: false
    }
    const Product = sequelize.define(alias, cols, config);

    Product.associate = (models)=> {
        Product.belongsToMany(models.Users, {
            as: 'users',
            through: 'users_products',
            foreignKey: 'product_id',
            otherKey: 'user_id',
            timestamps: false
        });
    }

    return Product;
}