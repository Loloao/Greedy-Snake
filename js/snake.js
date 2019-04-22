function snake(obj) {
	this.arr = [
		{col: 5, row: 1},
		{col: 5, row: 2},
		{col: 5, row: 3},
		{col: 5, row: 4},
	];
	// top 38 right 39 bottom 40 left 37
	this.direction = 39;
	this.lock = true;

	({ head_pic: this.head_pic, body_pic: this.body_pic, tail_pic: this.tail_pic } = obj);

	this.head_index = 2;
	this.tail_index = 0;
}

snake.prototype.move = function() {
	var newHead = {
		col: this.arr[this.arr.length - 1].col,
		row: this.arr[this.arr.length - 1].row
	}
	switch (this.direction) {
		case 37: newHead.row--;
		break;
		case 38: newHead.col--;
		break;
		case 39: newHead.row++;
		break;
		case 40: newHead.col++;
		break;
	}
	this.arr.push(newHead);
	this.arr.shift();
	this.lock = true;

	// 放在move后面
	var tail0 = this.arr[0],
		tail1 = this.arr[1];
		if (tail1.row === tail0.row) {
			this.tail_index = tail1.col > tail0.col ? 1 : 3;
		} else if (tail1.col === tail0.col) {
			this.tail_index = tail1.row > tail0.row ? 0 : 2;
		}
}

snake.prototype.change = function(direction) {
	if (Math.abs(this.direction - direction) === 2 || 0) {
		return;
	} else {
		this.direction = direction;
		this.lock = false;

		switch (this.direction) {
			case 37: this.head_index = 0;
			break;
			case 38: this.head_index = 1;
			break;
			case 39: this.head_index = 2;
			break;
			case 40: this.head_index = 3;
			break;
		}


		
	}
}
snake.prototype.growUp = function() {
	this.arr.unshift(this.arr[0]);
}