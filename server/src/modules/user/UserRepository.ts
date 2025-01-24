import db, {Rows} from "../../../database/client"
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
  
  async readByEmail(email : string) : Promise<UserType | null> {
    
    const [user] = await db.query<Rows>(
      "SELECT * FROM user WHERE email = ?",
      [email]
    )
    
    const result = user as UserType[];
    return result.length > 0 ? result[0] : null;
  }
  
  
}



export default new UserRepository();