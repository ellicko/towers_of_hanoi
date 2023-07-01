class TowerOfHanoi {
    constructor(numDisks) {
        this.numDisks = numDisks;
        this.rods = [[], [], []];
        this.colors = ["blue", "red", "green"]; // Array of colors
        this.moves = 0; // Move counter
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
            this.moves++;
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
        rod.id = "rod" + i; // Assign each rod a unique ID
        for (let j = 0; j < game.rods[i].length; j++) {
            let disk = document.createElement("div");
            disk.id = "disk" + game.rods[i][j]; // Assign each disk a unique ID
            disk.textContent = game.rods[i][j];
            disk.style.width = game.rods[i][j] * 20 + "px"; // Set the disk width based on the disk number
            disk.style.backgroundColor = game.colors[game.rods[i][j] - 1]; // Set the disk color based on the disk number
            disk.onclick = function() { clickDisk(disk.id); };
            rod.appendChild(disk);
        }
        rod.onclick = function() { clickRod(rod.id); };
        gameDisplay.appendChild(rod);

        let moveCounter = document.getElementById("move-counter");
        if (!moveCounter) {
            moveCounter = document.createElement("div");
            moveCounter.id = "move-counter";
            document.body.appendChild(moveCounter);
        }
        moveCounter.textContent = `Moves: ${game.moves} | Minimum moves: ${Math.pow(2, game.numDisks) - 1}`;
    }
}

function resetGame() {
    game = new TowerOfHanoi(3);  // Adjust the number of disks as needed
    updateGameDisplay();
}


let selectedDisk = null;
let selectedRod = null;

function clickDisk(diskId) {
    let diskNum = parseInt(diskId.replace("disk", ""));
    // Check if the disk is the top disk in its rod
    for (let i = 0; i < game.rods.length; i++) {
        if (game.rods[i][game.rods[i].length - 1] === diskNum) {
            // Unselect the previously selected disk
            if (selectedDisk !== null) {
                document.getElementById(selectedDisk).style.border = "";
            }

            // Select the clicked disk
            selectedDisk = diskId;
            selectedRod = i; // Store the rod from which the disk is to be moved
            document.getElementById(selectedDisk).style.border = "3px solid red";  // Highlight the selected disk
            break;
        }
    }
    event.stopPropagation(); // Prevent the event from triggering the clickRod function
}

function clickRod(rodId) {
    // If a disk is selected, try to move it to the clicked rod
    if (selectedDisk !== null) {
        let toRod = parseInt(rodId.replace("rod", "")); // Extract the rod number from the rod ID
        if (selectedRod === toRod) {
            return; // If the selected rod is the same as the clicked rod, do nothing
        }
        if (game.moveDisk(selectedRod, toRod)) {
            // If the move was successful, unselect the disk
            document.getElementById(selectedDisk).style.border = "";
            selectedDisk = null;
            updateGameDisplay(); // Update the game display to reflect the move
            if (game.checkWin()) {
                let winSound = new Audio('winsound.wav');
                winSound.play();
                let modal = document.getElementById("modal");
                modal.style.display = "block";
                document.getElementById("close-modal").onclick = function() {
                    modal.style.display = "none";
                }
            }
        } else {
            alert("Invalid move!");
        }
    }
}

document.getElementById("restart-button").addEventListener("click", resetGame);

updateGameDisplay();
