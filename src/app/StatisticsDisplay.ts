// import { NumberTracker } from './app/core/services/NumberTracker';

import {NumberTracker} from "./core/services/NumberTracker";

export class StatisticsDisplay {
    private tracker: NumberTracker;

    constructor(tracker: NumberTracker) {
        this.tracker = tracker;
    }

    /**
     * Display the current statistics
     */
    public displayStats(): void {
        console.log('\n--- Number Frequencies (Descending Order) ---');

        console.log("The stats are....")

        console.log('-------------------------------------------\n');
    }
}