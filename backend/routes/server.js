
import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const router = express.Router();


const userSchema = new mongoose.Schema({
  rollno: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

router.post('/signup', async (req, res) => {
  try {
    const { rollno, password } = req.body;
    console.log(rollno);
    console.log(password);
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ rollno, password: hashedPassword });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }

});

router.post('/login', async (req, res) => {
  try {
    const { rollno, password } = req.body;
    const user = await User.findOne({ rollno });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ rollno: user.rollno }, 'secret-key', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default router;