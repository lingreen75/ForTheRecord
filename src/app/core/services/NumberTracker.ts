import { NumberFrequencyMap } from '../model/Types';

export class NumberTracker {
    private frequencies: NumberFrequencyMap = {};

    /**
     * Add a number to the tracker
     * @param num The number to track
     */
    public addNumber(num: number): void {
        // console.log("Adding number:" + num);

        if (this.frequencies[num]) {
            this.frequencies[num]++;
        } else {
            this.frequencies[num] = 1;
        }
    }

}