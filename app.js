import Burguers from "./Burguers.js";


displayBurguers();
function displayBurguers(){
    const foodGallery = document.querySelector(".food-gallery");
    const html = Burguers.getBurguers().map(burguer => {
        return `
            <img src="${burguer.img}" alt="${burguer.name}">
        `
    }).join('');
    foodGallery.innerHTML = html;

    const burguers = document.querySelectorAll(".food-gallery img");
    burguers.forEach(burguer => {
        burguer.addEventListener('click', () => {
            
        })
    })
};