let todoList = [];
const commands = ["new", "list", "delete", "quit"];
let command = prompt("What would you like to do?");
while (command !== commands[3]) {
    if (!commands.includes(command.toLowerCase())) {
        command = prompt("I don't recognize that command.")
    }
    if (command === commands[0]) {
        let newTodo = prompt("Enter a new todo");
        console.log(`${newTodo} added to the list`);
        todoList.push(newTodo);

    } else if (command === commands[1]) {
        if (todoList.length === 0) {
            console.log("No items")
        } else {
            console.log("********");
            for (let i = 0; i < todoList.length; i++) {
                console.log(`${i + 1}:\t${todoList[i]}`);
            }
            console.log("********");
        }
    } else if (command === commands[2]) {
        let removeIndex = parseInt(prompt("Enter index of todo to delete"));
        while (!removeIndex || removeIndex < 0 || removeIndex >= todoList.length + 1) {
            removeIndex = prompt("Please enter a valid index")
        }
        todoList.splice(removeIndex - 1, 1);
        console.log("Todo Removed");
    }
    command = prompt("What would you like to do?").toLowerCase();
}
console.log("Quit")
if (todoList.length === 0) {
    console.log("No items")
} else {
    console.log("Todo List:")
    for (let i = 0; i < todoList.length; i++) {
        console.log(`${i + 1}:\t${todoList[i]}`);
    }
}
