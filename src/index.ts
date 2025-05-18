import { UserInterface } from './app/UserInterface';
import { NumberTracker } from './app/core/services/NumberTracker';
import {StatisticsDisplay} from "./app/StatisticsDisplay";
import {FibonacciHandler} from "./app/core/services/FibonacciHandler";

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
