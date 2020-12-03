import { SmoothieNeuralNet } from './ai.js';


// Necessary variables and elements
const fruits = ['🍎', '🍐', '🍑', '🍌', '🍉', '🍇', '🍓', '🥥', '🍈', '🥝', '🍍', '🥭'];
const template = document.getElementById("smoothie-template");
const container = document.getElementById("container");
const btnPredictEl = document.getElementById('btn-predict')
const btnResetEl = document.getElementById('btn-reset')
const btnTrainEl = document.getElementById('btn-train')
const smoothiesQuantity = 20;
let smoothieList;
const net = new SmoothieNeuralNet;

const generateSmoothieList = () => {
    smoothieList = new Array(smoothiesQuantity).fill(null).map(() => ({
        smoothie: generateSmoothie(4),
        value: 0
    }));
}

const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * max) - min;
};

const generateRandomFruit = () => {
    const randomNum = generateRandomNumber(0, fruits.length);
    return fruits[randomNum];
};

const generateUniqueFruitForSmoothie = (smoothie) => {
    const randomFruit = generateRandomFruit();
    if (smoothie.includes(randomFruit)) {
        return generateUniqueFruitForSmoothie(smoothie);
    } else {
        return randomFruit;
    };
};

const generateSmoothie = (numberOfFruits) => {
    const smoothie = [];
    while (smoothie.length < numberOfFruits) {
        const randomFruit = generateUniqueFruitForSmoothie(smoothie);
        smoothie.push(randomFruit);
    };
    return smoothie;
}

const renderSmoothieListToDom = (smoothieList) => {
    smoothieList.forEach((smoothieData, idx) => {
        const clone = template.content.cloneNode(true);
        var li = clone.querySelectorAll("li");
        li[0].textContent = smoothieData.smoothie[0];
        li[1].textContent = smoothieData.smoothie[1];
        li[2].textContent = smoothieData.smoothie[2];
        li[3].textContent = smoothieData.smoothie[3];
        setStarEventListeners(clone, idx);
        container.append(clone);
    });
}

const setStarEventListeners = (clone, idx) => {
    const stars = clone.querySelectorAll(".star");
    stars.forEach((star) => {
        star.addEventListener("click", () => onClickOnStar(stars, star, idx));
    });
}

const onClickOnStar = (stars, star, idx) => {
    stars.forEach((starToRemoveClass) => starToRemoveClass.classList.remove(`star--active`))
    star.classList.add(`star--active`);
    let rating = star.dataset.score;
    smoothieList[idx].value = parseInt(rating);
    console.log(smoothieList);
}

const resetDom = () => {
    const container = document.getElementById("container")
    container.innerHTML = '';
    start();
}


// START

const start = () => {
    generateSmoothieList();
    renderSmoothieListToDom(smoothieList);
}

const onClickOnPredict = () => {
    const predictionInput = Array.from(document.getElementsByClassName('prediction-input')).map(el => el.value)
    console.log(predictionInput)
}



const onClickOnTrain = () => {
    net.train(fruits, smoothieList)
}

// Listeners
btnPredictEl.addEventListener('click', onClickOnPredict)
btnResetEl.addEventListener('click', resetDom)
btnTrainEl.addEventListener('click', onClickOnTrain)

start();
