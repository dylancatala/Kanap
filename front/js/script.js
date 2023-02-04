// Fetch data from API
const dataBrowse = async () => {
  let url = `http://localhost:3000/api/products`;
  let data = await fetch(url);
  let response = await data.json();

  // For Loop to get product ID inside the Fetch data
  for (i = 0; i < response.length; i++) {
    const products = response[i];


    // AHREF
    const aLink = document.createElement("a");
    aLink.classList.add("productPage");
    aLink.setAttribute("href", `http://127.0.0.1:5500/front/html/product.html?id=${products._id}`);


    // BALISE ARTICLE
    const articleTag = document.createElement("article");


    // Image
    const imageElement = document.createElement("img");
    imageElement.src = products.imageUrl;


    //Nom Produit
    const productName = document.createElement("h3");
    productName.classList.add("productName");
    productName.innerHTML = products.name;


    //Description produit
    const productDescription = document.createElement("p");
    productDescription.classList.add("productDescription");
    productDescription.innerHTML = products.description;


    // Adding elements to my ID
    const addElements = document.querySelector("#items");
    addElements.appendChild(aLink);
    aLink.appendChild(articleTag);
    articleTag.appendChild(imageElement);
    articleTag.appendChild(productName);
    articleTag.appendChild(productDescription);
  }
}
dataBrowse();
