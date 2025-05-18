import { UserInterface } from './app/UserInterface';
import { NumberTracker } from './app/core/services/NumberTracker';

/**
 * Main application entry point
 */
function main(): void {
    const tracker = new NumberTracker();
    const ui = new UserInterface(tracker);

    // Start the application
    ui.start();
}

// Start the application
main();
