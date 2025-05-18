import { UserInterface } from './UserInterface';
import { NumberTracker } from './services/NumberTracker';
import {StatisticsDisplay} from "./StatisticsDisplay";
import {FibonacciHandler} from "./services/FibonacciHandler";

/**
 * Main application entry point
 */
function main(): void {
    const tracker = new NumberTracker();
    const display = new StatisticsDisplay(tracker);
    const fibonacciHandler = new FibonacciHandler();
    const ui = new UserInterface(tracker, display, fibonacciHandler);

    // Start the application
    ui.start();
}

// Start the application
main();
