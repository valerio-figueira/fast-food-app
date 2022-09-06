import Burguers from "./Burguers.js";
import Pizzas from "./Pizzas.js";

const selectedFood = document.querySelector(".selected-food");

const sections = document.querySelectorAll(".navbar a");
sections.forEach(section => {
    section.addEventListener('click', () => {
        if(section.classList.contains("burguer")){
            displayBurguers();
            function displayBurguers(){
                const burguerGallery = document.querySelector(".food-gallery");
                const html = Burguers.getBurguers().map(burguer => {
                    return `
                        <img src="${burguer.img}" alt="${burguer.name}" id="${burguer.id}">
                    `
                }).join('');
                burguerGallery.innerHTML = html;
            
                const burguers = document.querySelectorAll(".food-gallery img");
                burguers.forEach(burguer => {
                    burguer.addEventListener('click', () => {
                        let burguerObject;
                        Burguers.getBurguers().forEach(matchBurguer => {
                            if(matchBurguer.id.match(burguer.id)){
                                console.log("Success")
                                return burguerObject = matchBurguer;
                            };
                        });
                        selectedFood.firstElementChild.src = burguerObject.img;
                        selectedFood.firstElementChild.nextElementSibling.innerHTML = burguerObject.name;
                        selectedFood.lastElementChild.previousElementSibling.innerHTML = String(burguerObject.price);
                        selectedFood.lastElementChild.previousElementSibling.previousElementSibling.innerHTML = burguerObject.description;
                    });
                });
            };
            console.log("Burguer section")
        } else if(section.classList.contains("pizza")){
            const pizzasGallery = document.querySelector(".food-gallery");
            displayPizzas();
            function displayPizzas() {
                const html = Pizzas.getPizzas().map(pizza => {
                    return `
                    <img src="${pizza.img}" alt="${pizza.name}" id="${pizza.id}">
                    `
                }).join('');
                pizzasGallery.innerHTML = html;
            };

            console.log("Pizza section")
        } else if(section.classList.contains("drink")){
            console.log("Drink section")
        } else if(section.classList.contains("purchase_cart")){
            console.log("Cart section")
        } else if(section.classList.contains("menu")){
            console.log("Menu section")
        } else{
            console.error("Invalid section!");
        }
    })
});

