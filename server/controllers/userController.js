const{ UserMongoDB, UserMySQL} = require('../models/userModel');

const UserDTO = require('../dto/userDto');


exports.createUser = async (req, res) => {
    try {
        const userDTO = new UserDTO(req.body);
        const user = new UserMongoDB(userDTO);
        await user.save();
        res.status(201).json({ ok: true, user });
    } catch (error) {
        res.status(500).json({ ok: false, message: 'Error creando el usuario', error });
    }
};

exports.createUserSql = async (req, res) => {
    try {
        const userDTO = new UserDTO(req.body);
        const user = await UserMySQL(userDTO);
        res.status(201).json({ ok: true, user });
    } catch (error) {
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
    try {
        const user = await UserMongoDB.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario actualizado con éxito', user });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario', error });
    }
};
exports.updateUserSql= async (req, res) => {
    try {
        const user = await UserMySQL.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario actualizado con éxito', user });
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
