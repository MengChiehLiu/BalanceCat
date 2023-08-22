const router = require('express').Router();

// import middlewares
const {checkContentType, checkAuthorization, checkBody} = require('../../utils/checkRequest');
const toCheck_goalSet = ['amount','subject_id']
const toCheck_goalUpdate = ['amount']

// import models
const {setGoal,updateGoal,deleteGoal,getGoal} = require('../../models/goals.js')


// set goals
async function goalSet (req, res) {
    try {
        const user_id = req.user.id;
        const subject_id = req.body.subject_id;
        const amount = req.body.amount;
    
        const goal_id = await setGoal(user_id, subject_id, amount);
        return res.status(200).json({data:{goal:{id:goal_id}}});

    } catch (err) {
        console.error(err);

        // Check if the error is because the goal already exists
        if (err.message === "Goal already existed") {
            return res.status(403).json({error: 'Goal already existed'});
        }

        // Handle other unexpected errors
        return res.status(500).json({error: 'Internal Server Error'});
    }
}

// update goals
async function goalUpdate (req, res) {
    try {
        const user_id = req.user.id;
        const id = req.params.id; // Retrieve id from URL params
        const amount = req.body.amount;
    
        const goal_id = await updateGoal(id, user_id, amount); // Using the updateGoal function
        return res.status(200).json({data:{goal:{id:goal_id}}});

    } catch (err) {
        console.error(err);

        // Check specific error messages and respond accordingly
        if (err.message === "No rows were updated") {
            return res.status(404).json({error: 'No goal found with the provided id'});
        }
        // Handle other unexpected errors
        return res.status(500).json({error: 'Internal Server Error'});
    }
}

// delete goals
async function goalDelete (req, res) {
    try {
        const user_id = req.user.id;
        const id = req.params.id; // Retrieve id from URL params
    
        const goal_id = await deleteGoal(id, user_id);
        return res.status(200).json({data:{goal:{id:goal_id}}});

    } catch (err) {
        console.error(err);

        // Check specific error messages and respond accordingly
        if (err.message === "No rows were deleted") {
            return res.status(404).json({error: 'No goal found with the provided id'});
        }
        // Handle other unexpected errors
        return res.status(500).json({error: 'Internal Server Error'});
    }
}

// get goals
async function goalGet (req, res) {
    try {
        const user_id = req.user.id;
        const startyear =parseInt(req.query.startyear);
        const endyear = parseInt(req.query.endyear);
        // console.log("req.query:", req.query);
        // console.log(typeof startyear, typeof endyear);


    
        const data = await getGoal(user_id, startyear, endyear);
        return res.status(200).json(data);

    } catch (err) {
        console.error(err);
        return res.status(500).json({error: 'Internal Server Error'});
    }
}






router.post('/', checkAuthorization, checkContentType(), checkBody(toCheck_goalSet), goalSet);
router.put('/:id', checkAuthorization, checkContentType(), checkBody(toCheck_goalUpdate),  goalUpdate);
router.delete('/:id', checkAuthorization, checkContentType(),  goalDelete);
router.get('/', checkAuthorization,  goalGet);

module.exports = router;


