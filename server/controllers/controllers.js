// const todoModel = require('../models/models.js')

// module.exports.listTodos = (req, res) => {
//     const listTodos = todoModel.list()
//     res.send(listTodos)
// }

// module.exports.findTodo = (req, res) => {
//    const { id } = req.params;
//    const findTodo = todoModel.find(Number(id))
//    if(!findTodo) {
//     res.status(404).send({message: `No task with the id ${id}`})
//    }
//    res.send(findTodo)
// }

// module.exports.createTodo = (req, res) => {
//     const { task } = req.body;
//     if (!task) {
//         res.status(400).send({message: `Please input task`});
//     }
//     const createTodo = todoModel.create(task);
//     res.status(201).send(createTodo);
// }

// module.exports.updateTodo = (req, res) => {
//     const { id } = req.params;
//     const { isDone } = req.body;
//     if (!id) return res.status(404).send({message: `No task with the id ${id}`});
//     const updateTodo = todoModel.update(Number(id), isDone);
//     res.send(updateTodo);
// }

// module.exports.destroyTodo = (req, res) => {
//     const { id } = req.params
//     if (!id) {
//         res.status(404).send({message: `No task with the id ${id}`});
//     }
//     todoModel.destroy(Number(id))
//     res.sendStatus(204)
// }