// Empty array to add data fetch of products
let productList = [];

//Disable HTML form validation
document.querySelector("form.cart__order__form").setAttribute('novalidate', true);

// Fetching data from products
const getProductList = async () => {
  let productFetch = await fetch(`http://localhost:3000/api/products`);
  productList = await productFetch.json();
}



function updateQty(id, colors, quantity) {

  // Parsing data through localStorage with the key "command" to get all data
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



// Adding parameters to this function to map them into const for adding them to the right tag element created for them
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



  //All documents elements created before now added to their childs or parent
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



  // Listening on the "delete" button on cart, if someone click on delete it will remove the product
  deleteOption.addEventListener('click', function () {
    deleteItem(id, color);
    this.parentElement.parentElement.remove();
  })
  //Listening on the quantity change, (ID & Color taken into account to verify that the quantity is changed to the correct product)
  quantityAdded.addEventListener('change', function (e) {
    updateQty(id, color, parseInt(e.target.value));
  })
}




function showPrice() {
  let totalQty = document.getElementById('totalQuantity');
  let totalPrice = document.getElementById('totalPrice');
  let qty = 0;
  let price = 0;

  //Storing data parsed of command through localStorage on the 'getCommand' variable
  const getCommand = JSON.parse(localStorage.getItem('command'));

  //For in loop to store data of 'getCommand' into ID
  for (let ID in getCommand) {
    const product = productList.find(function (item) {
      if (item['_id'] === ID) {
        return item;
      }
    });
    console.log(ID, product);
    for (let colors in getCommand[ID]) {
      qty += getCommand[ID][colors];
      price += product.price * getCommand[ID][colors];
    }
  }

  //Adding data of quantity & price retrieved before on they're tag element with innerText
  totalQty.innerText = qty;
  totalPrice.innerText = price;

}





function render() {
  //Storing data parsed of command through localStorage on the 'dataCart' variable
  let dataCart = JSON.parse(localStorage.getItem('command'));

  //For in loop to store data of 'dataCart' in dataID
  for (let dataID in dataCart) {

    //Parcouring dataCart to find dataID index and storing it into the 'dataItem' variable
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





//Creating Regex to match with data form accepted
const REGEX = {
  name: /[A-Za-z\é\è\ê\-]+$/,
  address: /(?:\d{0,3} +(bis|ter|quat|rue|chemin|route)|\G(?<!^)) (\S+)/i,
  city: /[A-Za-z\é\è\ê\-]+$/,
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  objID: /^[a-f0-9]{32}$/i,
};


//Creating const object to store form error
const ERRORS = {};


//Creating const object to store data form valid
const data = {};



const validateInput = function (inputName, regex, errorClass, errorMsg) {
  let input = document.getElementById(inputName);
  let error = document.getElementById(errorClass);
  error.innerText = (regex.test(input.value)) ? '' : errorMsg;
  if ((regex.test(input.value))) {
    delete ERRORS[inputName];
    data[inputName] = input.value;
  } else {
    ERRORS[inputName] = errorMsg;
    delete data[inputName];
  }
};


const sendForm = async (contact, products) => {
  const response = await fetch('http://localhost:3000/api/products/order', {
    method: 'POST',
    headers: {
      accept: 'application.json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contact: contact,
      products: products,
    })
  });
  const command = await response.json();

  if (command) {
    window.location.href = `/front/html/confirmation.html?orderID=${command.orderId}`;
  } else {
    alert("Erreur");
  }

};


//Getting the form with Class name
let getForm = document.getElementsByClassName('cart__order__form')[0];

//Event listener on the form when we submit it
getForm.addEventListener('submit', function (e) {
  e.preventDefault();

  //Parsing data and storing data of 'command' into his variable
  const command = JSON.parse(localStorage.getItem('command'));

  //Object.keys of 'command' to get an array of data and storing it into the 'products' variable
  const products = Object.keys(command);


  //If statment of products that we declared before to analyze his length in data inferior at 0
  if (products.length <= 0) {
    return alert("Le panier est vide.");
  }


  for (let productID of products) {
    if (!REGEX.objID.test(productID)) {
      return alert("Les produits ne sont pas conformes");
    }
  }


  validateInput("firstName", REGEX.name, "firstNameErrorMsg", "Votre prénom n'est pas valide");
  validateInput("lastName", REGEX.name, "lastNameErrorMsg", "Votre nom n'est pas valide");
  validateInput("address", REGEX.address, "addressErrorMsg", "Votre adresse n'est pas valide");
  validateInput("city", REGEX.city, "cityErrorMsg", "Votre ville n'est pas valide");
  validateInput("email", REGEX.email, "emailErrorMsg", "Votre e-mail n'est pas valide");

  console.log(Object.keys(ERRORS).length)

  //Verifying into a if statment if there is error with Object.keys
  if (Object.keys(ERRORS).length) {
    return alert("Le formulaire n'est pas correct")
  }


  sendForm(data, products);
});




