// Defining constants
const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const ACTIVE_TODOS_LIST_ID = "active_todos_list_div";
const COMPLETE_TODOS_LIST_ID = "complete_todos_list_div";
const DELETED_TODOS_LIST_ID = "deleted_todos_list_div";
const NEW_TODO_INPUT_ID = "new_todo_input";


// To display the todos in their respective sections, i.e., Active, Complete and Deleted
function addTodoElements(id, todos_data_json)
{
    // Parsing the JSON data
    var todos = JSON.parse(todos_data_json);

    // for active todos
    var active_parent = document.getElementById(id);

    // for complete todos
    var complete_parent = document.getElementById(COMPLETE_TODOS_LIST_ID);

    // for deleted todos
    var deleted_parent = document.getElementById(DELETED_TODOS_LIST_ID);

    active_parent.innerHTML = "";
    complete_parent.innerHTML = "";
    deleted_parent.innerHTML = "";

    // For each of the keys, createTodoElement is called
    Object.keys(todos).forEach(
        function(key)
        {
            // creating todo element
            var todo_element = createTodoElement(key, todos[key]);

            if(todos[key].status == "ACTIVE")
            {
                active_parent.appendChild(todo_element);
            }

            else if(todos[key].status == "COMPLETE")
            {
                complete_parent.appendChild(todo_element);
            }

            else if(todos[key].status == "DELETED")
            {
                deleted_parent.appendChild(todo_element);
            }

        }
    )
}


// Creating a new todo object
function createTodoElement(id, todo_object)
{
    var todo_element = document.createElement("div");        // creating a div element

    var text_element = document.createElement("div");
    text_element.innerText = todo_object.title;
    text_element.setAttribute("class", "child");
    todo_element.appendChild(text_element);

    todo_element.setAttribute("data-id", id);
    todo_element.setAttribute("class", "parent todoStatus" + todo_object.status);

    // if status = "ACTIVE" || "COMPLETE", then create a checkbox
    if(todo_object.status == "ACTIVE" || todo_object.status == "COMPLETE")
    {
        var newCheckbox = document.createElement("checkbox");
        newCheckbox.type = "checkbox";
        newCheckbox.id = id;
        newCheckbox.setAttribute("class", "child");

        // Adding a span element to checkbox (for glyphicon)
        var checkSpan = document.createElement("span");
        checkSpan.setAttribute("class", "fa fa-check-circle");
        newCheckbox.appendChild(checkSpan);

        // Adding event to the checkbox (when the checkbox is checked)
        newCheckbox.addEventListener("click",function() {
            completeTodoAJAX(todo_object.status,id);
        });

        // Append the checkbox before the name of the active todo
        todo_element.insertBefore(newCheckbox, todo_element.firstChild);
    }


    // If status != "DELETED", create a button to mark the todo as "DELETED"
    if(todo_object.status != "DELETED")
    {
        var newButton = document.createElement("button");
        newButton.setAttribute("class", "icon-button child");
        newButton.setAttribute("onclick", "deleteTodoAJAX("+id+")");   // to be implemented

        // Creating a span element (to add "trash" glyphicon)
        var buttonSpan = document.createElement("span");
        buttonSpan.setAttribute("class", "fa fa-trash-o fa-lg");
        newButton.appendChild(buttonSpan);

        // Appending the glyphicon to the button
        todo_element.appendChild(newButton);
    }

    return todo_element;
}


// Function called on body onload (see index.html)
function getTodosAJAX()
{
    // this object lets you make request to server AJAX type (xml http request object)
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/todos", true);  // true : means to do this asynchronously
                                          // GET request from the server for all the todos

    // this code will be executed after the response
    xhr.onreadystatechange = function() {
        if(xhr.readyState == RESPONSE_DONE)     // If response has been received
        {
            if(xhr.status == STATUS_OK)         // If Response is okay (ie, Status code == 200)
            {
                console.log(xhr.responseText);
                addTodoElements(ACTIVE_TODOS_LIST_ID, xhr.responseText);
            }
        }
    }
    xhr.send(data=null);
}


// This function is called when a new todo is added using the '+' button from Add Todos Section
function addTodoAjax()
{
    // Extracting the value of the textbox (entered by the user)
    var title = document.getElementById(NEW_TODO_INPUT_ID).value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/todos", true);

    // this means that data in the body will be of the form "application/x-www-form-urlencoded"
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    var data = "title=" + encodeURI(title);

    xhr.onreadystatechange = function() {
        if(xhr.readyState == RESPONSE_DONE)
        {
            if(xhr.status == STATUS_OK)    // Server returns updated list of all todos
            {
                addTodoElements(ACTIVE_TODOS_LIST_ID, xhr.responseText);
            }
            else
            {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);

    // To set the value of the placeholder of the textbox back to default fater adding the new todo
    document.getElementById(NEW_TODO_INPUT_ID).value = "";
}


// When clicked on the checkbox of Active todo, the todo should be moved to the Complete Todo list
// and when clicked on the checkbox of Completed todo, the todo should be moved to the Active Todo list
function completeTodoAJAX(todo_status,id)
{
    console.log("Status is:" + todo_status);
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/api/todos/"+id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    if(todo_status == "ACTIVE")       // If status is Active, change it to Complete
    {
        data = "status=COMPLETE";
        console.log("in active");
    }

    else if(todo_status == "COMPLETE")   // If status is Complete, change it to Active
    {
        data = "status=ACTIVE";
        console.log("in complete");
    }

    xhr.onreadystatechange = function () {
        if(xhr.readyState == RESPONSE_DONE)
        {
            if(xhr.status == STATUS_OK)       // Server returns updated list of all todos
            {
                addTodoElements(ACTIVE_TODOS_LIST_ID, xhr.responseText);
            }
            else
            {
                console.log(xhr.responseText);
            }
        }
    }

    xhr.send(data);
}


// When the Trash button is clicked, the todo (be it Active or Completed) should be moved to the Deleted Todo list
function deleteTodoAJAX(id)
{
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/api/todos/"+id, true);
    data = "status=DELETED";

    xhr.onreadystatechange = function () {
        if(xhr.readyState == RESPONSE_DONE)
        {
            if(xhr.status == STATUS_OK)      // Server returns updated list of all todos
            {
                addTodoElements(ACTIVE_TODOS_LIST_ID, xhr.responseText);
            }
            else
            {
                console.log(xhr.responseText);
            }
        }
    }

    xhr.send(data);
}



// When you click on "Hide Complete Todos", all the items of the complete todo are removed from the webpage
// and the button value changes to "Show Complete Todos"
function hideCompletedItems()
{
    var x = document.getElementById("complete_todos_list_div");

    // If there are no items in Complete todos list and the user clicks on hide button,
    // then the content will be displayed that "No items to hide"
    var complete_div = document.getElementById(COMPLETE_TODOS_LIST_ID);
    if(complete_div.children.length == 0)
    {
        complete_div.setAttribute("class", "custom-padding");
        complete_div.innerText = "No items to hide";
    }

    else
    {
        var elem = document.getElementById("hide-complete");
        if (elem.value == "Hide Completed Items")
            elem.value = "Show Completed Items";
        else
            elem.value = "Hide Completed Items";

        if (x.style.display === 'none') {
            x.style.display = 'block';
        }

        else {
            x.style.display = 'none';
        }
    }

}


// When you click on "Hide Deleted Todos", all the items of the deleted todo are removed from the webpage
// and the button value changes to "Show Deleted Todos"
function hideDeletedItems()
{
    var x = document.getElementById("deleted_todos_list_div");

    // If there are no items in Deleted todos list and the user clicks on hide button,
    // then the content will be displayed that "No items to hide"
    var deleted_div = document.getElementById(DELETED_TODOS_LIST_ID);
    if(deleted_div.children.length == 0)
    {
        deleted_div.setAttribute("class", "custom-padding");
        deleted_div.innerText = "No items to hide";
    }

    else
    {
        var elem = document.getElementById("hide-deleted");
        if (elem.value == "Hide Deleted Items")
            elem.value = "Show Deleted Items";
        else
            elem.value = "Hide Deleted Items";

        console.log(x);
        if (x.style.display === 'none') {
            x.style.display = 'block';
        }

        else {
            x.style.display = 'none';
        }
    }

}




