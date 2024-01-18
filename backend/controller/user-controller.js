const express = require('express');
const userService = require('../service/user-service');
const router = express.Router();

const userValidator = require('../validator/user-validator');

router.get("/:id", async(req, res) => {
    const response = await userService.getUserResponse(req.params.id);

    res.status(response.status).json(response.data);
})

router.put('/:id/firstName',
    userValidator.validateFirstName,
    async (req, res) => {
        const response = await userService.updateUserFirstName(
            req.params.id,
            req.body.firstName
        )

        res.status(response.status).json(response.data)
})

router.put('/:id/email',
    userValidator.validateEmail,
    async (req, res) => {
        const response = await userService.updateUserEmail(
            req.params.id,
            req.body.email
        )

        res.status(response.status).json(response.data)
})

module.exports = router;