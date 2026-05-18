
import express from 'express'

import { ResetController } from '../controllers/ResetController.js'


export const resetRouter = express.Router();


resetRouter.all('/reset', async (req, res, next) => {
                                                        try 
                                                        {
                                                            await ResetController.resetApp(req, res);

                                                            req.flash("success", "App successfully reset!");
                                                            res.redirect("/");
                                                        } 
                                                        catch (error) 
                                                        {
                                                            next(error);
                                                        }
                                                    });
