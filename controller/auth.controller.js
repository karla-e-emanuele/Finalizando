const authService = require('../service/jwt.service');

class authController {

    async authController(req, res) {
        const token = await authService.auth(req.body)
        res.status(200).json({ token });
    }

}

module.exports = new authController();