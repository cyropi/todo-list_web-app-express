
import express from 'express';

import { AuthController } from '../controllers/AuthController.js';


export const authenticationRouter = express.Router();


authenticationRouter.route('/auth')
                    .get((req, res) => { res.render("loginPage") })
                    .post(async (req, res) => { 
                                                  let isAuth = await AuthController.checkCredentials(req, res); 

                                                  if (isAuth)
                                                  {
                                                      req.flash("success", `Welcome ${req.body.usr}! You successfully logged in.`);
                                                      res.redirect("/");
                                                  }
                                                  else
                                                  {
                                                      res.status(401);
                                                      res.render("loginPage", { errors: ["Invalid credentials. Try again."] });
                                                  }
                                              });


authenticationRouter.route('/signup')
                    .get((req, res) => { res.render("signupPage", {errors: req.flash("error") }); }) // TODO: rimuovere errors
                    .post(async (req, res) => { 
                                                  AuthController.saveUser(req, res).then(() => {
                                                                                                   req.flash("success", 
                                                                                                             `User "${req.body.usr}" successfully created.` + 
                                                                                                             `You can now log in.`);
                                                                                                   res.redirect("/auth");
                                                                                               })
                                                                                   .catch((err) => {
                                                                                                       res.status(500);
                                                                                                       res.render("signupPage", 
                                                                                                                  { errors: [`Could not save user (${err}). Try again.`] });
                                                                                                   });         
                                              });


authenticationRouter.all('/logout', (req, res) => {
                                                      req.session.isAuthenticated = false;
                                                      req.session.username = undefined;

                                                      req.flash("success", "You have successfully logged out.");
                                                      res.redirect("/");
                                                  })
