/* Place your JavaScript in this file */

// Exemple simple : Afficher le nom entré par l'utilisateur dans une alerte

function afficherNom(){
   const nom = document.getElementById('nom').value;
   alert('Bonjour ' + nom + ' !');
}

//afficher taille de matrice
function afficherTaille() {
    const n = Number(document.getElementById("taille1").value);
    document.getElementById("resultat").textContent =
         + n + " × " + n;
}

//afficher matrice
function creerChamps() {
    const n = Number(document.getElementById("taille2").value);
    const container = document.getElementById("champsMatrice");
    container.innerHTML = "";

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const input = document.createElement("input");
            input.type = "number";
            input.id = `a_${i}_${j}`;
            input.value = 0;
            input.style.width = "50px";
            container.appendChild(input);
        }
        container.appendChild(document.createElement("br"));
    }
}

function afficherMatrice() {
    const n = Number(document.getElementById("taille2").value);
    let latexMatrice = "\\[ A = \\begin{pmatrix} ";

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const valeur = document.getElementById(`a_${i}_${j}`).value;
            latexMatrice += valeur;
            if (j < n - 1) latexMatrice += " & ";
        }
        if (i < n - 1) latexMatrice += " \\\\";
    }

    latexMatrice += " \\end{pmatrix} \\]";

    document.getElementById("matrice").innerHTML = latexMatrice;
    MathJax.typeset();
}

//lire matrice
function lireMatrice() {
    const n = Number(document.getElementById("taille2").value);
    let matrice = [];

    for (let i = 0; i < n; i++) {
        let ligne = [];
        for (let j = 0; j < n; j++) {
            ligne.push(Number(document.getElementById(`a_${i}_${j}`).value));
        }
        matrice.push(ligne);
    }
    return matrice;
}

//calculer determinant avec Gauss
function determinantGauss(matrice) {
    const n = matrice.length;

    // Copie de la matrice pour ne pas modifier l'originale
    let A = matrice.map(row => row.slice());
    let det = 1;

    for (let i = 0; i < n; i++) {
    // Recherche d'un pivot non nul
        let pivot = i;
        while (pivot < n && Math.abs(A[pivot][i]) < 1e-12) {
            pivot++;
        }

    // Si tout le pivot est nul → déterminant = 0
        if (pivot === n) {
            return 0;
        }

    // Échange de lignes si nécessaire
        if (pivot !== i) {
            [A[i], A[pivot]] = [A[pivot], A[i]];
            det *= -1; // changement de signe
        }

        let pivotValue = A[i][i];
        det *= pivotValue;

    // Élimination de Gauss
        for (let j = i + 1; j < n; j++) {
            let factor = A[j][i] / pivotValue;
            for (let k = i; k < n; k++) {
                A[j][k] -= factor * A[i][k];
            }
        }
    }
    return det;
    
}



//afficher determinant
function afficherDeterminant() {
    const A = lireMatrice();              
    const d = determinantGauss(A);       
    document.getElementById("determinant").textContent = "Le déterminant de la matrice A est: " + d;
}


