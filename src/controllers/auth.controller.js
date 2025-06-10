import { userService } from '../services/auth.service.js';
import { comparePassword } from '../utils/bcrypt.js';
import { validations } from '../utils/validations.js';
import { generateAccessToken, generateRefreshToken } from '../utils/generate-token.js';

class AuthController {
  async signUp(req, res, next) {
    try {
      const userData = req.body;

      const existingUser = await userService.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'User with this email already exists',
        });
      }

      console.log(userData.role);

      let emailError = validations.email(userData.email);
      let passwordError = validations.password(userData.password);

      if (emailError || passwordError) {
        return res.status(400).json({
          statusCode: 400,
          email: emailError,
          password: passwordError,
        });
      }

      const newUser = await userService.createUser(userData);

      const { password, ...userWithoutPassword } = newUser;

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: userWithoutPassword,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserByID(req, res, next) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      const { password, ...userWithoutPassword } = user;

      res.status(200).json({
        success: true,
        data: userWithoutPassword,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req, res, next) {
    try {
      const { limit = 10, offset = 0 } = req.query;
      const users = await userService.getAllUsers(parseInt(limit), parseInt(offset));

      const usersWithoutPasswords = users.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });

      res.status(200).json({
        success: true,
        count: usersWithoutPasswords.length,
        data: usersWithoutPasswords,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUserById(req, res, next) {
    try {
      const { id } = req.params;
      const userData = req.body;

      const existingUser = await userService.getUserById(id);
      if (!existingUser) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      const updatedUser = await userService.updateUser(id, userData);

      const { password, ...userWithoutPassword } = updatedUser;

      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: userWithoutPassword,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteUserById(req, res, next) {
    try {
      const { id } = req.params;

      const existingUser = await userService.getUserById(id);
      if (!existingUser) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      await userService.deleteUser(id);

      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async singIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await userService.getUserByEmail(email);
      const isEqual = await comparePassword(password, user.password);

      if (!isEqual) {
        return res.status(400).json({
          statusCode: 400,
          message: 'Password is invalid',
        });
      }

      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.LastName,
      };
      const accessToken = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'development',
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        statusCode: 200,
        message: 'success',
        data: {
          accessToken: accessToken,
        },
      });
    } catch (e) {
      next(e);
    }
  }
}

const Auth = new AuthController();
export default Auth;
