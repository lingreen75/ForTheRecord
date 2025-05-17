import * as readline from 'readline';

export class UserInterface {
    private rl: readline.Interface;
    private timerId: NodeJS.Timeout | null = null;
    private isRunning: boolean = true;

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

        this.promptForIntervalDuration();
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

    /**
     * Prompt for interval duration
     */
    private promptForIntervalDuration() {
        this.rl.question('Please enter how many seconds to wait between statistics outputs: ', (input) => {
            const seconds = parseInt(input.trim(), 10);

            if (isNaN(seconds) || seconds <= 0) {
                console.log('Invalid input. Please enter a positive number.');
                this.promptForIntervalDuration();
            } else {
                console.log(`Statistics will be displayed every ${seconds} seconds.`);

                // Start the interval timer
                this.timerId = setInterval(() => {
                    if (this.isRunning) {
                        //TODO display stats...
                    }
                }, seconds * 1000);

                //TODO  Start asking for numbers....
            }
        });

    }
}