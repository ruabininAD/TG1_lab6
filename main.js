
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
    this.struct = ""
  }

  
  // Выводит структуру дерева в консоль
  printStructure() {
    this.struct = ""
    this.traverseTree(this.root, "", true);
    console.log( this.struct);
    

    document.getElementById("story").value = this.struct
  }

  // Рекурсивно проходит по дереву и собирает информацию о каждом узле
  traverseTree(node, indent, isLast) {
    if (node === null) {
      return;
    }

    const marker = isLast ? "└──" : "├──";
    const color = node.color === "red" ? "[R]" : "[B]"; // Красный цвет для красных узлов

    this.struct += `${indent}${marker} ${color}${node.key + ": " + node.value}\n`; // Добавляем информацию о текущем узле

    const childIndent = indent + (isLast ? "    " : "│   ");
    this.traverseTree(node.left, childIndent, false); // Рекурсивно обрабатываем левое поддерево
    this.traverseTree(node.right, childIndent, true); // Рекурсивно обрабатываем правое поддерево
  }

  // Вспомогательный метод для вставки узла
  insertNode(node) {
    let current = this.root; //текущий 
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
    } else if (node.key > parent.key)  {
      parent.right = node;
    } else  {
      parent.value = node.value;
    }

    node.color = "red";
    this.insertFixup(node);
  }

  // Вспомогательный метод для исправления свойств красно-черного дерева после вставки
  insertFixup(node) {

    /*
    Пока новый узел (node) имеет родителя и родительский узел node является красным, выполняется цикл:

Внутри цикла проверяется, является ли родительский узел node левым потомком своего родительского узла (node.parent === node.parent.parent.left). В зависимости от этого выбирается соответствующая ветвь кода.

Если родительский узел node является левым потомком, то получаем ссылку на "дядю" узла (uncle = node.parent.parent.right), то есть правого потомка родительского узла node.parent.

Если "дядя" (uncle) существует и является красным, то устанавливаем цвета:

Цвет родительского узла node.parent становится черным.
Цвет "дяди" uncle становится черным.
Цвет прародительского узла node.parent.parent становится красным.
Затем текущий узел node устанавливается в прародительский узел node.parent.parent, чтобы продолжить проверку и перебалансировку.
Если "дядя" (uncle) не существует или является черным, выполняются дополнительные проверки и перебалансировка:

Если текущий узел node является правым потомком своего родителя (node === node.parent.right), то выполняется левый поворот (leftRotate(node.parent)), чтобы привести ситуацию к случаю левого потомка.
Цвет родителя узла node.parent становится черным.
Цвет прародительского узла node.parent.parent становится красным.
Выполняется правый поворот (rightRotate(node.parent.parent)), чтобы сохранить баланс дерева.
В результате выполнения цикла цвет корневого узла this.root устанавливается в черный, чтобы соблюсти свойства красно-черного дерева.

Цель insertFixup - перебалансировать дерево и сохранить его свойства, такие как:

Каждый узел является либо красным, либо черным.
Корень дерева всегда черный.
Каждый путь от узла до его листьев содержит одинаковое количество черных узлов.
Ни один путь не может иметь два красных узла подряд.
Функция insertFixup обеспечивает соблюдение этих свойств после вставки нового узла в красно-черное дерево
    */


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
    node.left = leftChild.left
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

  /*
  перемещения узла в красно-черном дереве. 
  заменить узел u на узел v в дереве,
   сохраняя правильные ссылки на родительские узлы и потомков.
   
   Проверяется, является ли узел u корневым узлом (u.parent === null). 
   Если это так, значит, узел u является корнем дерева, 
   и мы должны заменить его на узел v. В этом случае ссылка на корень 
   this.root обновляется, чтобы указывать на узел v.

Если узел u не является корневым узлом, проверяется, 
является ли он левым потомком своего родительского узла 
(u === u.parent.left). Если это так, значит, 
узел u является левым потомком, и мы должны заменить его на узел v. 
В этом случае ссылка на левого потомка u.parent.left обновляется, 
чтобы указывать на узел v.

Если ни одно из условий выше не выполняется, это означает, 
что узел u является правым потомком своего родительского узла.
 Мы должны заменить его на узел v. 
 В этом случае ссылка на правого потомка u.parent.right обновляется, 
 чтобы указывать на узел v.

*/

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


