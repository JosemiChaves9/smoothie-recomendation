const fruits = ['🍎', '🍐', '🍑', '🍌', '🍉', '🍇', '🍓', '🥥', '🍈', '🥝', '🍍'];

const template = document.getElementById("smoothie-template");
const container = document.getElementById("container");
const smoothiesQuantity = 20;


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
        setStartEventListeners(clone, idx);
        container.append(clone);
    });
}

const setStartEventListeners = (clone, idx) => {
    const stars = clone.querySelectorAll(".star");
    stars.forEach((star) => {
        star.addEventListener("click", () => {
            stars.forEach((starToRemoveClass) => starToRemoveClass.classList.remove(`star--active`))
            star.classList.add(`star--active`);
            let rating = star.dataset.score;
            smoothieList[idx].value = rating;
        });
    });
}

const smoothieList = new Array(smoothiesQuantity).fill(null).map(() => ({
    smoothie: generateSmoothie(4),
    value: 0
}));

const resetDom = () => {
    const container = document.getElementById("container")
    container.innerHTML = '';
    renderSmoothieListToDom(smoothieList)
}
renderSmoothieListToDom(smoothieList);
console.log(smoothieList);  