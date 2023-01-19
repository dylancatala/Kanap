let params = (new URL(window.location)).searchParams;
let id = params.get('id');

const idBrowse = async (id) => {
    const idData = await fetch(`http://localhost:3000/api/products/${id}`);
    let data = await idData.json();
    console.log(data);
    
    document.title = data.name;

        const imageProduct = document.createElement("img");
        imageProduct.src = data.imageUrl;

        const addingData = document.querySelector("article .item__img");
        addingData.appendChild(imageProduct);

        const addingTitle = document.getElementById("title");
        addingTitle.innerText = data.name;

        const descriptionProduct = document.getElementById("description");
        descriptionProduct.innerText = data.description;

        const productPrice = document.getElementById("price");
        productPrice.innerText = data.price;

        for(i = 0; i < data.colors.length; i++) {
            const dataColors = data.colors[i];

            const addColors = document.createElement("option");
            addColors.setAttribute("value", dataColors);
            addColors.innerText = dataColors;

            document.getElementById("colors").appendChild(addColors);
        }
}

idBrowse(id);