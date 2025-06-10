import { eq } from 'drizzle-orm';

import db from '../config/db.js';
import { users } from '../models/user-profile/user.model.js';
import { hashPassword } from '../utils/bcrypt.js';

class UserService {
  async createUser(userData) {
    if (userData.password) {
      userData.password = await hashPassword(userData.password);
    }

    const [newUser] = await db.insert(users).values(userData).returning();
    return newUser;
  }

  async getUserById(userId) {
    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    return user || null;
  }

  async getUserByEmail(email) {
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return user || null;
  }

  async getAllUsers(limit = 10, offset = 0) {
    const usersList = await db.select().from(users).limit(limit).offset(offset);
    return usersList;
  }

  async updateUser(userId, userData) {
    if (userData.password) {
      userData.password = await hashPassword(userData.password);
    }

    userData.updatedAt = new Date();

    const [updatedUser] = await db
      .update(users)
      .set(userData)
      .where(eq(users.id, userId))
      .returning();

    return updatedUser || null;
  }

  async deleteUser(userId) {
    const [deletedUser] = await db.delete(users).where(eq(users.id, userId)).returning();

    return !!deletedUser;
  }
}

export const userService = new UserService();
export default UserService;
