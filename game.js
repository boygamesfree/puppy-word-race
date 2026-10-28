(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const screens = { intro: $("intro-screen"), game: $("game-screen"), results: $("results-screen") };
  // Short, familiar words selected for beginning readers.
  const WORDS = [
    "cat","dog","sun","hat","map","pig","bug","red","fox","hop",
    "run","fun","cup","bed","jam","leg","mud","pet","top","van",
    "fish","frog","duck","milk","star","tree","blue","jump","bird","cake",
    "book","play","ship","rain","moon","hand","frog","camp","nest","smile"
  ];
  const state = { score: 0, words: 0, correctChars: 0, typedChars: 0, time: 60, currentWord: "", running: false, timer: null, lastWord: "", progress: 0, rivalProgress: 0 };
  const input = $("word-input");
  function showScreen(name) {
    Object.entries(screens).forEach(([key, el]) => el.classList.toggle("hidden", key !== name));
  }
  function accuracy() {
    return state.typedChars ? Math.round((state.correctChars / state.typedChars) * 100) : 100;
  }
  function updateStats() {
    $("score").textContent = state.score;
    $("words-done").textContent = state.words;
    $("accuracy").textContent = accuracy() + "%";
    $("time").textContent = state.time;
    $("progress-fill").style.width = state.progress + "%";
    $("progress-label").textContent = state.progress + "%";
  }
  function chooseWord() {
    let word = state.currentWord;
    while (word === state.currentWord && WORDS.length > 1) word = WORDS[Math.floor(Math.random() * WORDS.length)];
    state.lastWord = state.currentWord;
    state.currentWord = word;
    $("word-target").textContent = word.toUpperCase();
    input.value = "";
    input.focus({ preventScroll: true });
  }
  function feedback(text, kind = "") {
    const el = $("word-feedback");
    el.textContent = text;
    el.className = ("word-feedback " + kind).trim();
  }
  function startGame() {
    stopTimer();
    Object.assign(state, { score: 0, words: 0, correctChars: 0, typedChars: 0, time: 60, currentWord: "", running: true, lastWord: "", progress: 0, rivalProgress: 0 });
    $("dog-racer").style.left = "7%";
    $("rival-racer").style.left = "12%";
    updateStats();
    chooseWord();
    feedback("Type the whole word, then press Enter!");
    showScreen("game");
    input.value = "";
    input.focus({ preventScroll: true });
    state.timer = window.setInterval(() => {
      if (!state.running) return;
      state.time -= 1;
      // Friendly computer rival moves slowly, so the player can see race progress.
      state.rivalProgress = Math.min(94, state.rivalProgress + 0.65);
      $("rival-racer").style.left = state.rivalProgress + "%";
      updateStats();
      if (state.time <= 0) finishGame();
    }, 1000);
  }
  function stopTimer() {
    if (state.timer !== null) {
      window.clearInterval(state.timer);
      state.timer = null;
    }
  }
  function submitWord() {
    if (!state.running) return;
    const typed = input.value.trim().toLowerCase();
    if (!typed) {
      feedback("Type the word you see above first!", "bad");
      input.focus({ preventScroll: true });
      return;
    }
    state.typedChars += typed.length;
    let matching = 0;
    for (let i = 0; i < Math.min(typed.length, state.currentWord.length); i++) {
      if (typed[i] === state.currentWord[i]) matching++;
    }
    state.correctChars += matching;
    if (typed === state.currentWord) {
      state.words += 1;
      state.score += 10 + Math.max(0, state.currentWord.length - 3) * 2;
      state.progress = Math.min(100, state.progress + 8);
      $("dog-racer").style.left = Math.min(89, 7 + state.progress * .82) + "%";
      feedback(["Great spelling! Dash is zooming! 🐾", "Pawsome work! Keep racing! ⭐", "You got it! Woof woof! 🐶", "Fantastic typing! 🍖"][Math.floor(Math.random() * 4)], "good");
      updateStats();
      if (state.progress >= 100) {
        finishGame(true);
        return;
      }
      window.setTimeout(() => {
        if (state.running) {
          chooseWord();
          feedback("Ready for the next word?");
        }
      }, 450);
    } else {
      feedback("Not quite! Check the letters and try again.", "bad");
      input.select();
      updateStats();
    }
  }
  function finishGame(won = false) {
    state.running = false;
    stopTimer();
    $("final-score").textContent = state.score;
    $("final-words").textContent = state.words;
    $("final-accuracy").textContent = accuracy() + "%";
    $("result-title").textContent = won ? "You won the race!" : (state.words >= 8 ? "Pawsome job!" : "Good practice, racer!");
    $("result-message").textContent = won
      ? "Dash crossed the finish line thanks to your awesome typing!"
      : state.words >= 8
        ? "You and Dash typed lots of words. Keep practicing to get even faster!"
        : "Every race helps you learn. Try again and help Dash go even farther!";
    showScreen("results");
  }
  $("start-btn").addEventListener("click", startGame);
  $("play-again-btn").addEventListener("click", startGame);
  $("submit-word").addEventListener("click", submitWord);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submitWord();
    }
  });
  $("home-btn").addEventListener("click", () => { state.running = false; stopTimer(); showScreen("intro"); });
  $("intro-btn").addEventListener("click", () => { state.running = false; stopTimer(); showScreen("intro"); });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && state.running) {
      // Timer remains simple and consistent; returning to the tab resumes play.
    }
  });
  showScreen("intro");
})();
