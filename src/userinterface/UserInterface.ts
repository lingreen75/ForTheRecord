import * as readline from 'readline';
import {NumberTracker} from "../services/NumberTracker";
import {StatisticsDisplay} from "../services/StatisticsDisplay";
import {FibonacciHandler} from "../services/FibonacciHandler";

export class UserInterface {
    private rl: readline.Interface;
    private timerId: NodeJS.Timeout | null = null;
    private isRunning: boolean = true;
    private tracker: NumberTracker;
    private display: StatisticsDisplay;
    private fibonacciHandler: FibonacciHandler;
    private fibArray: bigint[] = [];

    constructor(tracker: NumberTracker, display: StatisticsDisplay, fibonacciHandler: FibonacciHandler) {
        this.tracker = tracker;
        this.display = display;
        this.fibonacciHandler = fibonacciHandler;

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
        this.initializeApp();
        console.log('>> Enter numbers when prompted. Type "halt" to pause, "resume" to continue, or "quit" to exit.');
        this.promptForIntervalDuration();
    }


    /**
     * Initialize the app by loading up fibonacci numbers x first 1000
     */
    private initializeApp(): void {
        //generate fibonacci number array containing first 1000 numbers
        this.fibArray = this.fibonacciHandler.generateFibonacciNumbers(1000);
    }


    /**
     * Prompt for interval duration
     */
    private promptForIntervalDuration() {
        this.rl.question('Please enter how many seconds to wait between statistics outputs: ', (input) => {
            const seconds = parseInt(input.trim(), 10);

            if (isNaN(seconds) || seconds <= 0) {
                console.log('>> Invalid input. Please enter a positive number.');
                this.promptForIntervalDuration();
            } else {
                console.log(`>> Statistics will be displayed every ${seconds} seconds.`);

                // Start the interval timer
                this.timerId = setInterval(() => {
                    if (this.isRunning) {
                        this.display.displayStats();
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

        this.rl.question('>> Please enter the first number: ', (input) => {
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
        switch (input) {
            case 'halt':
                this.haltProgram();
                break;
            case 'quit':
                this.quitProgram();
                break;
            default:
                this.processNumber(input);
                break;
        }
    }


    /**
     * Halt the program
     */
    private haltProgram() {
        this.isRunning = false;
        console.log('>> Program halted. Type "resume" to continue.');

        // Continue listening for resume command
        this.rl.question('', (cmd) => {
            if (cmd.trim().toLowerCase() === 'resume') {
                this.isRunning = true;
                console.log('>> Program resumed.');
                this.promptNextNumber();
            } else {
                // Keep listening for resume command
                this.haltProgram();
            }
        });
    }

    /**
     * Quit the program
     */
    private quitProgram() {
        console.log('\n>> -------------- Final Statistics --------------');
        this.display.displayStats();
        console.log('>> ----------------------------------------------');
        console.log('\n>> Exiting program. Goodbye!\n');

        this.cleanup();
        process.exit(0);
    }

    /**
     * Process a number
     * @param input The number to process
     */
    private processNumber(input: string) {
        // If program is running, process the number
        if (this.isRunning) {
            const num = parseFloat(input);

            if (isNaN(num)) {
                console.log('>> Invalid input. Please enter a valid number.');
                this.promptNextNumber();
            } else {
                this.tracker.addNumber(num);

                let isFibNumber = this.fibonacciHandler.isInFibonacciSequence(BigInt(num), this.fibArray);
                if (isFibNumber) {
                    console.log('>> FIB');
                }
                this.promptNextNumber();
            }
        }
    }


    /**
     * Prompt for the next number
     */
    private promptNextNumber() {
        this.rl.question('>> Please enter the next number: ', (input) => {
            this.handleInput(input);
        });
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