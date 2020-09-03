// 1. only 3 chances
// 2. number out of range
// 3. check history
// 4. number already typed
// 5. timer
// 6.  reset

let timer; // time counting var
let secretNumber = Math.ceil(Math.random() * 100);
console.log(secretNumber);

const gameHistory = [];

let history = [];
let guessesRemaining = 3;

// refresh timer once page loaded
timeOut();

function guessNumber() {
  let guess = document.getElementById("userGuess").value;

  if (!guess) {
    document.getElementById("status").innerHTML = "Please input valid number!";
    return;
  }

  if (guess < 0 || guess > 100) {
    document.getElementById("status").innerHTML =
      "Guessed number is out of range!";
    return;
  }

  if (history.length > 0 && history.includes(guess)) {
    document.getElementById("status").innerHTML = "Already guessed!";
    return;
  } else {
    history.push(guess);
    renderHistory();
  }

  console.log(guess);
  console.log(history);

  let win = false;

  if (guess == secretNumber) {
    document.getElementById("successAlert").style.display = "block";
    document.getElementById("guessBtn").disabled = true;
    win = true;
    guessesRemaining -= 1;
    document.getElementById("status").style.display = "none";

    // update game history
    gameHistory.push("You won!");

    // freeze timer
    clearInterval(timer);
    // no return to get guess status below

    // render history
    renderGameHistory();
  } else if (guess < secretNumber) {
    result = "Too low";
    guessesRemaining -= 1;
  } else {
    result = "Too high";
    guessesRemaining -= 1;
  }

  // get guess status
  document.getElementById("guessesRemaining").innerHTML = guessesRemaining;

  document.getElementById("status").innerHTML = result;

  // when out of guess and yet win
  //   if (guessesRemaining == 0 && win == false) {
  //     setTimeout(function () {
  //       document.getElementById("status").innerHTML = "Game over!";
  //     }, 100);
  //     document.getElementById("guessBtn").disabled = true;
  //     // freeze timer
  //     clearInterval(timer);
  //     return;
  //   }

  if (guessesRemaining == 0 && win == false) {
    playerLoose();
    return;
  }

  // khi user chưa thắng, và mới input guess number mới thì set lại timer
  if (!win) {
    timeOut();
  }

  // clear input field
  document.getElementById("userGuess").value = "";
}

function playerLoose() {
  setTimeout(function () {
    document.getElementById("status").innerHTML = "Game over!";
  }, 100);
  document.getElementById("guessBtn").disabled = true;
  // freeze timer
  clearInterval(timer);

  // update game history
  gameHistory.push("You lost!");

  // render history
  renderGameHistory();

  //   console.log("game History: ", gameHistory);
}

// render history content
function renderHistory() {
  historyContent = "";
  if (history.length > 0) {
    for (let i = 0; i < history.length; i++) {
      historyContent += `
            <span>${history[i]}</span>
        `;
    }

    document.getElementById("yourGuesses").innerHTML = historyContent;
  }
}

function renderGameHistory() {
  gameHistoryContent = "";

  if (gameHistory.length > 0) {
    for (let i = 0; i < gameHistory.length; i++) {
      gameHistoryContent += `
                <tr>
                <td>${i + 1}</td> <td>${gameHistory[i]}</td>
                </tr>
            `;
    }
  }

  document.getElementById("gameHistoryContent").innerHTML = gameHistoryContent;
}

// reset button
$("#reset").click(function () {
  // gán đè lên các biến global ở ngoài, không set lại biến local trong hàm này
  timer;
  secretNumber = Math.ceil(Math.random() * 100);
  console.log(secretNumber);

  history = [];
  guessesRemaining = 3;
  timeOut();

  document.getElementById("guessesRemaining").innerHTML = guessesRemaining;

  document.getElementById("userGuess").value = "";

  document.getElementById("guessBtn").disabled = false;

  document.getElementById("yourGuesses").innerHTML = "";

  document.getElementById("status").innerHTML = "";

  document.getElementById("successAlert").style.display = "none";
});

// timeout
// function timeOut() {
//     var timeoutHandle;
//     function countdown(minutes, seconds) {
//         function tick() {
//             var counter = document.getElementById("timer");
//             counter.innerHTML =
//                 minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
//             seconds--;
//             if (seconds >= 0) {
//                 timeoutHandle = setTimeout(tick, 1000);
//             } else {
//                 if (minutes >= 1) {
//                     // countdown(mins-1);   never reach “00″ issue solved:Contributed by Victor Streithorst
//                     setTimeout(function () {
//                         countdown(minutes - 1, 59);
//                     }, 1000);
//                 }
//             }
//         }
//         tick();
//     }

//     countdown(1, 30);
// }

// function timeOut() {
//   let counter = 15;

//   const interval = setInterval(() => {
//     document.getElementById("timer").innerHTML = counter;
//     counter--;

//     if (counter < 0) {
//       clearInterval(interval);
//       document.getElementById("timer").innerHTML = "Ding!";
//     }
//   }, 1000);
// }

function timeOut() {
  let time = 15;

  // if timer is running then stop timer
  clearInterval(timer);

  let timeElm = document.getElementById("timer");
  timeElm.innerHTML = time;

  // update timer
  timer = setInterval(function () {
    time--;
    // if timer hit 0, clear interval
    if (time == 0) {
      playerLoose();
      clearInterval(timer);
    }

    timeElm.innerHTML = time;
  }, 1000);
}
