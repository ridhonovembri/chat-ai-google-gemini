const {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();
// const configuration = new GoogleGenerativeAI(process.env.API_KEY);
const configuration = new GoogleGenerativeAI('AIzaSyAcBs0xovZfD_-Y7nq2lyuO8xDNBX7V0ms');
const modelId = "gemini-pro";

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
  ];


const model = configuration.getGenerativeModel({
  model: modelId,
  generationConfig,
  safetySettings,
});

exports.generateResponse = async (req, res) => {
  try {
    // const prompt = req.body?.prompt;
    // // console.log('prompt', prompt)
    const { prompt } = req.body

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
    // res.json("from generate responsex")
    // res.send(prompt)
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.generateChat = async (req, res) => {
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
    });

    const { prompt } = req.body;
    // const prompt = req.body?.prompt;
    // console.log('prompt', prompt)

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();
    // console.log(text);

    res.send({ response: text });
    // res.send("from generate chat")

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


