class HSNode {
	constructor(key, value){
		this.key = key
		this.value = value
		this.next = null
	}
}


class HashTable{

	constructor(size = 10){
		this.have = 0
		this.size = size
		this.storage = new Array(size)
	}

	hash(key){
		
		let hash = 0;
		for (let i = 0; i < key.length; i++) {
			hash += key.charCodeAt(i);
		}

		return hash % this.size;
	}

	add(key,value){
		
		
		
		this.have +=1

		if (this.have == this.size) {
			this.resize(this.size*2)
		}


		const index = this.hash(key)
		//если в ячейке ничего нет 
		if (!this.storage[index]){
			this.storage[index] = new HSNode(key, value)
		} else {

			let currentNode = this.storage[index]
			//проход по списку
			while (currentNode.next){
				if (currentNode.key === key){ 
					currentNode.value = value
					return
				} 
				currentNode = currentNode.next
			}

			if (currentNode.key === key){
				currentNode.value = value
			} else {
				currentNode.next = new HSNode(key, value);
			}

		}
	}


	remove(key){
		const index = this.hash(key);
		if (!this.storage[index]) {
		  return;
		}
		let currentNode = this.storage[index];
		let previousNode = null;
		while (currentNode) {
		  if (currentNode.key === key) {
			if (previousNode === null) {
			  this.storage[index] = currentNode.next;
			} else {
			  previousNode.next = currentNode.next;
			}
			return;
		  }
		  previousNode = currentNode;
		  currentNode = currentNode.next;
		}
	  }

	
	removeAll() {this.storage = new Array(this.size) }
	

	get(key){
		const index  = this.hash(key)

		let currentNode = this.storage[index]

		while (currentNode){
			if (currentNode.key ===key) {
				return currentNode.value
			}
			currentNode = currentNode.next
		}
		return undefined
	}


	resize(newSize) {
		const currentStorage = this.storage;

		this.size = newSize;
		this.storage = new Array(newSize);

		for (const node of currentStorage) {

		  let currentNode = node;

		  while (currentNode) {
			this.add(currentNode.key, currentNode.value);
			currentNode = currentNode.next;

		  }
		}
	  }

	  printValues() {
		for (let index = 0; index < this.storage.length; index++) {
		  if (this.storage[index]) {
			let currentNode = this.storage[index];
			while (currentNode) {
			  document.getElementById("story").value += currentNode.key+ ": "+ currentNode.value+ "\n"
      
			  
			  currentNode = currentNode.next;
			}
		  }
		}
	  }
	  
	  getValues(){
    
		const removeNewLine = (str) => {
		  if (str.endsWith("\n")) {
			return str.slice(0, -1);
		  }
		  return str;
		};
	
	
		let allData = ""
		
		for (let index = 0; index < this.storage.length; index++) {
			if (this.storage[index]) {
			  let currentNode = this.storage[index];
			  while (currentNode) {
				allData += currentNode.key+ ": "+ currentNode.value+ "\n"
		
				
				currentNode = currentNode.next;
			  }
			}
		  }

		allData = removeNewLine(allData)
		return allData
	  }

}

const hashtable = new HashTable();