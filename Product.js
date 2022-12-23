class Product {
    #id;
    #name;
    #price;
    #discount;
    #amount;
    #size;

    constructor(id, name, price, discount, amount, size) {
        this.#id = id;
        this.#name = name;
        this.#price = price;
        this.#discount = discount;
        this.#amount = amount;
        this.#size = size;
    }

    setID(id) {
        this.#id = id;
    }

    getID() {
        return this.#id;
    }

    setName(name) {
        this.#name = name;
    }

    setPrice(price) {
        this.#price = price;
    }

    setDiscount(discount) {
        this.#discount = discount;
    }

    setAmount(amount) {
        this.#amount = amount;
    }

    setSize(size) {
        this.#size = size;
    }

    getName() {
        return this.#name;
    }

    getPrice() {
        return this.#price;
    }

    getDiscount() {
        return this.#discount;
    }

    getAmount() {
        return this.#amount;
    }

    getSize() {
        return this.#size;
    }
}
