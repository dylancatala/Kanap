// Fetch data ID
let params = (new URL(window.location)).searchParams;
let id = params.get('id');

const idBrowse = async (id) => {
    const idData = await fetch(`http://localhost:3000/api/products/${id}`);
    let data = await idData.json();
    console.log(data);
    

    //Page produc title
    document.title = data.name;


        //Image
        const imageProduct = document.createElement("img");
        imageProduct.src = data.imageUrl;

        //Adding image to his parent
        const addingData = document.querySelector("article .item__img");
        addingData.appendChild(imageProduct);


        const addingTitle = document.getElementById("title");
        addingTitle.innerText = data.name;


        //Product description
        const descriptionProduct = document.getElementById("description");
        descriptionProduct.innerText = data.description;


        //Product Price
        const productPrice = document.getElementById("price");
        productPrice.innerText = data.price;


        //For loop colors poducts
        for(i = 0; i < data.colors.length; i++) {
            const dataColors = data.colors[i];

            const addColors = document.createElement("option");
            addColors.setAttribute("value", dataColors);
            addColors.innerText = dataColors;

            document.getElementById("colors").appendChild(addColors);
        }
}

idBrowse(id);