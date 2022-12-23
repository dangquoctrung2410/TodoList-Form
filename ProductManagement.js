let id = (id) => document.getElementById(id);
let classes = (classes) => document.getElementsByClassName(classes);

let errorMsg = classes("error");
let setSize = classes("size");
let indexCurrent = -1;

function checkInput(id, serial, message) {
  if (id.value.trim() === "") {
    errorMsg[serial].innerHTML = message;
    id.style.border = "2px solid #CC3333";
    id.style.boxShadow = "0px 2px 2px #CC3333";
  } else {
    errorMsg[serial].innerHTML = "";
    id.style.border = "1px solid #ccc";
    id.style.boxShadow = "0px 2px 2px #5C5696";

    return id.value;
  }
}

function checkInputName(id, serial, message) {
  if (
    id.value.trim() === "" &&
    !/^([A-Za-z]{2,40}[ éàë]{0,40})$/.test(id.value.trim())
  ) {
    errorMsg[serial].innerHTML = message;
    id.style.border = "2px solid #CC3333";
    id.style.boxShadow = "0px 2px 2px #CC3333";
  } else {
    errorMsg[serial].innerHTML = "";
    id.style.border = "1px solid #ccc";
    id.style.boxShadow = "0px 2px 2px #5C5696";

    return id.value;
  }
}

function checkSize(serial, message) {
  let listSize = [];
  let checkboxes = document.getElementsByName("size");

  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      listSize.push(checkboxes[i].value);
    }
  }

  if (listSize.length === 0) {
    errorMsg[serial].innerHTML = message;
  } else {
    errorMsg[serial].innerHTML = "";
    return listSize;
  }
}

function addProduct(product) {
  listProduct.push(product);
  id("table_product").innerHTML += `<tr>
    <td>${listProduct.length}</td>
    <td>${product.getID()}</td>
    <td>${product.getName()}</td>
    <td>${product.getPrice()}$</td>
    <td>${product.getDiscount()}%</td>
    <td>${product.getAmount()}</td>
    <td>${product.getSize().toString().replace(",", ", ")}</td>
    <td>
    <button style="width: 55px; height: 40px; font-size: 12px; font-weight: bold;" onclick="editInfo(${
      listProduct.length - 1
    })">Edit</button>
    <button style="width: 55px; height: 40px; font-size: 12px; font-weight: bold;" onclick="deleteProduct(${
      listProduct.length - 1
    })">Delete</button>
    </td>
    </tr>`;
}

function editInfo(index) {
  if (id("id_product")) {
    alert("Please try again!");
  } else {
    resetInput();

    indexCurrent = index;
    let product = listProduct[indexCurrent];

    classes("title")[0].innerHTML = "Name Product";
    id("name_product").value = product.getName();

    classes("title")[1].innerHTML = "Price Product";
    id("price_product").value = product.getPrice();

    classes("title")[2].innerHTML = "Discount Product";
    id("discount_product").value = product.getDiscount();

    classes("title")[3].innerHTML = "Amount Product";
    id("amount_product").value = product.getAmount();

    id("btn_add_product").innerHTML = "Update";

    classes(
      "input-control"
    )[0].innerHTML = `<input id="id_product" type="text" disabled="disabled">`;

    id("id_product").value = product.getID();

    document.getElementsByTagName("tr")[index + 1].style.backgroundColor =
      "#FFCE30";

    getValueCheckBox(product);
  }
}

function displayAllProduct() {
  id("table_product").innerHTML = "";
  for (let i = 0; i < listProduct.length; i++) {
    id("table_product").innerHTML += `<tr>
    <td>${i + 1}</td>
    <td>${listProduct[i].getID()}</td>
    <td>${listProduct[i].getName()}</td>
    <td>${listProduct[i].getPrice()}$</td>
    <td>${listProduct[i].getDiscount()}%</td>
    <td>${listProduct[i].getAmount()}</td>
    <td>${listProduct[i].getSize().toString().replace(",", ", ")}</td>
    <td>
    <button style="width: 55px; height: 40px; font-size: 12px; font-weight: bold;" onclick="editInfo(${i})"><b>Edit</b></button>
    <button style="width: 55px; height: 40px; font-size: 12px; font-weight: bold;" onclick="deleteProduct(${i})"><b>Delete</b></button>
    </td>
    </tr>`;
  }
}

function deleteProduct(index) {
  if (id("id_product")) {
    alert("Please try again!");
  } else {
    let result = confirm("Are you sure you want to delete this product?");
    if (result) {
      listProduct.splice(index, 1);
      displayAllProduct();
    }
  }
}

function searchProduct() {
  if (id("id_product")) {
    alert("Please try again!");
  } else {
    for (let i = 0; i < listProduct.length; i++) {
      document.getElementsByTagName("tr")[i].style.backgroundColor = "";
    }

    let input = id("search_product").value.trim();

    let bol = false;

    if (input.trim() !== "") {
      for (let product of listProduct) {
        if (product.getID() === input || product.getName() === input) {
          let index = (element) => element == product;
          indexCurrent = listProduct.findIndex(index);

          document.getElementsByTagName("tr")[
            indexCurrent + 1
          ].style.backgroundColor = "#FFCE30";

          classes("title")[0].innerHTML = "Name Product";
          id("name_product").value = product.getName();

          classes("title")[1].innerHTML = "Price Product";
          id("price_product").value = product.getPrice();

          classes("title")[2].innerHTML = "Discount Product";
          id("discount_product").value = product.getDiscount();

          classes("title")[3].innerHTML = "Amount Product";
          id("amount_product").value = product.getAmount();

          id("btn_add_product").innerHTML = "Update";

          classes(
            "input-control"
          )[0].innerHTML = `<input id="id_product" type="text" readonly>`;

          id("id_product").value = product.getID();

          getValueCheckBox(product);

          bol = true;
        }
      }
      if (bol === false) {
        alert("No products found!");
      }
    } else {
      alert("Please enter product information!");
    }
  }
}

function resetCheckBox() {
  let checkboxes = document.getElementsByName("size");

  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      checkboxes[i].checked = false;
    }
  }
}

function getValueCheckBox(product) {
  let checkboxes = document.getElementsByName("size");

  for (let i = 0; i < checkboxes.length; i++) {
    for (let size of product.getSize()) {
      if (checkboxes[i].value === size) {
        checkboxes[i].checked = true;
      }
    }
  }
}

function resetInput() {
  id("btn_add_product").innerHTML = "Add Product";
  id("name_product").value = "";
  id("price_product").value = "";
  id("discount_product").value = "";
  id("amount_product").value = "";
  id("name_product").style.border = "1px solid #ccc";
  id("price_product").style.border = "1px solid #ccc";
  id("discount_product").style.border = "1px solid #ccc";
  id("amount_product").style.border = "1px solid #ccc";
  id("name_product").style.boxShadow = "0px 2px 2px #5C5696";
  id("price_product").style.boxShadow = "0px 2px 2px #5C5696";
  id("discount_product").style.boxShadow = "0px 2px 2px #5C5696";
  id("amount_product").style.boxShadow = "0px 2px 2px #5C5696";
  classes("title")[0].innerHTML = "";
  classes("title")[1].innerHTML = "";
  classes("title")[2].innerHTML = "";
  classes("title")[3].innerHTML = "";
  classes("error")[0].innerHTML = "";
  classes("error")[1].innerHTML = "";
  classes("error")[2].innerHTML = "";
  classes("error")[3].innerHTML = "";
  classes("error")[4].innerHTML = "";
  document.getElementById("search_product").value = "";
}
