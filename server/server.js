const express = require("express");
const axios = require("axios");
const cors = require('cors')


const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())

app.post("/api/chat", async (req, res) => {
  const { input } = req.body;

  try {
    const { data } = await axios.post("https://api.openai.com/v1/engines/text-davinci/jobs", {    
        model: "text-davinci-003",
        prompt: input,
        max_tokens: 100,
        temperature: 0.5,
    }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
    });
    if (!data.choices || !data.choices.length) {
      return res.status(400).json({ error: "No response was received from the OpenAI API." });
    }
    res.json({ response: data.choices[0].text });
  } catch (error) {
    res.status(400).json({ error: "An error occurred while trying to get a response from the OpenAI API." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
