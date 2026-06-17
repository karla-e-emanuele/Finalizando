const userService = require("../service/user.service");


class userController {
    async getAllSites(req, res){
            const users = await userService.findAllService();
            res.json({message:"usuarios cadastrados", users})
    }
 
    async create(req, res){
            const users = await userService.create(req.body);
            res.json({message:"usuario cadastrado com sucesso!", users});
    }

    async findOneController(req, res){
        const users = await userService.findOne(req.params);
        res.json(users);
}

    async deleteController(req, res) {
        await userService.deleteService(req.params.id);
        res.json({ message: "usuario deletado"});
    }

    async editController(req, res){
        await userService.editService(req.body, req.params);
        res.json({ message: "editado com sucesso"}, users)
    }
}

module.exports = new userController();