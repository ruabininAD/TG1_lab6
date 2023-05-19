
let KeyArr = []
let ValueArr = []
let count = 0



//добавить значение в дерево
function addForm () {

    var key = document.getElementById("input1").value;
    var value = document.getElementById("input2").value;
    if (key == "") {
      alert ("Ключ пуст");
      return false;
    } else if (value == "") {
      alert ("Значение не указано");
      return false;
    }
  
    selectedFighter = getOption()

    if (selectedFighter == "treeButton"){
      
      dictionary.insert( key, value)
      console.log("ADD  "+ key+": " + value )
      document.getElementById("story").value += "ADD   "+ key+": " + value+ "\n"
    
    } else if (selectedFighter == "hashButton") {
      
      hashtable.add( key, value)
      console.log("ADD  "+ key+": " + value )
      document.getElementById("story").value += "ADD hash "+ key+": " + value+ "\n"
    

    } else {
      alert ("Боец не выбран");
    }


    }


//удалить значение из дерева
function removeForm () {
    var key = document.getElementById("remove1").value;
    
    if (key == "") {
      alert ("Ключ пуст");
      return false;
    } 

    


    

    selectedFighter = getOption()

    if (selectedFighter == "treeButton"){
      
      dictionary.remove(key)
      console.log("REM  "+ key)
      document.getElementById("story").value += "REM  "+ key + "\n"

    } else if (selectedFighter == "hashButton") {
      
      hashtable.remove(key)
      console.log("REM hash "+ key)
      document.getElementById("story").value += "REM hash "+ key + "\n"

    } else {
      alert ("Боец не выбран");
    }

  }


//поиск по ключу
function findForm () {
    var key = document.getElementById("find1").value;
    
    if (key == "") {
      alert ("Ключ пуст");
      return false;
    } 
    

    selectedFighter = getOption()

    if (selectedFighter == "treeButton"){
      
      console.log("FND  "+ key + "get =" + dictionary.get(key))
      document.getElementById("story").value += "FND  "+ key + " => " + dictionary.get(key)+ "\n"

    } else if (selectedFighter == "hashButton") {
      
      console.log("FND  "+ key + "get =" + dictionary.get(key))
      document.getElementById("story").value += "FND hash "+ key + "  => " + hashtable.get(key)+ "\n"

    } else {
      alert ("Боец не выбран");
    }



    
  }


//очистить дерево
function allRemove(){
  selectedFighter = getOption()

  if (selectedFighter == "treeButton"){
    
    console.log('Дерево очищенно ')
    dictionary.removeValues()
    document.getElementById("story").value += 'tree removed'+ "\n"

  } else if (selectedFighter == "hashButton") {
    
    console.log('Таблица очищенна ')
    hashtable.removeAll()
    document.getElementById("story").value += 'hashTable removed'+ "\n"

  } else {
    alert ("Боец не выбран");
  }


    
  }


//Загрузить словарь из файла
function upload(){

  allRemove()
  complement()
  //fixme 
}



function printTextarea(){

  selectedFighter = getOption()

    if (selectedFighter == "treeButton"){
      
      dictionary.printValues()
      console.log("print to Textare\n "+dictionary.getValues())

    } else if (selectedFighter == "hashButton") {
      
      hashtable.printValues()
      console.log("print to Textare\n "+hashtable.getValues())

    } else {
      alert ("Боец не выбран");
    }


  
}


//Сохранить словарь в файл
function save(){
    
  
    selectedFighter = getOption()

    if (selectedFighter == "treeButton"){
      
      document.getElementById("story").value +="IMPORT TXT\n"
      textToFile (dictionary.getValues(), 'tree.txt')
      console.log("save to file tree.txt\n "+dictionary.getValues())

    } else if (selectedFighter == "hashButton") {
      

      document.getElementById("story").value +="hash IMPORT TXT\n"
      textToFile (hashtable.getValues(), 'hashT.txt')
      console.log("save to file hashT.txt\n "+hashtable.getValues())


    } else {
      alert ("Боец не выбран");
    }
  
  
}



function textToFile (text, name) {
	const b = new Blob([text], { type: 'text/plain' });
	const url = window.URL.createObjectURL(b);
	const a = document.createElement('a');
	a.href = url;
	a.download = name || 'text.txt';
	a.type = 'text/plain';
	a.addEventListener('click', () => {
		setTimeout(() => window.URL.revokeObjectURL(url), 10000);
	})
	a.click()
}











//Дополнить  словарь из файла
function complement(){

  var input = document.createElement('input');
  input.type = 'file';



  input.onchange = e => { 

    // getting a hold of the file reference
    var file = e.target.files[0]; 

    let reader = new FileReader();

    reader.readAsText(file);
   


    reader.onload = function() {
      

      const pairs = splitString(reader.result);


      selectedFighter = getOption()

      if (selectedFighter == "treeButton"){     pairs.forEach( finsertTree );
      
      } else if (selectedFighter == "hashButton") { pairs.forEach( finsertHash );
  
      } else {        alert ("Боец не выбран");      }


      
      
      function finsertTree(pairr,_,_){
        console.log("добавляем " + pairr+ "\n")
        dictionary.insert(pairr[0],pairr[1] ) 
      }

      function finsertHash(pairr,_,_){
        console.log("добавляем " + pairr+ "\n")
        hashtable.add(pairr[0],pairr[1] ) 
      }

    

    };
  
    reader.onerror = function() {
      console.log(reader.error);
    };
}

input.click();
  //fixme
}

function splitString(text) {
  // Split the text into lines.
  console.log("start\n"+text)
  const lines = text.split('\n');
  console.log("split('n')\n"+lines.length)
  // Split each line by the ":" character.

  let arr = []

  lines.forEach( FLine );
  
  function FLine(line, _,_){
    
    let pair = line.split(': ')
    arr.push(pair)
    
 }
 
  return arr

}

function getOption(){
  const options = document.getElementsByName("option");
    let selectedFighter = "";
    for (const option of options) {
      if (option.checked) {
        selectedFighter = option.value;
        break;
      }
    }
    return selectedFighter
}