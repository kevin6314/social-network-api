const { User } = require('../models');

module.exports = {
    
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
      
            const userObj = {
              users
            };
      
            res.json(userObj);
          } catch (err) {
            console.log(err);
            return res.status(500).json(err);
          }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
          } catch (err) {
            res.status(500).json(err);
          }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
              .select('-__v');
      
            if (!user) {
              return res.status(404).json({ message: 'No user with that ID' })
            }
      
            res.json({
              user,
            });
          } catch (err) {
            console.log(err);
            return res.status(500).json(err);
          }
        },

    async updateUser(req, res) {
        try {
            const userId = req.params.userId; 
            const updateData = req.body; 
        
            const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
        
            if (!updatedUser) {
              return res.status(404).json({ message: 'User not found' });
            }
        
            res.json({ message: 'User updated successfully', updatedUser });
          } catch (err) {
            res.status(500).json(err);
          }
    },

    async deleteUser(req, res) {
        try {
            const userId = req.params.userId;
        
            const deletedUser = await User.findByIdAndDelete(userId);
        
            if (!deletedUser) {
              return res.status(404).json({ message: 'User not found' });
            }
        
            res.json({ message: 'User deleted successfully', deletedUser });
          } catch (err) {
            res.status(500).json(err);
          }
    },

    async addFriend(req, res) {
        console.log('You are adding a friend');
        console.log(req.body);
    
        try {
            const userId = req.params.userId;
            const friendId = req.params.friendId;
        
            const user = await User.findOneAndUpdate(
              { _id: userId },
              { $addToSet: { friends: friendId } },
              { runValidators: true, new: true }
            );
        
            if (!user) {
              return res.status(404)
              .json({ message: 'No user found with that ID :(' });
            }
        
            res.json(user);
          } catch (err) {
            res.status(500).json(err);
          }
    },

    async removeFriend(req, res) {
        try {
            const userId = req.params.userId;
            const friendId = req.params.friendId;
        
            const user = await User.findOneAndUpdate(
              { _id: userId },
              { $pull: { friends: friendId } },
              { runValidators: true, new: true }
            );
        
            if (!user) {
              return res.status(404).json({ message: 'No user found with that ID :(' });
            }
        
            res.json(user);
          } catch (err) {
            res.status(500).json(err);
          }
    },
    
};