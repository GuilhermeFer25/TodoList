// const setTagAsDone = async (element, id) => {
//   event.preventDefault();
//   try {
//     let headers = new Headers({ 'Content-Type': 'aplication/json' })
//     let body = JSON.stringify({ task: { done: element.checked } })
//     let response = await fetch(`/tasks/${id}?_method=put`, { headers: headers, body: body, method: 'PUT' })
//     console.log(response)
//     let data = await response.json()
//     let task = data.task;
//     let parent = element.parentNode
//     if (task.done) {
//       element.checked = true;
//       parent.classList.add('has-text-success')
//       parent.classList.add('is-italic')
//     } else {
//       element.checked = false;
//       parent.classList.remove('has-text-success')
//       parent.classList.remove('is-italic')

//     }

//   } catch (error) {
//     console.log(error)
//     alert('Error ao atualizar a tarefa')
//   }
// }