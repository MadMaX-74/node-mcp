export interface EntrypointInterface {
    run(): Promise<void> | void;
}