
const { Configuration, OpenAIApi } = require("openai");
const express = require('express')

const cors = require('cors')
const bodyParser = require("body-parser")
const configuration = new Configuration({
    organization: "org-Pw0WkV0i0bbD3Bb6VEtq7wCm",
    apiKey:"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" ,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended:true}))
app.use(bodyParser.json())
app.use(cors())
const PORT = 3334;

app.post("/", async(req,res)=>{ 
     const { message } = req.body;
     console.log(message)
     const response = await openai.createCompletion({
         model: "text-davinci-003",
         prompt: `${message}`,
         max_tokens: 100,
         temperature:0.5,
        });
      res.json({
            message:response.data.choices[0].text
      })
})


app.listen(PORT, () =>{
    console.log(`Server running on port localhost:${PORT}`)
})