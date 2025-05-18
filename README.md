# ForTheRecord
ForTheRecord code test

## Technology Stack

* Typescript
* Node.js

## Technology Stack


## Technology Stack

## Original Specification

The application will accept an ongoing series of user supplied numbers as inputs, and output
notifications when certain conditions are met. It operates as follows:
1. On startup, the program will prompt the user for the number of seconds (X) between
   outputting the frequency of each number to the screen.
1.  Every X seconds the program will display, in frequency descending order, the list of
   numbers and their frequency.
1. If the user enters 'halt' the timer should pause.
1. If the user enters 'resume' the timer should resume.
1. If the user enters a number that is one of the first 1000 Fibonacci numbers, the system
   should alert "FIB"
1. If the user enters 'quit', the application should output the numbers and their frequency, a
   farewell message, and finally terminate.

----------------------
### Example

\>> Please input the number of time in seconds between emitting numbers and their frequency

15

\>> Please enter the first number

10

\>> Please enter the next number

10

\>> Please enter the next number

8

\>> FIB

\>> Please enter the next number \>> 10:2, 8:1

halt

\>> timer halted

resume

\>> timer resumed

8

\>> FIB

\>> Please enter the next number

10
\>> Please enter the next number

33

\>> 10:3, 8:2, 33:1

\>> Please enter the next number

quit

\>> 10:3, 8:2, 33:1

\>> Thanks for playing, press any key to exit.


----------------------
## Improvements

I have added a few minor improvements to the original specification (IMHO) deliberately:  

* added instructions at the start on how to halt, resume and quit at any stage
* formatted the final statistics output slightly differently
* added a few minor formatting changes to make it look a little neater 

## Other Important Notes

Prior to this test I have never coded in Typescript.  My background is in Java backend programming, especially in Springboot API's.  So I am not entirely familiar with how projects are generally structured, etc.




