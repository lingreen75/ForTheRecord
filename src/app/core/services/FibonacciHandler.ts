export class FibonacciHandler {

    /**
     * Generate Fibonacci numbers
     * @param count The number of Fibonacci numbers to generate
     * @returns An array of Fibonacci numbers
     */
    public generateFibonacciNumbers(count: number): bigint[] {
        console.log('Generating first ' + count + ' Fibonacci numbers...');

        // Using BigInt to handle large Fibonacci numbers
        const fibArray: bigint[] = [BigInt(1), BigInt(1)]; // Starting with 1, 1

        for (let i = 2; i < count; i++) {
            // Calculate the next Fibonacci number
            let bigint = fibArray[i - 1] + fibArray[i - 2];
            // console.log(bigint);
            fibArray[i] = bigint;
        }
        console.log(fibArray.length);

        return fibArray;
    }

    /**
     * Check if a number is in the Fibonacci array
     * @param number The number to check
     * @param fibArray The Fibonacci array
     * @retruns True if the number is in the array, false otherwise
     */
    public isInFibonacciSequence(number: bigint, fibArray: bigint[]): boolean {
        // Binary search can be used since the array is sorted
        let left = 0;
        let right = fibArray.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);

            if (fibArray[mid] === number) {
                return true;
            } else if (fibArray[mid] < number) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return false;
    }
}