import {NumberTracker} from "./services/NumberTracker";

export class StatisticsDisplay {
    private tracker: NumberTracker;

    constructor(tracker: NumberTracker) {
        this.tracker = tracker;
    }

    /**
     * Display the current statistics
     */
    public displayStats(): void {
        const sortedFrequencies = this.tracker.getSortedFrequencies();

        if (sortedFrequencies.length === 0) {
            console.log('>> No numbers entered yet.');
        } else {
            console.log('>> ' + sortedFrequencies.map(([number, frequency]) =>
                `${number}:${frequency}`).join(', '));
        }
    }
}