var Set = function() {
		this.set = {};
}

Set.prototype.asString = function() {
		var str = "";
		for(var key in this.set){
				str += "[" + key + " , " + this.set[key] + "]";
		}
		return str;
};

Set.prototype.add = function(item) {
		this.set[item.toKey()] = item;
};

Set.prototype.remove = function(item) {
		delete this.set[item.toKey()];
};

Set.prototype.contains = function(item) {
		return this.set.hasOwnProperty(item.toKey());
};

Set.prototype.count = function() {
		var count = 0;
		for(var key in this.set) {
				count++;
		}
		return count;
};

Set.prototype.foreach = function(func) {
		for(var key in this.set){
				func(this.set[key]);
		}		
};

Set.prototype.intersection = function(set2) {
		var intersection = new Set();
		for(var cellKey in this.set){
				var cell = this.set[cellKey];
				if(set2.contains(cell)) {							 
						intersection.add(cell);
				}
		}
		return intersection;
};
