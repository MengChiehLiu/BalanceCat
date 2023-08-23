const router = require('express').Router();
const multer = require('multer');
const path = require('path');
require('dotenv').config();



// import middlewares
const {checkContentType, checkAuthorization, checkBody} = require('../utils/checkRequest');
const toCheck_usersSignUp = ['name','email','password']
const toCheck_usersSignIn = ['email','password']
const toCheck_memo = ['title', 'content']

// import models
const { signUpUsers, signInUsers, updateUserPicture, updateUserMemo, getUserInfo } = require('../models/users')


// Signup
async function usersSignUp (req, res){
    try{
        const email = req.body.email
        const name = req.body.name
        const password = req.body.password

        console.log([email, name, password])
    
        const userData = await signUpUsers (name, email, password)
    
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

// Picture

// 設定檔案儲存的目錄和檔案名稱
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const fileName = `${Date.now()}${ext}`; // 檔案名稱，這裡使用時間戳記加上原始檔案的副檔名
      cb(null, fileName);
    }
  });
  
// 建立 multer middleware
const upload = multer({ storage: storage });


async function usersPictureUpdate(req, res) {
    try {
      const userId = req.user.id;
  
      await new Promise((resolve, reject) => {
        // 執行圖片上傳
        const uploadMiddleware = upload.single('picture');
        uploadMiddleware(req, res, function (err) {
          if (err instanceof multer.MulterError) {
            // 檔案上傳錯誤
            console.error('Multer Error:', err);
            reject(err);
          } else if (err) {
            // 其他錯誤
            console.error('Error:', err);
            reject(err);
          }
          resolve();
        });
      });
  
      const protocol = req.protocol;  // 通常是 'http' 或 'https'
      const host = process.env.BACKEND_HOST;   // 獲取主機名，例如 '127.0.0.1:3000'
      const serverUrl = `${protocol}://${host}`;
      const pictureUrl = `${serverUrl}/api/1.0/images/${path.basename(req.file.path)}`;
  
      await updateUserPicture(userId, pictureUrl);
  
      res.status(200).json({ data: { picture: pictureUrl } });
    } catch (error) {
      console.error('Error updating user picture:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  }

  
async function usersMemoUpdate(req, res) {
    try{
      const user_id = req.user.id;
      const {title, content} = req.body;

      await updateUserMemo(user_id, title, content)
      return res.status(200).json({ data: { user: {id: user_id} } });

    }catch(err){
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }


async function usersGetInfo(req, res) {
    try{
      const user_id = req.user.id;

      const info = await getUserInfo(user_id)
      return res.status(200).json({ data: { user: info } });

    }catch(err){
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }



router.post('/signup', checkContentType(),  checkBody(toCheck_usersSignUp), usersSignUp);
router.post('/signin', checkContentType(),  checkBody(toCheck_usersSignIn), usersSignIn);
router.put('/picture', checkAuthorization, usersPictureUpdate);
router.put('/memo', checkAuthorization, checkContentType(), checkBody(toCheck_memo), usersMemoUpdate);
router.get('/', checkAuthorization, usersGetInfo);

module.exports = router