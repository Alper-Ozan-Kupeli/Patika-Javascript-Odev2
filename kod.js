// Bir "kapat" düğmesi oluşturun ve bunu her liste öğesine ekleyin
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Bir liste öğesine tıklandığında "checked" bir sembol ekleyin
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Geçerli liste öğesini gizlemek için bir kapat düğmesine tıklayın
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Tüm elementleri seçme
//Dom Elementlerini seçiyoruz
let inputDOM = document.querySelector("#task");
let submitDOM = document.querySelector("#liveToastBtn");
let listDOM = document.querySelector("#list");
let listdivDOM = document.querySelector(".list");
let clearTodo = document.querySelector(".btn-danger");

//Tüm event listenersleri çalıştıran fonksiyon
eventListeners();
function eventListeners() {
  submitDOM.addEventListener("click", addTodo);
  listDOM.addEventListener("click", deleteTodoTOUI);
  listdivDOM.addEventListener("click", okTodo);
  document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
  document.addEventListener("DOMContentLoaded", cx);
  clearTodo.addEventListener("click", clearAllTodo);
}

// checked todo function
function okTodo(e) {
  if (e.target.className === "liItem") {
    e.target.className = "checked";
  } else if (e.target.className === "checked") {
    e.target.className = "liItem";
  }
}

//Tüm todoları temizleyen buttonun display özelliği
function cx(e) {  
  if (listDOM.firstElementChild === null) {
    clearTodo.style.display = "none";
  } else {
    clearTodo.style.display = "block";
  }
  e.preventDefault(); //Sayfa yenilenmesini engelleyen fonksiyon
}

//Clear all todo function
function clearAllTodo(e) {
  if (confirm("Tümünü Silmek İstediğinizden Emin Misiniz ?")) {
    while (listDOM.firstElementChild != null) {
      listDOM.removeChild(listDOM.firstElementChild);
    }
    localStorage.removeItem("todos");
  }
  cx(e); //Tüm todoları silme butonunu güncelliyoruz
}

//deleteTodoTOUI function
function deleteTodoTOUI(e) {
  //silme iconuna tıklanıp tıklanmadığını kontrol ediyoruz
  if (e.target.className === "fa fa-remove close") {
    let a = e.target.parentElement.parentElement;
    deleteTodoFromStorage(a.innerText);
    a.remove();
  }
  cx(e); //Tüm todoları silme butonunu güncelliyoruz
}

//deleteTodoFromStorage function
function deleteTodoFromStorage(deletetodo) {
  //localstorageden değerleri todos ismiyle array olarak aliyoruz 
  let todos = getTodoFromStorage();
  //bu aldığımız arrayi tek tek dolaşıyoruz foreach ile
  todos.forEach(function (todo, index) {
    if (todo === deletetodo) {//silmek istenilen değeri arrayda yakalıyoruz
      todos.splice(index, 1); // o indexi siler
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

//loadAllTodosToUI function
function loadAllTodosToUI() {
  let todos = getTodoFromStorage();
  todos.forEach((todo) => {
    addTodoTOUI(todo);
  });
}

//addTodo function
function addTodo(e) {
  const newTodo = inputDOM.value.trim(); //inputun başındaki ve sonundaki boşlukları kaldırma fonksiyonu
  if (newTodo === "") {
    $(".error").toast("show"); //Hata Bildirimi
    inputDOM.value = "";
  } else {
    addTodoTOUI(newTodo);
    addTodoTOStorage(newTodo);
    $(".success").toast("show");
  }
  cx(e); //Tüm todoları silme butonunu güncelliyoruz
  e.preventDefault(); //işlemden sonra sayfa yenilenmeden işleme devam edebilmek için kullanıyoruz bu fonksiyonu
}

//Todoları Storageden almak
function getTodoFromStorage() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

// Todoları Storageye yollamak
function addTodoTOStorage(newTodo) {
  let todos = getTodoFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//Todoları Ekrana Eklemek
function addTodoTOUI(newTodo) {
  const listItem = document.createElement("li");
  listItem.className = "liItem";
  //silme işlemi için gerekli icon
  const link = document.createElement("a");
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class = 'fa fa-remove close'></i>";
  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(link);
  listDOM.appendChild(listItem);
  inputDOM.value = "";
}