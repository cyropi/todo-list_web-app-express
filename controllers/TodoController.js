
import { Todo } from "../models/Database.js";


export class TodoController 
{
	static async getTodosForCurrentUser(req)
	{
		let todos = await Todo.findAll({ where: { userN: req.session.username } });
    	return todos;
	}
	
	
	static async saveTodo(req)
	{ 
		let todo = await Todo.create({ 
							             todo: req.body.todo,
								         userN: req.session.username
							   		 });
		return todo;
	}
	
	
	static async toggleDoneStatus(req)
	{
		let todo = await Todo.findByPk(req.params.id);
		todo.done = !todo.done;
		return todo.save();
	}
	

	static async findById(req)
	{
		let todo = await Todo.findByPk(req.params.id);
		return todo;
	}


	static async update(req)
	{
		let todo = await this.findById(req);
		todo.todo = req.body.todo;
		return todo.save();
	}
	

	static async delete(req)
	{
		let todo = await this.findById(req);
		await todo.destroy();
		return todo;
	}
}
