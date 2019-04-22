function game(food, map, snake, block) {
	this.food = food;
	this.map = map;
	this.snake = snake;
	this.block = block;
	this.timer = null;
	this.flag = true;
}
game.prototype.init = function() {
	this.renderMap();
	this.renderSnake();
	this.renderFood();
	this.bindEvent();
	this.start();
}
game.prototype.start = function() {
	var that = this;
	this.flag = true;
	this.timer = setInterval(function() {
		that.snake.move();
		that.checkMap();
		that.checkBody();
		that.checkFood();
		// 此时蛇的实体比表象更进一格
		if (that.flag === true) {
	 		that.map.clear();
			that.renderFood();
			that.renderSnake();
		}
	}, 200)
}
game.prototype.over = function() {
	clearInterval(this.timer);
	this.flag = false;
}
game.prototype.renderMap = function () {
	this.map.fill();
}
game.prototype.renderFood = function () {
	this.map.arr[this.food.x][this.food.y].style.backgroundImage = 'url(img/food.jpg)';
	this.map.arr[this.food.x][this.food.y].style.backgroundSize = 'cover';
}
game.prototype.renderSnake = function() {
	var that = this;
	for (i = 0; i < that.snake.arr.length; i++) {
		var snake_col = that.snake.arr[i].col,
		snake_row = that.snake.arr[i].row;
	}
	this.map.arr[this.snake.arr[this.snake.arr.length - 1].col][this.snake.arr[this.snake.arr.length - 1].row].style.backgroundImage = 'url(' + this.snake.head_pic[this.snake.head_index] + ')';
	for (j = 1; j < this.snake.arr.length - 1; j++) {
		this.map.arr[this.snake.arr[j].col][this.snake.arr[j].row].style.backgroundImage = 'url(' + this.snake.body_pic + ')';
	};
	this.map.arr[this.snake.arr[0].col][this.snake.arr[0].row].style.backgroundImage = 'url(' + this.snake.tail_pic[this.snake.tail_index] + ')';
}
game.prototype.bindEvent = function() {
	var that = this;
	document.onkeydown = function(e) {
		if (that.snake.lock === false) {
			return;
		}
		var code = e.keyCode;
		if (code === 37 || code === 38 || code === 39 || code === 40) {
			that.snake.change(code);
		}
	}
}
game.prototype.checkMap = function() {
	var snakeHead = this.snake.arr[this.snake.arr.length - 1];
	if (snakeHead.row < 0 || snakeHead.row >= this.map.row || snakeHead.col < 0 || snakeHead.col >= this.map.col) {
		this.over();
	}
}
game.prototype.checkFood = function() {
	var snakeHead = this.snake.arr[this.snake.arr.length - 1];
	if (snakeHead.col === this.food.x && snakeHead.row === this.food.y) {
		this.snake.growUp();
		this.flashFood();
	}
}
game.prototype.flashFood = function() {
	var a = parseInt(Math.random() * this.map.row),
	b = parseInt(Math.random() * this.map.col);
	for (i = 0; i < this.snake.arr.length; i++) {
		if (a === this.snake.arr[i].row && b === this.snake.arr[i].col) {
			console.log('重复了');
			this.flashFood();
		}
	}
	this.food.resetFood(a, b)
}
game.prototype.checkBody = function() {
	var snakeHead = this.snake.arr[this.snake.arr.length - 1];
	for (i = 0; i < this.snake.arr.length - 1; i++) {
		if (snakeHead.row === this.snake.arr[i].row && snakeHead.col === this.snake.arr[i].col) {
			this.over();
		}
	}
}