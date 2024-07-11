import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { cloudinary } from "../config/storage.js";

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
            return res.status(400).send({ message: "Email already exists." });
        }
        
        const hash = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hash,
            reputation: "0",
            global_role: "user",
            avatar: {url: "https://res.cloudinary.com/dkloacrmg/image/upload/v1718356119/forum_proj/lsagd5cdoytlslyi0fwq.jpg", public_id: "forum_proj/lsagd5cdoytlslyi0fwq"}
        });
        await newUser.save();

        res.status(201).send({
            message: "User has been created.",
            data: newUser,
        });
    } catch (error) {
        console.error(error.message);
        res.status(res.statusCode).send({ message: error.message });
    }
};

const signin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).send({ message: "User does not exist." });
        } 

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
            return res.status(400).send({ message: "Password didn't match." });
        }

        res.status(200).send({
            message: "Login successful.",
            data: user,
        });
    } catch (error) {
        console.error(error.message);
        res.status(res.statusCode).send({ message: error.message });
    }
};

const uploadAvatar = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({ message: "User does not exist." });
        }

        if (user.avatar.public_id) {
            await cloudinary.uploader.destroy(user.avatar.public_id);
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'avatars',
        });

        user.avatar = {
            url: result.secure_url,
            public_id: result.public_id,
        };
        await user.save();

        return res.status(200).send({
            message: "Avatar uploaded successfully.",
            data: user,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(res.statusCode).send({ message: error.message });
    }
}

export { signup, signin, uploadAvatar }