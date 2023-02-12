import Mentor from "../models/Mentor.js";

// app.post('/createMentor', async (req, res) => {
  
//     //create a new mentor
//     const mentor = new Mentor({
//       name: req.body.name,
//       email: req.body.email
//     });
//     try {
//       const savedMentor = await mentor.save();
//       res.status(200).send({ message: 'Mentor created successfully', mentor: savedMentor });
//     } catch (error) {
//       console.log(err)
//       res.status(400).send({ message: 'Error creating mentor', error: error });
//     }
//   });

    export const createMentor = async (req, res) => {
    const newMentor = new Mentor(req.body);
  
    try {
      const savedMentor = await newMentor.save();
  
      res.status(200).json({
        success: true,
        message: "Successfully created",
        data: savedMentor,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Failed to create.Try again",
      });
    }
  };

  
  