const{ UserMongoDB, UserMySQL} = require('../models/userModel');

const UserDTO = require('../dto/userDto');


exports.createUser = async (req, res) => {
    try {
        // Create a UserDTO instance from request body
        const userDTO = new UserDTO(req.body);

        // Create a new MongoDB user with the DTO data
        const mongoUser = new UserMongoDB(userDTO);

        // Save the MongoDB user and await the result
        const savedMongoUser = await mongoUser.save();
       console.log(savedMongoUser._id.toString())
        // Create a new MySQL user using the MongoDB user's details
        const mySQLUser = await UserMySQL.create({
            id_mongo: savedMongoUser._id.toString(),
            name: savedMongoUser.name,
            surname: savedMongoUser.surname,
            age: savedMongoUser.age,
            email: savedMongoUser.email
        });
        

        // Send response with MongoDB user and success status
        res.status(201).json({ ok: true, user: savedMongoUser });
    } catch (error) {
        // Handle errors and send error response
        res.status(500).json({ ok: false, message: 'Error creando el usuario', error });
    }
};



exports.getUser = async (req, res) => {
    try {
        const user = await UserMongoDB.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario', error });
    }
};



exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    const updateData = req.body;

    try {
        // Update MongoDB
        const mongoUpdate = UserMongoDB.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true }).exec();
        
        // Update MySQL
        const mysqlUpdate = UserMySQL.update(
            {
                name: updateData.name,
                surname: updateData.surname,
                age: updateData.age,
                email: updateData.email
            },
            {
                where: { id_mongo: userId }
            }
        );

        const [mongoUser, mysqlResult] = await Promise.all([mongoUpdate, mysqlUpdate]);

        if (!mongoUser) {
            return res.status(404).json({ message: 'Usuario no encontrado en MongoDB' });
        }

        if (mysqlResult[0] === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado en MySQL' });
        }

        res.status(200).json({ message: 'Usuario actualizado con éxito en ambas bases de datos', user: mongoUser });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario', error });
    }
};



exports.deleteUser = async (req, res) => {
    try {
        const user = await UserMongoDB.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario', error });
    }
};
