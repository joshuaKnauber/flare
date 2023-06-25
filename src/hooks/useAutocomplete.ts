import {
  Configuration,
  OpenAIApi,
  type ChatCompletionResponseMessage,
} from "openai";
import { useEffect, useState } from "react";
import useConfig from "./useConfig";

const SYSTEM_MSG: ChatCompletionResponseMessage = {
  role: "system",
  content:
    "You are an autocomplete tool. You will receive a part of text the user is typing into a command line. Give back the full text the user is trying to type and nothing else. Do not correct previous input, only add onto the end of it.",
};

const useAutocomplete = (input: string) => {
  const { config } = useConfig();
  const [openai, setOpenai] = useState<OpenAIApi>();
  const [completion, setCompletion] = useState<string>("");

  const processInput = async (text: string) => {
    if (!openai) return "OpenAI not configured";
    if (!config) return "Flare not configured";

    const functionContext =
      "Possible commands the user may want to run. Free text is also allowed: \n\n" +
      config.functions.map((f) => `- ${f.description}`).join("\n");

    try {
      const newHistory: ChatCompletionResponseMessage[] = [
        SYSTEM_MSG,
        { role: "user", content: functionContext },
        { role: "user", content: text },
      ];
      const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo-0613",
        temperature: 0.3,
        presence_penalty: -2,
        messages: newHistory,
      });
      const answer = chatCompletion.data.choices[0].message;
      console.log(answer);
      if (!answer) throw new Error("No answer from OpenAI");

      return answer.content || "";
    } catch (e) {
      console.log(e);
    }

    return "";
  };

  useEffect(() => {
    if (input) {
      // processInput(input).then((res) => {
      //   setCompletion(res);
      // });
    } else {
      setCompletion("");
    }
  }, [input]);

  useEffect(() => {
    if (config?.open_ai_key) {
      const configuration = new Configuration({
        apiKey: config.open_ai_key,
      });
      delete configuration.baseOptions.headers["User-Agent"];
      setOpenai(new OpenAIApi(configuration));
    }
  }, [config]);

  return completion;
};

export default useAutocomplete;
