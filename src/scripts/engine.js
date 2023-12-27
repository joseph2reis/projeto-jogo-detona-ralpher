const state = {
    view: {
        square: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
        panel: document.querySelector(".panel"),
        buttonStart: document.querySelector(".start"),
        gameOver: document.querySelector(".game-over"),
        pontuacao: document.querySelector("#pontuacao")
    },

    values: {
        velocidadeDoGame: 500,
        hitPosition: 0,
        result: 0,
        curretTime: 30,
        livesRestante: 3
    },

    actions: {
        timerId: null,
        countDownTimeId: null,
    }
};

function lives() {
    state.values.livesRestante--;
    state.view.lives.textContent = state.values.livesRestante;
    state.view.pontuacao.textContent = state.values.result

    if (state.values.livesRestante <= 0) {
        clearInterval(state.actions.countDownTimeId);
        clearInterval(state.actions.timerId);
        state.view.panel.style.display = "none";
        state.view.panel.style.display = "none";
        state.view.gameOver.style.display = "flex";
    }

}

function removerbotao() {
    state.view.buttonStart.style.display = "none";
}

function exibirPanel() {
    state.view.panel.style.display = "flex";
}

function enemy() {
    state.actions.timerId = setInterval(randomSquare, 1000);
    state.actions.countDownTimeId = setInterval(countDown, 1000);
}

function countDown() {
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;
    state.view.pontuacao.textContent = state.values.result
    if (state.values.curretTime <= 0) {
        clearInterval(state.actions.countDownTimeId);
        clearInterval(state.actions.timerId);
        state.view.panel.style.display = "none";
        state.view.panel.style.display = "none";
        state.view.gameOver.style.display = "flex";

    }
}


function playSound(sound) {
    let audio = new Audio(`./src/audios/${sound}.m4a`)
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    state.view.square.forEach((square => {
        square.classList.remove("enemy");
    }));

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.square[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;

}


function addListenerHitBox() {
    state.view.square.forEach((square => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }

            else if (square.id != state.values.hitPosition) {
                lives();
            }

        })
    }));
}

function initialize() {
    removerbotao();
    exibirPanel();
    addListenerHitBox();
    enemy();

}

// initialize();
