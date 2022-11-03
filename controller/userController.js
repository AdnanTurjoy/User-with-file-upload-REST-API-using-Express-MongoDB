const { default: mongoose } = require("mongoose");
const { User } = require("../model/userModel");
const ObjectId = require("mongodb").ObjectId;

const adduser = async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      image: req.file.filename,
    });
    await newUser.save();
    res.status(200).send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const Users = await User.find();
    res.status(200).send(Users);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const getsingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const Users = await User.find(query);
    res.status(200).send(Users);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const searchUser = async (req, res) => {
  try {
    const query = req.params.key;

    const Users = await User.find({
      $or: [{ name: { $regex: query } }],
    });
    res.status(200).send(Users);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const product = await User.findOne({ _id: req.params.id });
    if (product) {
      await User.deleteOne({ _id: req.params.id });
      res.status(200).send({
        message: "product is deleted",
      });
    } else {
      res.status(404).send({ message: "product is not found with this id" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const selectedUser = await User.findOne({ _id: req.params.id });
    if (selectedUser) {
      await User.updateOne(
        { _id: req.params.id },
        {
          $set: {
            name: req.body.name,
            image: req.file.filename,
          },
        }
      );
      res.status(200).send({
        message: "product is updated",
      });
    } else {
      res.status(404).send({ message: "product is not found with this id" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

module.exports = {
  adduser,
  getUsers,
  getsingleUser,
  searchUser,
  deleteUser,
  updateUser,
};
