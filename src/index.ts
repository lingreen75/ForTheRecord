import { UserInterface } from './app/UserInterface';
import { NumberTracker } from './app/core/services/NumberTracker';
import {StatisticsDisplay} from "./app/StatisticsDisplay";

/**
 * Main application entry point
 */
function main(): void {
    const tracker = new NumberTracker();
    const display = new StatisticsDisplay(tracker);
    const ui = new UserInterface(tracker, display);

    // Start the application
    ui.start();
}

// Start the application
main();
