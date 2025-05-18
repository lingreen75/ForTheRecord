import { NumberFrequencyMap } from '../model/Types';

export class NumberTracker {
    private frequencies: NumberFrequencyMap = {};

    /**
     * Add a number to the tracker
     * @param num The number to track
     */
    public addNumber(num: number): void {
        if (this.frequencies[num]) {
            this.frequencies[num]++;
        } else {
            this.frequencies[num] = 1;
        }
    }

    /**
     * Get the frequency map
     * @returns A copy of the current frequency map
     */
    public getFrequencies(): NumberFrequencyMap {
        return { ...this.frequencies };
    }

    /**
     * Get the frequencies sorted in descending order
     * @returns Array of [number, frequency] pairs sorted by frequency (desc) then number (desc)
     */
    public getSortedFrequencies(): [number, number][] {
        const entries: [number, number][] = Object.entries(this.frequencies).map(
            ([numStr, freq]) => [parseFloat(numStr), freq]
        );

        // Sort by frequency (descending) and then by number (descending) if frequencies are equal
        entries.sort((a, b) => {
            if (b[1] !== a[1]) {
                return b[1] - a[1]; // Sort by frequency (descending)
            }
            return b[0] - a[0]; // If frequencies are equal, sort by number (descending)
        });

        return entries;
    }
}