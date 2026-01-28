
// Appelée si récupération des coordonnées réussie
function positionSucces(position) {
  const userLat = position.coords.latitude;
  const userLong = position.coords.longitude;

  carte.setView([userLat, userLong], 12);

  // Charger les cinémas APRÈS avoir la position
  fetch("./cinema.GeoJSON")
    .then(res => res.json())
    .then(json => {

      const nearby = {
        type: "FeatureCollection",
        features: json.features.filter(feature => {
          const c = feature.geometry.coordinates; // [lon, lat]
          const dist = distanceKm(userLat, userLong, c[1], c[0]);

          return dist <= 20;  // rayon de 20 km par exemple
        })
      };

      console.log("Cinémas proches :", nearby);

      L.geoJSON(nearby, {
        onEachFeature: onEachFeature
      }).addTo(carte);
    });
}


// Appelée si échec de récuparation des coordonnées
function positionErreur(erreurPosition) {
  // Cas d'usage du switch !
  let natureErreur;
  switch (erreurPosition.code) {
    case erreurPosition.TIMEOUT:
      // Attention, durée par défaut de récupération des coordonnées infini
      natureErreur = "La géolocalisation prends trop de temps...";
      break;
    case erreurPosition.PERMISSION_DENIED:
      natureErreur = "Vous n'avez pas autorisé la géolocalisation.";
      break;
    case erreurPosition.POSITION_UNAVAILABLE:
      natureErreur = "Votre position n'a pu être déterminée.";
      break;
    default:
      natureErreur = "Une erreur inattendue s'est produite.";
  }
  // Injection du texte
  $("p").text(natureErreur);
}

// Récupération des coordonnées au clic sur le bouton
$("button").click(function () {
  // Support de la géolocalisation
  if ("geolocation" in navigator) {
    // Support = exécution du callback selon le résultat
    navigator.geolocation.getCurrentPosition(positionSucces, positionErreur, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 30000
    });
  } else {
    // Non support = injection de texte
    $("p").text("La géolocalisation n'est pas supportée par votre navigateur");
  }
});

let carte = L.map('carte', {
  center: [47.2608, 2.4189],
  zoom: 5
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(carte);


L.control.scale().addTo(carte);


function onEachFeature(feature, layer) {
  // does this feature have a property named popupContent?
  if (feature.properties && feature.properties["NOM_ETABLISSEMENT"]) {
    layer.bindPopup(feature.properties["NOM_ETABLISSEMENT"]);
  }
}

function distanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // rayon de la Terre en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}


