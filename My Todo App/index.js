var express = require("express");
var bodyParser = require("body-parser");
var app = express();


app.use("/", function(req, res, next) {
    console.log("Request");
    console.log(req.url);
    console.log(req.method);
    next();
})


// todo_db = database used by the server
var todo_db = require("./seed.js");
console.log(todo_db);

// Serve static Assets in public directory
app.use("/", express.static(__dirname + "/public"));

app.use("/", bodyParser.urlencoded({ extended : false}));


// api/todos (GET Request)
// Returns a JSON object of all our todos

//API Part of the server
// 1. get all todos
app.get("/api/todos", function(req, res) {
    res.json(todo_db.todos);
})


// 2 . delete a todo (with some id)
// http://localhost:4000/todos/:id DELETE
app.delete("/api/todos/:id", function(req, res) {
    var del_id = req.params.id;   // id to be deleted
    var todo = todo_db.todos[del_id];

    //if this todo doesn't exist, send appropriate repsonse
    // if it exists, then delete it

    if(!todo)  // if todo doesn't exist
    {
        // if todo doesn't exist, then status code is set to 400, ie, bad request (read about this)
        res.status(400).json({error : "Todo doesn't exist"});
    }

    else
    {
        todo.status = todo_db.StatusENUMS.DELETED;
        res.json(todo_db.todos);   // sending the updates todo_db to the user after deletion
    }

});


app.post("/api/todos", function(req, res) {
    //Expect a title in the body of the request
    // in the x-www-form-urlencoded format
    //in the style
    //todo_title=<the new title>

    var todo = req.body.title;

    // if you don't send a todo title
    if(!todo || todo == "" || todo.trim() == "")
    {
        res.status(400).json({error : "Todo title cannot be empty"});

    }

    else
    {
        var new_todo_object = {
            title : req.body.title,
            status : todo_db.StatusENUMS.ACTIVE
        }
    }

    todo_db.todos[todo_db.next_todo_id++] = new_todo_object;
    res.json(todo_db.todos);

});


// 4. To change an object's title and status (modifying it)
app.put("/api/todos/:id", function(req, res) {
    var mod_id = req.params.id;
    var todo = todo_db.todos[mod_id];

    if(!todo)
    {
        res.status(400).json( { err : "Cannot modify a todo which doesn't exist"});
    }

    else
    {
        var todo_title = req.body.title;
        if(todo_title && todo_title != "" && todo_title.trim()!="")
        {
            todo.title = todo_title;
        }

        var todo_status = req.body.status;

        if(todo_status && (todo_status == todo_db.StatusENUMS.ACTIVE || todo_status == todo_db.StatusENUMS.COMPLETE))
        {
            todo.status = todo_status;
        }

        res.json(todo_db.todos);
    }
})


// 5. GET /api/todos/active
app.get("/api/todos/active", function(req, res) {
    var active_id = {};
    for(var i = 1; i < todo_db.next_todo_id; i++) {
        if(todo_db.todos[i].status === todo_db.StatusENUMS.ACTIVE)
        {
            active_id[i] = todo_db.todos[i];
            active_id[i].title = todo_db.todos[i].title;
            active_id[i].status = todo_db.todos[i].status;
        }
    }
    res.json(active_id);
})



// 6. GET /api/todos/complete
app.get("/api/todos/complete", function(req, res) {
    var complete_id = {};
    for(var i = 1; i < todo_db.next_todo_id; i++) {
        if(todo_db.todos[i].status === todo_db.StatusENUMS.COMPLETE)
        {
            complete_id[i] = todo_db.todos[i];
            complete_id[i].title = todo_db.todos[i].title;
            complete_id[i].status = todo_db.todos[i].status;
        }
    }
    res.json(complete_id);
})



// 7. GET /api/todos/deleted
app.get("/api/todos/deleted", function(req, res) {
    var deleted_id = {};
    for(var i = 1; i < todo_db.next_todo_id; i++) {
        if(todo_db.todos[i].status === todo_db.StatusENUMS.DELETED)
        {
            deleted_id[i] = todo_db.todos[i];
            deleted_id[i].title = todo_db.todos[i].title;
            deleted_id[i].status = todo_db.todos[i].status;
        }
    }
    res.json(deleted_id);
})



// 8. PUT /api/todos/complete/:id
app.put("/api/todos/complete/:id", function(req, res) {
    var id = req.params.id;
    var todo = todo_db.todos[id];

    if(!todo)
    {
        res.status(400).json( { err: "Todo doesn't exists"});
    }

    else
    {
        todo.status = todo_db.StatusENUMS.COMPLETE;
        res.json(todo_db.todos);
    }
})



// 9. PUT /api/todos/active/:id
app.put("/api/todos/active/:id", function(req, res) {
    var id = req.params.id;
    var todo = todo_db.todos[id];

    if(!todo)
    {
        res.status(400).json( { err: "Todo doesn't exists"});
    }

    else
    {
        todo.status = todo_db.StatusENUMS.ACTIVE;
        res.json(todo_db.todos);
    }
})


app.listen(4000);