let currentIndex = 0;
const images = document.querySelectorAll(".carousel img");
const noms = document.querySelectorAll(".noms div");
const totalImages = images.length;
const totalNoms = noms.length;

const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

// On cible la "piste" qui contient les images
const track = document.querySelector(".carousel");

function showSlide(index) {
    const translateValue = -index * 100; 
    track.style.transform = `translateX(${translateValue}%)`;

     // Masque tous les noms
    noms.forEach(nom => {
        nom.classList.remove("active");
    });

    noms[index].classList.add("active");
}

prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    showSlide(currentIndex);
});

nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalImages;
    showSlide(currentIndex);
});

// Auto-défilement toutes les 3 secondes
setInterval(() => {
    currentIndex = (currentIndex + 1) % totalImages;
    showSlide(currentIndex);
}, 10000);

showSlide(currentIndex);