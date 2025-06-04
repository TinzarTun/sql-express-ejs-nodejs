const db = require("../config/database");
const bcrypt = require("bcrypt");

class User {
  // Create a user
  static async create(name, email, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const [result] = await db.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword]
      );
      return result;
    } catch (error) {
      console.log("Error creating user:", error);
      throw error;
    }
  }

  // Find all users
  static async findAll() {
    try {
      const [users] = await db.query("SELECT * FROM users");
      return users;
    } catch (error) {
      console.log("Error fetching users:", error);
      throw error;
    }
  }

  // Find user by ID
  static async findById(id) {
    try {
      const [user] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
      return user[0]; // index[0] = first element(object)
    } catch (error) {
      console.log("Error fetching user by ID:", error);
      throw error;
    }
  }

  // Update user
  static async update(id, name, email) {
    try {
      const [result] = await db.query(
        "UPDATE users SET name = ?, email = ? WHERE id = ?",
        [name, email, id]
      );
      return result;
    } catch (error) {
      console.log("Error updating user:", error);
      throw error;
    }
  }

  // Delete user
  static async delete(id) {
    try {
      const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);
      return result;
    } catch (error) {
      console.log("Error deleting user:", error);
      throw error;
    }
  }
}

module.exports = User;
