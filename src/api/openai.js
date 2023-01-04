import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const getScriptData = async (prompt) => {
    if (!configuration.apiKey) {
        throw new Error("Cannot find the api key");
    }

    if(prompt.trim().length === 0){
        throw new Error("Please write a valid text");
    }

    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0,
        max_tokens: 200,
    });

    return completion.data.choices[0].text;
}

export default getScriptData;