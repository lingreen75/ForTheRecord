import { FibonacciHandler } from '../../../src/services/FibonacciHandler';

describe('FibonacciHandler', () => {
    let fibonacciHandler: FibonacciHandler;

    beforeEach(() => {
        fibonacciHandler = new FibonacciHandler();
        // Mock console.log to avoid cluttering test output
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('generateFibonacciNumbers', () => {
        it('should generate the correct number of Fibonacci numbers', () => {
            const count = 10;
            const result = fibonacciHandler.generateFibonacciNumbers(count);
            expect(result.length).toBe(count);
        });

        it('should generate the correct Fibonacci sequence', () => {
            const result = fibonacciHandler.generateFibonacciNumbers(10);
            // First 10 Fibonacci numbers: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55
            const expected = [1n, 1n, 2n, 3n, 5n, 8n, 13n, 21n, 34n, 55n];
            // const expected = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];

            expect(result).toEqual(expected);
        });

        it('should handle count = 2', () => {
            const result = fibonacciHandler.generateFibonacciNumbers(2);
            expect(result).toEqual([1n, 1n]);
        });

        it('should handle larger numbers correctly', () => {
            const result = fibonacciHandler.generateFibonacciNumbers(50);
            // Check the 50th Fibonacci number (index 49)
            // Known value of 50th Fibonacci number
            const fiftiethFib = 12586269025n;
            expect(result[49]).toBe(fiftiethFib);
        });
    });

    describe('isInFibonacciSequence', () => {
        let fibArray: bigint[];

        beforeEach(() => {
            // Generate first 20 Fibonacci numbers for testing
            fibArray = fibonacciHandler.generateFibonacciNumbers(20);
        });

        it('should correctly identify numbers in the Fibonacci sequence', () => {
            // Test known Fibonacci numbers
            expect(fibonacciHandler.isInFibonacciSequence(1n, fibArray)).toBe(true);
            expect(fibonacciHandler.isInFibonacciSequence(5n, fibArray)).toBe(true);
            expect(fibonacciHandler.isInFibonacciSequence(21n, fibArray)).toBe(true);
            expect(fibonacciHandler.isInFibonacciSequence(6765n, fibArray)).toBe(true); // 20th Fibonacci number
        });

        it('should correctly identify numbers not in the Fibonacci sequence', () => {
            expect(fibonacciHandler.isInFibonacciSequence(4n, fibArray)).toBe(false);
            expect(fibonacciHandler.isInFibonacciSequence(7n, fibArray)).toBe(false);
            expect(fibonacciHandler.isInFibonacciSequence(15n, fibArray)).toBe(false);
            expect(fibonacciHandler.isInFibonacciSequence(6766n, fibArray)).toBe(false); // 20th Fibonacci number + 1
        });

        // it('should handle values beyond the array range', () => {
        //     expect(fibonacciHandler.isInFibonacciSequence(BigInt(10946), fibArray)).toBe(true); // 21st Fibonacci number
        //     expect(fibonacciHandler.isInFibonacciSequence(BigInt(1000000), fibArray)).toBe(false);
        // });

        it('should handle edge cases', () => {
            // Test with empty array
            expect(fibonacciHandler.isInFibonacciSequence(1n, [])).toBe(false);

            // Test with single element array
            expect(fibonacciHandler.isInFibonacciSequence(1n, [BigInt(1)])).toBe(true);
            expect(fibonacciHandler.isInFibonacciSequence(2n, [BigInt(1)])).toBe(false);
        });
    });
});