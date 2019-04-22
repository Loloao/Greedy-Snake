function map(row, col, width, height) {
	this.row = row;
	this.col = col;
	this.width = width;
	this.height = height;
	this.arr = [];

	this.dom = document.createElement('div');

}

map.prototype.fill = function() {
	for (i = 0; i < this.col; i++) {
		var row_dom = document.createElement('div'),
		row_arr = [];
		row_dom.className = 'row_dom';
		this.arr.push(row_arr);
		this.dom.appendChild(row_dom);
		for (j=0; j < this.row; j++) {
			var col_span = document.createElement('span');
			col_span.className = 'col_span';
			row_arr.push(col_span);
			row_dom.appendChild(col_span);
		}
	}
	document.body.appendChild(this.dom);
}

map.prototype.clear = function() {
	for (i = 0; i < this.col; i++) {
		for(j = 0; j < this.row; j++) {
			this.arr[i][j].style.backgroundImage = 'none';
		}
	}
}