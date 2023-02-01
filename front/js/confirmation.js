let params = (new URL(window.location)).searchParams;
let id = params.get('orderID');

if(!id) {
    window.location.href = `/front/html/index.html`;
}

document.getElementById('orderId').innerText = id;
localStorage.removeItem('command');