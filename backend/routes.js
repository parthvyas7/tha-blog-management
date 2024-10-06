const express = require('express');
const { createPost, getAllPosts, getPost, updatePost, deletePost } = require('./controller');

const router = express.Router();

router.post('/create', createPost);
router.get('/all', getAllPosts);
router.get('/:id', getPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;
