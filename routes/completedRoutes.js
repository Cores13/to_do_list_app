const express= require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

//Routes
router.get('/',todoController.completed_index);
router.get('/editing/:_id',todoController.editing_completed);
router.post('/new-todo', todoController.todo_create);
router.delete('/delete/:_id', todoController.todo_delete);
router.put('/check/:_id', todoController.todo_check);
router.delete('/clear-completed', todoController.todo_clear_completed);
router.put('/change/:_id/:todo', todoController.todo_change);
router.get('/toggle-all', todoController.todo_toggle_all); //PUT REQ

module.exports = router;