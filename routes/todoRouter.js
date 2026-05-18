
import express from "express";

import { enforceAuthentication } from "../middlewares/authentication.js";
import { TodoController } from "../controllers/TodoController.js";


export const todoRouter = express.Router();


todoRouter.use(enforceAuthentication);


todoRouter.route('/todo')
          .get(async (req, res, next) => {
                                             try 
                                             {
                                                 let todos = await TodoController.getTodosForCurrentUser(req);
                                                 res.locals.todoItems = todos;

                                                 res.render("todoPage");
                                             } 
                                             catch (error) 
                                             {
                                                 next(error);  
                                             }
                                         })
          .post(async (req, res, next) => {
                                              try 
                                              {
                                                  await TodoController.saveTodo(req);

                                                  req.flash("success", "New To-do item saved successfully.");
                                                  res.redirect("/todo");
                                              } 
                                              catch (error) 
                                              {
                                                  next(error);
                                              }
                                          });


todoRouter.get('/todo/done/:id', async (req, res, next) => {
                                                               try 
                                                               {
                                                                   let item = await TodoController.toggleDoneStatus(req);

                                                                   req.flash("success", 
                                                                             `To-do item "${item.todo}" marked as "${item.done ? "done" : "to-do"}".`);
                                                                   res.redirect("/todo");
                                                               } 
                                                               catch (error) 
                                                               {
                                                                   next(error);
                                                               }
                                                           });

todoRouter.route('/todo/edit/:id')
          .get(async (req, res, next) => {
                                             try 
                                             {
                                                 let item = await TodoController.findById(req);
                                                 res.locals.item = item;

                                                 res.render("editTodoPage");
                                             } 
                                             catch (error) 
                                             {
                                                 next(error);  
                                             }
                                         })
          .post(async (req, res, next) => {
                                              try 
                                              {
                                                  let item = await TodoController.update(req);

                                                  req.flash("success", `To-do item "${item.todo}" has been updated.`);
                                                  res.redirect("/todo");
                                              } 
                                              catch (error) 
                                              {
                                                  next(error);
                                              }
                                          });


todoRouter.get('/todo/delete/:id', async (req, res, next) => {
                                                                 try
                                                                 {
                                                                     let item = await TodoController.delete(req);

                                                                     req.flash("success", `To-do item "${item.todo}" has been deleted".`);
                                                                     res.redirect("/todo"); 
                                                                 }
                                                                 catch (error)
                                                                 {
                                                                    next(error);
                                                                 }  
                                                             });
