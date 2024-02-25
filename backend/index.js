const express = require("express")
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
// const ai = require("./controllers/index")
const cors = require("cors")


dotenv.config()

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({ origin: "*" }))

const route = express.Router()

route.get("/", (req, res) => {
  res.status(200).send("Hi Vercel...!")
});

const {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} = require("@google/generative-ai")

const generationConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
]

const configuration = new GoogleGenerativeAI(process.env.API_KEY)
const modelId = "gemini-pro"

const model = configuration.getGenerativeModel({
  model: modelId,
  generationConfig,
  safetySettings,
})



route.post("/response", async (req, res) => {
  try {
    const prompt = req.body?.prompt;
    // console.log('prompt', prompt)

    const result = await model.generateContentStream(prompt);

    let text = "";
    // let chunkText ="";
    for await (const chunk of result.stream) {
      chunkText = chunk.text();
      // console.log('response => ', chunkText);
      text += chunkText;
    }

    // console.log(text)

    res.send({ response: text });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
})

route.post("/chat", async (req, res) => {
  try {
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: "Hello, I have 2 dogs in my house.",
        },
        {
          role: "model",
          parts: "Great to meet you. What would you like to know?",
        },
      ],
      generationConfig: {
        maxOutputTokens: 2048,
      },
    })

    // const { prompt } = req.body;
    const prompt = req.body?.prompt
    // console.log('prompt', prompt)

    const result = await chat.sendMessage(prompt)
    const response = await result.response
    const text = response.text()
    // console.log(text);

    res.send({ response: text })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Internal Server Error" })
  }
});


const port = process.env.PORT

app.listen(port, () => {
  console.log(`Server is running ${port}`);
})
