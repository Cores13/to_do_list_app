const Todo = require('../models/todo');

var edit=false;
var ide;
var selected;
var url='';

//Home page
const home_index = async (req, res)=>{
    //find all, active and completed tasks
    const allTodo = await Todo.find();
    const activeTodo = await Todo.find({completed: false});
    const completedTodo = await Todo.find({completed: true});

    url = '';
    var count = activeTodo.length;
    var all = allTodo.length;
    var comp =completedTodo.length;
    edit=false;
    selected='all';
    res.render('index', {todo: allTodo, url: url, count: count, all:all, edit: edit, comp : comp, ide:ide, selected: selected});
}

//Active tasks tab
const active_index = async (req, res)=>{
    //find all, active and completed tasks
    const allTodo = await Todo.find();
    const activeTodo = await Todo.find({completed: false});
    const completedTodo = await Todo.find({completed: true});
    var count = activeTodo.length;

    url = '/active';
    var all = allTodo.length;
    var comp =completedTodo.length;
    edit=false;
    selected='active';
    res.render('index', {todo: activeTodo, url: url, count: count, all: all, edit: edit, comp: comp, ide:ide, selected: selected});
}

//Completed tasks tab
const completed_index = async (req, res)=>{
    //find all, active and completed tasks
    const completedTodo = await Todo.find({completed: true});
    const activeTodo = await Todo.find({completed: false});
    const allTodo = await Todo.find();

    url = '/completed';
    var count = activeTodo.length;
    var all = allTodo.length;
    var comp =completedTodo.length;
    edit=false;
    selected='completed';
    res.render('index', {todo: completedTodo, url: url, count: count, all: all, edit:edit, comp: comp, ide:ide, selected: selected});
}

//Editing on completed tab
const editing_completed = async(req, res)=>{
    //find all, active and completed tasks, and the task that needs to be changed
    const todoCh = await Todo.findById(req.params._id);
    const completedTodo = await Todo.find({completed: true});
    const activeTodo = await Todo.find({completed: false});
    const allTodo = await Todo.find();

    url='/completed';
    var count = activeTodo.length;
    var all = allTodo.length;
    var comp =completedTodo.length;
    ide = todoCh._id;
    edit=true;
    selected = 'completed';
    
    res.render('index', {todo: completedTodo, url: url, count: count, all: all, edit:edit, comp: comp, ide:ide, selected: selected});
}

//Editing on active tab
const editing_active = async(req, res)=>{
    //find all, active and completed tasks, and the task that needs to be changed
    const todoCh = await Todo.findById(req.params._id);
    const activeTodo = await Todo.find({completed: false});
    const allTodo = await Todo.find();
    const completedTodo = await Todo.find({completed: true});
    
    url = '/active';
    var count = activeTodo.length;
    var all = allTodo.length;
    var comp =completedTodo.length;
    ide = todoCh._id;
    edit=true;
    selected='active';

    res.render('index', {todo: activeTodo, url: url, count: count, all: all, edit: edit, comp: comp, ide:ide, selected: selected});
}

//Editing on All tab
const editing = async(req, res)=>{
    //find all, active and completed tasks, and the task that needs to be changed
    const todoCh = await Todo.findById(req.params._id);
    const allTodo = await Todo.find();
    const activeTodo = await Todo.find({completed: false});
    const completedTodo = await Todo.find({completed: true});
    
    url = '';
    var count = activeTodo.length;
    var all = allTodo.length;
    var comp =completedTodo.length;
    ide = todoCh._id;
    edit=true;
    selected='all';
    
    res.render('index', {todo: allTodo, url: url, count: count, all:all, edit: edit, comp : comp, ide:ide, selected: selected});
}

//Create new task
const todo_create = (req,res) =>{
    edit=false;
    //store content of input form
    const {todo} = req.body;
    //create new task and store content in it
    const newTodo = new Todo({todo})
    newTodo.save()
        .then((result) =>{
            res.redirect('back');
        })
        .catch((err) =>{
            console.log(err)
        });
}

//Delete task
const todo_delete = (req, res)=>{
    edit=false;
    //store id of task that needs to be deleted
    const {_id} = req.params;
    //delete task with that id
    Todo.deleteOne({_id})
    .then(()=>{
        res.json({redirect: url});
    })
    .catch((err)=>{
        console.log(err);
    });
}

//Checkbox handler
const todo_check = async(req, res)=>{
    //find one that was checked or unchecked and change its value to opposite
    const todo = await Todo.findById(req.params._id);
    Todo.updateOne({_id: todo._id},{completed: !todo.completed}, function (err, res){
        if(err) throw err;
    });
    edit=false;
    res.json({redirect: url});
}

//Delete completed tasks
const todo_clear_completed = (req, res)=>{
    edit=false;
    //delete all that are true
    Todo.deleteMany({completed : true})
    .then(()=>{
        res.json({redirect: url});
    })
    .catch((err)=>{
        console.log(err);
    });
}

//Change task
const todo_change = async (req, res)=>{
    //store input value
    var data = req.params.todo;
    const id = req.params._id;    
    //change task
    await Todo.updateOne({_id: id},{todo: data}, function (err, res){
        if(err) throw err;
    });
    edit=false;
    res.json({redirect: url});
}

//Toggle-all 
const todo_toggle_all = async (req, res) =>{
    edit=false;
    //change all tasks
    Todo.updateMany({completed: false},{completed: true}, function (err, res){
        if(err) throw err;
    });
    //redirect
    res.json({redirect: url});
}

module.exports = {
    completed_index,
    home_index,
    active_index,
    todo_create,
    todo_delete,
    todo_check,
    todo_clear_completed,
    todo_change,
    todo_toggle_all,
    editing_completed,
    editing_active,
    editing,
}