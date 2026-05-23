
import { User } from "../models/Database.js";


export class AuthController
{
    static async checkCredentials(req, res) 
    {
        let user = new User({ 
                                userName: req.body.usr, // user data specified in the request
                                password: req.body.pwd
                            });

        let found = await User.findOne({ 
                                           where: 
                                           {
                                               userName: user.userName,
                                               password: user.password // password was hashed when creating user
                                           }
                                        });

        if (found === null)
            return false;
        else // credentials are valid, create a session
        {
            req.session.username = found.userName;
            req.session.isAuthenticated = true;

            return true;
        }

    }


    static async saveUser(req, res)
    {
        let user = new User({ 
                                userName: req.body.usr, 
                                password: req.body.pwd
                            });
        await user.save();
    }
}
