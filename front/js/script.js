// Fetch data from API
const dataBrowse = async () => {
  // L’URL de l’API où on veut prendre les données
  let url = `http://localhost:3000/api/products`;
  //Appel du fetch() avec paramètre la variable URL qui contient l’URL de l’API
  let data = await fetch(url);
  //Données de l’API stocker dans la variable Response, demander au format JSON()
  let response = await data.json();




  //Boucle for qui va parcourir les données de Response et les stocker dans Products
  for (i = 0; i < response.length; i++) {
    //Données de chaque produits Kanap stocker ici
    const products = response[i];




    //Création d’une ancre “<ahref>”
    const aLink = document.createElement("a");
    //Création d'une classe
    aLink.classList.add("productPage");
    //On ajoute un attribut à cette ancre, avec paramètre “href” et l’URL de notre page produit unique avec l'ID du canapé stocker dans products
    aLink.setAttribute("href", `http://127.0.0.1:5500/front/html/product.html?id=${products._id}`);



    //Création d'un tag article
    const articleTag = document.createElement("article");



    //Création d'un img élément
    const imageElement = document.createElement("img");
    //Où trouver la source de l'image dans Products
    imageElement.src = products.imageUrl;



    //Création d'un titre H3
    const productName = document.createElement("h3");
    //Création d'une classe
    productName.classList.add("productName");
    //Où trouver la source du nom du produit dans Products
    productName.innerText = products.name;




    //Création d'une balise paragraphe
    const productDescription = document.createElement("p");
    //Création d'une classe
    productDescription.classList.add("productDescription");
    //Où trouver la source de la description produit dans Products
    productDescription.innerText = products.description;




    //Ajout des éléments créé à leurs parents & enfants
    const addElements = document.querySelector("#items");
    addElements.appendChild(aLink);
    aLink.appendChild(articleTag);
    articleTag.appendChild(imageElement);
    articleTag.appendChild(productName);
    articleTag.appendChild(productDescription);
  }
}
dataBrowse();
