/* Place your JavaScript in this file */
/*Opérations sur les matrices*/
  function lireMatrice(texte) {
    return texte.trim().split("\n").map(ligne =>
      ligne.trim().split(/\s+/).map(Number)
    );
  }

  function dimensionsEgales(A, B) {
    return A.length === B.length &&
           A[0].length === B[0].length;
  }

  function addition(A, B) {
    return A.map((ligne, i) =>
      ligne.map((val, j) => val + B[i][j])
    );
  }

  function soustraction(A, B) {
    return A.map((ligne, i) =>
      ligne.map((val, j) => val - B[i][j])
    );
  }

  function multiplication(A, B) {
    if (A[0].length !== B.length) return null;

    const res = Array.from(
      { length: A.length },
      () => Array(B[0].length).fill(0)
    );

    for (let i = 0; i < A.length; i++) {
      for (let j = 0; j < B[0].length; j++) {
        for (let k = 0; k < B.length; k++) {
          res[i][j] += A[i][k] * B[k][j];
        }
      }
    }
    return res;
  }

  function afficherMatrice(M) {
    return M.map(ligne => ligne.join(" ")).join("\n");
  }

  function calculer(operation) {
    const output = document.getElementById("resultat");
    try {
      const A = lireMatrice(document.getElementById("matrixA").value);
      const B = lireMatrice(document.getElementById("matrixB").value);
      let resultat;

      if (operation === "add") {
        if (!dimensionsEgales(A, B))
          throw "Les matrices doivent avoir les mêmes dimensions.";
        resultat = addition(A, B);
      }

      if (operation === "sub") {
        if (!dimensionsEgales(A, B))
          throw "Les matrices doivent avoir les mêmes dimensions.";
        resultat = soustraction(A, B);
      }

      if (operation === "mul") {
        resultat = multiplication(A, B);
        if (resultat === null)
          throw "Nombre de colonnes de A ≠ nombre de lignes de B.";
      }

      output.className = "";
      output.textContent = afficherMatrice(resultat);

    } catch (err) {
      output.className = "error";
      output.textContent = "Erreur : " + err;
    }
  }

/*déterminant d'une matrice */

 function createMatrix() {
  const n = parseInt(document.getElementById("size").value);
  if (n <= 0) {
    alert("Veuillez entrer un entier positif");
    return;
  }

  const container = document.getElementById("matrix");
  container.innerHTML = "";

  const table = document.createElement("table");

  for (let i = 0; i < n; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < n; j++) {
      const cell = document.createElement("td");
      const input = document.createElement("input");
      input.type = "number";
      input.step = "any";
      cell.appendChild(input);
      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  container.appendChild(table);
 }

// Calcul du déterminant par élimination de Gauss
 function determinant(A) {
  const n = A.length;
  let det = 1;

  // Copie de la matrice
  let M = A.map(row => row.slice());

  for (let i = 0; i < n; i++) {
    // Recherche pivot
    let pivot = i;
    while (pivot < n && M[pivot][i] === 0) pivot++;

    if (pivot === n) return 0;

    if (pivot !== i) {
      [M[i], M[pivot]] = [M[pivot], M[i]];
      det *= -1;
    }

    det *= M[i][i];

    for (let j = i + 1; j < n; j++) {
      let factor = M[j][i] / M[i][i];
      for (let k = i; k < n; k++) {
        M[j][k] -= factor * M[i][k];
      }
    }
  }

  return det;
 }
 function computeDeterminant() {
  const table = document.querySelector("#matrix table");
  if (!table) return;

  const n = table.rows.length;
  let matrix = [];

  try {
    for (let i = 0; i < n; i++) {
      matrix[i] = [];
      for (let j = 0; j < n; j++) {
        const value = table.rows[i].cells[j].firstChild.value;
        if (value === "") throw "Toutes les cases doivent être remplies";
        matrix[i][j] = parseFloat(value);
      }
    }

    const det = determinant(matrix);
    document.getElementById("result").textContent =
      "Résultat : det(A) = " + det.toPrecision(2);

  } catch (e) {
    alert("Erreur : " + e);
  }
 }
 
// Résolution de systèmes linéaires par la méthode de Gauss

  function lireMatrice(texte) {
    return texte.trim().split("\n").map(ligne =>
      ligne.trim().split(/\s+/).map(Number)
    );
  }

  function resoudreSysteme(A, B) {
    const n = A.length;
    let M = A.map((ligne, i) => [...ligne, B[i]]);

    for (let i = 0; i < n; i++) {
      let pivot = M[i][i];

      if (pivot === 0) {
        for (let k = i + 1; k < n; k++) {
          if (M[k][i] !== 0) {
            [M[i], M[k]] = [M[k], M[i]];
            pivot = M[i][i];
            break;
          }
        }
      }

      if (pivot === 0) {
        return null; // pas de solution unique
      }

      for (let j = i; j <= n; j++) {
        M[i][j] /= pivot;
      }

      for (let k = 0; k < n; k++) {
        if (k !== i) {
          let facteur = M[k][i];
          for (let j = i; j <= n; j++) {
            M[k][j] -= facteur * M[i][j];
          }
        }
      }
    }

    return M.map(ligne => ligne[n]);
  }

  function resoudre() {
    const output = document.getElementById("resultat");
    try {
      const A = lireMatrice(document.getElementById("matA").value);
      const B = lireMatrice(document.getElementById("vectB").value);

      if (A.length !== B.length)
        throw "Le nombre d’équations doit correspondre aux constantes.";

      const solution = resoudreSysteme(A, B);

      if (!solution)
        throw "Le système n’admet pas de solution unique.";

      let texte = solution
        .map((val, i) => `x${i + 1} = ${val.toFixed(3)}`)
        .join("\n");

      output.className = "";
      output.textContent = texte;

    } catch (err) {
      output.className = "error";
      output.textContent = "Erreur : " + err;
    }
  }

//Méthode su simplexe pour l'optimisation linéaire
function lireVecteur(txt) {
  return txt.trim().split(/\s+/).map(Number);
}

function lireMatrice(txt) {
  return txt.trim().split("\n").map(l =>
    l.trim().split(/\s+/).map(Number)
  );
}

function simplex(c, A, b) {
  const m = A.length;
  const n = c.length;
  let tableau = [];

  // Contraintes + variables d'écart
  for (let i = 0; i < m; i++) {
    tableau[i] = [...A[i]];
    for (let j = 0; j < m; j++)
      tableau[i].push(i === j ? 1 : 0);
    tableau[i].push(b[i]);
  }

  // Fonction objectif
  let Z = c.map(v => -v);
  for (let i = 0; i < m + 1; i++) Z.push(0);
  tableau.push(Z);

  // Itérations
  while (true) {
    let last = tableau[m];
    let pivotCol = last.slice(0, -1).findIndex(v => v < 0);
    if (pivotCol === -1) break;

    let ratios = tableau.slice(0, m)
      .map(row => row[pivotCol] > 0
        ? row[row.length - 1] / row[pivotCol]
        : Infinity);

    let pivotRow = ratios.indexOf(Math.min(...ratios));
    let pivot = tableau[pivotRow][pivotCol];

    tableau[pivotRow] = tableau[pivotRow].map(v => v / pivot);

    for (let i = 0; i <= m; i++) {
      if (i !== pivotRow) {
        let f = tableau[i][pivotCol];
        tableau[i] = tableau[i].map(
          (v, j) => v - f * tableau[pivotRow][j]
        );
      }
    }
  }

  // Lecture solution
  let sol = Array(n).fill(0);
  for (let j = 0; j < n; j++) {
    let col = tableau.map(r => r[j]);
    if (col.filter(v => v === 1).length === 1) {
      let i = col.indexOf(1);
      sol[j] = tableau[i][tableau[i].length - 1];
    }
  }

  const valeurZ = tableau[m][tableau[0].length - 1];
  return { sol, valeurZ };
}

function resoudre() {
  const result = document.getElementById("resultat");
  try {
    const c = lireVecteur(document.getElementById("objective").value);
    const A = lireMatrice(document.getElementById("matrixA").value);
    const b = lireVecteur(document.getElementById("vectorB").value);

    if (A.length !== b.length)
      throw "Nombre de contraintes incohérent.";

    const r = simplex(c, A, b);

    let txt = "Solution optimale :\n";
    r.sol.forEach((v, i) =>
      txt += `x${i + 1} = ${v.toFixed(3)}\n`
    );
    txt += `\nValeur optimale Z = ${r.valeurZ.toFixed(3)}`;

    result.className = "";
    result.textContent = txt;
  } catch (e) {
    result.className = "error";
    result.textContent = "Erreur : " + e;
  }
}
