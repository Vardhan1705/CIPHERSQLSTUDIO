import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SQLEditor from '../../components/Editor/SQLEditor';
import ResultsTable from '../../components/Results/ResultsTable';
import HintBox from '../../components/HintBox/HintBox';
import './AssignmentAttempt.scss';

// Mock functions with different questions for each level
const getAssignmentById = async (id) => {
  // Different assignments for different levels
//   const mockAssignments = {
//     // BEGINNER LEVEL
//     'beginner1': {
//       _id: 'beginner1',
//       title: 'Retrieve All Data',
//       description: 'Get all columns from the customers table',
//       difficulty: 'beginner',
//       expectedQuery: 'SELECT * FROM customers;',
//       schemaDefinition: {
//         customers: [
//           { name: 'customer_id', type: 'INTEGER', nullable: false },
//           { name: 'first_name', type: 'VARCHAR(50)', nullable: false },
//           { name: 'last_name', type: 'VARCHAR(50)', nullable: false },
//           { name: 'email', type: 'VARCHAR(100)', nullable: false },
//           { name: 'city', type: 'VARCHAR(50)', nullable: true }
//         ]
//       },
//       sampleData: {
//         customers: [
//           { customer_id: 1, first_name: 'John', last_name: 'Doe', email: 'john@example.com', city: 'New York' },
//           { customer_id: 2, first_name: 'Jane', last_name: 'Smith', email: 'jane@example.com', city: 'Los Angeles' },
//           { customer_id: 3, first_name: 'Bob', last_name: 'Johnson', email: 'bob@example.com', city: 'Chicago' },
//           { customer_id: 4, first_name: 'Alice', last_name: 'Brown', email: 'alice@example.com', city: 'Miami' }
//         ]
//       },
//       hints: [
//         'Use SELECT * to get all columns',
//         'The table name is "customers"',
//         'Remember to use semicolon at the end'
//       ]
//     },
//     'beginner2': {
//       _id: 'beginner2',
//       title: 'Select Specific Columns',
//       description: 'Get only first_name, last_name, and email from customers',
//       difficulty: 'beginner',
//       expectedQuery: 'SELECT first_name, last_name, email FROM customers;',
//       schemaDefinition: {
//         customers: [
//           { name: 'customer_id', type: 'INTEGER', nullable: false },
//           { name: 'first_name', type: 'VARCHAR(50)', nullable: false },
//           { name: 'last_name', type: 'VARCHAR(50)', nullable: false },
//           { name: 'email', type: 'VARCHAR(100)', nullable: false },
//           { name: 'city', type: 'VARCHAR(50)', nullable: true }
//         ]
//       },
//       sampleData: {
//         customers: [
//           { customer_id: 1, first_name: 'John', last_name: 'Doe', email: 'john@example.com', city: 'New York' },
//           { customer_id: 2, first_name: 'Jane', last_name: 'Smith', email: 'jane@example.com', city: 'Los Angeles' }
//         ]
//       },
//       hints: [
//         'List columns separated by commas',
//         'Do not use * (asterisk)',
//         'Columns: first_name, last_name, email'
//       ]
//     },
//     'beginner3': {
//       _id: 'beginner3',
//       title: 'Filter with WHERE',
//       description: 'Find customers from New York city',
//       difficulty: 'beginner',
//       expectedQuery: 'SELECT * FROM customers WHERE city = \'New York\';',
//       schemaDefinition: {
//         customers: [
//           { name: 'customer_id', type: 'INTEGER', nullable: false },
//           { name: 'first_name', type: 'VARCHAR(50)', nullable: false },
//           { name: 'last_name', type: 'VARCHAR(50)', nullable: false },
//           { name: 'email', type: 'VARCHAR(100)', nullable: false },
//           { name: 'city', type: 'VARCHAR(50)', nullable: true }
//         ]
//       },
//       sampleData: {
//         customers: [
//           { customer_id: 1, first_name: 'John', last_name: 'Doe', email: 'john@example.com', city: 'New York' },
//           { customer_id: 2, first_name: 'Jane', last_name: 'Smith', email: 'jane@example.com', city: 'Los Angeles' },
//           { customer_id: 3, first_name: 'Bob', last_name: 'Johnson', email: 'bob@example.com', city: 'New York' },
//           { customer_id: 4, first_name: 'Alice', last_name: 'Brown', email: 'alice@example.com', city: 'Miami' }
//         ]
//       },
//       hints: [
//         'Use WHERE clause',
//         'City value needs single quotes: \'New York\'',
//         'Use = operator for exact match'
//       ]
//     },
    
//     // INTERMEDIATE LEVEL
//     'intermediate1': {
//       _id: 'intermediate1',
//       title: 'Sort Results',
//       description: 'List products ordered by price from highest to lowest',
//       difficulty: 'intermediate',
//       expectedQuery: 'SELECT * FROM products ORDER BY price DESC;',
//       schemaDefinition: {
//         products: [
//           { name: 'product_id', type: 'INTEGER', nullable: false },
//           { name: 'product_name', type: 'VARCHAR(100)', nullable: false },
//           { name: 'category', type: 'VARCHAR(50)', nullable: false },
//           { name: 'price', type: 'DECIMAL(10,2)', nullable: false },
//           { name: 'stock_quantity', type: 'INTEGER', nullable: false }
//         ]
//       },
//       sampleData: {
//         products: [
//           { product_id: 1, product_name: 'Laptop', category: 'Electronics', price: 999.99, stock_quantity: 50 },
//           { product_id: 2, product_name: 'Mouse', category: 'Electronics', price: 29.99, stock_quantity: 200 },
//           { product_id: 3, product_name: 'Desk', category: 'Furniture', price: 299.99, stock_quantity: 30 },
//           { product_id: 4, product_name: 'Chair', category: 'Furniture', price: 149.99, stock_quantity: 75 }
//         ]
//       },
//       hints: [
//         'Use ORDER BY to sort',
//         'DESC for descending order (highest first)',
//         'Sort by price column'
//       ]
//     },
//     'intermediate2': {
//       _id: 'intermediate2',
//       title: 'Multiple Conditions',
//       description: 'Find Electronics products with price less than 500',
//       difficulty: 'intermediate',
//       expectedQuery: 'SELECT * FROM products WHERE category = \'Electronics\' AND price < 500;',
//       schemaDefinition: {
//         products: [
//           { name: 'product_id', type: 'INTEGER', nullable: false },
//           { name: 'product_name', type: 'VARCHAR(100)', nullable: false },
//           { name: 'category', type: 'VARCHAR(50)', nullable: false },
//           { name: 'price', type: 'DECIMAL(10,2)', nullable: false },
//           { name: 'stock_quantity', type: 'INTEGER', nullable: false }
//         ]
//       },
//       sampleData: {
//         products: [
//           { product_id: 1, product_name: 'Laptop', category: 'Electronics', price: 999.99, stock_quantity: 50 },
//           { product_id: 2, product_name: 'Mouse', category: 'Electronics', price: 29.99, stock_quantity: 200 },
//           { product_id: 3, product_name: 'Desk', category: 'Furniture', price: 299.99, stock_quantity: 30 },
//           { product_id: 4, product_name: 'Chair', category: 'Furniture', price: 149.99, stock_quantity: 75 },
//           { product_id: 5, product_name: 'Keyboard', category: 'Electronics', price: 79.99, stock_quantity: 150 }
//         ]
//       },
//       hints: [
//         'Use AND to combine conditions',
//         'Category should be Electronics',
//         'Price should be less than 500',
//         'Use < operator for less than'
//       ]
//     },
//     'intermediate3': {
//       _id: 'intermediate3',
//       title: 'Count Records',
//       description: 'Count how many products are in each category',
//       difficulty: 'intermediate',
//       expectedQuery: 'SELECT category, COUNT(*) FROM products GROUP BY category;',
//       schemaDefinition: {
//         products: [
//           { name: 'product_id', type: 'INTEGER', nullable: false },
//           { name: 'product_name', type: 'VARCHAR(100)', nullable: false },
//           { name: 'category', type: 'VARCHAR(50)', nullable: false },
//           { name: 'price', type: 'DECIMAL(10,2)', nullable: false },
//           { name: 'stock_quantity', type: 'INTEGER', nullable: false }
//         ]
//       },
//       sampleData: {
//         products: [
//           { product_id: 1, product_name: 'Laptop', category: 'Electronics', price: 999.99, stock_quantity: 50 },
//           { product_id: 2, product_name: 'Mouse', category: 'Electronics', price: 29.99, stock_quantity: 200 },
//           { product_id: 3, product_name: 'Desk', category: 'Furniture', price: 299.99, stock_quantity: 30 },
//           { product_id: 4, product_name: 'Chair', category: 'Furniture', price: 149.99, stock_quantity: 75 },
//           { product_id: 5, product_name: 'Monitor', category: 'Electronics', price: 299.99, stock_quantity: 40 }
//         ]
//       },
//       hints: [
//         'Use COUNT(*) to count rows',
//         'Use GROUP BY to group by category',
//         'Select both category and COUNT(*)'
//       ]
//     },
    
//     // ADVANCED LEVEL
//     'advanced1': {
//       _id: 'advanced1',
//       title: 'Table Join',
//       description: 'Get order details with customer names',
//       difficulty: 'advanced',
//       expectedQuery: 'SELECT o.order_id, o.order_date, c.first_name, c.last_name FROM orders o JOIN customers c ON o.customer_id = c.customer_id;',
//       schemaDefinition: {
//         customers: [
//           { name: 'customer_id', type: 'INTEGER', nullable: false },
//           { name: 'first_name', type: 'VARCHAR(50)', nullable: false },
//           { name: 'last_name', type: 'VARCHAR(50)', nullable: false },
//           { name: 'email', type: 'VARCHAR(100)', nullable: false }
//         ],
//         orders: [
//           { name: 'order_id', type: 'INTEGER', nullable: false },
//           { name: 'customer_id', type: 'INTEGER', nullable: false },
//           { name: 'order_date', type: 'DATE', nullable: false },
//           { name: 'total_amount', type: 'DECIMAL(10,2)', nullable: false }
//         ]
//       },
//       sampleData: {
//         customers: [
//           { customer_id: 1, first_name: 'John', last_name: 'Doe', email: 'john@example.com' },
//           { customer_id: 2, first_name: 'Jane', last_name: 'Smith', email: 'jane@example.com' }
//         ],
//         orders: [
//           { order_id: 101, customer_id: 1, order_date: '2024-01-15', total_amount: 150.75 },
//           { order_id: 102, customer_id: 2, order_date: '2024-01-16', total_amount: 299.99 },
//           { order_id: 103, customer_id: 1, order_date: '2024-01-17', total_amount: 89.50 }
//         ]
//       },
//       hints: [
//         'Use JOIN to combine tables',
//         'Join condition: o.customer_id = c.customer_id',
//         'Use table aliases (o for orders, c for customers)',
//         'Select specific columns from both tables'
//       ]
//     },
//     'advanced2': {
//       _id: 'advanced2',
//       title: 'Aggregate Functions',
//       description: 'Calculate average price per category',
//       difficulty: 'advanced',
//       expectedQuery: 'SELECT category, AVG(price) as average_price FROM products GROUP BY category;',
//       schemaDefinition: {
//         products: [
//           { name: 'product_id', type: 'INTEGER', nullable: false },
//           { name: 'product_name', type: 'VARCHAR(100)', nullable: false },
//           { name: 'category', type: 'VARCHAR(50)', nullable: false },
//           { name: 'price', type: 'DECIMAL(10,2)', nullable: false }
//         ]
//       },
//       sampleData: {
//         products: [
//           { product_id: 1, product_name: 'Laptop', category: 'Electronics', price: 999.99 },
//           { product_id: 2, product_name: 'Mouse', category: 'Electronics', price: 29.99 },
//           { product_id: 3, product_name: 'Desk', category: 'Furniture', price: 299.99 },
//           { product_id: 4, product_name: 'Chair', category: 'Furniture', price: 149.99 },
//           { product_id: 5, product_name: 'Keyboard', category: 'Electronics', price: 79.99 }
//         ]
//       },
//       hints: [
//         'Use AVG() function for average',
//         'Use GROUP BY category',
//         'Use AS to alias the average column',
//         'Select both category and AVG(price)'
//       ]
//     },
//     'advanced3': {
//       _id: 'advanced3',
//       title: 'Subquery',
//       description: 'Find products priced above average',
//       difficulty: 'advanced',
//       expectedQuery: 'SELECT * FROM products WHERE price > (SELECT AVG(price) FROM products);',
//       schemaDefinition: {
//         products: [
//           { name: 'product_id', type: 'INTEGER', nullable: false },
//           { name: 'product_name', type: 'VARCHAR(100)', nullable: false },
//           { name: 'category', type: 'VARCHAR(50)', nullable: false },
//           { name: 'price', type: 'DECIMAL(10,2)', nullable: false }
//         ]
//       },
//       sampleData: {
//         products: [
//           { product_id: 1, product_name: 'Laptop', category: 'Electronics', price: 999.99 },
//           { product_id: 2, product_name: 'Mouse', category: 'Electronics', price: 29.99 },
//           { product_id: 3, product_name: 'Desk', category: 'Furniture', price: 299.99 },
//           { product_id: 4, product_name: 'Chair', category: 'Furniture', price: 149.99 }
//         ]
//       },
//       hints: [
//         'First calculate average in subquery',
//         'Subquery: (SELECT AVG(price) FROM products)',
//         'Compare price > average',
//         'Subquery must be in parentheses'
//       ]
//     }
//   };
// Replace ONLY the mockAssignments object in getAssignmentById function
// Find this part (lines 10-300) and replace it:

const mockAssignments = {
  // BEGINNER LEVEL - Different real-world scenarios
  'beginner1': {
    _id: 'beginner1',
    title: 'Movie Collection',
    description: 'List all movies in your collection with their release year',
    difficulty: 'beginner',
    expectedQuery: 'SELECT * FROM movies;',
    schemaDefinition: {
      movies: [
        { name: 'movie_id', type: 'INTEGER', nullable: false },
        { name: 'title', type: 'VARCHAR(100)', nullable: false },
        { name: 'director', type: 'VARCHAR(50)', nullable: false },
        { name: 'release_year', type: 'INTEGER', nullable: false },
        { name: 'genre', type: 'VARCHAR(30)', nullable: true },
        { name: 'rating', type: 'DECIMAL(3,1)', nullable: true }
      ]
    },
    sampleData: {
      movies: [
        { movie_id: 1, title: 'The Matrix', director: 'Wachowski Sisters', release_year: 1999, genre: 'Sci-Fi', rating: 8.7 },
        { movie_id: 2, title: 'Inception', director: 'Christopher Nolan', release_year: 2010, genre: 'Sci-Fi', rating: 8.8 },
        { movie_id: 3, title: 'Parasite', director: 'Bong Joon Ho', release_year: 2019, genre: 'Thriller', rating: 8.6 },
        { movie_id: 4, title: 'La La Land', director: 'Damien Chazelle', release_year: 2016, genre: 'Musical', rating: 8.0 }
      ]
    },
    hints: [
      'Use SELECT * to see all movie details',
      'Table name is "movies"',
      'You will see title, director, year, genre, and rating'
    ]
  },
  
  'beginner2': {
    _id: 'beginner2',
    title: 'Book Store Inventory',
    description: 'Get book titles, authors, and prices (exclude other details)',
    difficulty: 'beginner',
    expectedQuery: 'SELECT title, author, price FROM books;',
    schemaDefinition: {
      books: [
        { name: 'book_id', type: 'INTEGER', nullable: false },
        { name: 'title', type: 'VARCHAR(150)', nullable: false },
        { name: 'author', type: 'VARCHAR(100)', nullable: false },
        { name: 'genre', type: 'VARCHAR(50)', nullable: true },
        { name: 'price', type: 'DECIMAL(6,2)', nullable: false },
        { name: 'pages', type: 'INTEGER', nullable: true }
      ]
    },
    sampleData: {
      books: [
        { book_id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', price: 12.99, pages: 180 },
        { book_id: 2, title: '1984', author: 'George Orwell', genre: 'Dystopian', price: 9.99, pages: 328 },
        { book_id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Classic', price: 14.99, pages: 324 },
        { book_id: 4, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', price: 16.99, pages: 310 }
      ]
    },
    hints: [
      'Select only title, author, and price columns',
      'Separate column names with commas',
      'Do not use * (asterisk)'
    ]
  },
  
  'beginner3': {
    _id: 'beginner3',
    title: 'Music Playlist Filter',
    description: 'Find all Rock songs in your playlist',
    difficulty: 'beginner',
    expectedQuery: 'SELECT * FROM songs WHERE genre = \'Rock\';',
    schemaDefinition: {
      songs: [
        { name: 'song_id', type: 'INTEGER', nullable: false },
        { name: 'title', type: 'VARCHAR(100)', nullable: false },
        { name: 'artist', type: 'VARCHAR(50)', nullable: false },
        { name: 'genre', type: 'VARCHAR(30)', nullable: false },
        { name: 'duration', type: 'INTEGER', nullable: false },
        { name: 'release_year', type: 'INTEGER', nullable: true }
      ]
    },
    sampleData: {
      songs: [
        { song_id: 1, title: 'Bohemian Rhapsody', artist: 'Queen', genre: 'Rock', duration: 354, release_year: 1975 },
        { song_id: 2, title: 'Billie Jean', artist: 'Michael Jackson', genre: 'Pop', duration: 294, release_year: 1982 },
        { song_id: 3, title: 'Stairway to Heaven', artist: 'Led Zeppelin', genre: 'Rock', duration: 482, release_year: 1971 },
        { song_id: 4, title: 'Smells Like Teen Spirit', artist: 'Nirvana', genre: 'Grunge', duration: 301, release_year: 1991 },
        { song_id: 5, title: 'Back in Black', artist: 'AC/DC', genre: 'Rock', duration: 255, release_year: 1980 }
      ]
    },
    hints: [
      'Filter using WHERE clause',
      'Genre should be exactly "Rock"',
      'Use single quotes around Rock'
    ]
  },
  
  // INTERMEDIATE LEVEL - More challenging scenarios
  'intermediate1': {
    _id: 'intermediate1',
    title: 'Video Game Rankings',
    description: 'List video games sorted by user rating (highest first)',
    difficulty: 'intermediate',
    expectedQuery: 'SELECT * FROM video_games ORDER BY rating DESC;',
    schemaDefinition: {
      video_games: [
        { name: 'game_id', type: 'INTEGER', nullable: false },
        { name: 'title', type: 'VARCHAR(100)', nullable: false },
        { name: 'developer', type: 'VARCHAR(50)', nullable: false },
        { name: 'platform', type: 'VARCHAR(20)', nullable: false },
        { name: 'release_year', type: 'INTEGER', nullable: false },
        { name: 'rating', type: 'DECIMAL(3,1)', nullable: false },
        { name: 'price', type: 'DECIMAL(6,2)', nullable: false }
      ]
    },
    sampleData: {
      video_games: [
        { game_id: 1, title: 'The Legend of Zelda: Breath of the Wild', developer: 'Nintendo', platform: 'Switch', release_year: 2017, rating: 9.7, price: 59.99 },
        { game_id: 2, title: 'Red Dead Redemption 2', developer: 'Rockstar', platform: 'Multi', release_year: 2018, rating: 9.8, price: 59.99 },
        { game_id: 3, title: 'Minecraft', developer: 'Mojang', platform: 'Multi', release_year: 2011, rating: 9.0, price: 26.95 },
        { game_id: 4, title: 'Portal 2', developer: 'Valve', platform: 'PC', release_year: 2011, rating: 9.5, price: 9.99 },
        { game_id: 5, title: 'The Witcher 3', developer: 'CD Projekt', platform: 'Multi', release_year: 2015, rating: 9.3, price: 39.99 }
      ]
    },
    hints: [
      'Sort by rating column',
      'Use DESC for highest rating first',
      'ORDER BY should come at the end'
    ]
  },
  
  'intermediate2': {
    _id: 'intermediate2',
    title: 'Smartphone Finder',
    description: 'Find Android phones with price less than $500',
    difficulty: 'intermediate',
    expectedQuery: 'SELECT * FROM smartphones WHERE os = \'Android\' AND price < 500;',
    schemaDefinition: {
      smartphones: [
        { name: 'phone_id', type: 'INTEGER', nullable: false },
        { name: 'model', type: 'VARCHAR(50)', nullable: false },
        { name: 'brand', type: 'VARCHAR(30)', nullable: false },
        { name: 'os', type: 'VARCHAR(20)', nullable: false },
        { name: 'screen_size', type: 'DECIMAL(3,1)', nullable: false },
        { name: 'price', type: 'DECIMAL(7,2)', nullable: false },
        { name: 'release_year', type: 'INTEGER', nullable: false }
      ]
    },
    sampleData: {
      smartphones: [
        { phone_id: 1, model: 'iPhone 15', brand: 'Apple', os: 'iOS', screen_size: 6.1, price: 799, release_year: 2023 },
        { phone_id: 2, model: 'Galaxy S23', brand: 'Samsung', os: 'Android', screen_size: 6.1, price: 799, release_year: 2023 },
        { phone_id: 3, model: 'Pixel 7a', brand: 'Google', os: 'Android', screen_size: 6.1, price: 499, release_year: 2023 },
        { phone_id: 4, model: 'Nord 3', brand: 'OnePlus', os: 'Android', screen_size: 6.7, price: 449, release_year: 2023 },
        { phone_id: 5, model: 'Moto G Stylus', brand: 'Motorola', os: 'Android', screen_size: 6.8, price: 299, release_year: 2023 }
      ]
    },
    hints: [
      'Two conditions: os = "Android" AND price < 500',
      'AND operator combines conditions',
      'Use < for less than comparison'
    ]
  },
  
  'intermediate3': {
    _id: 'intermediate3',
    title: 'Recipe Collection Stats',
    description: 'Count how many recipes you have in each cuisine type',
    difficulty: 'intermediate',
    expectedQuery: 'SELECT cuisine, COUNT(*) FROM recipes GROUP BY cuisine;',
    schemaDefinition: {
      recipes: [
        { name: 'recipe_id', type: 'INTEGER', nullable: false },
        { name: 'name', type: 'VARCHAR(100)', nullable: false },
        { name: 'cuisine', type: 'VARCHAR(30)', nullable: false },
        { name: 'prep_time', type: 'INTEGER', nullable: false },
        { name: 'cook_time', type: 'INTEGER', nullable: false },
        { name: 'difficulty', type: 'VARCHAR(20)', nullable: false }
      ]
    },
    sampleData: {
      recipes: [
        { recipe_id: 1, name: 'Spaghetti Carbonara', cuisine: 'Italian', prep_time: 15, cook_time: 15, difficulty: 'Medium' },
        { recipe_id: 2, name: 'Chicken Tikka Masala', cuisine: 'Indian', prep_time: 30, cook_time: 40, difficulty: 'Medium' },
        { recipe_id: 3, name: 'Margherita Pizza', cuisine: 'Italian', prep_time: 20, cook_time: 15, difficulty: 'Easy' },
        { recipe_id: 4, name: 'Pad Thai', cuisine: 'Thai', prep_time: 25, cook_time: 10, difficulty: 'Medium' },
        { recipe_id: 5, name: 'Beef Bourguignon', cuisine: 'French', prep_time: 30, cook_time: 180, difficulty: 'Hard' },
        { recipe_id: 6, name: 'Sushi Rolls', cuisine: 'Japanese', prep_time: 40, cook_time: 0, difficulty: 'Hard' }
      ]
    },
    hints: [
      'Use COUNT(*) to count recipes',
      'GROUP BY cuisine to get counts per cuisine',
      'Select both cuisine and COUNT(*)'
    ]
  },
  
  // ADVANCED LEVEL - Complex real-world scenarios
  'advanced1': {
    _id: 'advanced1',
    title: 'E-commerce Order Analysis',
    description: 'Get order details with customer email and product name',
    difficulty: 'advanced',
    expectedQuery: 'SELECT o.order_id, o.order_date, c.email, p.product_name FROM orders o JOIN customers c ON o.customer_id = c.customer_id JOIN products p ON o.product_id = p.product_id;',
    schemaDefinition: {
      customers: [
        { name: 'customer_id', type: 'INTEGER', nullable: false },
        { name: 'name', type: 'VARCHAR(100)', nullable: false },
        { name: 'email', type: 'VARCHAR(100)', nullable: false },
        { name: 'join_date', type: 'DATE', nullable: false }
      ],
      products: [
        { name: 'product_id', type: 'INTEGER', nullable: false },
        { name: 'product_name', type: 'VARCHAR(100)', nullable: false },
        { name: 'category', type: 'VARCHAR(50)', nullable: false },
        { name: 'price', type: 'DECIMAL(10,2)', nullable: false }
      ],
      orders: [
        { name: 'order_id', type: 'INTEGER', nullable: false },
        { name: 'customer_id', type: 'INTEGER', nullable: false },
        { name: 'product_id', type: 'INTEGER', nullable: false },
        { name: 'order_date', type: 'DATE', nullable: false },
        { name: 'quantity', type: 'INTEGER', nullable: false }
      ]
    },
    sampleData: {
      customers: [
        { customer_id: 1, name: 'Alice Johnson', email: 'alice@example.com', join_date: '2023-01-15' },
        { customer_id: 2, name: 'Bob Smith', email: 'bob@example.com', join_date: '2023-02-20' }
      ],
      products: [
        { product_id: 101, product_name: 'Wireless Headphones', category: 'Electronics', price: 129.99 },
        { product_id: 102, product_name: 'Yoga Mat', category: 'Fitness', price: 34.99 }
      ],
      orders: [
        { order_id: 1001, customer_id: 1, product_id: 101, order_date: '2024-01-10', quantity: 1 },
        { order_id: 1002, customer_id: 2, product_id: 102, order_date: '2024-01-12', quantity: 2 },
        { order_id: 1003, customer_id: 1, product_id: 102, order_date: '2024-01-15', quantity: 1 }
      ]
    },
    hints: [
      'Need to JOIN three tables: orders, customers, products',
      'First join: orders.customer_id = customers.customer_id',
      'Second join: orders.product_id = products.product_id',
      'Select specific columns from each table'
    ]
  },
  
  'advanced2': {
    _id: 'advanced2',
    title: 'Student Performance Analysis',
    description: 'Calculate average grade for each subject',
    difficulty: 'advanced',
    expectedQuery: 'SELECT subject, AVG(grade) as average_grade FROM student_grades GROUP BY subject;',
    schemaDefinition: {
      student_grades: [
        { name: 'record_id', type: 'INTEGER', nullable: false },
        { name: 'student_name', type: 'VARCHAR(50)', nullable: false },
        { name: 'subject', type: 'VARCHAR(30)', nullable: false },
        { name: 'grade', type: 'INTEGER', nullable: false },
        { name: 'semester', type: 'VARCHAR(10)', nullable: false }
      ]
    },
    sampleData: {
      student_grades: [
        { record_id: 1, student_name: 'John Doe', subject: 'Mathematics', grade: 85, semester: 'Fall 2023' },
        { record_id: 2, student_name: 'John Doe', subject: 'Physics', grade: 78, semester: 'Fall 2023' },
        { record_id: 3, student_name: 'Jane Smith', subject: 'Mathematics', grade: 92, semester: 'Fall 2023' },
        { record_id: 4, student_name: 'Jane Smith', subject: 'Physics', grade: 88, semester: 'Fall 2023' },
        { record_id: 5, student_name: 'Mike Johnson', subject: 'Mathematics', grade: 76, semester: 'Fall 2023' },
        { record_id: 6, student_name: 'Mike Johnson', subject: 'Chemistry', grade: 91, semester: 'Fall 2023' }
      ]
    },
    hints: [
      'Use AVG() function to calculate average',
      'GROUP BY subject to get average per subject',
      'Use AS to give the average column a name',
      'Select subject and AVG(grade)'
    ]
  },
  
  'advanced3': {
    _id: 'advanced3',
    title: 'Employee Salary Analysis',
    description: 'Find employees earning more than the company average salary',
    difficulty: 'advanced',
    expectedQuery: 'SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);',
    schemaDefinition: {
      employees: [
        { name: 'employee_id', type: 'INTEGER', nullable: false },
        { name: 'name', type: 'VARCHAR(100)', nullable: false },
        { name: 'department', type: 'VARCHAR(50)', nullable: false },
        { name: 'position', type: 'VARCHAR(50)', nullable: false },
        { name: 'salary', type: 'DECIMAL(10,2)', nullable: false },
        { name: 'hire_date', type: 'DATE', nullable: false }
      ]
    },
    sampleData: {
      employees: [
        { employee_id: 1, name: 'Sarah Chen', department: 'Engineering', position: 'Senior Developer', salary: 120000, hire_date: '2020-03-15' },
        { employee_id: 2, name: 'David Park', department: 'Marketing', position: 'Marketing Manager', salary: 85000, hire_date: '2021-06-22' },
        { employee_id: 3, name: 'Lisa Wang', department: 'Engineering', position: 'Lead Developer', salary: 140000, hire_date: '2019-08-10' },
        { employee_id: 4, name: 'Tom Wilson', department: 'HR', position: 'HR Specialist', salary: 65000, hire_date: '2022-01-30' },
        { employee_id: 5, name: 'Maria Garcia', department: 'Sales', position: 'Sales Director', salary: 110000, hire_date: '2020-11-05' }
      ]
    },
    hints: [
      'First calculate average salary in a subquery',
      'Subquery: (SELECT AVG(salary) FROM employees)',
      'Compare salary > average salary',
      'Use WHERE with > operator'
    ]
  }
};

  return mockAssignments[id] || mockAssignments['beginner1'];
};

const initializeAssignment = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return { success: true, message: 'Database initialized' };
};

// Smart query validation function
const validateQuery = (userQuery, expectedQuery, assignment) => {
  const userUpper = userQuery.toUpperCase().trim().replace(/\s+/g, ' ');
  const expectedUpper = expectedQuery.toUpperCase().trim().replace(/\s+/g, ' ');
  
  // Remove semicolons for comparison
  const userClean = userUpper.replace(/;/g, '').trim();
  const expectedClean = expectedUpper.replace(/;/g, '').trim();
  
  // Check if query matches exactly
  if (userClean === expectedClean) {
    return { isValid: true, message: 'Perfect! Your query is correct.' };
  }
  
  // Check for common errors based on assignment type
  const errors = [];
  
  // Basic structure checks
  if (!userUpper.includes('SELECT')) {
    errors.push('Query must start with SELECT');
  }
  
  if (!userUpper.includes('FROM')) {
    errors.push('Missing FROM clause');
  }
  
  // Table name check
  const tableNames = Object.keys(assignment.schemaDefinition || {});
  let tableFound = false;
  for (const table of tableNames) {
    if (userUpper.includes(table.toUpperCase())) {
      tableFound = true;
      break;
    }
  }
  if (!tableFound && tableNames.length > 0) {
    errors.push(`Table not found. Should be: ${tableNames.join(' or ')}`);
  }
  
  // Specific checks based on assignment
  if (assignment._id.includes('beginner3') && !userUpper.includes("'NEW YORK'")) {
    errors.push('Should filter for city = "New York"');
  }
  
  if (assignment._id.includes('intermediate1') && !userUpper.includes('ORDER BY')) {
    errors.push('Missing ORDER BY clause');
  }
  
  if (assignment._id.includes('intermediate1') && userUpper.includes('ORDER BY') && !userUpper.includes('DESC')) {
    errors.push('Should use DESC for descending order');
  }
  
  if (assignment._id.includes('intermediate2')) {
    if (!userUpper.includes('ELECTRONICS')) {
      errors.push('Should filter for Electronics category');
    }
    if (!userUpper.includes('<') && !userUpper.includes('BETWEEN')) {
      errors.push('Should check price < 500');
    }
  }
  
  if (assignment._id.includes('intermediate3') && !userUpper.includes('COUNT')) {
    errors.push('Should use COUNT(*) function');
  }
  
  if (assignment._id.includes('intermediate3') && !userUpper.includes('GROUP BY')) {
    errors.push('Missing GROUP BY clause');
  }
  
  if (assignment._id.includes('advanced1') && !userUpper.includes('JOIN')) {
    errors.push('Should use JOIN to combine tables');
  }
  
  if (assignment._id.includes('advanced2') && !userUpper.includes('AVG')) {
    errors.push('Should use AVG() function for average');
  }
  
  if (assignment._id.includes('advanced3') && !userUpper.includes('SELECT', 2)) {
    errors.push('Should use a subquery to calculate average');
  }
  
  if (errors.length > 0) {
    return { 
      isValid: false, 
      message: 'Query needs improvement:', 
      errors: errors 
    };
  }
  
  // If no specific errors but doesn't match expected
  return { 
    isValid: false, 
    message: 'Query is close but not exactly correct.',
    hint: `Try: ${expectedQuery}`
  };
};

const executeQuery = async (query, assignmentId) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const assignment = await getAssignmentById(assignmentId);
  const validation = validateQuery(query, assignment.expectedQuery, assignment);
  
  if (!validation.isValid) {
    return {
      success: false,
      error: validation.message,
      details: validation.errors || [],
      hint: validation.hint || 'Check the assignment requirements carefully.'
    };
  }
  
  // Generate appropriate mock results for valid query
  const executionTime = Math.floor(Math.random() * 100) + 50;
  let rows = [];
  let columns = [];
  
  // Generate results based on assignment
  switch(assignmentId) {
    case 'beginner1':
      columns = ['customer_id', 'first_name', 'last_name', 'email', 'city'];
      rows = assignment.sampleData.customers;
      break;
      
    case 'beginner2':
      columns = ['first_name', 'last_name', 'email'];
      rows = assignment.sampleData.customers.map(c => ({
        first_name: c.first_name,
        last_name: c.last_name,
        email: c.email
      }));
      break;
      
    case 'beginner3':
      columns = ['customer_id', 'first_name', 'last_name', 'email', 'city'];
      rows = assignment.sampleData.customers.filter(c => c.city === 'New York');
      break;
      
    case 'intermediate1':
      columns = ['product_id', 'product_name', 'category', 'price', 'stock_quantity'];
      rows = [...assignment.sampleData.products].sort((a, b) => b.price - a.price);
      break;
      
    case 'intermediate2':
      columns = ['product_id', 'product_name', 'category', 'price', 'stock_quantity'];
      rows = assignment.sampleData.products.filter(p => 
        p.category === 'Electronics' && p.price < 500
      );
      break;
      
    case 'intermediate3':
      columns = ['category', 'count'];
      const categoryCount = {};
      assignment.sampleData.products.forEach(p => {
        categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
      });
      rows = Object.entries(categoryCount).map(([category, count]) => ({
        category,
        count
      }));
      break;
      
    case 'advanced1':
      columns = ['order_id', 'order_date', 'first_name', 'last_name'];
      rows = [
        { order_id: 101, order_date: '2024-01-15', first_name: 'John', last_name: 'Doe' },
        { order_id: 102, order_date: '2024-01-16', first_name: 'Jane', last_name: 'Smith' },
        { order_id: 103, order_date: '2024-01-17', first_name: 'John', last_name: 'Doe' }
      ];
      break;
      
    case 'advanced2':
      columns = ['category', 'average_price'];
      const categoryAvg = {};
      const categorySum = {};
      const categoryCount2 = {};
      
      assignment.sampleData.products.forEach(p => {
        categorySum[p.category] = (categorySum[p.category] || 0) + p.price;
        categoryCount2[p.category] = (categoryCount2[p.category] || 0) + 1;
      });
      
      rows = Object.keys(categorySum).map(category => ({
        category,
        average_price: (categorySum[category] / categoryCount2[category]).toFixed(2)
      }));
      break;
      
    case 'advanced3':
      columns = ['product_id', 'product_name', 'category', 'price'];
      const prices = assignment.sampleData.products.map(p => p.price);
      const average = prices.reduce((a, b) => a + b, 0) / prices.length;
      rows = assignment.sampleData.products.filter(p => p.price > average);
      break;
      
    default:
      columns = ['id', 'name'];
      rows = [{ id: 1, name: 'Sample Data' }];
  }
  
  return {
    success: true,
    columns: columns,
    rows: rows,
    rowCount: rows.length,
    executionTime: executionTime,
    message: '✅ Perfect! Your query is correct!'
  };
};

const AssignmentAttempt = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [executing, setExecuting] = useState(false);
  const [assignment, setAssignment] = useState(null);
  const [initializing, setInitializing] = useState(false);
  const [hint, setHint] = useState('');
  const [showHintBox, setShowHintBox] = useState(true);

  useEffect(() => {
    fetchAssignment();
  }, [id]);

  const fetchAssignment = async () => {
    try {
      setLoading(true);
      const data = await getAssignmentById(id);
      setAssignment(data);
      
      // Set default query based on assignment
      let defaultQuery = '';
      let defaultHint = '';
      
      if (data._id.includes('beginner1')) {
        defaultQuery = '-- Get all customer data\n-- Write your query here';
        defaultHint = data.hints?.[0] || 'Start with SELECT *';
      } else if (data._id.includes('beginner2')) {
        defaultQuery = '-- Get specific columns\n-- Write your query here';
        defaultHint = data.hints?.[0] || 'List columns separated by commas';
      } else if (data._id.includes('beginner3')) {
        defaultQuery = '-- Filter for New York customers\n-- Write your query here';
        defaultHint = data.hints?.[0] || 'Use WHERE clause with city condition';
      } else if (data._id.includes('intermediate1')) {
        defaultQuery = '-- Sort products by price (highest first)\n-- Write your query here';
        defaultHint = data.hints?.[0] || 'Use ORDER BY with DESC';
      } else if (data._id.includes('intermediate2')) {
        defaultQuery = '-- Find Electronics under $500\n-- Write your query here';
        defaultHint = data.hints?.[0] || 'Combine conditions with AND';
      } else if (data._id.includes('intermediate3')) {
        defaultQuery = '-- Count products per category\n-- Write your query here';
        defaultHint = data.hints?.[0] || 'Use COUNT(*) and GROUP BY';
      } else if (data._id.includes('advanced1')) {
        defaultQuery = '-- Join orders with customers\n-- Write your query here';
        defaultHint = data.hints?.[0] || 'Use JOIN with ON condition';
      } else if (data._id.includes('advanced2')) {
        defaultQuery = '-- Calculate average price per category\n-- Write your query here';
        defaultHint = data.hints?.[0] || 'Use AVG() and GROUP BY';
      } else if (data._id.includes('advanced3')) {
        defaultQuery = '-- Find products above average price\n-- Write your query here';
        defaultHint = data.hints?.[0] || 'Use subquery to calculate average';
      } else {
        defaultQuery = '-- Write your SQL query here';
        defaultHint = data.hints?.[0] || 'Check the requirements above';
      }
      
      setQuery(defaultQuery);
      setHint(defaultHint);
      
      await initializeDatabase();
    } catch (error) {
      console.error('Failed to fetch assignment:', error);
      setHint('Failed to load assignment.');
    } finally {
      setLoading(false);
    }
  };

  const initializeDatabase = async () => {
    try {
      setInitializing(true);
      await initializeAssignment(id);
    } catch (error) {
      console.error('Failed to initialize database:', error);
    } finally {
      setInitializing(false);
    }
  };

  const handleExecuteQuery = async () => {
    if (!query.trim() || !assignment) return;
    
    try {
      setExecuting(true);
      setResults(null);
      
      const data = await executeQuery(query, id);
      setResults(data);
      
      if (!data.success) {
        let errorMsg = data.error;
        if (data.details && data.details.length > 0) {
          errorMsg += '\n• ' + data.details.join('\n• ');
        }
        setHint('❌ ' + errorMsg);
      } else {
        setHint('✅ ' + (data.message || 'Query successful!'));
      }
    } catch (error) {
      console.error('Execution error:', error);
      setResults({
        success: false,
        error: 'Error: ' + error.message
      });
      setHint('⚠️ There was an error. Check your SQL syntax.');
    } finally {
      setExecuting(false);
    }
  };

  const handleGetHint = () => {
    if (!assignment) return;
    
    const hints = assignment.hints || ['Check the assignment requirements'];
    const randomIndex = Math.floor(Math.random() * hints.length);
    setHint('💡 ' + hints[randomIndex]);
    setShowHintBox(true);
  };

  const handleClearEditor = () => {
    setQuery('');
    setResults(null);
    setHint('Editor cleared. Write a new query.');
  };

  const toggleHintBox = () => {
    setShowHintBox(!showHintBox);
  };

  if (loading || !assignment) {
    return (
      <div className="loading-fullscreen">
        <div className="spinner-large"></div>
        <p>Loading assignment...</p>
      </div>
    );
  }

  return (
    <div className="assignment-attempt">
      <div className="assignment-header">
        <div className="header-left">
          <h1>{assignment.title}</h1>
          <span className={`difficulty-badge ${assignment.difficulty}`}>
            {assignment.difficulty.toUpperCase()}
          </span>
          {initializing && <span className="initializing-badge">Initializing...</span>}
        </div>
        <div className="header-right">
          <button className="btn btn-outline" onClick={() => navigate('/')}>
            ← Back to Assignments
          </button>
        </div>
      </div>

      <p className="assignment-description">{assignment.description}</p>
      
      <div className="requirements">
  <h3>📝 Requirements:</h3>
  <ul>
    {assignment._id.includes('beginner1') && <li>List all movies with their details</li>}
    {assignment._id.includes('beginner2') && <li>Get only book titles, authors, and prices</li>}
    {assignment._id.includes('beginner3') && <li>Filter for Rock genre songs</li>}
    {assignment._id.includes('intermediate1') && <li>Sort video games by rating (highest first)</li>}
    {assignment._id.includes('intermediate2') && <li>Find Android phones under $500</li>}
    {assignment._id.includes('intermediate3') && <li>Count recipes per cuisine type</li>}
    {assignment._id.includes('advanced1') && <li>Join orders with customers and products tables</li>}
    {assignment._id.includes('advanced2') && <li>Calculate average grade per subject</li>}
    {assignment._id.includes('advanced3') && <li>Find employees earning above company average</li>}
  </ul>
</div>

      <div className="attempt-container">
        <div className="left-panel">
          <div className="card">
            <div className="card-header">
              <h3>📋 Database Schema</h3>
              <button 
                className="btn btn-sm btn-outline"
                onClick={() => navigate('/')}
              >
                Change Assignment
              </button>
            </div>
            
            {assignment.schemaDefinition && Object.entries(assignment.schemaDefinition).map(([tableName, columns]) => (
              <div key={tableName} className="schema-table">
                <h4>Table: <code>{tableName}</code></h4>
                <div className="columns-list">
                  {columns.map((col, idx) => (
                    <div key={idx} className="column-item">
                      <span className="column-name">
                        <strong>{col.name}</strong>
                      </span>
                      <span className="column-type">
                        <code>{col.type}</code>
                      </span>
                      {!col.nullable && <span className="column-required">REQUIRED</span>}
                    </div>
                  ))}
                </div>
                {assignment.sampleData[tableName] && (
                  <div className="sample-data-preview">
                    <small>Sample rows: {assignment.sampleData[tableName].length}</small>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="card editor-card">
            <div className="editor-header">
              <h3>✏️ SQL Editor</h3>
              <div className="editor-actions">
                <button 
                  className="btn btn-sm btn-outline" 
                  onClick={handleClearEditor}
                  disabled={executing}
                >
                  Clear
                </button>
                <button 
                  className="btn btn-sm btn-secondary" 
                  onClick={handleGetHint}
                  disabled={executing}
                >
                  Get Hint
                </button>
              </div>
            </div>
            
            <SQLEditor value={query} onChange={setQuery} height="250px" />
            
            <div className="editor-controls">
              <button 
                className="btn btn-primary" 
                onClick={handleExecuteQuery}
                disabled={executing || !query.trim()}
              >
                {executing ? (
                  <>
                    <span className="spinner-small"></span>
                    Checking Query...
                  </>
                ) : '▶ Check My Query'}
              </button>
              
              <div className="editor-info">
                <small>Your query will be validated against requirements</small>
              </div>
            </div>
          </div>
        </div>

        <div className="right-panel">
          <div className="card results-card">
            <div className="results-header">
              <h3>📊 Query Results</h3>
              {results?.executionTime && (
                <span className="execution-time">
                  {results.executionTime}ms
                </span>
              )}
            </div>
            
            {executing ? (
              <div className="loading-results">
                <div className="spinner"></div>
                <p>Validating query...</p>
              </div>
            ) : results ? (
              results.success ? (
                <div className="results-container">
                  <div className="results-info">
                    <span className="success-badge">✅ CORRECT!</span>
                    <span>Rows: {results.rowCount}</span>
                    {results.executionTime && (
                      <span>Time: {results.executionTime}ms</span>
                    )}
                  </div>
                  <ResultsTable columns={results.columns} rows={results.rows} />
                  
                  <div className="success-message">
                    <p>{results.message}</p>
                  </div>
                </div>
              ) : (
                <div className="error-message">
                  <div className="error-icon">❌</div>
                  <div>
                    <h4>Query Needs Improvement</h4>
                    <p>{results.error}</p>
                    {results.details && results.details.length > 0 && (
                      <ul className="error-details">
                        {results.details.map((detail, idx) => (
                          <li key={idx}>{detail}</li>
                        ))}
                      </ul>
                    )}
                    {results.hint && (
                      <div className="correction-hint">
                        <strong>Try this:</strong> {results.hint}
                      </div>
                    )}
                  </div>
                </div>
              )
            ) : (
              <div className="no-results">
                <div className="no-results-icon">📈</div>
                <p>No results yet</p>
                <small>Write a query and click "Check My Query"</small>
              </div>
            )}
          </div>

          <div className="card hint-card">
            <div className="hint-header">
              <h3>💡 Need Help?</h3>
              <button 
                className="btn btn-sm btn-outline"
                onClick={toggleHintBox}
              >
                {showHintBox ? 'Hide' : 'Show'}
              </button>
            </div>
            
            {showHintBox && (
              <>
                <div className="hint-content">
                  <p>{hint}</p>
                </div>
                <div className="hint-actions">
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={handleGetHint}
                  >
                    Get New Hint
                  </button>
                  <small>Hints refresh with each click</small>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentAttempt;