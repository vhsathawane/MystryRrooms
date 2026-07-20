// Mystery Rooms Data
const rooms = [
    {
        id: 1,
        title: "The Library of Secrets",
        emoji: "📚",
        questions: [
            {
                question: "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?",
                answer: "echo",
                hint: "Think about sound bouncing back..."
            },
            {
                question: "Look at the code hidden in this picture: <br> <span style='font-size:2rem; letter-spacing:5px;'>■ ■ ■ / ■ ■ / ■ ■ ■ ■</span> <br> This is Morse code. What number does it represent? (Hint: ... = S, --- = O)",
                answer: "505",
                hint: "Count the dots and dashes for each letter..."
            },
            {
                question: "Solve: 3 + 4 × 2 = ?",
                answer: "11",
                hint: "Remember the order of operations (PEMDAS)!"
            },
            {
                question: "What number is hidden in this image description: 'A clock shows 3:15. The hour hand moves forward 45 degrees. What number does the hour hand now point to?'",
                answer: "4",
                hint: "Each hour is 30 degrees on a clock."
            },
            {
                question: "I am a three-digit number. My tens digit is five more than my units digit. My hundreds digit is eight less than my tens digit. What number am I?",
                answer: "194",
                hint: "Try working backwards from the units digit."
            }
        ]
    },
    {
        id: 2,
        title: "The Cyber Vault",
        emoji: "💻",
        questions: [
            {
                question: "What is the decimal value of the binary code: 101010?",
                answer: "42",
                hint: "Binary is base-2. Start from the rightmost digit..."
            },
            {
                question: "Decode this: 'SVOOL DLRO W' <br> It's a simple Caesar cipher. Shift each letter back by 7.",
                answer: "hello world",
                hint: "A becomes T, B becomes U... Try shifting back!"
            },
            {
                question: "If 2 + 3 = 10, 7 + 2 = 63, 6 + 5 = 66, then what is 8 + 4?",
                answer: "96",
                hint: "The pattern is: a + b = a × (a + b)"
            },
            {
                question: "I am a prime number. I am greater than 30 and less than 40. I am the sum of two prime numbers. What number am I?",
                answer: "37",
                hint: "Prime numbers between 30 and 40: 31, 37. Which one is a sum of two primes?"
            },
            {
                question: "A room has 4 corners. Each corner has a cat. Each cat sees 3 cats. How many cats are in the room?",
                answer: "4",
                hint: "Each cat sees the other three cats..."
            }
        ]
    },
    {
        id: 3,
        title: "The Alchemist's Lab",
        emoji: "🧪",
        questions: [
            {
                question: "What is the missing number? 1, 1, 2, 3, 5, 8, 13, ?",
                answer: "21",
                hint: "This is the Fibonacci sequence!"
            },
            {
                question: "Decode: The atomic number of the element 'Fe' times the number of planets in our solar system.",
                answer: "168",
                hint: "Fe is Iron (atomic number 26). There are 8 planets. 26 × 8 = ?"
            },
            {
                question: "If A = 1, B = 2, C = 3... What is the sum of the letters in 'CODE'?",
                answer: "27",
                hint: "C=3, O=15, D=4, E=5. Add them up!"
            },
            {
                question: "What number should replace the question mark? 2 → 6, 3 → 12, 4 → 20, 5 → 30, 6 → ?",
                answer: "42",
                hint: "Pattern: n → n × (n + 1)"
            },
            {
                question: "I am a two-digit number. When you add my digits, you get 9. When you reverse my digits, the new number is 9 less than me. What number am I?",
                answer: "54",
                hint: "Try numbers where digits add to 9: 18, 27, 36, 45, 54..."
            }
        ]
    },
    {
        id: 4,
        title: "The Time Traveler's Chamber",
        emoji: "⏳",
        questions: [
            {
                question: "A train leaves Station A at 3:00 PM traveling at 60 mph. Another train leaves Station B at 3:30 PM traveling at 80 mph. The stations are 300 miles apart. At what time do they meet?",
                answer: "5:30",
                hint: "Calculate the head start of the first train (30 minutes × 60 mph = 30 miles)."
            },
            {
                question: "If today is Monday, what day of the week will it be 100 days from now?",
                answer: "Wednesday",
                hint: "100 ÷ 7 = 14 weeks + 2 days."
            },
            {
                question: "A grandfather's clock chimes once at 1:00, twice at 2:00, etc. How many chimes does it make in 12 hours?",
                answer: "78",
                hint: "Sum of numbers 1 through 12 = ?"
            },
            {
                question: "I was born in 1990. In 2025, my age will be the sum of the digits of my birth year. How is this possible? (Enter the year I was born)",
                answer: "2007",
                hint: "For someone born in 2007, age in 2025 = 18. Sum of digits of 2007 = 9. This doesn't match. Try a different year..."
            },
            {
                question: "What comes next? 1, 4, 9, 16, 25, ?",
                answer: "36",
                hint: "These are perfect squares: 1², 2², 3², 4², 5²..."
            }
        ]
    },
    {
        id: 5,
        title: "The Final Obelisk",
        emoji: "🏛️",
        questions: [
            {
                question: "What is the next number in this sequence? 2, 6, 18, 54, ?",
                answer: "162",
                hint: "Each term is multiplied by 3."
            },
            {
                question: "Solve this equation: (5 + 3) × 2 - 4 ÷ 2 = ?",
                answer: "14",
                hint: "Follow PEMDAS: Parentheses, Exponents, Multiplication/Division, Addition/Subtraction."
            },
            {
                question: "An integer is chosen at random from 1 to 100. What is the probability that it's divisible by 5? Enter as a percentage.",
                answer: "20",
                hint: "Numbers divisible by 5 between 1 and 100: 5, 10, 15... 100. That's 20 numbers."
            },
            {
                question: "Decode this Roman numeral: MCMXCVIII",
                answer: "1998",
                hint: "M=1000, CM=900, XC=90, VIII=8. Add them up."
            },
            {
                question: "I am a number. When you square me, you get 144. When you add 10 to me, you get 22. What number am I?",
                answer: "12",
                hint: "Square root of 144 = ? , and 12 + 10 = 22. Both match!"
            }
        ]
    }
];
