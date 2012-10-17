var Set = function() {
		var set = {};
		var count = 0;


		this.add = function(item) {
				set[item.toKey()] = item;
				count++;
		};

		this.remove = function(item) {
				delete set[item.toKey()];
				count--;
		};

		this.contains = function(item) {
				return set.hasOwnProperty(item.toKey());
		};

		this.count = function() {
				return count;
		};

		this.foreach = function(func) {
				for(var key in set){
						func(set[key]);
				}		
		};

		this.intersection = function(set2) {
				var result = new Set();
				for(var key in set){
						var value = set[key];
						if(set2.contains(value)) {							 
								result.add(value);
						}
				}
				return result;
		};

		this.toString = function() {
				var str = "";
				for(var key in set){
						str += "[" + key + " , " + set[key] + "]";
				}
				return str;
		};
};
