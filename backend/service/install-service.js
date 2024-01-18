const sequelize = require('../helper/database');
const userService = require('../service/user-service');

module.exports = {
    install: async function() {
        await sequelize.sync({force: true});

        // is not a Editor, cannot edit first name, cannot edit email
        const user1 = await userService.createUser("John", "john@email.com", false, false, false);

        // is a Editor, cannot edit first name, cannot edit email 
        // (but since he is a editor he will able to edit the first name and email)
        const user2 = await userService.createUser("Paul", "paul@email.com", true, false, false);

        // is a Editor, can edit first name, cannot edit email 
        // (but since he is a editor he will able to edit the first name and email)
        const user3 = await userService.createUser("George", "george@email.com", true, true, false);

        // is a Editor, can edit first name, can edit email 
        const user4 = await userService.createUser("Ringo", "ringo@email.com", true, true, true);

        // is not a Editor, cannot edit first name, can edit email 
        const user5 = await userService.createUser("Liam", "liam@email.com", false, false, true);

        // is not a Editor, can edit first name, can edit email 
        const user6 = await userService.createUser("Noel", "noel@email.com", false, true, true);
    }
}