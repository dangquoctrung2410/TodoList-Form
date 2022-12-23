let listProduct = [];
let count = 0;

id('form').onsubmit = function (event) {
    addProductToList(event);
}

function addProductToList(event) {
    event.preventDefault();

    let listSize = [];
    let nameProduct = checkInputName(id('name_product'), 0, "Please re-enter the product name!");
    let priceProduct = checkInput(id('price_product'), 1, "Price product cannot be blank!");
    let discountProduct = checkInput(id('discount_product'), 2, "Discount product cannot be blank!");
    let amountProduct = checkInput(id('amount_product'), 3, "Amount product cannot be blank!");
    listSize = checkSize(4, "Size product cannot be blank!");

    if (nameProduct.trim() !== '' && priceProduct.trim() !== '' && discountProduct.trim() !== '' && amountProduct.trim() !== '' && listSize?.length > 0) {

        if (indexCurrent === -1) {
            let idProduct = Math.random().toString(9).slice(2);
            console.log(idProduct);
            let product = new Product(idProduct, nameProduct, priceProduct, discountProduct, amountProduct, listSize);
            addProduct(product);
        } else {
            listProduct[indexCurrent].setName(nameProduct);
            listProduct[indexCurrent].setPrice(priceProduct);
            listProduct[indexCurrent].setDiscount(discountProduct);
            listProduct[indexCurrent].setAmount(amountProduct);
            listProduct[indexCurrent].setSize(listSize);

            indexCurrent = -1;

            id('id_product').remove();

            resetInput();

            displayAllProduct();
        }

        id('name_product').value = '';
        id('price_product').value = '';
        id('discount_product').value = '';
        id('amount_product').value = '';
        resetCheckBox();
    }
}