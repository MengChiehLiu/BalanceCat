const router = require('express').Router();
const multer = require('multer');
const path = require('path');




// import middlewares
const {checkContentType, checkAuthorization, checkBody} = require('../../utils/checkRequest');
const toCheck_usersSignUp = ['name','email','password']
const toCheck_usersSignIn = ['email','password']

// import models
const { signUpUsers, signInUsers, updateUserPicture } = require('../../models/users')


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
      const userId = req.headers.authorization;
  
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
  
      const picturePath = req.file.path.replace('public/', '');
      const protocol = req.protocol;  // 通常是 'http' 或 'https'
      const host = req.get('host');   // 獲取主機名，例如 '127.0.0.1:3000'
      const serverUrl = `${protocol}://${host}`;
      const pictureUrl = `${serverUrl}/images/${path.basename(picturePath)}`;
  
      await updateUserPicture(userId, pictureUrl);
  
      res.status(200).json({ data: { picture: pictureUrl } });
    } catch (error) {
      console.error('Error updating user picture:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  }

  
  
  
  
  
  





router.post('/signup', checkContentType(),  checkBody(toCheck_usersSignUp), usersSignUp);
router.post('/signin', checkContentType(),  checkBody(toCheck_usersSignIn), usersSignIn);
router.put('/picture', usersPictureUpdate);

module.exports = router