const router = require('express').Router();


// import middlewares
const {checkContentType, checkAuthorization, checkBody} = require('../../utils/checkRequest');
const toCheck_usersSignUp = ['name','email','password']
const toCheck_usersSignIn = ['email','password']

// import models
const { signUpUsers, signInUsers } = require('../../models/users')


// Signup
async function usersSignUp (req, res){
    try{
        const email = req.body.email
        const name = req.body.name
        const password = req.body.password
        const last_updated = new Date()
    
        const userData = await signUpUsers (name, email, password, last_updated)
    
        return res.status(200).json({data:userData})

    } catch (err) {
        console.log(err)

        if (err.message === 'Invalid email'){
            return res.status(403).json({error: 'Invalid email'});
        }

        if (err.message === "Email already existed"){
            return res.status(409).json({error: "Email already existed"});
        }

        // Handle other unexpected errors
        return res.status(500).json({error: 'Internal Server Error'});

    }

}

// Signin
async function usersSignIn(req, res) {
    try {
        const { email, password } = req.body;
        const userData = await signInUsers(email, password);
        return res.status(200).json({ data: userData });
    } catch (err) {
        // For production, consider logging less detailed info.
        console.error("Error during sign-in:", err.message);

        if (err.message === 'User not found' || err.message === "Invalid password") {
            return res.status(401).json({ error: err.message });
        }

        // Handle other unexpected errors
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}





router.post('/signup', checkContentType(),  checkBody(toCheck_usersSignUp), usersSignUp);
router.post('/signin', checkContentType(),  checkBody(toCheck_usersSignIn), usersSignIn);

module.exports = router