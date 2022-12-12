const express = require('express');
const parser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

require('dotenv').config();

const app = express();

app.use(express.static(__dirname + '/assets'));
app.use(parser.urlencoded({ extended: true }));

app.set('views', __dirname + '/assets');
app.set('view engine', 'ejs');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.get('/', async (req, res) => {
  res.render('index');
});

app.post('/check', async (req, res) => {
  const { text } = req.body;
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Correct this to standard English:${text}`,
    temperature: 0,
    max_tokens: 60,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  res.json(response.data.choices[0]);
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Listening on PORT 8000\nhttp://localhost:8000');
});
