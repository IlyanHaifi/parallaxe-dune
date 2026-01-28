
const slides = document.querySelectorAll('.slide');
let index = 0;

function nextSlide() {
  // Retirer la classe active de l'image actuelle
  slides[index].classList.remove('active');

  // Passer à l'image suivante
  index = (index + 1) % slides.length;

  // Ajouter la classe active à la nouvelle image
  slides[index].classList.add('active');
}

setInterval(nextSlide, 6000); // Change d'image toutes les 3 secondes

