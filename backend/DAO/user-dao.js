const UserModel = require('../model/User')

module.exports = {
    list: async function() {
        return await UserModel.findAndCountAll();
    },

    create: async function(firstName, email, isEditor, canEditFirstName, canEditEmail) {
        const newUser = await UserModel.create({
            firstName: firstName,
            email: email,
            isEditor: isEditor,
            canEditFirstName: canEditFirstName,
            canEditEmail: canEditEmail
        });

        return newUser;
    },

    updateFirstName: async function(id, firstName) {
        return await UserModel.update(
            {
                firstName: firstName,
            }, {
                where: { id: id }
            }
        );
    },

    updateEmail: async function(id, email) {
        return await UserModel.update(
            {
                email: email,
            }, {
                where: { id: id }
            }
        );
    },

    getById: async function(id) {
        return await UserModel.findByPk(id);
    },

    getByFirstName: async function(firstName) {
        return await UserModel.findOne({where: {firstName: firstName}})
    }
}