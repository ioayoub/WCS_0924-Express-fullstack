import { ResultSetHeader } from "mysql2";
import db from "../../database/client";

class RoleRepository {
  async create(label: string): Promise<number> {
    const [result] = await db.query<ResultSetHeader>(
      "INSERT INTO role (label) VALUES (?)",
      [label]
    );

    return result.insertId;
  }
}

export default new RoleRepository();
