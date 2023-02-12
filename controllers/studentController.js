import Student from "../models/Student.js";


    export const createStudent = async (req, res) => {
    const newStudent = new Student(req.body);
  
    try {
      const savedStudent = await newStudent.save();
  
      res.status(200).json({
        success: true,
        message: "Successfully created",
        data: savedStudent,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Failed to create.Try again",
      });
    }
  };