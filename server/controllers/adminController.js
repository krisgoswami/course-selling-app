import { Admin } from "../models/adminModel.js";
import { authenticateJwt } from "../utils/jwtAuth.js";

// *********admin registration*********

export const createAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        //validations
        if (!email || !password) {
            return res.status(400).send({
                message: 'fill all fields',
                success: false,
            });
        }

        //validation for existing admin
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).send({
                message: 'admin already exists',
                success: false
            })
        }

        //saving admin to the database
        const admin = new Admin({
            email: email,
            password: password,
        });
        await admin.save();
        const token = jwt.sign({ email, role: 'admin' }, process.env.SECRET, { expiresIn: '1h' });
        return res.status(200).send({
            message: 'Admin registered',
            success: true,
            admin,
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error registering admin',
            success: false,
            error,
        });
    }
}