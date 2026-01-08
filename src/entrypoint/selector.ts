import { ChatProcessor } from "../ai/processor";
import { CliEntrypoint } from "./cli";
import { EntrypointInterface } from "./interface";
import { TelegramEntrypoint } from "./telegram";

export async function selectEntrypoint(): Promise<EntrypointInterface> {
    const args = process.argv.slice(2);
    const processor = new ChatProcessor();
    await processor.init();
    if (args.includes("--telegram")) {
        return new TelegramEntrypoint(processor);
    } else if (args.includes("--cli")) {
        return new CliEntrypoint(processor);
    } else {
        throw new Error("No entrypoint selected");
    }
}