const Post = require('./models');

const createPost = async (req, res) => {
  const { title, content } = req.body;

  try {
    const post = await Post.create({ title, content });
    res.status(201).json({ message: 'Post created!' });
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



