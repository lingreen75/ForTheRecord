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

                // Start asking for numbers
                this.promptFirstNumber();
            }
        });

    }

    /**
     * Prompt for the first number
     */
    private promptFirstNumber() {
        if (!this.isRunning) return;

        this.rl.question('Please enter the first number: ', (input) => {
            this.handleInput(input);
        });
    }

    /**
     * Handle user input
     * @param input The user's input
     */
    private handleInput(input: string) {
        input = input.trim().toLowerCase();

        // Check for special commands
        if (input === 'halt') {
            this.isRunning = false;
            console.log('Program halted. Type "resume" to continue.');
        } else if (input === 'quit') {

            console.log('Exiting program. Goodbye!');
            this.cleanup();
            process.exit(0);
            // return;
        }

        // If program is running, process the number
        if (this.isRunning) {
            const num = parseFloat(input);

            if (!isNaN(num)) {
                //TODO Add to tracker

                //TODO Check if it's a fibonacci number

                // Prompt for next number
                this.promptNextNumber();
            } else {
                console.log('Invalid input. Please enter a valid number.');
                //TODO Prompt for next number
            }
        }
    }

    private promptNextNumber() {
        this.rl.question('Please enter the next number: ', (input) => {
            this.handleInput(input);
        });
    }
}