
"use strict";

import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import flash from 'connect-flash';

import { exportAuthenticationStatus } from "./middlewares/authentication.js";
import { exportFlashMessagesToViews } from "./middlewares/flash-messages.js";
import { homepageRouter } from "./routes/homepageRouter.js";
import { authenticationRouter } from "./routes/authenticationRouter.js";
import { todoRouter } from "./routes/todoRouter.js";
import { resetRouter } from "./routes/resetRouter.js";


function main()
{
    const PORT = 3000;
    const app = express();


    app.set("view engine", "pug"); // pug as the default template engine


    // IMPORTED MIDDLEWARE
    app.use(morgan("dev")); // the morgan logging middleware, with the "dev" format
    app.use(express.static("public")); // built-in middleware to serve static files; files in the /public directory will be served as static files
    app.use(express.urlencoded({ extended: false }));  // built-in middleware to parse url-encoded body; makes the parameters available in the req.body object
    // middleware for handling session
    app.use(session({ 
                        secret: "session_secret", 
                        resave: false,
                        saveUninitialized: false,
                        cookie: { maxAge: 10*60*1000 }
                    }));
    app.use(flash()); // middleware for flash messages

    

    // CUSTOM MIDDLEWARE
    app.use(exportFlashMessagesToViews); // middleware to make flash messages available to views
    app.use(exportAuthenticationStatus); // middleware to make authentication status available to views


    // ROUTES
    app.use(homepageRouter);
    app.use(resetRouter);
    app.use(authenticationRouter);
    app.use(todoRouter);


    // catch all, if we get here it's a 404
    app.get("/*splat", (req, res) => {
                                         res.status(404)
                                            .render("errorPage", 
                                                    { 
                                                        code: "404",
                                                        description: "Page not found"
                                                    });
                                     });

    // error handler
    app.use((err, req, res, next) => {
                                         console.error(err.stack);

                                         res.status(err.status || 500)
                                            .render("errorPage",
                                                    { 
                                                        code: err.status || 500,
                                                        description: err.message || "An error occured"
                                                    });
                                     });


    app.listen(PORT);
}


main();
