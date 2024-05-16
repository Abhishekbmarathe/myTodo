let input = document.querySelector('#content');
let btn = document.querySelector('.add');


btn.addEventListener("click", () => {
    let inputData = input.value;
    if (inputData !== "") {

        let myForm = document.querySelector('#myForm');
        myForm.setAttribute("method", "POST");
        myForm.setAttribute("action", "/add");
        myForm.submit();
    }
    else {
        alert("Todo cannot be empty...")
    }
});


const deleteButtons = document.querySelectorAll('.delete');
deleteButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
        const confm = confirm("Are you sure want to delete ?")
        if (confm) {
            const todoCard = event.target.closest('.todoCard'); // Find the closest parent element with class 'todoCard'
            const todoId = todoCard.getAttribute('id'); // Get the ID of the todoCard
            // console.log(todoId)
            try {
                // Send a DELETE request to your server
                const response = await fetch(`/todos/${todoId}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    // If successful, remove the todo item from the DOM
                    const todoElement = document.getElementById(todoId);
                    todoElement.remove();
                } else {
                    console.error('Failed to delete todo');
                }
            } catch (error) {
                console.error('Failed to delete todo:', error);
            }
        }
    });
});