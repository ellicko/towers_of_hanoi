class TowerOfHanoi {
    constructor(numDisks) {
        this.numDisks = numDisks;
        this.rods = [[], [], []];
        this.colors = ["blue", "red", "green"]; // Array of colors
        for (let i = numDisks; i > 0; i--) {
            this.rods[0].push(i);
        }
    }

    moveDisk(fromRod, toRod) {
        if (this.rods[fromRod].length === 0) {
            return false;
        }
        if (this.rods[toRod].length === 0 || this.rods[toRod][this.rods[toRod].length - 1] > this.rods[fromRod][this.rods[fromRod].length - 1]) {
            this.rods[toRod].push(this.rods[fromRod].pop());
            return true;
        }
        return false;
    }

    checkWin() {
        if (this.rods[2].length === this.numDisks) {
            for(let i = 0; i < this.rods[2].length; i++) {
                if (this.rods[2][i] !== this.numDisks - i) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
}

let game = new TowerOfHanoi(3);

function moveDisk(fromRod, toRod) {
    game.moveDisk(fromRod, toRod);
    updateGameDisplay();
    if (game.checkWin()) {
        alert("You've won the game!");
    }
}

function updateGameDisplay() {
    let gameDisplay = document.getElementById("game");
    gameDisplay.innerHTML = "";
    for (let i = 0; i < game.rods.length; i++) {
        let rod = document.createElement("div");
        for (let j = 0; j < game.rods[i].length; j++) {
            let disk = document.createElement("div");
            disk.textContent = game.rods[i][j];
            disk.style.width = game.rods[i][j] * 20 + "px"; // Set the disk width based on the disk number
            disk.style.backgroundColor = game.colors[game.rods[i][j] - 1]; // Set the disk color based on the disk number
            rod.appendChild(disk);
        }
        gameDisplay.appendChild(rod);
    }
}

updateGameDisplay();
