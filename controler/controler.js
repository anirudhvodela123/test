const Schema = require('../model')
bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),

    exports.getBrandData = async (req, res) => {
        try {
            return res.json(await Schema.brandname.find())
        } catch (error) {
            res.json(error)
        }
    }

exports.addbrands = async (req, res) => {
    const { brandname } = req.body;
    try {
        const newData = new Schema.brandname({ brandname })
        await newData.save()
        return res.json(newData)
    } catch (error) {
        return res.json(error)
    }
}
exports.InsertUserDetails = async (req, res) => {

    const { firstName, lastName, gender, mobileNumber } = req.body;
    try {
        const userDetails = await new Schema.userdetailss({ firstName, lastName, gender, mobileNumber })
        await userDetails.save()
        return res.json({ message: "suceessfully Saved!" })
    } catch (error) {
        return res.json(error)
    }
}
exports.GetUserDetails = async (req, res) => {
    try {
        let response = await Schema.userdetailss.find({})
        return await res.json(response)
    } catch (error) {
        return res.json(error)
    }
}

exports.EditUserDetails = async (req, res) => {
    const { _id, lastName } = req.body
    try {
        const response = await Schema.userdetailss.findById(_id)
        response.lastName = lastName;
        await response.save();

        return await res.json({ message: "Sucessfully Updated", response: response })
    } catch (error) {
        return res.json(error)
    }
}
exports.DeleteUserDetails = async (req, res) => {
    const { _id } = req.body
    try {
        const response = await Schema.userdetailss.deleteOne({ _id: _id })
        return res.json(response)
    } catch (error) {
        return res.json(error)
    }
}

exports.signUp = async (req, res) => {
    const { email, password } = req.body
    try {
        let hash_password = await bcrypt.hashSync(password, 10);
        const response = await Schema.Login({ email: email, password: hash_password })
        await response.save()
        return res.json({ message: "Sucessfully saved!", response: response })
    } catch (error) {
        return res.json(error)
    }
}
exports.login = async (req, res) => {
    const { email, password } = req.body
    let MailExist = await Schema.Login.findOne({ email: email })
    if (MailExist) {
        await bcrypt.compare(password, MailExist.password, function (err, result) {
            if (result) {
                return res.json({
                    token: jwt.sign({ _id: MailExist._id }, 'secretekey', { expiresIn: "1h" }),
                    userData: MailExist
                });
            } else {
                return res.json({ message: "Entered Password Incorrect" })
            }
        });

    } else {
        return res.json({ message: "User Does not Exist" })
    }
}