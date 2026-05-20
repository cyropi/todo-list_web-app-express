

import { Sequelize } from "sequelize";
import { createModel as createUserModel } from "./User.js";
import { createModel as createTodoModel } from "./Todo.js";

import 'dotenv/config.js'; // read .env file and make it available in process.env


export const database = new Sequelize(process.env.DB_CONNECTION_URI,
                                      { dialect: process.env.DIALECT });

try 
{
    await database.authenticate();
    console.log('Connection to DB has been established successfully!');
} 
catch (error) 
{
    console.error('Unable to connect to the DB:', error);
}


createUserModel(database);
createTodoModel(database);

export const {User, Todo} = database.models;

// Store the association object in a static property. 
// This allows us to use it directly in the 'include' array during queries (e.g. include: [User.Todos]),
// avoiding typo-prone string aliases ('as') and unnecessary model imports.
User.Todos = User.hasMany(Todo, { foreignKey: 'userN' });
Todo.User = Todo.belongsTo(User, { foreignKey: 'userN' });


try 
{
    await database.sync({ force: true });
    console.log(`Database & tables created successfully!`);
} 
catch (error) 
{
    console.error('Unable to create tables:', error);
}
