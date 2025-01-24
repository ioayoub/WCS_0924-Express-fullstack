import db from "../../../database/client"
import {UserType} from "../../lib/definitions";
import {ResultSetHeader} from "mysql2/promise";

class UserRepository {

  async create(user : UserType) : Promise<number> {
    
    const { firstname, lastname, email, birthdate, password} = user;
    
    const [result] = await db.query(
      "INSERT INTO user (firstname, lastname, email, password, birthdate, role_id) VALUES (?,?,?,?,?,?)",
      [firstname, lastname, email, password, birthdate, 99]
    )
    
    const returnValue = result as ResultSetHeader;
    return returnValue.insertId;
  }


}



export default new UserRepository();