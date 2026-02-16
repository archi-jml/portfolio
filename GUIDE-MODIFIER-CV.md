# 📋 GUIDE : Modifier Votre CV Facilement

## 🎯 Système Modulaire

Votre CV est maintenant **100% modulaire** ! Toutes les données sont dans le fichier :
```
data/cv.json
```

**Pour ajouter/modifier** : Éditez simplement ce fichier JSON !

---

## ✏️ Comment Ajouter des Éléments

### 1️⃣ Ajouter une Expérience Professionnelle

**Ouvrez `data/cv.json`** et dans la section `"experiences"`, ajoutez :

```json
{
  "periode": "Mars - Juin 2026",
  "poste": "Architecte Junior",
  "entreprise": "Cabinet XYZ",
  "lieu": "Lyon, France",
  "description": "Mission spécifique et responsabilités"
}
```

**⚠️ N'oubliez pas la virgule** avant ou après (selon la position) !

**Exemple complet :**
```json
"experiences": [
  {
    "periode": "Août 2025 - Présent",
    "poste": "Architecte Freelance",
    "entreprise": "",
    "lieu": "",
    "description": "Projets variés en indépendant"
  },
  {
    "periode": "Mars - Juin 2026",
    "poste": "Architecte Junior",
    "entreprise": "Cabinet XYZ",
    "lieu": "Lyon, France",
    "description": "Mission spécifique"
  }
]
```

---

### 2️⃣ Ajouter une Formation

Dans la section `"formations"` :

```json
{
  "periode": "2026",
  "diplome": "Formation BIM",
  "etablissement": "Organisme de formation",
  "mention": "",
  "details": "Spécialisation BIM avancé"
}
```

**Avec mention :**
```json
{
  "periode": "2026",
  "diplome": "Master Spécialisé",
  "etablissement": "École d'Architecture",
  "mention": "Mention Très Bien",
  "details": "Architecture durable"
}
```

---

### 3️⃣ Ajouter un Logiciel (avec jauge)

Dans la section `"logiciels"` :

```json
{
  "nom": "Revit",
  "niveau": 8,
  "categorie": "BIM"
}
```

**Les niveaux :**
- `0` = Aucune jauge (juste connaissance)
- `1-3` = Débutant
- `4-6` = Intermédiaire
- `7-8` = Avancé
- `9-10` = Expert

**Catégories existantes :**
- "BIM"
- "Modélisation"
- "Rendu 3D"
- "Adobe"
- "CAO"
- "Design Paramétrique"
- "SIG"
- "Analyse Climatique"
- "Paysage"
- "Autres"

**Logiciel sans jauge (connaissance) :**
```json
{
  "nom": "Enscape",
  "niveau": 0,
  "categorie": "Rendu 3D",
  "note": "Notions de base"
}
```

---

### 4️⃣ Ajouter une Langue

Dans la section `"langues"` :

```json
{
  "langue": "Italien",
  "niveau": "Notions"
}
```

**Niveaux suggérés :**
- "Natif"
- "Bilingue"
- "Excellent"
- "Courant"
- "Intermédiaire"
- "Notions"

---

### 5️⃣ Ajouter un Centre d'Intérêt

Dans la section `"interets"`, ajoutez simplement :

```json
"interets": [
  "Méditation Vipassana",
  "Voyage",
  "Sports de plein air",
  "Yoga",
  "Acroyoga",
  "Photographie"  ← Nouveau !
]
```

---

## 🗑️ Supprimer des Éléments

**Pour supprimer :** Enlevez le bloc complet entre `{` et `}`

**Exemple - Supprimer une expérience :**

**Avant :**
```json
"experiences": [
  {
    "periode": "2024",
    "poste": "Stage XYZ",
    ...
  },
  {
    "periode": "2023",
    "poste": "Stage ABC",  ← Je veux supprimer ça
    ...
  },
  {
    "periode": "2022",
    "poste": "Stage DEF",
    ...
  }
]
```

**Après :**
```json
"experiences": [
  {
    "periode": "2024",
    "poste": "Stage XYZ",
    ...
  },
  {
    "periode": "2022",
    "poste": "Stage DEF",
    ...
  }
]
```

**⚠️ Attention aux virgules !**

---

## 🎨 Modifier les Informations Personnelles

En haut du fichier `cv.json` :

```json
"info_perso": {
  "nom": "Jules Manucci-Lasnon",
  "date_naissance": "17 août 1997",
  "lieu_naissance": "Ventavon (05)",
  "vehicule": true,
  "equipement": "Poste de travail portable et licences logicielles personnelles"
}
```

**Champs modifiables :**
- `nom` : Votre nom complet
- `date_naissance` : Date
- `lieu_naissance` : Lieu
- `vehicule` : `true` ou `false`
- `equipement` : Texte libre

---

## 📊 Ordre d'Affichage

### Expériences et Formations
Affichées **dans l'ordre du JSON** (de haut en bas)

→ Mettez les plus récentes en haut !

### Logiciels
Affichés **triés automatiquement par niveau** (du plus haut au plus bas)

→ Pas besoin de les ordonner manuellement !

---

## ✅ Vérifier Votre JSON

**Après chaque modification :**

1. Copiez tout le contenu de `cv.json`
2. Allez sur [JSONLint.com](https://jsonlint.com/)
3. Collez et cliquez "Validate JSON"
4. Si erreur → Corrigez
5. Si ✅ → C'est bon !

**Erreurs fréquentes :**
- Virgule manquante entre les éléments
- Virgule en trop après le dernier élément
- Guillemets mal fermés
- Accolade `}` ou crochet `]` manquant

---

## 🎯 Exemple : Ajouter 3 Nouveaux Logiciels

**Fichier actuel :**
```json
"logiciels": [
  {
    "nom": "Lumion",
    "niveau": 10,
    "categorie": "Rendu 3D"
  },
  {
    "nom": "Rhinocéros 3D",
    "niveau": 9,
    "categorie": "Modélisation"
  }
]
```

**Après ajout :**
```json
"logiciels": [
  {
    "nom": "Lumion",
    "niveau": 10,
    "categorie": "Rendu 3D"
  },
  {
    "nom": "Rhinocéros 3D",
    "niveau": 9,
    "categorie": "Modélisation"
  },
  {
    "nom": "Revit",
    "niveau": 7,
    "categorie": "BIM"
  },
  {
    "nom": "Enscape",
    "niveau": 8,
    "categorie": "Rendu 3D"
  },
  {
    "nom": "V-Ray",
    "niveau": 6,
    "categorie": "Rendu 3D"
  }
]
```

---

## 🎨 Personnaliser l'Apparence des Jauges

**Dans `css/style.css`, trouvez :**

```css
.cv-skill-fill {
    background: linear-gradient(90deg, var(--color-accent), #d4a589);
}
```

**Changez les couleurs :**

**Dégradé bleu :**
```css
background: linear-gradient(90deg, #3498db, #5dade2);
```

**Dégradé vert :**
```css
background: linear-gradient(90deg, #27ae60, #2ecc71);
```

**Couleur unie :**
```css
background: var(--color-accent);
```

**Hauteur de la jauge :**
```css
.cv-skill-bar {
    height: 6px;  /* Changez cette valeur */
}
```

---

## 🚀 Workflow de Mise à Jour

### Méthode 1 : Sur GitHub (Web)

1. Allez sur votre repository GitHub
2. Naviguez vers `data/cv.json`
3. Cliquez sur le **crayon ✏️** (Edit)
4. Faites vos modifications
5. Vérifiez sur JSONLint si doute
6. "Commit changes" en bas
7. Attendez 1-2 minutes
8. Actualisez votre site (Ctrl+F5)
9. **CV mis à jour !** ✅

### Méthode 2 : Avec GitHub Desktop

1. Ouvrez le fichier `data/cv.json` localement
2. Modifiez avec VS Code / Notepad++
3. Sauvegardez
4. GitHub Desktop détecte le changement
5. Commit + Push
6. Attendez 1-2 minutes
7. **CV mis à jour !** ✅

---

## 💡 Templates Prêts à Copier

### Template Expérience

```json
{
  "periode": "DATES",
  "poste": "VOTRE POSTE",
  "entreprise": "NOM ENTREPRISE",
  "lieu": "VILLE, PAYS",
  "description": "Description de vos missions et réalisations"
}
```

### Template Formation

```json
{
  "periode": "DATES",
  "diplome": "NOM DU DIPLÔME",
  "etablissement": "NOM ÉTABLISSEMENT",
  "mention": "Mention Très Bien",
  "details": "Détails complémentaires"
}
```

### Template Logiciel avec Jauge

```json
{
  "nom": "NOM LOGICIEL",
  "niveau": 7,
  "categorie": "CATÉGORIE"
}
```

### Template Logiciel sans Jauge

```json
{
  "nom": "NOM LOGICIEL",
  "niveau": 0,
  "categorie": "CATÉGORIE",
  "note": "Notions / Connaissance / En apprentissage"
}
```

---

## 🎓 Astuces Avancées

### Grouper les Logiciels par Catégorie

Les logiciels sont automatiquement triés par niveau, mais vous pouvez influencer l'affichage :

**Astuce :** Mettez des niveaux similaires pour garder une catégorie ensemble.

### Mettre en Valeur une Mention

Les mentions (comme "Mention Très Bien") apparaissent dans un badge coloré automatiquement.

### Ajouter des Détails Riches

Dans le champ `description`, vous pouvez :
- Lister plusieurs responsabilités
- Ajouter des réalisations concrètes
- Mentionner des outils utilisés

---

## 📱 Responsive

Le CV s'adapte automatiquement :
- **Desktop** : 2 colonnes (Exp + Formation)
- **Tablette** : 1 colonne
- **Mobile** : 1 colonne optimisée

Pas besoin de configuration !

---

## 🆘 Dépannage

### Le CV ne s'affiche pas

1. **Console du navigateur** (F12)
2. Cherchez : "Erreur lors du chargement du CV"
3. Vérifiez que `data/cv.json` existe
4. Validez le JSON sur JSONLint

### Les jauges ne s'animent pas

1. Scrollez jusqu'à la section Logiciels
2. Les jauges s'animent quand elles apparaissent à l'écran
3. Si toujours pas : Actualisez (Ctrl+F5)

### Erreur après modification

1. Vérifiez le JSON sur JSONLint
2. Erreur fréquente : virgule oubliée ou en trop
3. Comparez avec l'exemple fourni

---

## ✅ Checklist Avant de Publier

- [ ] Toutes les dates sont correctes
- [ ] Les niveaux de logiciels sont honnêtes
- [ ] Le JSON est valide (JSONLint)
- [ ] Testé en local ou sur GitHub Pages
- [ ] Les jauges s'affichent correctement
- [ ] Pas de fautes d'orthographe

---

## 🎉 Résumé

**Pour ajouter un élément :**
1. Ouvrez `data/cv.json`
2. Trouvez la bonne section
3. Copiez un exemple existant
4. Modifiez les valeurs
5. Attention aux virgules !
6. Validez sur JSONLint
7. Commit + Push
8. Attendez 1-2 min → Mis à jour ! ✅

**C'est aussi simple que ça !** 🚀

Aucune connaissance en code nécessaire, juste copier-coller et modifier les textes !
