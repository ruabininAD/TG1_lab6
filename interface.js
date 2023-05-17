
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


    dictionary.insert( key, value)
    console.log("ADD  "+ key+": " + value )
    document.getElementById("story").value += "ADD  "+ key+": " + value+ "\n"
  }


//удалить значение из дерева
function removeForm () {
    var key = document.getElementById("remove1").value;
    
    if (key == "") {
      alert ("Ключ пуст");
      return false;
    } 

    dictionary.remove(key)
    console.log("REM  "+ key)
    document.getElementById("story").value += "REM  "+ key + "\n"
  }


//поиск по ключу
function findForm () {
    var key = document.getElementById("find1").value;
    
    if (key == "") {
      alert ("Ключ пуст");
      return false;
    } 
    
    console.log("FND  "+ key + "get =" + dictionary.get(key))
    document.getElementById("story").value += "FND  "+ key + "get =" + dictionary.get(key)+ "\n"
  }


//очистить дерево
function allRemove(){
    console.log('all remove')
    dictionary.removeValues()
    document.getElementById("story").value += 'all remove'+ "\n"
  }


//Загрузить словарь из файла
function upload(){
  allRemove()
  complement()
  //fixme 
}



function printTextarea(){
  dictionary.printValues()
  console.log("print to Textare\n "+dictionary.getValues())
}


//Сохранить словарь в файл
function save(){
    document.getElementById("story").value +="IMPORT TXT\n"
    textToFile (dictionary.getValues(), 'file.txt')
    console.log("save to file file.txt\n "+dictionary.getValues())
  
  
  
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

      pairs.forEach( finsert );
      
      function finsert(pairr,_,_){
        console.log("добавляем " + pairr+ "\n")
        dictionary.insert(pairr[0],pairr[1] ) 
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

