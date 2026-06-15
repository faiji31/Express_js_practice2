import { Router } from "express";
import { UserController } from "./user.controller.js";


const router = Router()


router.post('/',UserController.createUser)
router.get('/',UserController.getAllUser )
router.get('/:id', UserController.getSingleUser)
router.put("/:id",UserController.UpdateUser );
router.delete("/:id",UserController.deleteUser)




export const userRoute = router