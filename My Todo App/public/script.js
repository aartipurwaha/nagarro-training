console.log("Is it working?");
const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const TODOS_LIST_ID = "todos_list_div";


function add_todo_elements(id, todos_data_json)
{
    var parent = document.getElementById(id);
    parent.innerText = todos_data_json;
}

function getTodosAJAX() {

    // AJAX - xml http request object
    //make requests to the server
    //1. without reloading the webpage
    //2. happens asynchronously

    // this object lets you make request to server AJAX type
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/todos", true);  // true : means to do this asynchronously
                                          // GET request from the server for all the todos

    xhr.onreadystatechange = function() {
        //Write the code that  needs to be executed after the response

        if(xhr.readyState == RESPONSE_DONE)     // Has response been received ?
        {
            if(xhr.status == STATUS_OK)         // Is Response okay (ie, Status code == 200) ??
            {
                console.log(xhr.responseText);
                add_todo_elements(TODOS_LIST_ID, xhr.responseText);

            }
        }
    }  // end of callback


    // We are actually making the request here
    // Above, we are only defining the request (and not making it)
    xhr.send(data=null);
}