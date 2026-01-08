import {stdin as input, stdout as output} from 'process';
import readline from 'readline/promises';

import { ChatProcessor } from "../ai/processor";
import { EntrypointInterface } from "./interface";

export class CliEntrypoint implements EntrypointInterface {
    constructor(
        private readonly processor: ChatProcessor
    ) { }
    async run(): Promise<void> {
        const SESSION_ID = "cli";
        const rl = readline.createInterface({
            input,
            output
        });
        while (true) {
            const query = await rl.question("\nВаш запрос: ");
            if (query.toLowerCase() === "exit") {
                console.log("\nДо свидания");
                rl.close();
                process.exit(0);
            }
            const start = Date.now();
            console.log("Думаю...");

            const result = await this.processor.processMessage(SESSION_ID, query);
            const end = Date.now();
            const durationsec = ((end - start) / 1000).toFixed(2);
            console.log(`\nAI (${durationsec}) сек:\n ${result.message}`);
            if (result.tools.length > 0) {
                console.log("\nИспользуемые инструменты:");
                result.tools.forEach((tool, i) => {
                    console.log(`${i +1}. ${tool.name} - ${JSON.stringify(tool.arguments)}`);
                });
            }
        }
    }
}