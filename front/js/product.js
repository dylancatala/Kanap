//Accède aux paramètres de l'URL
let params = (new URL(window.location)).searchParams;

//Récupération de l'ID du produit 
let id = params.get('id');

//Si il n'y a pas d'ID de produit, retour à la page d'accueil
if (!id) {
  window.location.href = `/front/html/index.html`;
}

//Create a fetch data with template literals to get the specific ID of the product & store it in the dat variable in JSON
const idBrowse = async (id) => {
  //Récupérations des données produit via son ID
  const idData = await fetch(`http://localhost:3000/api/products/${id}`);
  //Données stocker dans la variable data 
  let data = await idData.json();




  //Modification du nom de page avec la source dans data
  document.title = data.name;



  //Create Image element
  const imageProduct = document.createElement("img");
  //Specify the source to find the image in data fetched before
  imageProduct.src = data.imageUrl;



  //Adding image to his parent
  const addingData = document.querySelector("article .item__img");
  addingData.appendChild(imageProduct);



  //Récupération du document HTML
  const addingTitle = document.getElementById("title");
  //Spécifier la source où se trouve l'image à partir des données stocker dans data
  addingTitle.innerText = data.name;



  //Récupération du document HTML
  const descriptionProduct = document.getElementById("description");
  //Spécifier la source où se trouve la description du produit dans data
  descriptionProduct.innerText = data.description;



  //Récupération du document HTML
  const productPrice = document.getElementById("price");
  //Spécifier la source où se trouve le prix du produit dans data
  productPrice.innerText = data.price;



  //Parcours des couleurs à partir des données dans data
  for (i = 0; i < data.colors.length; i++) {
    //Stockage des couleurs lié au produit
    const dataColors = data.colors[i];

    //Création liste déroulante des couleurs
    const addColors = document.createElement("option");
    addColors.setAttribute("value", dataColors);
    addColors.innerText = dataColors;

    document.getElementById("colors").appendChild(addColors);
  }


  //Ajoute un nouveau canapé, sa couleur & quantité dans la commande
  function addItem(id, colors, quantity) {
    //Récupération du localStorage avec sa clé 'command'
    let localData = localStorage.getItem('command');
    if (localData) {
      //Si la clé command existe on le parse
      localData = JSON.parse(localData);
    } else {
      //Si la clé n'existe pas on initialise un objet vide
      localData = {};
    }


    //Si le canapé existe déjà dans la commande
    if (localData[id]) {
      //Si la couleur existe déjà dans la commande
      if (localData[id][colors]) {
        // -> on ajoute la quantité à celle existante
        localData[id][colors] += parseInt(quantity);
      } else {
        // Sinon on ajoute la nouvelle quantité
        localData[id][colors] = parseInt(quantity);
      }
    }
    //Si le canapé existe pas
    else {
      //On crée un nouvel objet vide à l'index ID
      localData[id] = {};
      //On ajoute la propriété couleur avec la valeur quantité { bleu: 2 }
      localData[id][colors] = parseInt(quantity);
    }
    // On l'ajoute au localStorage sous la clé 'command'
    localStorage.setItem('command', JSON.stringify(localData));
  }



  //Récupération du bouton pour ajouter au panier
  const button = document.getElementById("addToCart");
  //Création d'un événement d'écoute sur notre bouton qui écoute au 'click'
  button.addEventListener('click', function () {

    //Vérification si la couleur à été sélectionner
    if (colors.value === '') {
      alert("Vous n'avez pas sélectionné de couleur pour ce produit.");
      return;
    }

    //Vérification si la quantité n'est pas négative ou ne dépasse pas 100
    if (quantity.value <= 0 || quantity.value > 100) {
      alert("La quantité sélectionnée est incorrecte.");
      return;
    }

    //Ajout des valeurs dans la commande
    addItem(data._id, colors.value, quantity.value);
    alert("Produit correctement ajouter au panier.")


  });
}

idBrowse(id);