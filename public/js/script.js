let cartList = document.querySelector('.cart-list');
let button = document.querySelector('.quantity-button');
let btnIncrease = document.querySelector(".increase");
let btnDecrease = document.querySelector(".decrease");
const axios = require("axios");
// cartList.addEventListener('click', () => {
//     if (btnIncrease.classList.contains("increase")) {
//         console.log("+");
//     } else {
//       console.log("-");
//     };
// })
async function increase(id) {
    console.log(id);
        axios.get(`/shop/cart/increase/${id}`)
            .then((res) => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
}
function decrease() {
    console.log("Clicked", "DECREASE BUTTON!");
}