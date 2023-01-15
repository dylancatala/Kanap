
const dataBrowse = async() => {
let url = `http://localhost:3000/api/products`;
let data = await fetch(url);
let response = await data.json();


for(i = 0; i < response.length; i++) {
  const products = response[i];
  // AHREF
  const aLink = document.createElement("a");
  // BALISE ARTICLE
  const articleTag = document.createElement("article");
  // Image
  const imageElement = document.createElement("img");
  imageElement.src = products.imageUrl;
  //Nom Produit
  const productName = document.createElement("h3");
  productName.innerHTML = products.name;
  
  const addElements = document.querySelector("#items");
  aLink.appendChild(articleTag);
  addElements.appendChild(aLink);
  aLink.appendChild(productName);
  articleTag.appendChild(imageElement);


}
}

dataBrowse();
