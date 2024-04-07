import { CommandInteraction } from "discord.js";
import { Client } from "discordx";

import { Discord, Guard, Injectable, Slash } from "@/decorators";
import { Disabled } from "@/guards";
import { AI } from "@/services";

@Discord()
@Injectable()
export default class TestCommand {
  constructor(private ai: AI) {}

  @Slash({
    name: "test",
  })
  @Guard(Disabled)
  async test(interaction: CommandInteraction, client: Client) {
    await this.ai.test();
  }
}
