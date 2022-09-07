import Burguers from "./Burguers.js";
import Pizzas from "./Pizzas.js";

const selectedFood = document.querySelector(".selected-food");

const sections = document.querySelectorAll(".navbar a");
sections.forEach(section => {
    section.addEventListener('click', () => {
        if(section.classList.contains("burguer")){
            console.log("Burguer section")

            pullElement(".container").innerHTML = pullBackElements();

            //ADD ACTIVE CLASS IN BAR
            setActiveClass(sections, section);

            /*CLEAN SECTION*/
            selectedFood.childNodes.forEach(child => cleanSection(child));

            displayBurguers();
            
            const burguers = document.querySelectorAll(".food-gallery img");

            burguers.forEach(burguer => {                    
                burguer.addEventListener('click', () => {
                    let burguerObject;
                    /*SEARCH FOR MATCH BURGUER AND RETURN IT INTO NEW OBJECT VARIABLE*/
                    Burguers.getBurguers().forEach(matchBurguer => {
                        if(matchBurguer.id.match(burguer.id)){
                            console.log("Success")
                            return burguerObject = matchBurguer;
                        };
                    });

                    /*ADD SELECTED FOOD INFO INTO TAG*/
                    setFoodInfo(burguerObject);
                    selectedFood.classList.add("opened");

                    /*QUANTITY CONTROLLER*/
                    const less = pullElement(".less");
                    const plus = pullElement(".plus");
                    const quantityTag = pullElement(".quantity");

                    let quantity = 1;
                    quantityTag.innerHTML = quantity;
                    less.disabled = true;
                    plus.disabled = false;

                    let price = burguerObject.price;

                    plus.addEventListener('click', () => {
                        let fullPrice = parseFloat(price += burguerObject.price).toFixed(2);

                        pullElement(".price").innerHTML = fullPrice;

                        quantityTag.innerHTML = ++quantity;

                        if(quantity === 1){
                            less.disabled = true;
                        } else {
                            less.disabled = false;
                        }
                    });
                    less.addEventListener('click', () => {
                        pullElement(".price").innerHTML = parseFloat(price -= burguerObject.price).toFixed(2);

                        quantityTag.innerHTML = --quantity;

                        if(quantity === 1){
                            less.disabled = true;
                        } else {
                            less.disabled = false;
                        }
                    });
                });
            });

        } else if(section.classList.contains("pizza")){
            console.log("Pizza section");

            //IF TAGS OF CONTAINER WERE CHANGED, IT'LL BE PULLED BACK
            pullElement(".container").innerHTML = pullBackElements();

            //ADD ACTIVE CLASS IN BAR
            setActiveClass(sections, section);

            /*CLEAN SECTION*/
            selectedFood.childNodes.forEach(child => cleanSection(child));

            displayPizzas();

            const pizzas = document.querySelectorAll(".food-gallery img");
            
            pizzas.forEach(pizza => {
                pizza.addEventListener('click', () => {
                    /*SEARCH FOR MATCH BURGUER AND RETURN IT INTO NEW OBJECT VARIABLE*/
                    let pizzaObject;
                    Pizzas.getPizzas().forEach(matchPizza => {
                        if(matchPizza.id.match(pizza.id)){
                            return pizzaObject = matchPizza;
                        }
                    });

                    /*ADD SELECTED FOOD INFO INTO TAG*/
                    setFoodInfo(pizzaObject);
                    selectedFood.classList.add("opened");

                    /*QUANTITY CONTROLLER*/
                    const less = pullElement(".less");
                    const plus = pullElement(".plus");
                    const quantityTag = pullElement(".quantity");

                    let quantity = 1;
                    quantityTag.innerHTML = quantity;
                    less.disabled = true;
                    plus.disabled = false;

                    let price = parseFloat(pizzaObject.price);

                    plus.addEventListener('click', () => {
                        pullElement(".price").innerHTML = parseFloat(price += pizzaObject.price).toFixed(2);

                        quantityTag.innerHTML = ++quantity;

                        if(quantity === 1){
                            less.disabled = true;
                        } else {
                            less.disabled = false;
                        }
                    });
                    less.addEventListener('click', () => {
                        pullElement(".price").innerHTML = parseFloat(price -= pizzaObject.price).toFixed(2);

                        quantityTag.innerHTML = --quantity;

                        if(quantity === 1){
                            less.disabled = true;
                        } else {
                            less.disabled = false;
                        }
                    });

                    /*ADD ITEMS INTO CART*/
                    pullElement(".container .cart").addEventListener('click', () => addItemsToCart(pizzaObject, quantity));
                });
            });

        } else if(section.classList.contains("drink")){
            console.log("Drink section");

            //ADD ACTIVE CLASS IN BAR
            sections.forEach(section => {
                section.classList.remove("active");
            })
            section.classList.add("active");
            

            const container = pullElement(".container");            
            container.innerHTML = `
                <section class="my-order">
                    <h2>Drinks</h2>
                </section>
            `;


        } else if(section.classList.contains("purchase_cart")){
            console.log("Cart section");

            //ADD ACTIVE CLASS IN BAR
            sections.forEach(section => {
                section.classList.remove("active");
            })
            section.classList.add("active");
            
            const container = pullElement(".container");            
            container.innerHTML = `
                <section class="my-order">
                    <h2>My Order</h2>
                    <div class="order-box">
                    ${addItemsToCart()}
                    </div>
                </section>
            `;

         

        } else if(section.classList.contains("menu")){
            console.log("Menu section");
        } else{
            console.error("Invalid section!");
        }
    })
});


function pullElement(element){
    return document.querySelector(element);
}

function pullBackElements(){
    return `
    <section class="food-gallery"></section>
    <section class="selected-food">
        <img src="" alt="" class="food-img">
        <h2 class="food-name"></h2>
        <p class="description"></p>
        <div class="price">0.00</div>
        <div class="quantity_controller">
            <button class="less">-</button>
            <span class="quantity">0</span>
            <button class="plus">+</button>
        </div>
    </section>
    <button type="button" class="cart"><span class="fa fa-cart-plus icon"></span> Add to cart</button>
    `
}




/*CLEAN SECTION FUNCTION*/
function cleanSection(child){
    child.src = "";
    child.alt = "";
    if(child.className === "food-name"){
        child.innerHTML = "";
    } else if(child.className === "description") {
        child.innerHTML = "";
    } else if(child.className === "price"){
        child.innerHTML = "0.00";
    }
    pullElement(".quantity").innerHTML = "0";
    pullElement(".less").disabled = true;
    pullElement(".plus").disabled = true;
}
/*ADD ACTIVE CLASS IN NAV*/
function setActiveClass(sections, section){
    sections.forEach(section => {
        section.classList.remove("active");
    })
    section.classList.add("active");
}
/*DISPLAY ALL BURGUERS IMGs*/
function displayBurguers(){                
    const burguerGallery = document.querySelector(".food-gallery");
    const html = Burguers.getBurguers().map(burguer => {
        return `
            <img src="${burguer.img}" alt="${burguer.name}" id="${burguer.id}">
        `;
    }).join('');
    burguerGallery.innerHTML = html;
};   
/*DISPLAY ALL PIZZAS IMGs*/
function displayPizzas() {
    const pizzasGallery = document.querySelector(".food-gallery");
    const html = Pizzas.getPizzas().map(pizza => {
        return `
        <img src="${pizza.img}" alt="${pizza.name}" id="${pizza.id}">
        `;
    }).join('');
    pizzasGallery.innerHTML = html;
};
/*ADD SELECTED FOOD INFO INTO HTML TAG*/
function setFoodInfo(foodObject){
    pullElement(".food-name").innerHTML = foodObject.name;
    pullElement(".description").innerHTML = foodObject.description;;
    pullElement(".price").innerHTML = parseFloat(foodObject.price).toFixed(2);
    pullElement(".food-img").src = foodObject.img;
    pullElement(".food-img").alt = foodObject.name;    
}

/*ADD ITEMS TO CART*/
function addItemsToCart(object, quantity){
    console.log("success")
}