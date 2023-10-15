const UserController = require('../controllers/user.controller');
const middlewareController = require('../middleware/auth.middleware');

const router = require('express').Router();

router.get('/', UserController.getUsers);

router.post("/create", UserController.addUser);

router.delete("/:id", middlewareController.verifyTokenAndAdmin, UserController.deleteUser);


module.exports = router;