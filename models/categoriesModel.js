const db = require("../config/database");
const bcrypt = require("bcrypt");

class Category {
  // Create a category
  static async create(name) {
    try {
      const [result] = await db.query(
        "INSERT INTO categories (name) VALUES (?)",
        [name]
      );
      return result;
    } catch (error) {
      console.log("Error creating category:", error);
      throw error;
    }
  }

  // Find all categories
  static async findAll() {
    try {
      const [categories] = await db.query("SELECT * FROM categories");
      return categories;
    } catch (error) {
      console.log("Error fetching categories:", error);
      throw error;
    }
  }

  // Find category by ID
  static async findById(id) {
    try {
      const [category] = await db.query(
        "SELECT * FROM categories WHERE id = ?",
        [id]
      );
      return category[0];
    } catch (error) {
      console.log("Error fetching category by ID:", error);
      throw error;
    }
  }

  // Update category
  static async update(id, name) {
    try {
      const [result] = await db.query(
        "UPDATE categories SET name = ? WHERE id = ?",
        [name, id]
      );
      return result;
    } catch (error) {
      console.log("Error updating category:", error);
      throw error;
    }
  }

  // Delete category
  static async delete(id) {
    try {
      const [result] = await db.query("DELETE FROM categories WHERE id = ?", [
        id,
      ]);
      return result;
    } catch (error) {
      console.log("Error deleting category:", error);
      throw error;
    }
  }
}

module.exports = Category;
