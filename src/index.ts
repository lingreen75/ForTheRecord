import { UserInterface } from './app/UserInterface';

/**
 * Main application entry point
 */
function main(): void {
    const ui = new UserInterface();

    // Start the application
    ui.start();
}

// Start the application
main();
