import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'


dotenv.config()
const app = express();

const port=process.env.PORT || 8000;
const corsOptions ={
  origin:true,
  Credentials:true,

}
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
// Connect to MongoDB
mongoose.set("strictQuery",false);
const connect=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL,
            {
                useNewUrlParser:true,
                useUnifiedTopology:true
            })

            console.log('MongoDb database connected')
    } catch(err){
      console.log('MongoDB database connection failed')
    }
}

app.get("/",(req,res)=>{
    res.send("Mentor Student Management api is working good")
});

app.use(express.json());
app.use(cors(corsOptions));




app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());



// mentor schema
const mentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  expertise: {
    type: String,
    required: true
  }
});

// Compile the Mentor model
const Mentor = mongoose.model('Mentor', mentorSchema);

app.post('/api/mentors', async (req, res) => {
  const mentor = new Mentor({
    name: req.body.name,
    email: req.body.email,
    expertise: req.body.expertise
  });

  try {
    const savedMentor = await mentor.save();
    res.send(savedMentor);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Define Student schema
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor'
  }
});

// Compile the Student model
const Student = mongoose.model('Student', studentSchema);

app.post('/api/students', async (req, res) => {
  const student = new Student({
    name: req.body.name,
    email: req.body.email
  });

  try {
    const savedStudent = await student.save();
    res.send(savedStudent);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Assign student to mentor API endpoint
app.post('/api/students/:studentId/mentors/:mentorId', async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    student.mentor = req.params.mentorId;
    const updatedStudent = await student.save();
    res.send(updatedStudent);
  } catch (err) {
    res.status(400).send(err);
  }
});


// Change mentor for student API endpoint
app.put('/api/students/:studentId/mentors/:mentorId', async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId)
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.studentId,
      { mentor: req.params.mentorId },
      { new: true }
    );
    res.send(updatedStudent);
  }
  catch (err) {
    res.status(400).send(err);
    }
    });

  // Get mentor by id API endpoint
app.get('/api/mentors/:id', async (req, res) => {
  try {
  const mentor = await Mentor.findById(req.params.id);
  res.send(mentor);
  } catch (err) {
  res.status(400).send(err);
  }
  });
  
  // Get students for a mentor API endpoint
  app.get('/api/mentors/:id/students', async (req, res) => {
  try {
  const students = await Student.find({ mentor: req.params.id });
  res.send(students);
  } catch (err) {
  res.status(400).send(err);
  }
  });
  
  // Get student by id API endpoint
  app.get('/api/students/:id', async (req, res) => {
  try {
  const student = await Student.findById(req.params.id).populate('mentor');
  res.send(student);
  } catch (err) {
  res.status(400).send(err);
  }
  });

  app.listen(port,()=>{
    connect();
    console.log('server is listening on port',port)
})