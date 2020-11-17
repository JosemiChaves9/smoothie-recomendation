const fruits = ['🍎', '🍐', '🍑', '🍌', '🍉', '🍇', '🍓', '🥥', '🍈', '🥝', '🍍'];

const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * max) - min;
}

const generateRandomFruit = () => {
    const randomNum = generateRandomNumber(0, fruits.length);
    return fruits[randomNum];
}

const generateUniqueFruitForSmoothie = (smoothie) => {
    const randomFruit = generateRandomFruit();
    if (smoothie.includes(randomFruit)) {
        return generateUniqueFruitForSmoothie(smoothie);
    } else {
        return randomFruit;
    }
}

const generateSmoothie = (numberOfFruits) => {
    const smoothie = [];
    while (smoothie.length < numberOfFruits) {
        const randomFruit = generateUniqueFruitForSmoothie(smoothie);
        smoothie.push(randomFruit);
    };
    return smoothie;
}

const result = generateSmoothie(4);

console.log(result);
/*
while (smoothie.length < 4) {
    for (let i = 0; i < 4; i++) {
        let randomNum =
        if (smoothie.includes(fruits[randomNum])) {
            smoothie.pop();
        } else if (smoothie.length === 4) { ///because sometimes the array is 6 items long
            break;
        } else {
            smoothie.push(fruits[randomNum])
        };
    };
};


console.log(smoothie);*/