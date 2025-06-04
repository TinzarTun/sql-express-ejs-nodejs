const db = require("../config/database");

class Post {
  // Create a new post
  static async create(userId, title, content, photo) {
    try {
      const [result] = await db.query(
        "INSERT INTO posts (user_id, title, content, photo) VALUES (?, ?, ?, ?)",
        [userId, title, content, photo]
      );
      return result.insertId; // Return the ID of the newly created post
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  }
  // find all posts
  static async findAll() {
    try {
      const [rows] = await db.query(
        "SELECT posts.*, users.name AS author FROM posts JOIN users ON posts.user_id = users.id"
      );
      return rows; // Return all posts
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  }
  // Find a post by ID
  static async findById(id) {
    try {
      const [rows] = await db.query(
        "SELECT posts.*, users.name AS author FROM posts JOIN users ON posts.user_id = users.id WHERE posts.id = ?",
        [id]
      );
      return rows[0]; // Return the post with the specified ID
    } catch (error) {
      console.error("Error fetching post by ID:", error);
      throw error;
    }
  }
  // update a post
  static async update(id, title, content, photo) {
    try {
      if (photo) {
        await db.query(
          "UPDATE posts SET title = ?, content = ?, photo = ? WHERE id = ?",
          [title, content, photo, id]
        );
      } else {
        await db.query("UPDATE posts SET title = ?, content = ? WHERE id = ?", [
          title,
          content,
          id,
        ]);
      }
    } catch (error) {
      console.error("Error updating post:", error);
      throw error;
    }
    }
    // Delete a post
    static async delete(id) {
        try {
            await db.query("DELETE FROM posts WHERE id = ?", [id]);
        } catch (error) {
            console.error("Error deleting post:", error);
            throw error;
        }
    }
}

module.exports = Post;