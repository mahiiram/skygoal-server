import { Router } from "express";


const router = Router()

import { Auth } from "../middleware/auth.js";
import * as usercontroller from "../controller/UserController.js"


router.route('/register').post(usercontroller.UserRegister)
router.route('/login').post(usercontroller.userLogin)

router.route('/getuser').get(Auth,usercontroller.getuser)
router.route('/updateuser').put(Auth,usercontroller.updateUser) 

export default router;