import {
  Configuration,
  OpenAIApi,
  type ChatCompletionResponseMessage,
} from "openai";
import { useEffect, useState } from "react";
import { Command } from "@tauri-apps/api/shell";
import useConfig from "./useConfig";
import { getFunctionPath } from "@/utils/config";

const SYSTEM_MSG: ChatCompletionResponseMessage = {
  role: "system",
  content:
    "You are managing a smart search bar on the users desktop. You should never answer directly if you have an alternative, try to find the action that saves the most amount of time and clicks for the user. This includes choosing one action over the other because it will save a step that the user would have to do anyways.",
};

const useGpt = () => {
  const { config, functions } = useConfig();

  const [openai, setOpenai] = useState<OpenAIApi>();
  const [processing, setProcessing] = useState<boolean>(false);

  const [history, setHistory] = useState<ChatCompletionResponseMessage[]>([]);

  const processInput = async (text: string) => {
    if (!openai) return "OpenAI not configured";
    if (!config) return "Flare not configured";

    let returnValue: string | null = null;
    setProcessing(true);
    try {
      const newHistory: ChatCompletionResponseMessage[] = [
        ...history,
        { role: "user", content: text },
      ];
      const chatCompletion = await openai.createChatCompletion({
        model: config.model,
        temperature: 0.1,
        messages: newHistory,
        functions: functions.map((f) => ({
          name: f.name,
          description: f.description,
          parameters: f.parameters,
        })),
      });
      const answer = chatCompletion.data.choices[0].message;
      if (!answer) throw new Error("No answer from OpenAI");

      if (answer.function_call) {
        const name = answer.function_call.name;
        const parameters = JSON.parse(answer.function_call.arguments || "{}");
        console.log(name, parameters);

        const functionConfig = functions.find((f) => f.name === name);
        if (!functionConfig) throw new Error(`Function ${name} not found`);

        const path = await getFunctionPath(functionConfig.path);

        const values = Object.values(parameters) as string[];
        // const output = await new Command("python", [path, ...values]).execute();
        const command = new Command("python", [path, ...values]);
        command.on("close", (data) => {
          console.log(
            `command finished with code ${data.code} and signal ${data.signal}`
          );
        });
        command.on("error", (error) =>
          console.error(`command error: "${error}"`)
        );
        command.stdout.on("data", (line) =>
          console.log(`command stdout: "${line}"`)
        );
        command.stderr.on("data", (line) =>
          console.log(`command stderr: "${line}"`)
        );
        const child = await command.spawn();

        // if (output.code === 1 && output.stderr) {
        //   returnValue = output.stderr;
        // }
      } else {
        returnValue = answer.content || "";
      }

      newHistory.push(answer);
      setHistory(newHistory);
    } catch (e) {
      console.log(e);
      returnValue = "Something went wrong. Please try again.";
    }
    setProcessing(false);

    return returnValue;
  };

  useEffect(() => {
    if (config?.open_ai_key) {
      const configuration = new Configuration({
        apiKey: config.open_ai_key,
      });
      delete configuration.baseOptions.headers["User-Agent"];
      setOpenai(new OpenAIApi(configuration));
    }
  }, [config]);

  return {
    processInput,
    processing,
  };
};

export default useGpt;
