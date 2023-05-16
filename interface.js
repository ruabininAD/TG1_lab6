
let KeyArr = []
let ValueArr = []
let count = 0
// while (true){
//     count ++ 
//     key = prompt("введите ключ: ")
//     if (key == "-"){ break }
//     value = prompt("введите Значение: ")
    
//     KeyArr.push(key)
//     ValueArr.push(value)
// }




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



function findForm () {
    var key = document.getElementById("find1").value;
    
    if (key == "") {
      alert ("Ключ пуст");
      return false;
    } 
    
    console.log("FND  "+ key + "get =" + dictionary.get(key))
    document.getElementById("story").value += "FND  "+ key + "get =" + dictionary.get(key)+ "\n"
  }



function allRemove(){
    console.log('all remove')
    dictionary.removeValues()
    document.getElementById("story").value += 'all remove'+ "\n"
  }



