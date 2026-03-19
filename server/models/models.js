let id = 1
const getId = () => id++;

const todos = [
  { id: getId(), task: 'Buy groceries', isDone: false },
  { id: getId(), task: 'Walk the dog', isDone: true },
  { id: getId(), task: 'Read a book', isDone: false },
];


module.exports.list = () => {
    return [...todos];
}

module.exports.find = (id) => {
    const task = todos.find(task => task.id === id)
    if (!task) {
        return null;
    }
    return {...task}
}

module.exports.create = (task) => {
    const newTask = { id: getId(), task, isDone: false }
    todos.push(newTask);
    return {...newTask};
}

module.exports.update = (id, isDone) => {
    const updateTask = todos.find(task => task.id === id)
    if (!updateTask) return null
    updateTask.isDone = isDone;
    return {...updateTask};
}

module.exports.destroy = (id) => {
    const deleteTask = todos.findIndex(task => task.id === id)
    if (deleteTask < 0) return null
    todos.splice(deleteTask, 1)
    return true 
}

