// Fetch data ID through the window.location
let params = (new URL(window.location)).searchParams;

//ID data is store in this let
let id = params.get('id');


//Create a fetch data with template literals to get the specific ID of the product & store it in the dat variable in JSON
const idBrowse = async (id) => {
  const idData = await fetch(`http://localhost:3000/api/products/${id}`);
  let data = await idData.json();
  console.log(data);


  //Adding Product Title to the page
  document.title = data.name;



  //Create Image element
  const imageProduct = document.createElement("img");
  imageProduct.src = data.imageUrl;



  //Adding image to his parent
  const addingData = document.querySelector("article .item__img");
  addingData.appendChild(imageProduct);



  // Getting title of the product by ID and adding text to it with inner
  const addingTitle = document.getElementById("title");
  addingTitle.innerText = data.name;



  // Getting description of the product by ID and adding text to it with inner
  const descriptionProduct = document.getElementById("description");
  descriptionProduct.innerText = data.description;



  //Getting price tag of the element by ID and adding the data price to it with inner
  const productPrice = document.getElementById("price");
  productPrice.innerText = data.price;



  //For loop colors poducts
  for (i = 0; i < data.colors.length; i++) {
    const dataColors = data.colors[i];

    const addColors = document.createElement("option");
    addColors.setAttribute("value", dataColors);
    addColors.innerText = dataColors;

    document.getElementById("colors").appendChild(addColors);
  }



  function addItem(id, colors, quantity) {
    let localData = localStorage.getItem('command');
    if (localData) {
      localData = JSON.parse(localData);
    } else {
      localData = {};
    }

    if (localData[id]) {
      if (localData[id][colors]) {
        localData[id][colors] += parseInt(quantity);
      } else {
        localData[id][colors] = parseInt(quantity);
      }
    }
    else {
      localData[id] = {};
      localData[id][colors] = parseInt(quantity);
    }
    localStorage.setItem('command', JSON.stringify(localData));
  }



  //ADD PRODUCT TO CART
  const button = document.getElementById("addToCart");
  button.addEventListener('click', function () {


    // IF COLORS VALUE OF THE ITEM SELECTED IS NULL DISPLAYING ALERT
    if (colors.value === '') {
      alert("Vous n'avez pas sélectionné de couleur pour ce produit.");
      return;
    }

    // IF QUANTITY VALUE OF THE ITEM SELECTED IS NULL DISPLAYING ALERT
    if (quantity.value <= 0 || quantity.value > 100) {
      alert("La quantité sélectionnée est incorrecte.");
      return;
    }


    const idProductAdded = data._id;
    const colorsProductAdded = colors.value;
    const quantityAdded = quantity.value;

    addItem(idProductAdded, colorsProductAdded, quantityAdded);
    alert("Produit correctement ajouter au panier.")


  });
}

idBrowse(id);