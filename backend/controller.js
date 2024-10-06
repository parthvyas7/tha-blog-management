const Post = require('./models');

const createPost = async (req, res) => {
  const { title, content } = req.body;

  try {
    const post = await Post.create({ title, content });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: 'Error creating post', error });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: 'Error getting posts', error });
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: 'Error getting post', error });
  }
}

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const oldPost = await Post.findByIdAndUpdate(id, { title, content });
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: 'Error updating post', error });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndDelete(id);
    res.status(200).json({ message: 'Post deleted!' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting post', error });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
};
