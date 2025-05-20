const bcrypt = require("bcrypt");
const jsonWebToken = require("jsonwebtoken");

const appConfig = require("../config/appConfig");
const model = require("../models");

module.exports = {
  handleSignUp: async (req, res) => {
    try {
      const email = req.body.email?.trim();
      const password = req.body.password?.trim();
      const name = req.body.name?.trim();
      const phone = req.body.phone?.trim() || "";

      if (!email || !password || !name) {
        return res.status(400).json({
          error: true,
          message: "Required fields are missing",
        });
      }

      // Check if email already exists
      const existingUser = await model.users.findOne({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({
          error: true,
          message: "Email already exists",
        });
      }

      // Get the default role (typically 'user')
      const userRole = await model.roles.findOne({
        where: { name: "user" },
      });

      if (!userRole) {
        return res.status(500).json({
          error: true,
          message: "Default role not found. Contact administrator.",
        });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user with role
      const newUser = await model.users.create({
        name,
        email,
        password: hashedPassword,
        phone,
        roleId: userRole.id,
        role: { name: userRole.name }, // Store role info as JSON
        created_on: new Date(),
        updated_on: new Date(),
      });

      // Return success but don't include password
      return res.status(201).json({
        success: true,
      });
    } catch (err) {
      console.error("Error in handleSignUp:", err);
      return res.status(500).json({ error: true, message: err.message });
    }
  },
  handleSignUpAdmin: async (req, res) => {
    try {
      const email = req.body.email?.trim();
      const password = req.body.password?.trim();
      const name = req.body.name?.trim();
      const phone = req.body.phone?.trim() || "";

      if (!email || !password || !name) {
        return res.status(400).json({
          error: true,
          message: "Required fields are missing",
        });
      }

      // Check if email already exists
      const existingUser = await model.users.findOne({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({
          error: true,
          message: "Email already exists",
        });
      }

      // Get the default role (typically 'user')
      const userRole = await model.roles.findOne({
        where: { name: "admin" },
      });

      if (!userRole) {
        return res.status(500).json({
          error: true,
          message: "Default role not found. Contact administrator.",
        });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user with role
      const newUser = await model.users.create({
        name,
        email,
        password: hashedPassword,
        phone,
        roleId: userRole.id,
        role: { name: userRole.name }, // Store role info as JSON
        created_on: new Date(),
        updated_on: new Date(),
      });

      // Create a clean user object for the token payload
      const userData = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: userRole.name,
        roleId: userRole.id,
      };

      // Return success but don't include password
      return res.status(201).json({
        success: true,
      });
    } catch (err) {
      console.error("Error in handleSignUp:", err);
      return res.status(500).json({ error: true, message: err.message });
    }
  },
  handleSignIn: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: true, message: "Email and password are required." });
      }

      // Find the user with their role
      const user = await model.users.findOne({
        where: { email },
        include: [
          {
            model: model.roles,
            as: "role_id_roles",
            attributes: ["id", "name"],
          },
        ],
      });

      if (!user) {
        return res
          .status(401)
          .json({ error: true, message: "Invalid credentials." });
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ error: true, message: "Invalid credentials." });
      }

      // Update last login time
      await model.users.update(
        { last_login: new Date() },
        { where: { id: user.id } }
      );

      // Create a clean user object for the token payload
      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role_id_roles ? user.role_id_roles.name : null,
        roleId: user.roleId,
      };

      // Create JWT token
      const accessToken = jsonWebToken.sign(userData, appConfig.jwtSecret, {
        algorithm: "HS256",
        expiresIn: "7d",
      });

      // Return user data and token
      return res.status(200).json({
        data: { ...userData, accessToken },
        success: true,
      });
    } catch (err) {
      console.error("Error in handleSignIn:", err);
      return res.status(500).json({ error: true, message: err.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const updates = req.body;

      // Find the user
      const user = await model.users.findByPk(userId);
      if (!user) {
        return res.status(404).json({
          error: true,
          message: "User not found",
        });
      }

      // If updating password, hash it
      if (updates.password) {
        const salt = await bcrypt.genSalt(10);
        updates.password = await bcrypt.hash(updates.password, salt);
      }

      // If updating email, check if it already exists
      if (updates.email && updates.email !== user.email) {
        const existingUser = await model.users.findOne({
          where: { email: updates.email },
        });

        if (existingUser) {
          return res.status(400).json({
            error: true,
            message: "Email already in use",
          });
        }
      }

      // If updating role, verify it exists
      if (updates.roleId) {
        const role = await model.roles.findByPk(updates.roleId);
        if (!role) {
          return res.status(400).json({
            error: true,
            message: "Invalid role",
          });
        }
      }

      // Update user
      await model.users.update(updates, { where: { id: userId } });

      return res.status(200).json({
        data: "User updated successfully",
        success: true,
      });
    } catch (err) {
      return res.status(500).json({ error: true, message: err.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userId = req.params.id;

      // Find the user
      const user = await model.users.findByPk(userId);
      if (!user) {
        return res.status(404).json({
          error: true,
          message: "User not found",
        });
      }

      // Delete the user
      await model.users.destroy({ where: { id: userId } });

      return res.status(200).json({
        data: "User deleted successfully",
        success: true,
      });
    } catch (err) {
      return res.status(500).json({ error: true, message: err.message });
    }
  },

  getUsers: async (req, res) => {
    try {
      // Safe pagination defaults
      const page = Number.isInteger(Number(req.query.page)) && Number(req.query.page) > 0 ? parseInt(req.query.page) : 1;
      const limit = Number.isInteger(Number(req.query.limit)) && Number(req.query.limit) > 0 ? parseInt(req.query.limit) : 10;
      const offset = (page - 1) * limit;

      const users = await model.users.findAndCountAll({
        attributes: [
          "id",
          "name",
          "email",
          "phone",
          "created_on",
          "updated_on",
        ],
        include: [
          {
            model: model.roles,
            as: "role_id_roles",
            attributes: ["id", "name"],
          },
        ],
        limit,
        offset,
        order: [["created_on", "DESC"]],
      });

      return res.status(200).json({
        data: users.rows,
        meta: {
          total: users.count,
          page,
          limit,
          totalPages: Math.ceil(users.count / limit),
        },
      });
    } catch (err) {
      console.error('Error in getUsers:', err); // For debugging
      return res.status(500).json({ error: true, message: err.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const userId = req.params.id;

      const user = await model.users.findByPk(userId, {
        attributes: [
          "id",
          "name",
          "email",
          "phone",
          "created_on",
          "updated_on",
          "lastlogin",
          "image",
        ],
        include: [
          {
            model: model.roles,
            as: "role_id_roles",
            attributes: ["id", "name"],
          },
        ],
      });

      if (!user) {
        return res.status(404).json({
          error: true,
          message: "User not found",
        });
      }

      return res.status(200).json({
        data: user,
      });
    } catch (err) {
      return res.status(500).json({ error: true, message: err.message });
    }
  },
};

exports.logOut = function () {
  // Placeholder function for logout
};
