# Assignment - My Todo App

A simple Todo App which lets you manage your todos with the status "ACTIVE", "COMPLETE" and "DELETED".

## Description

### The frontend for this app contains four sections :
 1. Active Todos  
 2. Add Todo 
 3. Complete Todos
 4. Deleted Todos 
 
### The Node API server is built with the following 4 endpoints -  

 - GET /api/todos
 - POST /api/todos
 - PUT /api/todos/:id
 - DELETE /api/todos:id

    
## Features
### 1. Active Todos:
     - This section displays all the active todos.
     - Initially there are 3 active todos - "Learn Javascript", "Git Tutorial", "Interactive Git".
     - Clicking the checkbox completes the todo, i.e., the todo will be removed from the active todos section and 
       will be displayed in the complete todos section.
       (this means the status of todo will be changed from ACTIVE to COMPLETE)
     - Clicking the trash button will delete the todo, i.e., the todo will be removed from active todos section and 
       will be displayed in the deleted todos section.
       (this means the status of todo will be changed from ACTIVE to DELETED)
       
 ### 2. Add Todo
      - This sections lets you add a new todo with status ACTIVE.
      
 ### 3. Complete Todos
      - This section displays all the complete todos.
      - Clicking the checkbox activates the todo, i.e., the todo will be removed from the complete todos section 
        and will be displayed in the active todos section.
        (this means the status of todo will be changed from COMPLETE to ACTIVE)
      - Clicking the trash button will delete the todo, i.e., the todo will be removed from complete todos section 
        and will be displayed in the deleted todos section.
        (this means the status of todo will be changed from COMPLETE to DELETED)
      - Clicking Hide button does 2 things :
           * It hides the complete todos.
           * The value of the button changes from "Hide Complete Todos" to "Show Complete Todos".
      - After this, clicking on "Show Complete Todos" will display all the complete todos again.
      - If the complete todos list is empty and you click the Hide button, then message is displayed: "No items to hide".
      
  ### 4. Deleted Todos
      - This section displays all the deleted todos.
      - Clicking Hide button does 2 things :
           * It hides the deleted todos.
           * The value of the button changes from "Hide Deleted Todos" to "Show Deleted Todos".
      - After this, clicking on "Show Deleted Todos" will display all the deleted todos again
      - If the deleted todos list is empty and you click the Hide button, then message is displayed: "No items to hide".
      
      
       
       
             
