const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Post');

router.get('/', async (req, res) => {
  const users = await User.find();
  const posts = await Post.find().populate('user');
  res.render('dashboard', { users, posts });
});