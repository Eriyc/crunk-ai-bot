import { ArgsOf, Client } from "discordx";

import { Discord, Guard, Injectable, On } from "@/decorators";
import { Maintenance } from "@/guards";
import { AI } from "@/services";

@Discord()
@Injectable()
export default class MessageCreateEvent {
  constructor(private ai: AI) {}

  @On("messageCreate")
  @Guard(Maintenance)
  async messageCreateHandler(
    [message]: ArgsOf<"messageCreate">,
    client: Client
  ) {
    if (message.mentions.has(client.user!)) {
      const completion = await this.ai.answer(message.cleanContent);
      message.reply(completion || "I will not answer that");
    }
  }
}
