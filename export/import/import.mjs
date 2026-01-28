import defaut, { jeSuisUnExportNomme, jeSuisUnExportRenomme as renomme } from './export.mjs';

console.log(defaut());// Je suis l'export par défaut.

console.log(jeSuisUnExportNomme());// Je suis un export nommé.

console.log(renomme());// Je suis un export nommé dont l'import est renommé.