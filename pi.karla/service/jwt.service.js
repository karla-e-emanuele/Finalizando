const { generateToken } = require('../utils/jwt');
const User = require('../models/user.model');

class jwtService {

    async auth(payload) {
        const user = await User.findOne({ 
            where: { 
              email: payload.email, 
              password: payload.password 
            } 
          });
          

        if (!user) {
            throw new Error('User not found');
        }
        return generateToken(payload)
    }

}

module.exports = new jwtService();