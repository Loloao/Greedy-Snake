function food(x, y) {
	this.x = x;
	this.y = y;
}
food.prototype.resetFood = function(a, b) {
	this.x = a;
	this.y = b;
}