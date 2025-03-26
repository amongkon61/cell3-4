$(document).ready(function() {
    const $ftList = $("#ft_list");
    const $newBtn = $("#new-btn");

    function loadTodos() {
        const todos = getCookies("todos");
        if (todos) {
            const todoArray = JSON.parse(todos);
            todoArray.reverse().forEach(todo => addTodo(todo, false));
        }
    }

    function addTodo(task, save = true) {
        if (!task.trim()) return; 

        const $todoDiv = $("<div>").addClass("todo-item").text(task);

        $todoDiv.on("click", function() {
            if (confirm(`Do you want to remove: "${task}"?`)) {
                $todoDiv.remove();
                saveTodos();
            }
        });

        $ftList.prepend($todoDiv);
        if (save) saveTodos();
    }

    function saveTodos() {
        const todoItems = $(".todo-item").map(function() {
            return $(this).text();
        }).get();
        document.cookie = `todos=${JSON.stringify(todoItems)}; path=/;`;
    }

    function getCookies(name) {
        const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
        return match ? match[2] : null;
    }

    $newBtn.on("click", function() {
        const task = prompt("Enter a new To-Do:");
        if (task) addTodo(task);
    });

    loadTodos();
});
