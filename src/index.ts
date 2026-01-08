import { selectEntrypoint } from "./entrypoint/selector";
import dotenv from "dotenv";


dotenv.config();

selectEntrypoint().then((entrypoint) => {
    entrypoint.run();
});
