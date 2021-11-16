module.exports = (Sequelize, DataTypes) => {
    let alias = 'UserProduct';
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER
        },
        product_id: {
            type: DataTypes.INTEGER
        }
    }
    let config = {
        tableName: 'users_products',
        timestamps: false,
    }

    let UserProduct = Sequelize.define(alias, cols, config);
    return UserProduct;
}