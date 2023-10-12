// Your code here
const restaurantMenu = document.getElementById('restaurant-menu')
const foodDetail = document.getElementById('food-detail')
const detailedImage = document.getElementById('image')
const detailName =document.getElementById('name')
const numberInCart = document.getElementById('number-in-cart-count')
const addToCartForm = document.getElementById('add-to-cart-form')
const numberToAdd = document.getElementById('number-to-add')
let currentData
let currentFoodDisplay

fetch('http://localhost:3000/burgers')
.then(response => response.json())
.then(data =>{
    currentData=data
    currentData.forEach(element => {
        addBurgerToMenu(element)
    });
    displayFoodDetail(currentData[0])
})

function addBurgerToMenu(element){
    const span = document.createElement('span')
    span.textContent = element.name
    restaurantMenu.appendChild(span)
    span.addEventListener('click', ()=>{
        displayFoodDetail(element)
    })
}

function displayFoodDetail(element){
    currentFoodDisplay=element
    detailedImage.src=element.image
    detailName.textContent=element.name
    numberInCart.textContent=element.number_in_cart
}

addToCartForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    sum = Number(numberToAdd.value)+Number(currentFoodDisplay.number_in_cart)
    numberInCart.textContent=sum
    currentFoodDisplay.number_in_cart=sum

    fetch(`http://localhost:3000/burgers/${currentFoodDisplay.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body : JSON.stringify({
            number_in_cart: sum
        })
    })
})