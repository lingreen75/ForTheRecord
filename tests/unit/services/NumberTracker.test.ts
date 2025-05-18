import { NumberTracker } from '../../../src/services/NumberTracker';

describe('NumberTracker', () => {
    let tracker: NumberTracker;

    beforeEach(() => {
        tracker = new NumberTracker();
    });

    describe('addNumber', () => {
        it('should add a new number to the frequency map', () => {
            tracker.addNumber(5);

            const frequencies = tracker.getFrequencies();
            expect(frequencies[5]).toBe(1);
        });

        it('should increment the frequency for an existing number', () => {
            tracker.addNumber(5);
            tracker.addNumber(5);
            tracker.addNumber(5);

            const frequencies = tracker.getFrequencies();
            expect(frequencies[5]).toBe(3);
        });

        it('should handle multiple different numbers', () => {
            tracker.addNumber(5);
            tracker.addNumber(10);
            tracker.addNumber(5);
            tracker.addNumber(7);

            const frequencies = tracker.getFrequencies();
            expect(frequencies[5]).toBe(2);
            expect(frequencies[10]).toBe(1);
            expect(frequencies[7]).toBe(1);
        });

        it('should handle negative numbers', () => {
            tracker.addNumber(-5);
            tracker.addNumber(-5);

            const frequencies = tracker.getFrequencies();
            expect(frequencies[-5]).toBe(2);
        });

        it('should handle decimal numbers', () => {
            tracker.addNumber(3.14);

            const frequencies = tracker.getFrequencies();
            expect(frequencies[3.14]).toBe(1);
        });
    });

    describe('getFrequencies', () => {
        it('should return an empty object for a new tracker', () => {
            const frequencies = tracker.getFrequencies();
            expect(frequencies).toEqual({});
        });

        it('should return a copy of the frequencies map', () => {
            tracker.addNumber(5);

            const frequencies1 = tracker.getFrequencies();
            frequencies1[5] = 999; // This should not affect the internal state

            const frequencies2 = tracker.getFrequencies();
            expect(frequencies2[5]).toBe(1); // Still 1, not 999
        });

        it('should reflect all added numbers with their frequencies', () => {
            tracker.addNumber(5);
            tracker.addNumber(10);
            tracker.addNumber(5);
            tracker.addNumber(7);
            tracker.addNumber(10);
            tracker.addNumber(10);

            const frequencies = tracker.getFrequencies();
            expect(frequencies).toEqual({
                '5': 2,
                '7': 1,
                '10': 3
            });
        });
    });

    describe('getSortedFrequencies', () => {
        it('should return an empty array for a new tracker', () => {
            const sorted = tracker.getSortedFrequencies();
            expect(sorted).toEqual([]);
        });

        it('should sort by frequency in descending order', () => {
            tracker.addNumber(5);
            tracker.addNumber(10);
            tracker.addNumber(5);
            tracker.addNumber(7);
            tracker.addNumber(10);
            tracker.addNumber(10);

            const sorted = tracker.getSortedFrequencies();
            expect(sorted).toEqual([
                [10, 3],
                [5, 2],
                [7, 1]
            ]);
        });

        it('should match objects returned by getFrequencies', () => {
            tracker.addNumber(5);
            tracker.addNumber(10);
            tracker.addNumber(5);

            const frequencies = tracker.getFrequencies();
            const sorted = tracker.getSortedFrequencies();

            // Verify that sorted entries match the frequencies object
            sorted.forEach(([num, freq]) => {
                expect(frequencies[num]).toBe(freq);
            });

            // Verify that all frequencies are included
            expect(sorted.length).toBe(Object.keys(frequencies).length);
        });
    });
});