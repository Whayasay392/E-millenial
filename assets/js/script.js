var cart = document.querySelectorAll('.product-btn');

let shoppingBtn = document.querySelector('.clear-cart');


// cartReload = () =>  location.reload();

storageClear = () =>  {
    window.localStorage.clear();
    location.reload();
}


textChange = () =>  {
    var cart = document.querySelectorAll('.product-btn');
    cart.innerHTML = "Added to cart";
}

var products = [
    {
        name: 'Samsung Tv',
        tag: 'television',
        price: 450000,
        inCart: 0

    },
    {
        name: 'Pixel 4a',
        tag: 'pixel',
        price: 180000,
        inCart: 0

    },
    {
        name: 'PS5',
        tag: 'ps5',
        price: 500000,
        inCart: 0

    },
    {
        name: 'Macbook Air',
        tag: 'Macbook',
        price: 750000,
        inCart: 0

    },
    {
        name: 'Apple Watch',
        tag: 'watch',
        price: 120000,
        inCart: 0

    },
    {
        name: 'Airpods',
        tag: 'Airpods',
        price: 80000,
        inCart: 0

    },
    
]

for (let i=0; i<cart.length; i++) {
    cart[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

onLoadCartNumbers = () => {
    let productNumbers = localStorage.getItem('cartNumbers');
    
     if(productNumbers) {
         const totalCount = document.querySelector('#total-count');
        totalCount.textContent = productNumbers;
     }
}
cartNumbers = (product) => {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    if(productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('#total-count').innerHTML = productNumbers + 1;
    }else   {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('#total-count').innerHTML = 1;
    }
    setItems(product);
}

setItems = (product) =>    {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems= JSON.parse(cartItems);
   
    if(cartItems != null) {
        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }else {
        product.inCart = 1;
            cartItems = {
                [product.tag]: product
            }
        }

    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems)); 
}

totalCost = (product) =>  {
    let cartCost = localStorage.getItem('totalCost')
    

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }else   {
        localStorage.setItem("totalCost", product.price);
    }
    
}

displayCart=() => {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
   
   
    let modalContents = document.querySelector(".cart-items");
    let cartCost = localStorage.getItem('totalCost')

    if(cartItems && modalContents)  {
        // console.log('smoothing');
        modalContents.innerHTML = '';
        Object.values(cartItems).map(item => {
          // <div class="serial-number"><div>
            modalContents.innerHTML += `
           
            <div class="product-item" id="item-name">
            ${item.name}</div>
            <div id="price" class="product-price">
            #${item.price}</div>
            <div class="product-quantity"><button class="decrement" >-</button><span class="product-qty">${item.inCart}</span><button class="increment">+</button></div>
            <div><button class="remove-product">Remove</button></div>
            `;
       });
        
       document.querySelector('.total-cart').textContent += ` ${cartCost}`
     }
}

onLoadCartNumbers();
displayCart();


//Paystack Integration

function payWithPaystack() {
    let cartCost = localStorage.getItem('totalCost')
    let handler = PaystackPop.setup({
      key: 'pk_test_4cf54aa75fe4d0370301d3e302fe3c9b8cd6e51b', // Replace with your public key
      email: document.getElementById("email-address").value,
    //   amount: document.getElementById("amount").value * 100,
    amount: `${cartCost}` * 100,
      ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      // label: "Optional string that replaces customer email"
      onClose: function(){
        alert('Window closed.');
      },
      callback: function(response){
        let message = 'Payment complete! Reference: ' + response.reference;
        alert(message);
        // showSummary()
      }
    });
    handler.openIframe();
  }


 