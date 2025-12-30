'use strict';

//* Selecting DOM Elements

// Header
const headerQuote = document.querySelector('#quote');

// tracking box
const trackingTotalHabitsEl = document.querySelector('#total-habits');
const trackingBestStreakEl = document.querySelector('#best-streak');
const trackingTotalRepsEl = document.querySelector('#total-reps');
const trackingCompletedtoday = document.querySelector('#completed-today');

// status buttons
const statusAll = document.querySelector('#status-all');
const statusCompleted = document.querySelector('#status-completed');
const statusMissed = document.querySelector('#status-missed');

// Habits list
const ulHabitEl = document.querySelector('#habits-ul');
const habitButtonEl = document.querySelector('.habit-didtoday-checkbox');

const noHabitMessageEl = document.querySelector('#no-habit-message');
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
    id: 1,
    habitName: 'Run 5 Miles',
    habitStreak: 15,
    didToday: false,
  },
  {
    id: 2,
    habitName: 'Increase German Score On Duolingo',
    habitStreak: 280,
    didToday: false,
  },
];

//* Functions

// calculating best Streak
const calcTotalHabits = habits =>
  (trackingTotalHabitsEl.textContent = habits.length);
calcTotalHabits(habits);

const calcBestStreak = function (habits) {
  const bestStreak = Math.max(...habits.map(habit => habit.habitStreak));
  trackingBestStreakEl.textContent = bestStreak;
};
calcBestStreak(habits);

const calcHabitsCompletedToday = function (habits) {};

// calculating all habits statuces, all, completed, missed

const calcHabitAll = habits =>
  (statusAll.textContent = `All (${habits.length})`);

const calcHabitCompleted = habits => {
  const trueHabits = habits.filter(habit => habit.didToday === true);
  statusCompleted.textContent = `Completed (${trueHabits.length})`;
};

const calcHabitMissed = habits => {
  const falseHabits = habits.filter(habit => habit.didToday === false);
  statusMissed.textContent = `Missed (${falseHabits.length})`;
};

const calcHabitStatus = function (habits) {
  // displaying all(habits.length)
  calcHabitAll(habits);

  // displaying habits that are 'checked' today
  calcHabitCompleted(habits);

  // displaying habits that are 'missed' today
  calcHabitMissed(habits);
};
calcHabitStatus(habits);

// structure of the habit <li> which we want to add
const habitStructure = function (name, streak) {
  return `            
  <li class="relative flex mb-2 items-center rounded-sm gap-4 py-5 px-7 bg-[#18181b] border-2 border-[#27272a] transition duration-300">

              <!-- Check button -->
              <button
                type="button"
                aria-label="Mark habit as done"
                class="habit-didtoday-checkbox w-7 h-7 shrink-0 rounded-full border-2 border-[#52525c] transition duration-300 hover:scale-110 cursor-pointer">
                <i class='fa fa-check opacity-0 duration-300'></i>
              </button>

              <!-- Content -->
              <div class="flex-1">
                <p class="habit-name text-xl font-bold text-neutral-200">${name}</p>

                <div class="flex items-center text-sm text-neutral-300">
                  <i class="fa fa-fire mr-2 duration-300"></i>

                  <span class='fire-text duration-300'>
                    ${streak} day streak
                  </span>

                  <span class="ml-4 text-stone-500 opacity-0 total-count duration-300">
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

// Adding the All habit elements in 'habits' array
const addHabitElements = function (habits) {
  ulHabitEl.insertAdjacentHTML(
    'afterbegin',
    habits
      .map(habit => habitStructure(habit.habitName, habit.habitStreak))
      .join('') // since map returns an array, this removes the ','
  );
};

// If there is no habit unhide 'no habit message' element
const checkHabitZeroMessage = function (habits) {
  if (habits.length === 0) {
    noHabitMessageEl.classList.toggle('hidden');
  }
};
checkHabitZeroMessage(habits);

//? Running Codes here --------------------------------------------------------------------------

//* Header
// Random Quote For Header
let randomQuoteNumber = Math.trunc(Math.random() * quotes.length);
headerQuote.textContent = quotes[randomQuoteNumber];

//* Habits list ---------

// Showing Habits in ul
addHabitElements(habits);

// Implementing Check Animations and logic + habit Delete Button
ulHabitEl.addEventListener('click', function (e) {
  // if the button was clicked
  const btnCheck = e.target.closest('.habit-didtoday-checkbox');
  const btnDelete = e.target.closest('.fa-trash');

  // Implementing Delete Button
  if (btnDelete) {
    // selecting elements from li
    const li = btnDelete.closest('li');
    const delHabitName = li.querySelector('.habit-name');

    const selectedHabit = habits.find(
      habit => habit.habitName === delHabitName.textContent
    );

    // removing the habit from object
    habits.splice(
      habits.findIndex(habit => habit.id === selectedHabit.id),
      1
    );

    // removing element from DOM
    btnDelete.closest('li').remove(); // method 1

    checkHabitZeroMessage(habits);
  }

  // Implementing Check button
  if (!btnCheck) return;

  // selecting Els from parent element which is <li>
  const li = btnCheck.closest('li');
  const checkText = li.querySelector('.fa-check');
  const totalcount = li.querySelector('.total-count');
  const fireIcon = li.querySelector('.fa-fire');
  const fireText = li.querySelector('.fire-text');
  const habitName = li.querySelector('.habit-name');

  const isChecked = li.classList.toggle('checked-box-habit'); // so we dont run into bugs like if it was checked and an unchecked animaiton runs
  // toggling classes

  checkText.classList.toggle('opacity-0', !isChecked); // isChecked === false = button 'wasn't' clicked
  checkText.classList.toggle('opacity-100', isChecked); // isChecked === true = button 'was' clicked

  totalcount.classList.toggle('opacity-0', !isChecked);
  totalcount.classList.toggle('opacity-100', isChecked);

  btnCheck.classList.toggle('checked-button-habit', isChecked);
  fireIcon.classList.toggle('checked-box-fire-color', isChecked);
  fireText.classList.toggle('checked-box-fire-color', isChecked);

  // Making state True & +1 Day to Streak ----------------------

  // Implementing adding 1 to daystreak
  const arrayHabitNames = habits.map(habit => habit.habitName);

  // iterating through habits objects
  for (const hn of arrayHabitNames) {
    if (habitName.textContent === hn) {
      const checkedHabitObject = habits.find(habit => habit.habitName === hn);

      if (checkedHabitObject.didToday !== true) {
        checkedHabitObject.didToday = true; // setting didToday = true
        checkedHabitObject.habitStreak += 1; // adding one to object's day streak
        fireText.textContent = `${checkedHabitObject.habitStreak} day streak `; // changing the elements text
        calcHabitStatus(habits);
        calcBestStreak(habits);
      } else {
        checkedHabitObject.didToday = false;
        checkedHabitObject.habitStreak -= 1;
        fireText.textContent = `${checkedHabitObject.habitStreak} day streak `;
        calcHabitStatus(habits);
        calcBestStreak(habits);
      }
    }
    // Adding Box For when there are no habits
  }

  // Delete Button ----------------------
});
