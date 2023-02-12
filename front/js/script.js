// Fetch data from API
const dataBrowse = async () => {
  let url = `http://localhost:3000/api/products`;
  let data = await fetch(url);
  let response = await data.json(); //Data of the API products stored into the 'response' variable

  // For Loop to get product ID inside the Fetch data
  for (i = 0; i < response.length; i++) {
    const products = response[i];


    // Creating an anchor element tag
    const aLink = document.createElement("a");
    // Adding a class to the anchor tag
    aLink.classList.add("productPage");
    //Create a anchor link with template literals to add the correct ID of the product retrieved with the data fetch
    aLink.setAttribute("href", `http://127.0.0.1:5500/front/html/product.html?id=${products._id}`);



    // Create Article Tag element
    const articleTag = document.createElement("article");



    // Create Image element
    const imageElement = document.createElement("img");
    //Specify the source to find the image in products data fetched before
    imageElement.src = products.imageUrl;



    //Create H3 Tag & Adding text to H3 with inner
    const productName = document.createElement("h3");
    // Adding a class to the H3 tag
    productName.classList.add("productName");
    //Specify the source to find the name in products data fetched before
    productName.innerHTML = products.name;



    //Create <P> Tag & Adding text to this <P> with inner
    const productDescription = document.createElement("p");
    // Adding a class to the paragraph tag
    productDescription.classList.add("productDescription");
    //Specify the source to find the description in products data fetched before
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
