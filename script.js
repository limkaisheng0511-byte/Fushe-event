/* ==================================================
   🌸 获取页面元素
   ================================================== */

const startButton =
  document.getElementById("startButton");

const openingScreen =
  document.querySelector(".opening-screen");

const startScreen =
  document.querySelector(".start-screen");

const openLetterButton =
  document.querySelector(".open-letter");

const messageScreen =
  document.querySelector(".message-screen");

const envelope =
  document.querySelector(".envelope");


/* ==================================================
   🎵 Web Audio
   不需要 MP3
   不需要外部音乐文件
   ================================================== */

let audioContext = null;

let masterGain = null;

let musicStarted = false;


/* ==================================================
   🔊 初始化声音
   ================================================== */

function initAudio() {

  if (audioContext) {

    if (
      audioContext.state ===
      "suspended"
    ) {

      audioContext.resume();

    }

    return;

  }


  audioContext =
    new (
      window.AudioContext ||
      window.webkitAudioContext
    )();


  masterGain =
    audioContext.createGain();


  masterGain.gain.value =
    0.045;


  masterGain.connect(
    audioContext.destination
  );

}


/* ==================================================
   🎵 播放一个音符
   ================================================== */

function playNote(
  frequency,
  duration = 1.2,
  delay = 0
) {

  if (
    !audioContext ||
    !masterGain
  ) {

    return;

  }


  const oscillator =
    audioContext.createOscillator();


  const gain =
    audioContext.createGain();


  oscillator.type =
    "sine";


  oscillator.frequency.value =
    frequency;


  const startTime =
    audioContext.currentTime +
    delay;


  gain.gain.setValueAtTime(
    0.0001,
    startTime
  );


  gain.gain.exponentialRampToValueAtTime(
    0.12,
    startTime + 0.08
  );


  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    startTime + duration
  );


  oscillator.connect(gain);

  gain.connect(masterGain);


  oscillator.start(startTime);


  oscillator.stop(
    startTime +
    duration +
    0.05
  );

}


/* ==================================================
   🎵 梦幻音乐盒
   ================================================== */

function startMusicBox() {

  if (musicStarted) {

    return;

  }


  musicStarted = true;


  initAudio();


  const melody = [

    523.25,
    659.25,
    783.99,
    659.25,

    587.33,
    698.46,
    880.00,
    698.46,

    523.25,
    659.25,
    783.99,
    1046.50

  ];


  melody.forEach(
    (frequency, index) => {

      playNote(
        frequency,
        1.4,
        index * 0.65
      );

    }
  );


  /* 第二层低音 */

  setTimeout(() => {

    melody.forEach(
      (frequency, index) => {

        playNote(
          frequency / 2,
          1.8,
          index * 0.72
        );

      }
    );

  }, 7800);

}


/* ==================================================
   ✨ 正式开幕铃声
   ================================================== */

function playOpeningChime() {

  if (!audioContext) {

    return;

  }


  playNote(
    1046.50,
    1.2,
    0
  );


  playNote(
    1318.51,
    1.4,
    0.12
  );


  playNote(
    1567.98,
    1.6,
    0.25
  );

}


/* ==================================================
   💌 打开信封铃声
   ================================================== */

function playEnvelopeChime() {

  if (!audioContext) {

    return;

  }


  playNote(
    783.99,
    0.8,
    0
  );


  playNote(
    1046.50,
    1.0,
    0.12
  );


  playNote(
    1318.51,
    1.2,
    0.25
  );

}


/* ==================================================
   💌 START
   ================================================== */

startButton.addEventListener(
  "click",
  function () {


    /* 开音乐 */

    startMusicBox();


    /* 开幕铃声 */

    playOpeningChime();


    /* 隐藏 START */

    startScreen.classList.add(
      "hide"
    );


    /* 显示舞台 */

    setTimeout(() => {

      openingScreen.classList.add(
        "active"
      );


      createFloatingDecorations();

    }, 450);

  }
);


/* ==================================================
   🌸 漂浮装饰
   ================================================== */

function createFloatingDecorations() {

  const symbols = [

    "♡",
    "✦",
    "✧",
    "💕",
    "🌸",
    "✨",
    "♡",
    "🎀",
    "✦",
    "💗",
    "🌷",
    "✧"

  ];


  symbols.forEach(
    (symbol, index) => {


      const item =
        document.createElement(
          "div"
        );


      item.className =
        "floating-decoration";


      item.textContent =
        symbol;


      item.style.left =
        Math.random() *
        100 +
        "%";


      item.style.top =
        70 +
        Math.random() *
        25 +
        "%";


      item.style.fontSize =
        18 +
        Math.random() *
        24 +
        "px";


      item.style.animationDelay =
        2 +
        index *
        0.18 +
        "s";


      openingScreen.appendChild(
        item
      );

    }
  );

}


/* ==================================================
   💌 打开正式的信
   ================================================== */

openLetterButton.addEventListener(
  "click",
  function () {

    messageScreen.classList.add(
      "show"
    );

  }
);


/* ==================================================
   💌 点击信封
   ================================================== */

envelope.addEventListener(
  "click",
  function () {


    /* 防止重复点击 */

    if (
      envelope.classList.contains(
        "open"
      )
    ) {

      return;

    }


    /* 铃声 */

    playEnvelopeChime();


    /* 打开 */

    envelope.classList.add(
      "open"
    );

  }
);