import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PresenterNotes from '../../components/PresenterNotes.jsx';
import PresentationMode from '../../components/PresentationMode.jsx';
import { getMobileStyles } from '../../utils/mobileStyles.js';

const Database = () => {
  const [activeSection, setActiveSection] = useState('introduction');
  const [showPresentation, setShowPresentation] = useState(false);
  const [showCode, setShowCode] = useState({});
  const styles = getMobileStyles();

  const toggleCode = (sectionId) => {
    setShowCode(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const databaseSections = {
    introduction: {
      title: "MongoDB Overview",
      icon: "🍃",
      description: "Understanding MongoDB as a NoSQL document database and its integration with Node.js applications.",
      importance: "MongoDB's flexibility and scalability make it ideal for modern web applications with evolving data structures.",
      concepts: [
        {
          name: "Document Database",
          description: "Stores data in flexible, JSON-like documents",
          benefits: ["Schema flexibility", "Natural data representation", "Easy to scale horizontally"],
          example: "Perfect for user profiles, product catalogs, content management"
        },
        {
          name: "Collections & Documents",
          description: "Collections are like tables, documents are like records",
          benefits: ["No predefined schema", "Embedded documents", "Array fields"],
          example: "Users collection contains user documents with varying fields"
        },
        {
          name: "MongoDB vs SQL",
          description: "Different paradigms for different use cases",
          benefits: ["Faster development", "Better for unstructured data", "Natural JSON mapping"],
          example: "MongoDB: Flexible schemas, SQL: Rigid schemas with ACID guarantees"
        }
      ],
      features: [
        "Document-oriented storage",
        "Horizontal scalability",
        "Rich query language",
        "GridFS for large files",
        "Built-in replication",
        "Sharding support"
      ]
    },
    modeling: {
      title: "Data Modeling",
      icon: "🏗️",
      description: "Learn how to design effective MongoDB schemas and data structures.",
      importance: "Good data modeling in MongoDB requires understanding document structure, relationships, and query patterns.",
      patterns: [
        {
          name: "Embedding",
          description: "Store related data within the same document",
          when: "One-to-few relationships, data accessed together",
          advantages: ["Single query retrieval", "Atomic operations", "Better performance"],
          disadvantages: ["Document size limits", "Data duplication"],
          example: `{
  "_id": ObjectId("..."),
  "name": "John Doe",
  "email": "john@example.com",
  "addresses": [
    {
      "type": "home",
      "street": "123 Main St",
      "city": "Anytown",
      "zipCode": "12345"
    },
    {
      "type": "work",
      "street": "456 Business Ave",
      "city": "Downtown",
      "zipCode": "67890"
    }
  ]
}`
        },
        {
          name: "Referencing",
          description: "Store references to documents in other collections",
          when: "One-to-many, many-to-many relationships",
          advantages: ["No duplication", "Smaller documents", "Easier updates"],
          disadvantages: ["Multiple queries needed", "No foreign key constraints"],
          example: `// User document
{
  "_id": ObjectId("user1"),
  "name": "John Doe",
  "email": "john@example.com"
}

// Order documents
{
  "_id": ObjectId("order1"),
  "userId": ObjectId("user1"),
  "total": 99.99,
  "items": [...]
}`
        },
        {
          name: "Hybrid Approach",
          description: "Combine embedding and referencing strategically",
          when: "Complex applications with varied access patterns",
          advantages: ["Optimized for specific use cases", "Balanced performance"],
          disadvantages: ["More complex design", "Requires careful planning"],
          example: `{
  "_id": ObjectId("blog_post"),
  "title": "Great Article",
  "authorId": ObjectId("author_id"),
  "authorName": "John Doe", // Denormalized for quick display
  "comments": [
    {
      "authorId": ObjectId("..."),
      "authorName": "Jane Smith", // Denormalized
      "text": "Great post!",
      "date": ISODate("...")
    }
  ]
}`
        }
      ]
    },
    aggregation: {
      title: "Aggregation Framework",
      icon: "🔄",
      description: "MongoDB's powerful aggregation pipeline for data processing and analysis.",
      importance: "Aggregation pipelines enable complex data transformations and analytics directly in the database.",
      stages: [
        {
          name: "$match",
          description: "Filter documents (like WHERE in SQL)",
          example: `{ $match: { status: "active", age: { $gte: 18 } } }`
        },
        {
          name: "$group",
          description: "Group documents and perform calculations",
          example: `{ $group: { _id: "$category", totalSales: { $sum: "$amount" } } }`
        },
        {
          name: "$project",
          description: "Select and transform fields",
          example: `{ $project: { name: 1, email: 1, fullName: { $concat: ["$firstName", " ", "$lastName"] } } }`
        },
        {
          name: "$sort",
          description: "Sort documents",
          example: `{ $sort: { createdAt: -1, name: 1 } }`
        },
        {
          name: "$lookup",
          description: "Join collections (like JOIN in SQL)",
          example: `{ $lookup: { from: "orders", localField: "_id", foreignField: "userId", as: "userOrders" } }`
        },
        {
          name: "$unwind",
          description: "Deconstruct array fields",
          example: `{ $unwind: "$tags" }`
        }
      ]
    },
    integration: {
      title: "Express.js Integration",
      icon: "🔗",
      description: "Connecting MongoDB with Express.js applications using Mongoose ODM.",
      importance: "Mongoose provides a schema-based solution to model application data with built-in type casting, validation, and query building.",
      examples: [
        {
          name: "MongoDB Connection Setup",
          description: "Setting up MongoDB connection with proper error handling and configuration",
          code: `const mongoose = require('mongoose');
require('dotenv').config();

// Connection configuration
const connectDB = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10, // Maximum number of connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      bufferMaxEntries: 0, // Disable mongoose buffering
      bufferCommands: false, // Disable mongoose buffering
    };

    const conn = await mongoose.connect(process.env.MONGODB_URI, options);
    
    console.log(\`MongoDB Connected: \${conn.connection.host}\`);
    
    // Connection event listeners
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });
    
    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });
    
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

// Database health check
const checkDBHealth = async () => {
  try {
    await mongoose.connection.db.admin().ping();
    return { status: 'healthy', message: 'Database connection is active' };
  } catch (error) {
    return { status: 'unhealthy', message: error.message };
  }
};

module.exports = { connectDB, checkDBHealth };`
        },
        {
          name: "Mongoose Schema Definition",
          description: "Defining schemas with validation, middleware, and methods",
          code: `const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema with comprehensive validation
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: {
      validator: function(email) {
        return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
      },
      message: 'Please provide a valid email address'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false // Don't include password in queries by default
  },
  role: {
    type: String,
    enum: {
      values: ['user', 'admin', 'moderator'],
      message: 'Role must be user, admin, or moderator'
    },
    default: 'user'
  },
  profile: {
    avatar: {
      type: String,
      default: null
    },
    bio: {
      type: String,
      maxlength: [500, 'Bio cannot exceed 500 characters']
    },
    dateOfBirth: Date,
    phoneNumber: {
      type: String,
      validate: {
        validator: function(phone) {
          return !phone || /^\\+?[1-9]\\d{1,14}$/.test(phone);
        },
        message: 'Please provide a valid phone number'
      }
    }
  },
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light'
    },
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: false }
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: Date,
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: Date
}, {
  timestamps: true, // Adds createdAt and updatedAt
  toJSON: { 
    virtuals: true,
    transform: function(doc, ret) {
      delete ret.password;
      delete ret.__v;
      return ret;
    }
  }
});

// Indexes for performance
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ 'profile.phoneNumber': 1 }, { sparse: true });
userSchema.index({ createdAt: -1 });
userSchema.index({ role: 1, isActive: 1 });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return this.name;
});

// Virtual for account lock status
userSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Instance method to increment login attempts
userSchema.methods.incLoginAttempts = function() {
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 }
    });
  }
  
  const updates = { $inc: { loginAttempts: 1 } };
  
  // Lock account after 5 failed attempts for 2 hours
  if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 };
  }
  
  return this.updateOne(updates);
};

// Static method to find by email
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

// Static method for successful login
userSchema.statics.recordSuccessfulLogin = function(userId) {
  return this.updateOne(
    { _id: userId },
    {
      $unset: { loginAttempts: 1, lockUntil: 1 },
      $set: { lastLogin: new Date() }
    }
  );
};

module.exports = mongoose.model('User', userSchema);`
        }
      ]
    },
    dao: {
      title: "DAO Pattern Implementation",
      icon: "🏛️",
      description: "Implementing Data Access Object pattern for clean separation of database operations.",
      importance: "DAO pattern provides a clean abstraction layer between business logic and data access, making code more maintainable and testable.",
      examples: [
        {
          name: "Base DAO Class",
          description: "Generic DAO with common CRUD operations",
          code: `class BaseDAO {
  constructor(model) {
    this.model = model;
  }

  // Create a new document
  async create(data) {
    try {
      const document = new this.model(data);
      return await document.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new Error('Duplicate key error: Document already exists');
      }
      throw new Error(\`Error creating document: \${error.message}\`);
    }
  }

  // Find document by ID
  async findById(id, options = {}) {
    try {
      const { populate, select } = options;
      let query = this.model.findById(id);
      
      if (select) {
        query = query.select(select);
      }
      
      if (populate) {
        if (Array.isArray(populate)) {
          populate.forEach(pop => query = query.populate(pop));
        } else {
          query = query.populate(populate);
        }
      }
      
      return await query.exec();
    } catch (error) {
      throw new Error(\`Error finding document by ID: \${error.message}\`);
    }
  }

  // Find documents with filtering, sorting, and pagination
  async find(filter = {}, options = {}) {
    try {
      const {
        select,
        populate,
        sort = { createdAt: -1 },
        page = 1,
        limit = 10,
        lean = false
      } = options;

      const skip = (page - 1) * limit;
      
      let query = this.model.find(filter);
      
      if (select) {
        query = query.select(select);
      }
      
      if (populate) {
        if (Array.isArray(populate)) {
          populate.forEach(pop => query = query.populate(pop));
        } else {
          query = query.populate(populate);
        }
      }
      
      query = query.sort(sort).skip(skip).limit(limit);
      
      if (lean) {
        query = query.lean();
      }
      
      const [documents, total] = await Promise.all([
        query.exec(),
        this.model.countDocuments(filter)
      ]);
      
      return {
        data: documents,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      };
    } catch (error) {
      throw new Error(\`Error finding documents: \${error.message}\`);
    }
  }

  // Find one document
  async findOne(filter, options = {}) {
    try {
      const { populate, select } = options;
      let query = this.model.findOne(filter);
      
      if (select) {
        query = query.select(select);
      }
      
      if (populate) {
        if (Array.isArray(populate)) {
          populate.forEach(pop => query = query.populate(pop));
        } else {
          query = query.populate(populate);
        }
      }
      
      return await query.exec();
    } catch (error) {
      throw new Error(\`Error finding document: \${error.message}\`);
    }
  }

  // Update document by ID
  async updateById(id, updateData, options = {}) {
    try {
      const { 
        runValidators = true, 
        new: returnNew = true,
        populate 
      } = options;
      
      let query = this.model.findByIdAndUpdate(
        id, 
        updateData, 
        { runValidators, new: returnNew }
      );
      
      if (populate) {
        if (Array.isArray(populate)) {
          populate.forEach(pop => query = query.populate(pop));
        } else {
          query = query.populate(populate);
        }
      }
      
      return await query.exec();
    } catch (error) {
      throw new Error(\`Error updating document: \${error.message}\`);
    }
  }

  // Update multiple documents
  async updateMany(filter, updateData, options = {}) {
    try {
      const { runValidators = true } = options;
      return await this.model.updateMany(filter, updateData, { runValidators });
    } catch (error) {
      throw new Error(\`Error updating documents: \${error.message}\`);
    }
  }

  // Delete document by ID
  async deleteById(id) {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(\`Error deleting document: \${error.message}\`);
    }
  }

  // Delete multiple documents
  async deleteMany(filter) {
    try {
      return await this.model.deleteMany(filter);
    } catch (error) {
      throw new Error(\`Error deleting documents: \${error.message}\`);
    }
  }

  // Check if document exists
  async exists(filter) {
    try {
      return await this.model.exists(filter);
    } catch (error) {
      throw new Error(\`Error checking document existence: \${error.message}\`);
    }
  }

  // Count documents
  async count(filter = {}) {
    try {
      return await this.model.countDocuments(filter);
    } catch (error) {
      throw new Error(\`Error counting documents: \${error.message}\`);
    }
  }

  // Aggregation pipeline
  async aggregate(pipeline) {
    try {
      return await this.model.aggregate(pipeline);
    } catch (error) {
      throw new Error(\`Error in aggregation: \${error.message}\`);
    }
  }

  // Bulk operations
  async bulkWrite(operations) {
    try {
      return await this.model.bulkWrite(operations);
    } catch (error) {
      throw new Error(\`Error in bulk write: \${error.message}\`);
    }
  }
}

module.exports = BaseDAO;`
        },
        {
          name: "User DAO Implementation",
          description: "Specific DAO for User model with custom methods",
          code: `const BaseDAO = require('./BaseDAO');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

class UserDAO extends BaseDAO {
  constructor() {
    super(User);
  }

  // Find user by email
  async findByEmail(email) {
    try {
      return await this.model.findOne({ email: email.toLowerCase() });
    } catch (error) {
      throw new Error(\`Error finding user by email: \${error.message}\`);
    }
  }

  // Create user with password hashing
  async createUser(userData) {
    try {
      // Validate email uniqueness
      const existingUser = await this.findByEmail(userData.email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      const user = new this.model(userData);
      return await user.save();
    } catch (error) {
      throw new Error(\`Error creating user: \${error.message}\`);
    }
  }

  // Authenticate user
  async authenticate(email, password) {
    try {
      // Find user with password field
      const user = await this.model.findOne({ email: email.toLowerCase() })
        .select('+password');
      
      if (!user) {
        throw new Error('Invalid credentials');
      }

      // Check if account is locked
      if (user.isLocked) {
        throw new Error('Account is temporarily locked. Please try again later.');
      }

      // Compare password
      const isMatch = await user.comparePassword(password);
      
      if (!isMatch) {
        await user.incLoginAttempts();
        throw new Error('Invalid credentials');
      }

      // Record successful login
      await this.model.recordSuccessfulLogin(user._id);
      
      // Return user without password
      return await this.findById(user._id);
    } catch (error) {
      throw new Error(\`Authentication error: \${error.message}\`);
    }
  }

  // Update user profile
  async updateProfile(userId, profileData) {
    try {
      const allowedUpdates = ['name', 'profile', 'preferences'];
      const updates = {};
      
      // Only allow specific fields to be updated
      Object.keys(profileData).forEach(key => {
        if (allowedUpdates.includes(key)) {
          updates[key] = profileData[key];
        }
      });

      return await this.updateById(userId, updates);
    } catch (error) {
      throw new Error(\`Error updating profile: \${error.message}\`);
    }
  }

  // Change password
  async changePassword(userId, currentPassword, newPassword) {
    try {
      const user = await this.model.findById(userId).select('+password');
      
      if (!user) {
        throw new Error('User not found');
      }

      // Verify current password
      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        throw new Error('Current password is incorrect');
      }

      // Update password
      user.password = newPassword;
      await user.save();

      return { message: 'Password changed successfully' };
    } catch (error) {
      throw new Error(\`Error changing password: \${error.message}\`);
    }
  }

  // Get user stats
  async getUserStats() {
    try {
      return await this.aggregate([
        {
          $group: {
            _id: null,
            totalUsers: { $sum: 1 },
            activeUsers: {
              $sum: { $cond: [{ $eq: ['$isActive', true] }, 1, 0] }
            },
            adminUsers: {
              $sum: { $cond: [{ $eq: ['$role', 'admin'] }, 1, 0] }
            }
          }
        },
        {
          $project: {
            _id: 0,
            totalUsers: 1,
            activeUsers: 1,
            adminUsers: 1,
            inactiveUsers: { $subtract: ['$totalUsers', '$activeUsers'] }
          }
        }
      ]);
    } catch (error) {
      throw new Error(\`Error getting user stats: \${error.message}\`);
    }
  }

  // Find users by role
  async findByRole(role, options = {}) {
    try {
      return await this.find({ role }, options);
    } catch (error) {
      throw new Error(\`Error finding users by role: \${error.message}\`);
    }
  }

  // Search users
  async searchUsers(searchTerm, options = {}) {
    try {
      const filter = {
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { email: { $regex: searchTerm, $options: 'i' } }
        ]
      };
      
      return await this.find(filter, options);
    } catch (error) {
      throw new Error(\`Error searching users: \${error.message}\`);
    }
  }

  // Deactivate user
  async deactivateUser(userId) {
    try {
      return await this.updateById(userId, { isActive: false });
    } catch (error) {
      throw new Error(\`Error deactivating user: \${error.message}\`);
    }
  }

  // Get recently active users
  async getRecentlyActive(days = 30) {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      
      return await this.find(
        { 
          lastLogin: { $gte: cutoffDate },
          isActive: true 
        },
        { 
          sort: { lastLogin: -1 },
          select: 'name email lastLogin'
        }
      );
    } catch (error) {
      throw new Error(\`Error getting recently active users: \${error.message}\`);
    }
  }
}

module.exports = new UserDAO(); // Export singleton instance`
        },
        {
          name: "Product DAO with Aggregation",
          description: "Advanced DAO with complex aggregation pipelines",
          code: `const BaseDAO = require('./BaseDAO');
const Product = require('../models/Product');

class ProductDAO extends BaseDAO {
  constructor() {
    super(Product);
  }

  // Find products by category with pagination
  async findByCategory(category, options = {}) {
    try {
      const filter = { category, isActive: true };
      return await this.find(filter, options);
    } catch (error) {
      throw new Error(\`Error finding products by category: \${error.message}\`);
    }
  }

  // Search products with text and price filters
  async searchProducts(searchTerm, filters = {}, options = {}) {
    try {
      const query = { isActive: true };
      
      // Text search
      if (searchTerm) {
        query.$or = [
          { name: { $regex: searchTerm, $options: 'i' } },
          { description: { $regex: searchTerm, $options: 'i' } },
          { tags: { $in: [new RegExp(searchTerm, 'i')] } }
        ];
      }
      
      // Price range filter
      if (filters.minPrice || filters.maxPrice) {
        query.price = {};
        if (filters.minPrice) query.price.$gte = filters.minPrice;
        if (filters.maxPrice) query.price.$lte = filters.maxPrice;
      }
      
      // Category filter
      if (filters.category) {
        query.category = { $in: Array.isArray(filters.category) ? filters.category : [filters.category] };
      }
      
      // Rating filter
      if (filters.minRating) {
        query.averageRating = { $gte: filters.minRating };
      }
      
      return await this.find(query, options);
    } catch (error) {
      throw new Error(\`Error searching products: \${error.message}\`);
    }
  }

  // Get product analytics
  async getProductAnalytics() {
    try {
      return await this.aggregate([
        {
          $match: { isActive: true }
        },
        {
          $group: {
            _id: '$category',
            totalProducts: { $sum: 1 },
            averagePrice: { $avg: '$price' },
            totalValue: { $sum: { $multiply: ['$price', '$stockQuantity'] } },
            averageRating: { $avg: '$averageRating' },
            totalStock: { $sum: '$stockQuantity' }
          }
        },
        {
          $sort: { totalProducts: -1 }
        },
        {
          $project: {
            category: '$_id',
            _id: 0,
            totalProducts: 1,
            averagePrice: { $round: ['$averagePrice', 2] },
            totalValue: { $round: ['$totalValue', 2] },
            averageRating: { $round: ['$averageRating', 1] },
            totalStock: 1
          }
        }
      ]);
    } catch (error) {
      throw new Error(\`Error getting product analytics: \${error.message}\`);
    }
  }

  // Get top-rated products
  async getTopRatedProducts(limit = 10) {
    try {
      return await this.find(
        { isActive: true, averageRating: { $gte: 4.0 } },
        {
          sort: { averageRating: -1, reviewCount: -1 },
          limit,
          select: 'name price averageRating reviewCount category'
        }
      );
    } catch (error) {
      throw new Error(\`Error getting top-rated products: \${error.message}\`);
    }
  }

  // Get low stock products
  async getLowStockProducts(threshold = 10) {
    try {
      return await this.find(
        { 
          isActive: true, 
          stockQuantity: { $lte: threshold } 
        },
        {
          sort: { stockQuantity: 1 },
          select: 'name stockQuantity price category'
        }
      );
    } catch (error) {
      throw new Error(\`Error getting low stock products: \${error.message}\`);
    }
  }

  // Update product stock
  async updateStock(productId, quantity) {
    try {
      const product = await this.findById(productId);
      if (!product) {
        throw new Error('Product not found');
      }

      const newQuantity = product.stockQuantity + quantity;
      if (newQuantity < 0) {
        throw new Error('Insufficient stock');
      }

      return await this.updateById(productId, { 
        stockQuantity: newQuantity,
        updatedAt: new Date()
      });
    } catch (error) {
      throw new Error(\`Error updating stock: \${error.message}\`);
    }
  }

  // Bulk update prices
  async bulkUpdatePrices(updates) {
    try {
      const operations = updates.map(update => ({
        updateOne: {
          filter: { _id: update.productId },
          update: { 
            price: update.newPrice,
            updatedAt: new Date()
          }
        }
      }));

      return await this.bulkWrite(operations);
    } catch (error) {
      throw new Error(\`Error bulk updating prices: \${error.message}\`);
    }
  }

  // Get product sales summary
  async getProductSalesSummary(productId, startDate, endDate) {
    try {
      return await this.aggregate([
        {
          $match: { _id: productId }
        },
        {
          $lookup: {
            from: 'orders',
            let: { productId: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $in: ['$$productId', '$items.productId'] },
                      { $gte: ['$createdAt', startDate] },
                      { $lte: ['$createdAt', endDate] }
                    ]
                  }
                }
              },
              { $unwind: '$items' },
              {
                $match: {
                  $expr: { $eq: ['$items.productId', '$$productId'] }
                }
              }
            ],
            as: 'sales'
          }
        },
        {
          $project: {
            name: 1,
            price: 1,
            totalSales: { $sum: '$sales.items.quantity' },
            totalRevenue: { 
              $sum: { 
                $multiply: ['$sales.items.quantity', '$sales.items.price'] 
              } 
            },
            averageOrderValue: { $avg: '$sales.items.price' }
          }
        }
      ]);
    } catch (error) {
      throw new Error(\`Error getting product sales summary: \${error.message}\`);
    }
  }
}

module.exports = new ProductDAO();`
        }
      ]
    }
  };

  // Show presentation mode if requested
  if (showPresentation) {
    return (
      <PresentationMode
        slides={databaseSlides}
        lessonTitle="Database Integration"
        presenterNotes={databasePresenterNotes}
        onExit={() => setShowPresentation(false)}
      />
    );
  }

  return (
    <div style={{
      ...styles.container,
      background: 'linear-gradient(135deg, #a8e6cf 0%, #dcedc8 100%)'
    }}>
      <div style={styles.contentWrapper}>
        {/* Header */}
        <div style={styles.header}>
          <div style={{ flex: 1 }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.2)',
              padding: '0.4rem 1rem',
              borderRadius: '20px',
              fontSize: '0.85rem',
              marginBottom: '0.5rem'
            }}>
              Lecture 4 • Database
            </div>
            <h1 style={styles.title}>
              Database Integration
            </h1>
            <p style={styles.subtitle}>
              Master MongoDB data modeling, aggregation, and Express.js integration with DAO patterns
            </p>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: styles.container.padding === '1rem' ? 'column' : 'row',
            gap: '0.5rem',
            alignItems: 'stretch'
          }}>
            <button
              onClick={() => setShowPresentation(true)}
              style={{
                ...styles.backButton,
                background: 'rgba(34, 197, 94, 0.3)',
                border: '1px solid rgba(34, 197, 94, 0.5)'
              }}
            >
              🎤 Start Presentation
            </button>
            <Link to="/" style={styles.backButton}>
              ← Back to Home
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <div style={styles.navigation}>
          {Object.entries(databaseSections).map(([key, section]) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              style={styles.navButton(activeSection === key)}
            >
              <span style={{ fontSize: '1.1rem' }}>{section.icon}</span>
              {section.title}
            </button>
          ))}
        </div>

        {/* Active Section Content */}
        <div style={styles.contentArea}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionIcon}>
              {databaseSections[activeSection].icon}
            </span>
            <div style={{ flex: 1 }}>
              <h2 style={styles.sectionTitle}>
                {databaseSections[activeSection].title}
              </h2>
              <p style={styles.sectionDescription}>
                {databaseSections[activeSection].description}
              </p>
              <div style={styles.infoBox}>
                <strong>Why it matters:</strong> {databaseSections[activeSection].importance}
              </div>
            </div>
          </div>

          {/* Section-specific content */}
          {activeSection === 'introduction' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Core Concepts */}
              <div>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.3rem' }}>Core Concepts:</h3>
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: styles.container.padding === '1rem' ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '1rem'
                }}>
                  {databaseSections[activeSection].concepts.map((concept, idx) => (
                    <div key={idx} style={{
                      background: 'rgba(0,0,0,0.1)',
                      padding: '1.5rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#2d5016' }}>
                        {concept.name}
                      </h4>
                      <p style={{ margin: '0 0 1rem 0', opacity: '0.9', fontSize: '0.9rem' }}>
                        {concept.description}
                      </p>
                      <div style={{ marginBottom: '1rem' }}>
                        <strong>Benefits:</strong>
                        <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem' }}>
                          {concept.benefits.map((benefit, bIdx) => (
                            <li key={bIdx} style={{ margin: '0.25rem 0', fontSize: '0.85rem' }}>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div style={{ 
                        background: 'rgba(45, 80, 22, 0.2)', 
                        padding: '0.5rem', 
                        borderRadius: '4px',
                        fontSize: '0.85rem'
                      }}>
                        <strong>Example:</strong> {concept.example}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.3rem' }}>MongoDB Features:</h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: styles.container.padding === '1rem' ? '1fr 1fr' : 'repeat(3, 1fr)',
                  gap: '0.75rem'
                }}>
                  {databaseSections[activeSection].features.map((feature, idx) => (
                    <div key={idx} style={{
                      background: 'rgba(45, 80, 22, 0.2)',
                      padding: '1rem',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}>
                      <span style={{
                        background: 'rgba(45, 80, 22, 0.5)',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                        flexShrink: 0,
                        color: 'white'
                      }}>
                        ✓
                      </span>
                      <span style={{ fontSize: '0.9rem' }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'modeling' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {databaseSections[activeSection].patterns.map((pattern, idx) => (
                <div key={idx} style={{
                  background: 'rgba(0,0,0,0.1)',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.3rem', color: '#2d5016' }}>
                    {pattern.name}
                  </h3>
                  <p style={{ margin: '0 0 1rem 0', opacity: '0.9' }}>
                    {pattern.description}
                  </p>
                  
                  <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: styles.container.padding === '1rem' ? '1fr' : '1fr 1fr',
                    gap: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <div>
                      <div style={{
                        background: 'rgba(34, 197, 94, 0.2)',
                        padding: '0.75rem',
                        borderRadius: '6px',
                        marginBottom: '0.5rem'
                      }}>
                        <strong>When to use:</strong> {pattern.when}
                      </div>
                      <div>
                        <strong>Advantages:</strong>
                        <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem' }}>
                          {pattern.advantages.map((adv, aIdx) => (
                            <li key={aIdx} style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                              {adv}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div>
                      <strong>Disadvantages:</strong>
                      <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem' }}>
                        {pattern.disadvantages.map((dis, dIdx) => (
                          <li key={dIdx} style={{ margin: '0.25rem 0', fontSize: '0.9rem', color: '#d97706' }}>
                            {dis}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => toggleCode(`pattern-${idx}`)}
                      style={styles.toggleButton(showCode[`pattern-${idx}`])}
                    >
                      {showCode[`pattern-${idx}`] ? 'Hide Example' : 'Show Example'}
                    </button>
                    {showCode[`pattern-${idx}`] && (
                      <pre style={styles.codeBlock}>
                        <code>{pattern.example}</code>
                      </pre>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'aggregation' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.3rem' }}>Aggregation Pipeline Stages:</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {databaseSections[activeSection].stages.map((stage, idx) => (
                    <div key={idx} style={{
                      background: 'rgba(0,0,0,0.1)',
                      padding: '1.5rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        marginBottom: '1rem'
                      }}>
                        <span style={{
                          background: 'rgba(45, 80, 22, 0.8)',
                          color: 'white',
                          padding: '0.5rem 1rem',
                          borderRadius: '20px',
                          fontWeight: 'bold',
                          fontSize: '0.9rem',
                          fontFamily: 'monospace'
                        }}>
                          {stage.name}
                        </span>
                        <span style={{ fontSize: '1rem', opacity: '0.9' }}>
                          {stage.description}
                        </span>
                      </div>
                      <div style={{
                        background: 'rgba(255,255,255,0.1)',
                        padding: '1rem',
                        borderRadius: '6px',
                        fontFamily: 'monospace',
                        fontSize: '0.9rem'
                      }}>
                        {stage.example}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'integration' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {databaseSections[activeSection].examples.map((example, idx) => (
                <div key={idx} style={styles.exampleContainer}>
                  <div style={styles.exampleHeader}>
                    <h3 style={styles.exampleTitle}>{example.name}</h3>
                    <button
                      onClick={() => toggleCode(`integration-${idx}`)}
                      style={styles.toggleButton(showCode[`integration-${idx}`])}
                    >
                      {showCode[`integration-${idx}`] ? 'Hide Code' : 'Show Code'}
                    </button>
                  </div>
                  <p style={{ margin: '0 0 1rem 0', opacity: '0.9' }}>{example.description}</p>
                  {showCode[`integration-${idx}`] && (
                    <pre style={styles.codeBlock}>
                      <code>{example.code}</code>
                    </pre>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeSection === 'dao' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {databaseSections[activeSection].examples.map((example, idx) => (
                <div key={idx} style={styles.exampleContainer}>
                  <div style={styles.exampleHeader}>
                    <h3 style={styles.exampleTitle}>{example.name}</h3>
                    <button
                      onClick={() => toggleCode(`dao-${idx}`)}
                      style={styles.toggleButton(showCode[`dao-${idx}`])}
                    >
                      {showCode[`dao-${idx}`] ? 'Hide Code' : 'Show Code'}
                    </button>
                  </div>
                  <p style={{ margin: '0 0 1rem 0', opacity: '0.9' }}>{example.description}</p>
                  {showCode[`dao-${idx}`] && (
                    <pre style={styles.codeBlock}>
                      <code>{example.code}</code>
                    </pre>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation to Course Completion */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'rgba(0,0,0,0.1)',
          borderRadius: '8px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 0.5rem 0' }}>🎉 Lecture 4 Complete!</h3>
            <p style={{ margin: '0', opacity: '0.8' }}>
              You've mastered backend development fundamentals: REST APIs, Authentication, and Database Integration
            </p>
          </div>
        </div>
      </div>
      
      <PresenterNotes 
        notes={databasePresenterNotes} 
        lessonTitle="Database Integration" 
      />
    </div>
  );
};

// Presenter notes for Database
const databasePresenterNotes = [
  {
    section: "MongoDB Overview",
    duration: "8-10 minutes",
    keyPoints: [
      "MongoDB is a document database with flexible schemas",
      "Documents are stored as BSON (Binary JSON)",
      "No predefined relationships - design for your queries",
      "Horizontal scaling through sharding"
    ],
    script: `MongoDB represents a different paradigm from traditional SQL databases. Instead of tables with fixed schemas, we have collections of documents that can vary in structure. This flexibility is both a strength and a challenge.

The key insight is that MongoDB works best when you design your data model around how you'll query it, not around normalized relationships. This is called 'query-driven design' and it's the opposite of how we typically approach SQL database design.`,
    interactions: [
      {
        type: "Comparison",
        description: "Show side-by-side comparison of SQL table vs MongoDB document"
      },
      {
        type: "Use Cases",
        description: "Discuss when to choose MongoDB vs SQL databases"
      }
    ]
  },
  {
    section: "Data Modeling Patterns",
    duration: "15-18 minutes",
    keyPoints: [
      "Embedding vs Referencing is the key decision",
      "Consider document size limits (16MB)",
      "Design for your most common queries",
      "Denormalization is often beneficial"
    ],
    script: `The embedding vs referencing decision is crucial in MongoDB. Embed when data is accessed together and doesn't grow unbounded. Reference when you have one-to-many relationships or when data is accessed independently.

Remember, there's no 'right' answer - it depends on your access patterns. You might even use a hybrid approach, embedding some data for quick access while referencing for complete details.`,
    interactions: [
      {
        type: "Design Exercise",
        description: "Work through designing a blog schema with students"
      },
      {
        type: "Trade-offs Discussion",
        description: "Discuss when each pattern works best"
      }
    ]
  },
  {
    section: "DAO Pattern Implementation",
    duration: "20-25 minutes",
    keyPoints: [
      "DAO provides clean separation between business logic and data access",
      "Base class handles common operations",
      "Specific DAOs add domain-specific methods",
      "Error handling is centralized and consistent"
    ],
    script: `The DAO pattern might seem like overkill for simple applications, but it pays dividends as your application grows. It provides a clean interface between your business logic and database operations.

By creating a base DAO class, we eliminate code duplication and ensure consistent error handling. Specific DAOs can then add methods that are tailored to their domain needs, like user authentication or product search.`,
    interactions: [
      {
        type: "Architecture Discussion",
        description: "Discuss how DAO fits into overall application architecture"
      },
      {
        type: "Live Coding",
        description: "Implement a simple DAO method together"
      }
    ]
  }
];

// Slide data for presentation mode
const databaseSlides = [
  {
    title: "Database Integration",
    subtitle: "MongoDB, Data Modeling, and DAO Patterns",
    background: "linear-gradient(135deg, #a8e6cf 0%, #dcedc8 100%)"
  },
  {
    title: "🍃 MongoDB Overview",
    bullets: [
      "Document-oriented NoSQL database",
      "Flexible schemas with BSON documents",
      "Horizontal scaling and replication",
      "Rich query language and aggregation framework"
    ],
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
  },
  {
    title: "🏗️ Data Modeling Patterns",
    bullets: [
      "Embedding: Related data in same document",
      "Referencing: Links between documents",
      "Hybrid: Strategic combination of both",
      "Design for your query patterns"
    ],
    background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
  },
  {
    title: "🔄 Aggregation Framework",
    bullets: [
      "$match - Filter documents",
      "$group - Group and calculate",
      "$project - Transform fields",
      "$lookup - Join collections"
    ],
    background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
  },
  {
    title: "🔗 Express.js Integration",
    bullets: [
      "Mongoose ODM for schema definition",
      "Connection management and error handling",
      "Validation and middleware",
      "Performance optimization"
    ],
    background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
  },
  {
    title: "🏛️ DAO Pattern",
    bullets: [
      "Clean separation of concerns",
      "Reusable base class with common operations",
      "Domain-specific methods in specialized DAOs",
      "Consistent error handling and testing"
    ],
    background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
  }
];

export default Database;