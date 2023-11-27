const { User, Reaction, Thought } = require('../models');

module.exports = {

    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
          } catch (err) {
            res.status(500).json(err);
          }
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
          } catch (err) {
            console.log(err);
            return res.status(500).json(err);
          }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
              .select('-__v');
      
            if (!thought) {
              return res.status(404).json({ message: 'No thought with that ID' });
            }
      
            res.json(thought);
          } catch (err) {
            res.status(500).json(err);
          }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
              { _id: req.params.thoughtId },
              { $set: req.body },
              { runValidators: true, new: true }
            );
      
            if (!thought) {
              res.status(404).json({ message: 'No thought with this id!' });
            }
      
            res.json(thought);
          } catch (err) {
            res.status(500).json(err);
          }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
      
            if (!thought) {
              res.status(404).json({ message: 'No thought with that ID' });
            }
      
            await Reaction.deleteMany({ _id: { $in: thought.reactions } });
            res.json({ message: 'Thoughts and reactions deleted!' });
          } catch (err) {
            res.status(500).json(err);
          }
    },

    async createReaction(req, res) {
        try {
            const { reactionBody, username } = req.body; 
            const thoughtId = req.params.thoughtId;
        
            const thought = await Thought.findById(thoughtId);
        
            if (!thought) {
              return res.status(404).json({ message: 'Thought not found' });
            }
        
            const newReaction = new reactionSchema({
              reactionBody,
              username,
            });
        
            thought.reactions.push(newReaction);
        
            const updatedThought = await thought.save();
        
            res.status(201).json(updatedThought);
          } catch (err) {
            res.status(500).json({ message: 'Failed to add reaction', error: err.message });
          }
    },

    async deleteReaction(req, res) {
        try {
            const thoughtId = req.params.thoughtId;
            const reactionId = req.params.reactionId;
        
            // Find the thought by its ID
            const thought = await Thought.findById(thoughtId);
        
            if (!thought) {
              return res.status(404).json({ message: 'Thought not found' });
            }
        
            // Find the index of the reaction in the 'reactions' array
            const reactionIndex = thought.reactions.findIndex(
              (reaction) => String(reaction._id) === reactionId
            );
        
            if (reactionIndex === -1) {
              return res.status(404).json({ message: 'Reaction not found' });
            }
        
            // Remove the reaction from the 'reactions' array
            thought.reactions.splice(reactionIndex, 1);
        
            // Save the updated thought without the deleted reaction
            const updatedThought = await thought.save();
        
            res.json(updatedThought); // Return the updated thought after removing the reaction
          } catch (err) {
            res.status(500).json({ message: 'Failed to delete reaction', error: err.message });
          }
    },
    
};