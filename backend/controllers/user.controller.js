const { User } = require("../models/user");


const UserController = {
    getUsers: async (req, res) => {
        try {
            const allUser = await User.find();
            res.status(200).json({ message: 'Fetch data successfully!', data: allUser });
        } catch (error) {
            console.log(error.message);
        }
    },
    addUser: async (req, res) => {
        try {
            const userExist = await User.findOne({email: req.body.email});
            if(userExist) {
                return res.status(403).json({ message: 'User already exists!'});
            };

            const newUser = await User.create(req.body);
            res.status(200).json({ message: 'Added user successfully!'});
        } catch (error) {
            console.log(error.message);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            // const deletedUser = await User.findByIdAndDelete(id);
            res.status(200).json({message: 'User deleted successfully', id});
        } catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = UserController;