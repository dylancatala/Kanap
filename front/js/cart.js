let productList = [];

const getProductList = async () => {
    let productFetch = await fetch(`http://localhost:3000/api/products`);
    productList = await productFetch.json();
}


function updateQty(id, colors, quantity) {

    let dataCart = JSON.parse(localStorage.getItem('command'));
    dataCart[id][colors] = quantity;
    localStorage.setItem('command', JSON.stringify(dataCart));
    showPrice();
}

function deleteItem(id, colors) {
    let dataCart = JSON.parse(localStorage.getItem('command'));
    console.log(Object.keys(dataCart[id]));

    delete dataCart[id][colors];
    if (Object.keys(dataCart[id]).length === 0) {
        delete dataCart[id];
    }
    localStorage.setItem('command', JSON.stringify(dataCart));

    showPrice();
}

function displayItem(id, imageUrl, name, price, color, quantity) {
    const addArticle = document.createElement("article");
    addArticle.classList.add("cart__item");

    const imageDiv = document.createElement("div");
    imageDiv.classList.add("cart__item__img");

    const addImage = document.createElement("img");
    addImage.src = imageUrl;


    const contentDiv = document.createElement("div");
    contentDiv.classList.add("cart__item__content");
    const descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("cart__item__content__description");

    const addTitle = document.createElement("h2");
    addTitle.innerText = name;

    const addColor = document.createElement("p");
    addColor.innerText = color;
    const addPrice = document.createElement("p");
    addPrice.innerText = price + '€';

    const settingsDiv = document.createElement("div");
    settingsDiv.classList.add("cart__item__content__settings");

    const quantityDiv = document.createElement("div");
    quantityDiv.classList.add("cart__item__content__settings__quantity");
    const addQuantity = document.createElement("p");
    addQuantity.innerText = 'Qté : ';
    const quantityAdded = document.createElement("input");
    quantityAdded.setAttribute('type', 'number');
    quantityAdded.classList.add('itemQuantity');
    quantityAdded.setAttribute('min', 1);
    quantityAdded.setAttribute('max', 100);
    quantityAdded.setAttribute('value', quantity);

    const deleteDiv = document.createElement("div");
    deleteDiv.classList.add("cart__item__content__settings__delete");


    const deleteOption = document.createElement("p");
    deleteOption.innerText = "Supprimer";
    deleteOption.classList.add("deleteItem");


    const addElementCart = document.querySelector("#cart__items");
    addElementCart.appendChild(addArticle);
    addArticle.appendChild(imageDiv);
    imageDiv.appendChild(addImage);
    addArticle.appendChild(contentDiv);
    contentDiv.appendChild(descriptionDiv);
    descriptionDiv.appendChild(addTitle);
    descriptionDiv.appendChild(addColor);
    descriptionDiv.appendChild(addPrice);



    addArticle.appendChild(settingsDiv);
    settingsDiv.appendChild(quantityDiv);
    quantityDiv.appendChild(addQuantity);
    addQuantity.appendChild(quantityAdded);


    addArticle.appendChild(deleteDiv);
    deleteDiv.appendChild(deleteOption);



    deleteOption.addEventListener('click', function () {
        deleteItem(id, color);
        this.parentElement.parentElement.remove();
    })
    quantityAdded.addEventListener('change', function (e) {
        updateQty(id, color, parseInt(e.target.value));
    })
}

function showPrice() {
  let totalQty =  document.getElementById('totalQuantity');
  let totalPrice = document.getElementById('totalPrice');
  let qty = 0;
  let price = 0;

    const getCommand = JSON.parse(localStorage.getItem('command'));
    for(let ID in getCommand) {
      const product = productList.find(function (item) {
        if (item['_id'] === ID) {
            return item;
        }
    });
    console.log(ID, product);
        for(let colors in getCommand[ID]) {
            qty += getCommand[ID][colors];
            price += product.price * getCommand[ID][colors];
        }
    }

    totalQty.innerText = qty;
    totalPrice.innerText = price;

}


function render() {
    let dataCart = JSON.parse(localStorage.getItem('command'));
    for (let dataID in dataCart) {
        const dataItem = dataCart[dataID];
        const product = productList.find(function (item, i) {
            if (item['_id'] === dataID) {
                return item;
            }
        });

        if (product) {
            for (let dataColors in dataItem) {
                displayItem(dataID, product.imageUrl, product.name, product.price, dataColors, dataItem[dataColors]);
            }
        }
    }
    showPrice();
}


const execute = async () => {
    await getProductList();
    render();
}

execute();









