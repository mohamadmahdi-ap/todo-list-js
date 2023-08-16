//input validation
function getInput() {
    let inp = document.getElementById("content").value.trim();
    if (inp == "") {
        return false;
    } else {
        document.getElementById("content").value = "";
        return inp;
    }
}
//item number
let i = 0;
// get all saved item from localStroage
localStorage.removeItem("todos")
for (l = 0; l < localStorage.length; l++) {
    showItem(localStorage[l]);
}
// show item in page
function showItem(inp) {
    const allList = document.querySelector(".list");

    const newItem = document.createElement("div");
    newItem.setAttribute("class", "list-item");

    const number = document.createElement("span");
    number.setAttribute("class", "number");
    number.innerHTML = i + 1;
    newItem.append(number);

    const content = document.createElement("div");
    content.innerHTML = inp;
    newItem.append(content);

    const editBtn = document.createElement("span");
    editBtn.setAttribute("class", "edit");
    editBtn.setAttribute("data-id", i)
    editBtn.setAttribute("onclick", "edit(this)");
    const editIcon = document.createElement("i");
    editIcon.setAttribute("class", "fi fi-rr-edit");
    editBtn.append(editIcon);
    newItem.append(editBtn);

    const removeBtn = document.createElement("span");
    removeBtn.setAttribute("class", "remove");
    removeBtn.setAttribute("data-id", i);
    removeBtn.setAttribute("onclick", "removeItem(this)");
    const removeIcon = document.createElement("i");
    removeIcon.setAttribute("class", "fi fi-rr-trash");
    removeBtn.append(removeIcon);
    newItem.append(removeBtn);

    allList.append(newItem);
    
    i++;
    document.querySelector(".remove-list-btn").style.display = "block";

}
//add new item
function add() {
    let inp = getInput();
    if (!inp) {
        showAlert("warnning");
    } else {
        localStorage.setItem(i, inp);
        showItem(inp);
        showAlert("successful");
    }
}
//get item content for edit
let editingItem;
let dataId
function edit(item) {
    if (editingItem != undefined) {
        editingItem.classList.remove("editing");
    }
    dataId = +item.getAttribute("data-id");
    editingItem = document.querySelectorAll(".list-item")[dataId];
    editingItem.classList.add("editing");
    document.getElementById("content").value = editingItem.querySelector('div').innerHTML;
    document.querySelector(".form").classList.add("edit-form");
}
//cancel edit item
function cancelEdit() {
    document.getElementById("content").value = "";
    document.querySelector(".form").classList.remove("edit-form");
    editingItem.classList.remove("editing");
}
//edit item
function editItem() {
    let inp = getInput()
    if (!inp) {
        showAlert("warnning");
    } else {
        localStorage.setItem(dataId, inp);
        editingItem.querySelector("div").innerHTML = inp;
        document.querySelector(".form").classList.remove("edit-form");
        editingItem.classList.remove("editing");
        editingItem = undefined;
        showAlert("edit");
    }
}
//remove one item
function removeItem(item) {
    dataId = +item.getAttribute("data-id")
    let listItem = document.querySelectorAll(".list-item")[dataId]

    let ls = localStorage.length
    for (k = dataId; k < ls - 1; k++) {
        localStorage.setItem(k, localStorage.getItem(k + 1));
    }
    localStorage.removeItem(ls - 1)
    listItem.remove();
    showAlert("remove");
    editNumbers();
    if (!document.querySelector(".list-item")) {
        document.querySelector(".remove-list-btn").style.display = "none";
    }
    if (editingItem != undefined) {
        cancelEdit()
    }

}
//remove all items
function removeAll() {
    localStorage.clear();
    let allList = document.querySelectorAll(".list-item");
    allList.forEach((e) => { e.remove() });
    editNumbers();
    showAlert("remove");
    i = 0;
    document.querySelector(".remove-list-btn").style.display = "none";
    if (editingItem != undefined) {
        cancelEdit();
    }
}
// edit item numbers after remove
function editNumbers() {
    let items = document.querySelectorAll(".list-item");
    i = 0;
    items.forEach((e) => {
        e.querySelector(".edit").setAttribute("data-id", i);
        e.querySelector(".remove").setAttribute("data-id", i);
        e.querySelector(".number").innerHTML = ++i;
    })
}
// show alert box
function showAlert(type) {

    let alertBox = document.querySelector(".alert-box");
    if (type == "successful") {
        alertBox.innerHTML = "ثبت شد!";
    } else if (type == "edit") {
        alertBox.innerHTML = "ویرایش شد!";
        type = "successful"
    } else if (type == "remove") {
        alertBox.innerHTML = "حذف شد!";
    } else if (type == "warnning") {
        alertBox.innerHTML = "لطفا چیزی وارد کنید!";
    }
    alertBox.classList.add('open-' + type);;
    //delete alert
    setTimeout(() => {
        alertBox.classList.remove("open-" + type);
    }, 1000)
}
