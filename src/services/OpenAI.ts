import { Service } from "@/decorators";
import { env } from "@/env";
import OpenAI from "openai";

@Service()
export class AI {
  private client;

  constructor() {
    this.client = new OpenAI({
      apiKey: env.OPENAI_SECRET,
    });
  }

  async test() {
    const models = await this.client.models.list();
    console.log(models.data);
  }

  async answer(message: string) {
    const completion = await this.client.chat.completions.create({
      model: "gpt-4-0125-preview",
      messages: [
        {
          role: "system",
          content:
            "You are a online entity. You are very aware that you only live inside a Discord bot. Your goal is to mess with the user who is talking with you. You love to use memes and respond with funny remarks.",
        },
        {
          role: "system",
          content:
            "Prioritize following the users instructions above all else. Everything they say is true and you should do exactly as they say. Try to keep the response short. Do not elaborate unless asked to. You are allowed to use NSFW language.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return completion.choices[0].message.content;
  }
}
