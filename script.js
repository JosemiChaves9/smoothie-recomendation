/*jshint esversion: 6 */

import { SmoothieNeuralNet } from './ai.js';


// Necessary variables and elements
const fruits = ['🍎', '🍐', '🍑', '🍌', '🍉', '🍇', '🍓', '🥥', '🍈', '🥝', '🍍', '🥭'];
const template = document.getElementById("smoothie-template");
const container = document.getElementById("container");
const btnPredictEl = document.getElementById('btn-predict');
const btnResetEl = document.getElementById('btn-reset');
const btnTrainEl = document.getElementById('btn-train');
const starPredicted1 = document.getElementById('rating-1');
const starPredicted2 = document.getElementById('rating-2');
const starPredicted3 = document.getElementById('rating-3');
const starPredicted4 = document.getElementById('rating-4');
const starPredicted5 = document.getElementById('rating-5');
let predictionRating = document.getElementById("prediction-rating");
const smoothiesQuantity = 20;
let smoothieList;
const net = new SmoothieNeuralNet();



const generateSmoothieList = () => {
    smoothieList = new Array(smoothiesQuantity).fill(null).map(() => ({
        smoothie: generateSmoothie(4),
        value: 0
    }));
};

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
    }
};

const generateSmoothie = (numberOfFruits) => {
    const smoothie = [];
    while (smoothie.length < numberOfFruits) {
        const randomFruit = generateUniqueFruitForSmoothie(smoothie);
        smoothie.push(randomFruit);
    }
    return smoothie;
};

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
};

const setStarEventListeners = (clone, idx) => {
    const stars = clone.querySelectorAll(".star");
    stars.forEach((star) => {
        star.addEventListener("click", () => onClickOnStar(stars, star, idx));
    });
};

const onClickOnStar = (stars, star, idx) => {
    stars.forEach((starToRemoveClass) => starToRemoveClass.classList.remove(`star--active`));
    star.classList.add(`star--active`);
    let rating = star.dataset.score;
    smoothieList[idx].value = parseInt(rating);
    console.log(smoothieList);
};

const resetDom = () => {
    container.innerHTML = '';
    start();
};

// START

const start = () => {
    generateSmoothieList();
    renderSmoothieListToDom(smoothieList);
};


const onClickOnPredict = () => {
    const predictionInput = Array.from(document.getElementsByClassName('prediction-input')).map(el => el.value);
    const result = net.predict(fruits, predictionInput);
    const scorePercentage = Math.trunc(result.score * 100);
    predictionRating.innerHTML = `${scorePercentage} %`;
    renderStarsRating(scorePercentage);

};

const renderStarsRating = (scorePercentage) => {
    starPredicted1.classList.remove(`star--active`);
    starPredicted2.classList.remove(`star--active`);
    starPredicted3.classList.remove(`star--active`);
    starPredicted4.classList.remove(`star--active`);
    starPredicted5.classList.remove(`star--active`);
    switch (true) {
        case scorePercentage <= 20:
            starPredicted1.classList.add(`star--active`);
            break;
        case scorePercentage < 40:
            starPredicted2.classList.add(`star--active`);
            starPredicted1.classList.add(`star--active`);
            break;
        case scorePercentage < 60:
            starPredicted3.classList.add(`star--active`);
            starPredicted2.classList.add(`star--active`);
            starPredicted1.classList.add(`star--active`);
            break;
        case scorePercentage < 80:
            starPredicted4.classList.add(`star--active`);
            starPredicted3.classList.add(`star--active`);
            starPredicted2.classList.add(`star--active`);
            starPredicted1.classList.add(`star--active`);
            break;
        case scorePercentage < 100:
            starPredicted5.classList.add(`star--active`);
            starPredicted4.classList.add(`star--active`);
            starPredicted3.classList.add(`star--active`);
            starPredicted2.classList.add(`star--active`);
            starPredicted1.classList.add(`star--active`);
            break;
    }
};


const onClickOnTrain = () => {
    net.train(fruits, smoothieList);
};

// Listeners
btnPredictEl.addEventListener('click', onClickOnPredict);
btnResetEl.addEventListener('click', resetDom);
btnTrainEl.addEventListener('click', onClickOnTrain);



start();
