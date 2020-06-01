document.addEventListener("DOMContentLoaded", function() {

    // Define useful items
    const list = document.querySelector("#middle-container");

    // Define lists
    let tempList = [];
    let id = 0;
    

    // RESET
    document.querySelector("#button-refresh").onclick = () => {
        localStorage.clear();
        list.innerHTML = '';
    }


    // USER INPUT
    // By default, the submit button is set disabled
    document.querySelector("#bottom-add").disabled = "true";

    // When there's something on the textfield, enable submit button
    document.querySelector("#bottom-text").onkeyup = () => {
        document.querySelector("#bottom-add").disabled = "false";
    };

    // Add todo list function
    function addTodo(item) {

        // Retrieve data from item
        let name = item.name;
        let id = item.id;
        let finished = item.finished;
        let erased = item.erased;

        // CSS class
        let itemUnchecked = "list-empty far fa-circle list-button-check";
        let itemChecked = "list-checked fas fa-check-circle list-button-check";
        let itemUncrossed = "list-todo list-text-cross";
        let itemCrossed = "list-todo-completed list-text-cross";

        // If item is erased, don't show
        if (erased === true) {
            return;
        }

        // Create New / Old item
        let status = finished ? itemChecked : itemUnchecked;
        let cross = finished ? itemCrossed : itemUncrossed;

        // Adding new todo-list item
        let todoNew = `<div class="list">
                        <i class="${status}"></i>
                        <p class="${cross}">${name}</p>
                        <i class="list-delete far fa-trash-alt list-button-delete"></i>
                     </div>`

        // Insert the todo-list item at the end of the last child of #middle-container
        list.insertAdjacentHTML('beforeend', todoNew);

        // Push the todo-list item into todoList
        tempList.push(item);

        // Update localStorage
        localStorage.setItem("todo-list", JSON.stringify(tempList));
        console.log("LIST: ", localStorage.getItem("todo-list"));

        // Mark as completed
        document.querySelectorAll(".list-button-check").forEach ( item => {
            item.onclick = () => {
                item.className === itemUnchecked ? item.className = itemChecked : item.className = itemUnchecked;
                item.parentNode.querySelector(".list-text-cross").className === itemUncrossed
                    ? item.parentNode.querySelector(".list-text-cross").className = itemCrossed
                    : item.parentNode.querySelector(".list-text-cross").className = itemUncrossed;
            }
        });

        
        // Delete
        document.querySelectorAll(".list-button-delete").forEach ( item => {
            item.onclick = () => {
                item.parentNode.classList.add("fade");
                item.parentNode.querySelector(".list-button-check").className = "fade-list";
                item.parentNode.querySelector(".list-text-cross").className = "fade-list";
                item.parentNode.querySelector(".list-button-delete").className = "fade-list";
                
            }
        })

    };

    // Check if localStorage already has item
    let save = JSON.parse(localStorage.getItem("todo-list"));
    console.log("SAVE :", save);
    
    if(save) {
        for (let i = 0; i < save.length; i++){
            addTodo(save[i]);
            tempList.push(save[i]);
        };
    };

    // Submission
    document.querySelector("#bottom-form").onsubmit = () => {
        // Retrieve user input
        let item = document.querySelector("#bottom-text").value;

        // Create a todo-list object
        let todoItem = {
            name: item,
            id: id,
            finished: false,
            erased: false
        };

        // Call todo function to create and insert into the container
        addTodo(todoItem);
        console.log("item created");
        id++;

        // Reset the texefield to empty
        document.querySelector("#bottom-text").value = "";

        //
        return false;
    };

});