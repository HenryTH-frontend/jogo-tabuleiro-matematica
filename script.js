document.addEventListener('DOMContentLoaded', () => {
    const boardSize = 25; // 5x5 board
    let currentPlayer = 1;
    let playerPositions = [0, 0];
    let specialCells = []; // Array para armazenar índices das células especiais
    
    const board = document.getElementById('board');
    const currentPlayerDisplay = document.getElementById('current-player');
    const questionDisplay = document.getElementById('question');
    const answerInput = document.getElementById('answer');
    const submitAnswerButton = document.getElementById('submit-answer');
    const diceContainer = document.getElementById('dice-container');
    const dice = document.getElementById('dice');
    
    function generateBoard() {
        const boardNames = [
            "EUA", "Brasil", "Portugal", "França", "Afeganistão",
            "Chile", "china", "japão", "Canadá", "México",
            "Argentina", "Inglaterra", "Coréia-Sul", "Coréia-Norte", "Avenida 15",
            "Avenida 16", "Avenida 17", "Avenida 18", "Avenida 19", "Avenida 20",
            "Avenida 21", "Avenida 22", "Avenida 23", "Avenida 24", "Avenida 25"
        ];
    
        for (let i = 0; i < boardSize; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-index', i);
            cell.title = boardNames[i]; // Adiciona o nome da avenida como título
            board.appendChild(cell);
        }
        // Gerar quatro células especiais
        generateSpecialCells();
        updateBoard();
    }
    
    function generateSpecialCells() {
        // Limpar células especiais anteriores
        specialCells = [];
        
        // Gerar quatro células aleatórias para conter o número de casas de volta
        while (specialCells.length < 4) {
            const randomIndex = Math.floor(Math.random() * boardSize);
            if (!specialCells.includes(randomIndex)) {
                specialCells.push(randomIndex);
            }
        }
        
        // Adicionar número de casas de volta às células especiais
        specialCells.forEach(index => {
            const numCellsBack = Math.floor(Math.random() * 4) + 1; // Voltar de 1 a 4 casas
            const cell = document.querySelector(`.cell[data-index="${index}"]`);
            cell.textContent = `-${numCellsBack}`;
            cell.classList.add('special-cell');
            cell.dataset.numCellsBack = numCellsBack;
        });
    }
    
    function updateBoard() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.classList.remove('player1', 'player2');
        });
        cells[playerPositions[0]].classList.add('player1');
        cells[playerPositions[1]].classList.add('player2');
    }
    
    function isPerfectSquare(num) {
        const sqrt = Math.sqrt(num);
        return sqrt % 1 === 0; // Check if sqrt is an integer
    }
    
    function generateQuestion() {
        let num1, num2, operation, question, answer;
        const randomOperation = Math.floor(Math.random() * 6); // 0 to 5
        
        switch(randomOperation) {
            case 0: // Addition
                num1 = Math.floor(Math.random() * 10) + 1;
                num2 = Math.floor(Math.random() * 10) + 1;
                question = `${num1} + ${num2}`;
                answer = num1 + num2;
                break;
            case 1: // Subtraction
                num1 = Math.floor(Math.random() * 10) + 1;
                num2 = Math.floor(Math.random() * 10) + 1;
                if (num2 > num1) { // Ensure positive result
                    [num1, num2] = [num2, num1]; // Swap if num2 > num1
                }
                question = `${num1} - ${num2}`;
                answer = num1 - num2;
                break;
            case 2: // Multiplication
                num1 = Math.floor(Math.random() * 5) + 1; // Limiting for board size
                num2 = Math.floor(Math.random() * 5) + 1;
                question = `${num1} * ${num2}`;
                answer = num1 * num2;
                break;
            case 3: // Division
                num2 = Math.floor(Math.random() * 5) + 1; // Limiting for board size
                num1 = num2 * (Math.floor(Math.random() * 5) + 1); // Ensure exact division
                question = `${num1} / ${num2}`;
                answer = num1 / num2;
                break;
            case 4: // Exponentiation (Power)
                num1 = Math.floor(Math.random() * 4) + 1; // Base
                num2 = Math.floor(Math.random() * 3) + 2; // Exponent (start from 2)
                question = `${num1} ^ ${num2}`;
                answer = Math.pow(num1, num2);
                break;
            case 5: // Radication (Square Root)
                do {
                    num1 = Math.floor(Math.random() * 25) + 1; // Limiting for board size
                } while (!isPerfectSquare(num1)); // Ensure perfect square
                question = `√${num1}`;
                answer = Math.sqrt(num1);
                break;
        }
        
        return { question, answer };
    }
    
    function askQuestion() {
        const { question, answer } = generateQuestion();
        questionDisplay.textContent = `Resolva: ${question}`;
        submitAnswerButton.dataset.correctAnswer = answer;
        diceContainer.classList.add('hidden');
        hideDiceDots();
    }
    
    function rollDice() {
        const roll = Math.floor(Math.random() * 6) + 1;
        showDiceValue(roll);
        return roll;
    }
    
    function showDiceValue(value) {
        hideDiceDots();
        diceContainer.classList.remove('hidden');
        switch(value) {
            case 1:
                document.querySelector('.dot[data-dot="1"]').style.opacity = 1;
                break;
            case 2:
                document.querySelector('.dot[data-dot="2"]').style.opacity = 1;
                document.querySelector('.dot[data-dot="3"]').style.opacity = 1;
                break;
            case 3:
                document.querySelector('.dot[data-dot="1"]').style.opacity = 1;
                document.querySelector('.dot[data-dot="2"]').style.opacity = 1;
                document.querySelector('.dot[data-dot="3"]').style.opacity = 1;
                break;
            case 4:
                document.querySelector('.dot[data-dot="2"]').style.opacity = 1;
                document.querySelector('.dot[data-dot="3"]').style.opacity = 1;
                document.querySelector('.dot[data-dot="5"]').style.opacity = 1;
                document.querySelector('.dot[data-dot="6"]').style.opacity = 1;
                break;
            case 5:
                document.querySelector('.dot[data-dot="1"]').style.opacity = 1;
                document.querySelector('.dot[data-dot="2"]').style.opacity = 1;
                document.querySelector('.dot[data-dot="3"]').style.opacity = 1;
                document.querySelector('.dot[data-dot="5"]').style.opacity = 1;
                document.querySelector('.dot[data-dot="6"]').style.opacity = 1;
                break;
            case 6:
                document.querySelector('.dot[data-dot="2"]').style.opacity = 1;
                document.querySelector('.dot[data-dot="3"]').style.opacity = 1;
                document.querySelector('.dot[data-dot="4"]').style.opacity = 1;
                document.querySelector('.dot[data-dot="5"]').style.opacity = 1;
                document.querySelector('.dot[data-dot="6"]').style.opacity = 1;
                document.querySelector('.dot[data-dot="7"]').style.opacity = 1;
                break;
        }
    }
    
    function hideDiceDots() {
        document.querySelectorAll('.dot').forEach(dot => {
            dot.style.opacity = 0;
        });
    }
    
    function switchPlayer() {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        currentPlayerDisplay.textContent = `Jogador Atual: ${currentPlayer}`;
    }
    
    function movePlayerBack(playerIndex, numCells) {
        playerPositions[playerIndex] -= numCells;
        if (playerPositions[playerIndex] < 0) {
            playerPositions[playerIndex] = 0; // Não permitir movimento para trás do início
        }
    }
    
    function checkSpecialCell(playerIndex) {
        const playerCellIndex = playerPositions[playerIndex];
        if (specialCells.includes(playerCellIndex)) {
            const numCellsBack = parseInt(document.querySelector(`.cell[data-index="${playerCellIndex}"]`).dataset.numCellsBack);
            alert(`Jogador ${currentPlayer} caiu em uma célula especial! Voltará ${numCellsBack} casas.`);
            movePlayerBack(playerIndex, numCellsBack);
            updateBoard();
        }
    }
    
    function checkAnswer() {
        const playerAnswer = parseFloat(answerInput.value);
        const correctAnswer = parseFloat(submitAnswerButton.dataset.correctAnswer);
        if (playerAnswer === correctAnswer) {
            const diceRoll = rollDice();
            playerPositions[currentPlayer - 1] += diceRoll;
            checkSpecialCell(currentPlayer - 1);
            if (playerPositions[currentPlayer - 1] >= boardSize) {
                alert(`Jogador ${currentPlayer} venceu!`);
                resetGame();
            } else {
                switchPlayer();
                updateBoard();
                askQuestion();
            }
        } else {
            alert(`Resposta incorreta! É a vez do Jogador ${currentPlayer === 1 ? 2 : 1}.`);
            switchPlayer();
        }
        answerInput.value = '';
    }
    
    function resetGame() {
        playerPositions = [0, 0];
        currentPlayer = 1;
        currentPlayerDisplay.textContent = `Jogador Atual: ${currentPlayer}`;
        hideDiceDots();
        diceContainer.classList.add('hidden');
        updateBoard();
        generateSpecialCells(); // Regenerar células especiais ao reiniciar o jogo
        askQuestion();
    }
    
    submitAnswerButton.addEventListener('click', checkAnswer);
    
    generateBoard();
    askQuestion();
});
