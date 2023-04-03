
var canvas = document.getElementById("snake");
var ctx = canvas.getContext("2d");
var scoreText = document.getElementById("score");

var gridSize = 10;
var gridWidth = canvas.width / gridSize;
var gridHeight = canvas.height / gridSize;

var snake = [{x: 5, y: 5}];
var food = {x: 10, y: 10};
var direction = "right";
var score = 0;

function draw() {
	// Desenhe a cobrinha e a comida
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "green";
	for (var i = 0; i < snake.length; i++) {
		ctx.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize, gridSize);
	}
	ctx.fillStyle = "red";
	ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

	// Mova a cobrinha
	var head = {x: snake[0].x, y: snake[0].y};
	if (direction == "right") head.x++;
	else if (direction == "left") head.x--;
	else if (direction == "down") head.y++;
	else if (direction == "up") head.y--;
	snake.unshift(head);

	// Verifique se a cobrinha colidiu com a parede ou consigo mesma
	if (head.x < 0 || head.x >= gridWidth || head.y < 0 || head.y >= gridHeight) {
		reset();
		return;
	}
	for (var i = 1; i < snake.length; i++) {
		if (head.x == snake[i].x && head.y == snake[i].y) {
			reset();
			return;
		}
	}

	// Verifique se a cobrinha comeu a comida
	if (head.x == food.x && head.y == food.y) {
		score++;
		scoreText.innerHTML = score;
		placeFood();
	} else {
		snake.pop();
	}
}

function placeFood() {
	// Coloque a comida em uma posição aleatória
	food.x = Math.floor(Math.random() * gridWidth);
	food.y = Math.floor(Math.random() * gridHeight);

	// Verifique se a comida foi colocada em cima da cobrinha
	for (var i = 0; i < snake.length; i++) {
		if (food.x == snake[i].x && food.y == snake[i].y) {
			placeFood();
			break;
		}
	}
}
function reset() {
    // Reinicie o jogo
    snake = [{x: 5, y: 5}];
    direction = "right";
    score = 0;
    scoreText.innerHTML = score;
    placeFood();
    }
    
    function handleKeyPress(event) {
    // Mude a direção da cobrinha ao pressionar as teclas
    if (event.keyCode == 37 && direction != "right") {
    direction = "left";
    } else if (event.keyCode == 38 && direction != "down") {
    direction = "up";
    } else if (event.keyCode == 39 && direction != "left") {
    direction = "right";
    } else if (event.keyCode == 40 && direction != "up") {
    direction = "down";
    }
    }
    
    // Coloque a comida em uma posição aleatória ao iniciar o jogo
    placeFood();
    
    // Inicie o loop de jogo
    setInterval(draw, 100);
    
    // Adicione o evento para lidar com as teclas pressionadas
    document.addEventListener("keydown", handleKeyPress);