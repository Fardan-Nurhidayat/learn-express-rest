const addPost = (req, res) => {
  const { title, description } = req.body;
  const newOrder = { title, description };
  console.log(req.body);
  res.status(201).json({ message: "Create New Order", order: newOrder });
};

module.exports = { addPost };
