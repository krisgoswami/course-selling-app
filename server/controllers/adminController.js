import Admin from '../models/adminModel.js';

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
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error registering admin',
            success: false,
            error,
        });
    }
}