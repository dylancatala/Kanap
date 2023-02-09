//Retrieving data opf products added to local storage from the window 
let params = (new URL(window.location)).searchParams;
let id = params.get('orderID');



// Redirecting to index page if the ID doesn't match/exist
if (!id) {
  window.location.href = `/front/html/index.html`;
}



// Displaying ID of the command with innerText by getting ID of the tag element & deleting the command of the local storage after command is valided
document.getElementById('orderId').innerText = id;
localStorage.removeItem('command');