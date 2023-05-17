
// Узел красно-черного дерева
class Node {
    constructor(key, value, color) {
      this.key = key;
      this.value = value;
      this.color = color;
      this.left = null;
      this.right = null;
      this.parent = null;
    }
  }


  
    // Класс красно-черного дерева
class RedBlackTree {
  constructor() {
    this.root = null;
    this.allData = "" 
  }

  // Вспомогательный метод для вставки узла
  insertNode(node) {
    let current = this.root;
    let parent = null;

    while (current !== null) {
      parent = current;
      if (node.key < current.key) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    node.parent = parent;

    if (parent === null) {
      this.root = node;
    } else if (node.key < parent.key) {
      parent.left = node;
    } else {
      parent.right = node;
    }

    node.color = "red";
    this.insertFixup(node);
  }

  // Вспомогательный метод для исправления свойств красно-черного дерева после вставки
  insertFixup(node) {
    while (node.parent !== null && node.parent.color === "red") {
      if (node.parent === node.parent.parent.left) {
        let uncle = node.parent.parent.right;

        if (uncle !== null && uncle.color === "red") {
          node.parent.color = "black";
          uncle.color = "black";
          node.parent.parent.color = "red";
          node = node.parent.parent;
        } else {
          if (node === node.parent.right) {
            node = node.parent;
            this.leftRotate(node);
          }

          node.parent.color = "black";
          node.parent.parent.color = "red";
          this.rightRotate(node.parent.parent);
        }
      } else {
        let uncle = node.parent.parent.left;

        if (uncle !== null && uncle.color === "red") {
          node.parent.color = "black";
          uncle.color = "black";
          node.parent.parent.color = "red";
          node = node.parent.parent;
        } else {
          if (node === node.parent.left) {
            node = node.parent;
            this.rightRotate(node);
          }

          node.parent.color = "black";
          node.parent.parent.color = "red";
          this.leftRotate(node.parent.parent);
        }
      }
    }

    this.root.color = "black";
  }

  // Вспомогательный метод для левого поворота
  leftRotate(node) {
    let rightChild = node.right;
    node.right = rightChild.left;

    if (rightChild.left !== null) {
      rightChild.left.parent = node;
    }

    rightChild.parent = node.parent;

    if (node.parent === null) {
      this.root = rightChild;
    } else if (node === node.parent.left) {
      node.parent.left = rightChild;
    } else {
      node.parent.right = rightChild;
    }

    rightChild.left = node;
    node.parent = rightChild;
  }

  // Вспомогательный метод для правого поворота
  rightRotate(node) {
    let leftChild = node.left;
    node.left = left
    if (leftChild.right !== null) {
        leftChild.right.parent = node;
      }
  
      leftChild.parent = node.parent;
  
      if (node.parent === null) {
        this.root = leftChild;
      } else if (node === node.parent.right) {
        node.parent.right = leftChild;
      } else {
        node.parent.left = leftChild;
      }
  
      leftChild.right = node;
      node.parent = leftChild;
    }

    // Метод для вставки ключа и значения в словарь
  insert(key, value) {
    const newNode = new Node(key, value, "red");
    this.insertNode(newNode);
  }

  // Метод для получения значения по ключу
  get(key) {
    let current = this.root;

    while (current !== null) {
      if (key === current.key) {
        return current.value;
      } else if (key < current.key) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return null;
  }

  // Вспомогательный метод для удаления узла
  removeNode(node) {
    let y = node;
    let yOriginalColor = y.color;
    let x;

    if (node.left === null) {
      x = node.right;
      this.transplant(node, node.right);
    } else if (node.right === null) {
      x = node.left;
      this.transplant(node, node.left);
    } else {
      y = this.minimum(node.right);
      yOriginalColor = y.color;
      x = y.right;

      if (y.parent === node) {
        x.parent = y;
      } else {
        this.transplant(y, y.right);
        y.right = node.right;
        y.right.parent = y;
      }

      this.transplant(node, y);
      y.left = node.left;
      y.left.parent = y;
      y.color = node.color;
    }

    if (yOriginalColor === "black") {
      this.deleteFixup(x);
    }
  }

  // Вспомогательный метод для перемещения узла
  transplant(u, v) {
    if (u.parent === null) {
      this.root = v;
    } else if (u === u.parent.left) {
      u.parent.left = v;
    } else {
      u.parent.right = v;
    }

    if (v !== null) {
      v.parent = u.parent;
    }
  }

  // Метод для удаления узла по ключу
  remove(key) {
    if (key == ""){return}
    const node = this.search(key);
    if (node !== null) {
      this.removeNode(node);
    }
  }

  deleteFixup(node) {
    while (node !== this.root && (node === null || node.color === "black")) {
      if (node === node.parent.left) {
        let sibling = node.parent.right;
  
        if (sibling.color === "red") {
          sibling.color = "black";
          node.parent.color = "red";
          this.leftRotate(node.parent);
          sibling = node.parent.right;
        }
  
        if (
          (sibling.left === null || sibling.left.color === "black") &&
          (sibling.right === null || sibling.right.color === "black")
        ) {
          sibling.color = "red";
          node = node.parent;
        } else {
          if (sibling.right === null || sibling.right.color === "black") {
            sibling.left.color = "black";
            sibling.color = "red";
            this.rightRotate(sibling);
            sibling = node.parent.right;
          }
  
          sibling.color = node.parent.color;
          node.parent.color = "black";
          sibling.right.color = "black";
          this.leftRotate(node.parent);
          node = this.root;
        }
      } else {
        let sibling = node.parent.left;
  
        if (sibling.color === "red") {
          sibling.color = "black";
          node.parent.color = "red";
          this.rightRotate(node.parent);
          sibling = node.parent.left;
        }
  
        if (
          (sibling.right === null || sibling.right.color === "black") &&
          (sibling.left === null || sibling.left.color === "black")
        ) {
          sibling.color = "red";
          node = node.parent;
        } else {
          if (sibling.left === null || sibling.left.color === "black") {
            sibling.right.color = "black";
            sibling.color = "red";
            this.leftRotate(sibling);
            sibling = node.parent.left;
          }
  
          sibling.color = node.parent.color;
          node.parent.color = "black";
          sibling.left.color = "black";
          this.rightRotate(node.parent);
          node = this.root;
        }
      }
    }
  
    if (node !== null) {
      node.color = "black";
    }
  }
  
  printValues() {
    this.inorderTraversal(this.root);
  }

  inorderTraversal(node) {
    if (node !== null) {
      this.inorderTraversal(node.left);
      //console.log(node.key+ ": "+ node.value);
      document.getElementById("story").value += node.key+ ": "+ node.value+ "\n"
      this.inorderTraversal(node.right);
    }}

  getValues(){
    
    const removeNewLine = (str) => {
      if (str.endsWith("\n")) {
        return str.slice(0, -1);
      }
      return str;
    };


    this.allData = ""
    this.inorderTraversalforGet(this.root);
    this.allData = removeNewLine(this.allData)
    return this.allData
  }

  inorderTraversalforGet(node) {
    if (node !== null) {
      this.allData += node.key+ ": "+ node.value + "\n";
      this.inorderTraversalforGet(node.left );
      this.inorderTraversalforGet(node.right);
    }}

  search(key) {
    return this.searchNode(this.root, key);
  }

  searchNode(node, key) {
  if (node === null || key === node.key) {
    return node;
  }

  if (key < node.key) {
    return this.searchNode(node.left, key);
  }

  return this.searchNode(node.right, key);
  }

  removeValues() {
  this.removeTraversal(this.root);
}

  removeTraversal(node) {
  if (node !== null) {
    this.removeTraversal(node.left);
    dictionary.remove(node.key);
    this.removeTraversal(node.right);
  }}

  search(key) {
  return this.searchNode(this.root, key);
}




}


// Пример использования словаря на основе красно-черных деревьев
const dictionary = new RedBlackTree();


// console.log(dictionary.get("apple")); // Выводит: A sweet fruit
// console.log(dictionary.get("banana")); // Выводит: A yellow fruit
// console.log(dictionary.get("orange")); // Выводит: A citrus fruit
// console.log(dictionary.get("grape")); // Выводит: null
