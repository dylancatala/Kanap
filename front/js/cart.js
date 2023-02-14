//Création d'un tableau pour accueillir nos données
let productList = [];

// Disable HTML form validation
document.querySelector("form.cart__order__form").setAttribute('novalidate', true);

//Fetch des données à partir de l'API Produits
const getProductList = async () => {
  let productFetch = await fetch(`http://localhost:3000/api/products`);
  //Récupération des données au format JSON et stocker dans notre tableau déclarer plutôt
  productList = await productFetch.json();
}



function updateQty(id, colors, quantity) {

  //Récupération de la commande dans le localStorage
  let dataCart = JSON.parse(localStorage.getItem('command'));
  //Mise à jour de la quantité
  dataCart[id][colors] = quantity;
  //Enregistrement dans le localStorage
  localStorage.setItem('command', JSON.stringify(dataCart));
  //Mise à jour du prix
  showPrice();
}


function deleteItem(id, colors) {
  //Récupération de la commande dans le localStorage
  let dataCart = JSON.parse(localStorage.getItem('command'));
  //Suppression du produit avec sa couleur
  delete dataCart[id][colors];

  //Suppression du produit de la commande s'il n'est pas commander dans au moins 1 couleur
  if (Object.keys(dataCart[id]).length === 0) {
    delete dataCart[id];
  }
  //Mise à jour du localStorage
  localStorage.setItem('command', JSON.stringify(dataCart));
  //Mise à jour du prix
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

  // Listening on the quantity change, (ID & Color taken into account to verify that the quantity is changed to the correct product)
  quantityAdded.addEventListener('change', function (e) {
    updateQty(id, color, parseInt(e.target.value));
  })
}



//Affiche le prix
function showPrice() {
  //Récupération des éléments HTML
  let totalQty = document.getElementById('totalQuantity');
  let totalPrice = document.getElementById('totalPrice');
  let qty = 0;
  let price = 0;

  //Récupération de la commande dans le localStorage
  const getCommand = JSON.parse(localStorage.getItem('command'));

  //Parcours de tous les ID des canapés de la commande
  for (let ID in getCommand) {
    //Récupération du canapé correspondant à l'ID dans les données API
    const product = productList.find(function (item) {
      if (item['_id'] === ID) {
        return item;
      }
    });

    //Parcours les couleurs du produit commander
    for (let colors in getCommand[ID]) {
      //Ajout de la quantité 
      qty += getCommand[ID][colors];
      //Ajout du prix du produit (quantité * prix)
      price += product.price * getCommand[ID][colors];
    }
  }

  //Adding data of quantity & price retrieved before on they're tag element with innerText
  totalQty.innerText = qty;
  totalPrice.innerText = price;

}





function render() {
  //Récupération de la commande dans le localStorage
  let dataCart = JSON.parse(localStorage.getItem('command'));

  //Parcours des ID des produits de la commande
  for (let dataID in dataCart) {

    //Récupération des données du produit commander
    const dataItem = dataCart[dataID];
    //Récupération du canapé correspondant à l'ID dans les données API
    const product = productList.find(function (item, i) {
      if (item['_id'] === dataID) {
        return item;
      }
    });
    //Si le produit existe 
    if (product) {
      //Parcours de la liste des couleurs commander
      for (let dataColors in dataItem) {
        //Ajout des éléments HTML sur la page panier avec leur données
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



//Création de différentes Regex qui seront utiliser pour vérifier les données du formulaire
const REGEX = {
  name: /[A-Za-z\é\è\ê\-]+$/,
  address: /(?:\d{0,3} +(bis|ter|quat|rue|chemin|route)|\G(?<!^)) (\S+)/i,
  city: /[A-Za-z\é\è\ê\-]+$/,
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  objID: /^[a-f0-9]{32}$/i,
};


//Création d'un objet erreur qui va contenir les erreurs formulaire
const ERRORS = {};


//Création d'un objet pour enregistrer nos données valides
const data = {};


//Données saisies valides de notre formulaire enregistrer dans notre objet data
const validateInput = function (inputName, regex, errorClass, errorMsg) {
  let input = document.getElementById(inputName);
  let error = document.getElementById(errorClass);
  //Test si il y a une erreur par rapport au REGEX
  error.innerText = (regex.test(input.value)) ? '' : errorMsg;
  //Si les données sont valides 
  if ((regex.test(input.value))) {
    //On supprime de la propriété
    delete ERRORS[inputName];
    //On ajoute dans notre objet data les données valides
    data[inputName] = input.value;
  } else {
    //Erreurs de saisies formulaire enregistrer dans notre objet avec un message d'erreur
    ERRORS[inputName] = errorMsg;
    //SUpprime de l'objet data les valeurs 
    delete data[inputName];
  }
};

//Envoi du formulaire (saisies valides) à l'API
const sendForm = async (contact, products) => {
  //Envoi de la commande à l'API
  const response = await fetch('http://localhost:3000/api/products/order', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contact: contact,
      products: products,
    })
  });
  //Récupération de la réponse de l'API
  const responseBody = await response.json();

  //Si la réponse est bonne, redirection vers la page confirmation avec l'identifiant de la commande
  if (responseBody) {
    window.location.href = `/front/html/confirmation.html?orderID=${responseBody.orderId}`;
  } else {
    //Sinon message d'erreur 
    alert("Erreur");
  }

};


//Récupération de l'élément formulaire
let getForm = document.getElementsByClassName('cart__order__form')[0];


//Événement d'écoute sur le bouton envoyer du formulaire
getForm.addEventListener('submit', function (e) {
  e.preventDefault();


  //Récupération de notre clé 'command' dans le localStorage au format JSON pour être un objet
  const command = JSON.parse(localStorage.getItem('command'));


  //Récupération des propriété de l'objet commande sous format de tableau
  const products = Object.keys(command);


  //Si les propriétés de l'objet commande sont vides affiche un message d'erreur
  if (products.length <= 0) {
    return alert("Le panier est vide.");
  }



  //Teste si les ID des produits sont invalide au REGEX
  for (let productID of products) {
    if (!REGEX.objID.test(productID)) {
      return alert("Les produits ne sont pas conformes");
    }
  }



  //Vérification des inputs formulaire avec leur REGEX et le message d'erreur à afficher
  validateInput("firstName", REGEX.name, "firstNameErrorMsg", "Votre prénom n'est pas valide");
  validateInput("lastName", REGEX.name, "lastNameErrorMsg", "Votre nom n'est pas valide");
  validateInput("address", REGEX.address, "addressErrorMsg", "Votre adresse n'est pas valide");
  validateInput("city", REGEX.city, "cityErrorMsg", "Votre ville n'est pas valide");
  validateInput("email", REGEX.email, "emailErrorMsg", "Votre e-mail n'est pas valide");



  //Vérifie si notre objet ERRORS contient des propriétés
  if (Object.keys(ERRORS).length) {
    //Affiche un message d'erreur si il y a des erreurs formulaire
    return alert("Le formulaire n'est pas correct")
  }


  sendForm(data, products);
});




