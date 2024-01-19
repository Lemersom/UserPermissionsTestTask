const userDAO = require('../DAO/user-dao');

function fetchPermissions(user) {
    let profilePermission = "",
        firstNamePermission = "",
        emailPermission = "";

        if(user.isEditor) {
            profilePermission = "user:profile:edit";
            firstNamePermission = "user:profile:firstname:edit";
            emailPermission = "user:profile:email:edit";
        } else {
            profilePermission = "user:profile:view";
            if(user.canEditFirstName) {
                firstNamePermission = "user:profile:firstname:edit";
            } else {
                firstNamePermission = "user:profile:firstname:view";
            }

            if(user.canEditEmail) {
                emailPermission = "user:profile:email:edit";
            } else {
                emailPermission = "user:profile:email:view";
            }
        }

    return {profilePermission, firstNamePermission, emailPermission}
}

module.exports = {
    getUserResponse: async function(id) {
        const user = await userDAO.getById(id);
        
        if(user) {
            const {profilePermission, firstNamePermission, emailPermission} = fetchPermissions(user)

            const data = {
                user: {
                    firstname: user.firstName,
                    email: user.email
                },
                permissions: [
                    profilePermission, 
                    firstNamePermission, 
                    emailPermission
                ]
            }
        
            return { status: 200, data: data }
        }
        
        return { status: 500, data: "Cannot find the User" }
    },

    updateUserFirstName: async function(id, firstName) {
        const user = await userDAO.getById(id);

        if(user) {
            if(user.isEditor || user.canEditFirstName) {
                const newUser = await userDAO.updateFirstName(id, firstName);

                return { status: 200, data: "First Name was successfully updated." }
            } else {
                return { status: 403, data: "You don't have the permission to update the First Name." }
            }
        }

        return { status: 500, data: "Cannot find the User" }
    },

    updateUserEmail: async function(id, email) {
        const user = await userDAO.getById(id);

        if(user) {
            if(user.isEditor || user.canEditEmail) {
                const newUser = await userDAO.updateEmail(id, email);

                return { status: 200, data: "Email was successfully updated." }
            } else {
                return { status: 403, data: "You don't have the permission to update the Email." }
            }
        }

        return { status: 500, data: "Cannot find the User" }
    },

    getUserByFirstName: async function(firstName) {
        const user = await userDAO.getByFirstName(firstName);

        if(user) {
            return { status: 200, data: user};
        }

        return { status: 500, data: "Cannot find the User" }
    },

    listUsers: async function() {
        const users = await userDAO.list();

        if(users) {
            return { status: 200, data: users}
        }

        return { status: 500, data: "Cannot find Users" }
    },

    createUser: async function(firstName, email, isEditor, canEditFirstName, canEditEmail) {
        if(isEditor) {
            canEditFirstName = true;
            canEditEmail = true;
        }

        const newUser = await userDAO.create(firstName, email, isEditor, canEditFirstName, canEditEmail);

        return { status: 201, data: newUser }
    }
}