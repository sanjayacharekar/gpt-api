require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const OpenAI  =  require("openai");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const GPT_MODEL_NAME = process.env.GPT_MODEL_NAME;
const openai = new OpenAI({apiKey:OPENAI_API_KEY});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.post('/api/chatbot', async (req, res) => {
  try {
    const { message } = req.body;
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: message }],
        model: GPT_MODEL_NAME,
      });
    
    res.status(200).json({ message: completion.choices[0].message });
  } catch (error) {
    console.error('Error fetching chatbot response:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
