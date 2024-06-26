const Feedback = require("../schema/feedbackSchema")

const addFeedback = async (req, res) => {
  console.log("hello")
    try {
        const userId = req.params.id;
        const {comment} = req.body;
      
        console.log(userId, comment)
      const newFeedback = await Feedback.create({
        user:userId,
        comment
      });
  
      if (newFeedback) {
        return res.status(200).json({success:true, message: 'Your feedback has been added successfully', newFeedback });
      } else {
        return res.status(500).json({success:false, message: 'Failed to add feedback' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };

  // for getting the pet details
  const getFeedback = async (req, res) => {
    try {
      const showComments = await Feedback.find({}).populate("user")
      if(!showComments){
        return res.status(404).json({success:false,message:"Unable to get feedback"})
      }else{
        return res.status(200).json({sucess:true,showComments});
      }
      
    } catch (err) {
      res.status(400).json({success:false, message:"error",err});
    }
  };
   



module.exports = {
  addFeedback,
  getFeedback
}
