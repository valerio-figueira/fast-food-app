import Burguers from "./Burguers.js";
import Pizzas from "./Pizzas.js";

const selectedFood = document.querySelector(".selected-food");

const sections = document.querySelectorAll(".navbar a");
sections.forEach(section => {
    section.addEventListener('click', () => {
        if(section.classList.contains("burguer")){
            //ADD ACTIVE CLASS IN BAR
            sections.forEach(section => {
                section.classList.remove("active");
            })
            section.classList.add("active");

            /*CLEAN SECTION*/
            selectedFood.childNodes.forEach(child => {
                child.src = "";
                child.alt = "";
                selectedFood.classList.remove("opened");
                if(child.className === "food-name"){
                    child.innerHTML = "";
                } else if(child.className === "description") {
                    child.innerHTML = "";
                } else if(child.className === "price"){
                    child.innerHTML = "0,00";
                }
            });

            displayBurguers();

            function displayBurguers(){
                const burguerGallery = document.querySelector(".food-gallery");
                const html = Burguers.getBurguers().map(burguer => {
                    return `
                        <img src="${burguer.img}" alt="${burguer.name}" id="${burguer.id}">
                    `;
                }).join('');

                burguerGallery.innerHTML = html;
            
                const burguers = document.querySelectorAll(".food-gallery img");

                burguers.forEach(burguer => {                    
                    burguer.addEventListener('click', () => {
                        let burguerObject;
                        selectedFood.classList.remove("opened");
                        Burguers.getBurguers().forEach(matchBurguer => {
                            if(matchBurguer.id.match(burguer.id)){
                                console.log("Success")
                                return burguerObject = matchBurguer;
                            };
                        });

                        pullElement(".food-name").innerHTML = burguerObject.name;
                        pullElement(".description").innerHTML = burguerObject.description;;
                        pullElement(".price").innerHTML = Number(burguerObject.price);
                        pullElement(".food-img").src = burguerObject.img;
                        pullElement(".food-img").alt = burguerObject.name;
                        selectedFood.classList.add("opened");

                        /*QUANTITY CONTROLLER*/
                        const less = pullElement(".less");
                        const plus = pullElement(".plus");
                        
                        plus.addEventListener('click', () => {
                            let price = burguerObject.price * 2;
                            pullElement(".price").innerHTML = price;
                        });
                        function sum(price){
                            return price *= 2;
                        }
                    });
                });
            };


            console.log("Burguer section")

        } else if(section.classList.contains("pizza")){
            const pizzasGallery = document.querySelector(".food-gallery");

            //ADD ACTIVE CLASS IN BAR
            sections.forEach(section => {
                section.classList.remove("active");
            })
            section.classList.add("active");

            /*CLEAN SECTION*/
            selectedFood.childNodes.forEach(child => {
                child.src = "";
                child.alt = "";
                selectedFood.classList.remove("opened");
                if(child.className === "food-name"){
                    child.innerHTML = "";
                } else if(child.className === "description") {
                    child.innerHTML = "";
                } else if(child.className === "price"){
                    child.innerHTML = "0,00";
                }
            });

            displayPizzas();

            function displayPizzas() {
                const html = Pizzas.getPizzas().map(pizza => {
                    return `
                    <img src="${pizza.img}" alt="${pizza.name}" id="${pizza.id}">
                    `;
                }).join('');
                pizzasGallery.innerHTML = html;
            };

            const pizzas = document.querySelectorAll(".food-gallery img");
            pizzas.forEach(pizza => {
                pizza.addEventListener('click', () => {
                    let pizzaObject;
                    Pizzas.getPizzas().forEach(matchPizza => {
                        if(matchPizza.id.match(pizza.id)){
                            return pizzaObject = matchPizza;
                        }
                    });
                    pullElement(".food-name").innerHTML = pizzaObject.name;
                    pullElement(".description").innerHTML = pizzaObject.description;
                    pullElement(".price").innerHTML = pizzaObject.price;
                    pullElement(".food-img").src = pizzaObject.img;
                    pullElement(".food-img").alt = pizzaObject.name;            
                    selectedFood.classList.add("opened");
                });
            });
            console.log("Pizza section");
        } else if(section.classList.contains("drink")){
            //ADD ACTIVE CLASS IN BAR
            sections.forEach(section => {
                section.classList.remove("active");
            })
            section.classList.add("active");
            console.log("Drink section");
        } else if(section.classList.contains("purchase_cart")){
            //ADD ACTIVE CLASS IN BAR
            sections.forEach(section => {
                section.classList.remove("active");
            })
            section.classList.add("active");
            console.log("Cart section");
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


sections.forEach(section => {

})