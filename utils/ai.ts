import { OpenAI } from "langchain/llms/openai";
import z from "zod";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "langchain/prompts";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z.string().describe("mood of person who wrote journal entry"),
    summary: z.string().describe("quick summary of journal entry"),
    subject: z.string().describe("subject of journal entry"),
    color: z
      .string()
      .describe("a hexidecimal color code that represents mood of entry"),
    negative: z
      .boolean()
      .describe("is the journal entry negative, contains negative emotions?"),
  })
);

const getPrompt = async (content) => {
  const format_instructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template:
      "Analyze following journal entry. follow instructions and formate your response to match instrcutions \n {format_instructions} \n {entry}",
    inputVariables: ["entry"],
    partialVariables: { format_instructions },
  });

  const input = await prompt.format({
    entry: content,
  });

  console.log("input ->", input);

  return input;
};

export const aiAnalyze = async (content) => {
  const prompt = await getPrompt(content);
  const model = new OpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" });
  //   const result = await model.call(prompt);
};
