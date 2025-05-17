import * as readline from 'readline';

export class UserInterface {
    private rl: readline.Interface;
    private timerId: NodeJS.Timeout | null = null;

    constructor() {

        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        // Clean up on program exit
        process.on('SIGINT', () => {
            this.cleanup();
            process.exit(0);
        });
    }

    /**
     * Start the user interface
     */
    public start(): void {
        console.log('Started app...');
    }

    /**
     * Clean up resources
     */
    private cleanup(): void {
        if (this.timerId) {
            clearInterval(this.timerId);
        }
        this.rl.close();
    }
}