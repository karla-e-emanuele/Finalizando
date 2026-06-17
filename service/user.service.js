const userModel = require("../models/user.model");


class userService {
    async findAllService(){
            return await userModel.findAll() 
        }

        async create(data) {
            return await userModel.create(data)
        }

        async findOneService(id) {
            return await userModel.findOne(id)
        }


        async deleteService(id) {

        return await userModel.destroy({
        where: { id: id }
        });
    }
    
    async editService(id, data) {
        return await userModel.update(data, {
        where: { id }
        });
    }
    

};
   

module.exports = new userService();