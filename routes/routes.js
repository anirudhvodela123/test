module.exports = app => {
    const controler = require('../controler/controler')
    const verify = require('../Auth/authorization')

    app.get("/getBrandData",verify, controler.getBrandData);
    app.post("/addbrands",verify, controler.addbrands)
    app.post('/insertUser',verify, controler.InsertUserDetails)
    app.get('/getUser', verify, controler.GetUserDetails)
    app.post('/editUser',verify, controler.EditUserDetails)
    app.delete('/deleteUser',verify, controler.DeleteUserDetails)

    app.post('/signup', controler.signUp)
    app.post('/login', controler.login)
}