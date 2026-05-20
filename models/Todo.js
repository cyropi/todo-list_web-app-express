
import { DataTypes } from "sequelize";


export function createModel(database)
{
    database.define("Todo",
                    { 
                        id: { 
                                type: DataTypes.INTEGER,
                                primaryKey: true,
								autoIncrement: true
                            },
                        todo: { type: DataTypes.TEXT },
                        done: {
							      type: DataTypes.BOOLEAN,
								  defaultValue: false,
								  allowNull: false
                              }
                    },
                    {

                    });
}
