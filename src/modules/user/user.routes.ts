import { Router } from "express";
import { UserController } from "./user.controller.js";
import auth from "../../middleware/auth.js";


const router = Router()


router.post('/',UserController.createUser)
router.get('/',auth(),UserController.getAllUser )
router.get('/:id', UserController.getSingleUser)
router.put("/:id",UserController.UpdateUser );
router.delete("/:id",UserController.deleteUser)

// profile





export const userRoute = router