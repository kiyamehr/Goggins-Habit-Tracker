'use strict';

//* Selecting DOM Elements

// Header
const headerQuote = document.querySelector('#quote');

// Habits list
const ulHabitEl = document.querySelector('#habits-ul');

//* Datas

// Quote Array
const quotes = [
  'Most people only tap into 40% of their potential.',
  'You are in danger of living a life so comfortable and soft.',
  "The most important conversations you'll ever have are the ones you'll have with yourself.",
  'Suffering is the true test of life.',
  "Don't stop when you're tired. Stop when you're done.",
  "While you're sleeping, someone else is training.",
  "They Don't Know Me Son!",
  'Whose Gonna Carry The Boats?!',
  "I don't stop when I'm tired. I stop when I'm done.",
  'The governor is in your mind. You have to kill that motherfucker.',
];

// Habit Objects Array
const habits = [
  {
    habitName: 'Run 5 Miles',
    habitStreak: 15,
    didToday: false,
  },
  {
    habitName: 'Increase German Score On Duolingo',
    habitStreak: 280,
    didToday: true,
  },
];

//* Functions

const habitStructure = function (name, streak) {
  return `            
  <li class="relative flex mb-2 items-center gap-4 py-5 px-7 bg-[#18181b] border-2 border-[#27272a]">

              <!-- Check button -->
              <button
                type="button"
                aria-label="Mark habit as done"
                class="w-7 h-7 shrink-0 rounded-full border-2 border-[#52525c] transition duration-300 hover:scale-110 cursor-pointer">
              </button>

              <!-- Content -->
              <div class="flex-1">
                <p class="text-xl font-bold text-neutral-200">${name}</p>

                <div class="flex items-center text-sm text-neutral-300">
                  <i class="fa fa-fire mr-2"></i>

                  <span>
                    ${streak} day streak
                  </span>

                  <span class="ml-4 text-stone-500 hidden total-count">
                    • 1 total
                  </span>
                </div>
              </div>

              <!-- Delete -->
              <button
                type="button"
                aria-label="Delete habit"
                class="absolute right-7 text-neutral-400 transition duration-300 hover:text-red-700 cursor-pointer">
                <i class="fa fa-trash"></i>
              </button>

            </li>`;
};

const addHabitEl = function (habits) {
  habits.map(habit =>
    ulHabitEl.insertAdjacentHTML(
      'afterbegin',
      habitStructure(habit.habitName, habit.habitStreak)
    )
  );
};

//* Working...

// Random Quote For Header
let randomQuoteNumber = Math.trunc(Math.random() * quotes.length);
headerQuote.textContent = quotes[randomQuoteNumber];

// Showing Habits in ul

ulHabitEl.insertAdjacentHTML('afterbegin', addHabitEl(habits));
