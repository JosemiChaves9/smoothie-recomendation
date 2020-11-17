let fruits = ['🍎', '🍐', '🍑', '🍌', '🍉', '🍇', '🍓', '🥥', '🍈', '🥝', '🍍'];
let smoothie = [];

while (smoothie.length < 4) {
    for (let i = 0; i < 4; i++) {
        let randomNum = Math.floor(Math.random() * 10);
        if (smoothie.includes(fruits[randomNum])) {
            smoothie.pop();
        } else if (smoothie.length === 4) { ///because sometimes the array is 6 items long
            break;
        } else {
            smoothie.push(fruits[randomNum])
        };
    };
};


console.log(smoothie);