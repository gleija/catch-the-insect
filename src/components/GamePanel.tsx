import React from 'react';
import classes from './GamePanel.module.css';

const GamePanel: React.FunctionComponent = () => {
  let screens: NodeListOf<HTMLElement>;
  let choose_insect_btns: NodeListOf<HTMLButtonElement>;
  let start_btn: HTMLButtonElement;
  let game_container: HTMLElement | null;
  let timeEl: HTMLElement | null;
  let scoreEl: HTMLElement;
  let message: HTMLElement | null;
  let seconds = 0;
  let score = 0;
  let selected_insect = { alt: '', src: '' };

  const startGame = () => {
    setInterval(increaseTime, 1000);
  };

  const increaseTime = () => {
    let m: string | number = Math.floor(seconds / 60);
    let s: string | number = seconds % 60;
    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;
    if (!timeEl) {
      return;
    }
    timeEl.innerHTML = `Time: ${m}:${s}`;
    seconds++;
  };

  const createInsect = () => {
    const insect = document.createElement('div') as HTMLDivElement;
    insect.classList.add(classes.insect);
    const { x, y } = getRandomLocation();
    insect.style.top = `${y}px`;
    insect.style.left = `${x}px`;
    insect.innerHTML = `<img src="${selected_insect.src}" alt="${
      selected_insect.alt
    }" style="transform: rotate(${Math.random() * 360}deg)" />`;

    insect.addEventListener('click', () => {
      increaseScore();
      insect.classList.add(classes.caught);
      setTimeout(() => insect.remove(), 2000);
      addInsects();
    });

    game_container?.appendChild(insect);
  };

  const getRandomLocation = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = Math.random() * (width - 200) + 100;
    const y = Math.random() * (height - 200) + 100;
    return { x, y };
  };

  const addInsects = () => {
    setTimeout(createInsect, 1000);
    setTimeout(createInsect, 1500);
  };

  const increaseScore = () => {
    score++;
    if (score > 19) {
      message?.classList.add(classes.visible);
    }
    scoreEl.innerHTML = `Score: ${score}`;
  };

  React.useEffect(() => {
    screens = document.querySelectorAll<HTMLElement>(`.${classes.screen}`);
    choose_insect_btns = document.querySelectorAll<HTMLButtonElement>(
      `.${classes['choose-insect-btn']}`
    );
    start_btn = document.getElementById('start-btn') as HTMLButtonElement;
    game_container = document.getElementById('game-container');
    timeEl = document.getElementById('time') as HTMLElement;
    scoreEl = document.getElementById('score') as HTMLElement;
    message = document.getElementById('message') as HTMLElement;

    start_btn.addEventListener('click', () =>
      screens[0].classList.add(classes.up)
    );

    choose_insect_btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const img = btn.querySelector('img') as HTMLElement;
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt');
        if (!src || !alt) {
          return;
        }
        selected_insect = { src, alt };
        screens[1].classList.add(classes.up);
        setTimeout(createInsect, 1000);
        startGame();
      });
    });
  }, []);

  return (
    <>
      <div className={classes.screen}>
        <h1>Catch The Insect</h1>
        <button className={classes.btn} id="start-btn">
          Play Game
        </button>
      </div>

      <div className={classes.screen}>
        <h1>What is your "favorite" insect?</h1>
        <ul className={classes['insects-list']}>
          <li>
            <button className={classes['choose-insect-btn']}>
              <p>Fly</p>
              <img
                src="http://pngimg.com/uploads/fly/fly_PNG3946.png"
                alt="fly"
              />
            </button>
          </li>
          <li>
            <button className={classes['choose-insect-btn']}>
              <p>Mosquito</p>
              <img
                src="http://pngimg.com/uploads/mosquito/mosquito_PNG18175.png"
                alt="mosquito"
              />
            </button>
          </li>
          <li>
            <button className={classes['choose-insect-btn']}>
              <p>Spider</p>
              <img
                src="http://pngimg.com/uploads/spider/spider_PNG12.png"
                alt="spider"
              />
            </button>
          </li>
          <li>
            <button className={classes['choose-insect-btn']}>
              <p>Roach</p>
              <img
                src="http://pngimg.com/uploads/roach/roach_PNG12163.png"
                alt="roach"
              />
            </button>
          </li>
        </ul>
      </div>

      <div
        className={`${classes.screen} ${classes['game-container']}`}
        id="game-container"
      >
        <h3 id="time" className={classes.time}>
          Time: 00:00
        </h3>
        <h3 id="score" className={classes.score}>
          Score: 0
        </h3>
        <h5 id="message" className={classes.message}>
          Are you annnoyed yet? <br />
          You are playing an impossible game!!
        </h5>
      </div>
    </>
  );
};

export default GamePanel;
