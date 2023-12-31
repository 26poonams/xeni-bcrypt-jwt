const UserModel = require('../model/user')

// Retrieve all users from the database.
exports.findAll = async (req, res) => {
    try {
        const user = await UserModel.find({},{password:0});
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// Find a single User with an id
exports.findOne = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id,{password:0});
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};

// Delete a user with the specified id in the request
exports.destroy = async (req, res) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id);
        if(!user)throw new Error("user doesn't exists")
        res.status(200).json({message:"User deleted successfully"});
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};

// Update a user by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    
    await UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `User not found.`
            });
        }else{
            res.send({ message: "User updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};