//Accède aux paramètres de l'URL
let params = (new URL(window.location)).searchParams;
//Récupération de l'ID grâce à l'URL de la page
let id = params.get('orderID');



//Si il n'y a pas d'ID de commande, retour à la page d'accueil
if (!id) {
  window.location.href = `/front/html/index.html`;
}



//Récupération de l'élément HTML pour y ajouter en innerText notre ID de commande
document.getElementById('orderId').innerText = id;

//Supprime notre 'command' avec les données du panier une fois la commande valider
localStorage.removeItem('command');