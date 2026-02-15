# Portfolio Architecture - Site Statique

Portfolio minimaliste et élégant pour architecte, déployable sur GitHub Pages.

## 📁 Structure du Projet

```
portfolio/
├── index.html              # Page d'accueil avec les 4 sections
├── project.html            # Template pour les pages de détail projet
├── css/
│   └── style.css          # Styles du site
├── js/
│   ├── main.js            # Script principal (page d'accueil)
│   └── project.js         # Script page détail projet
├── data/
│   └── projects.json      # Données des projets (FICHIER À MODIFIER)
├── images/
│   ├── projects/          # Dossier pour les images de projets
│   │   ├── maison-contemporaine/
│   │   │   ├── thumb.jpg
│   │   │   ├── image1.jpg
│   │   │   └── ...
│   │   └── ...
│   └── profile/
│       └── photo.jpg      # Votre photo de profil
└── README.md
```

## 🚀 Déploiement sur GitHub Pages

### Étape 1 : Créer un compte GitHub

1. Allez sur [github.com](https://github.com)
2. Cliquez sur "Sign up" et créez votre compte
3. Confirmez votre email

### Étape 2 : Créer un nouveau repository

1. Une fois connecté, cliquez sur le bouton "+" en haut à droite
2. Sélectionnez "New repository"
3. Nommez votre repository (ex: `mon-portfolio`)
4. Sélectionnez "Public"
5. Cliquez sur "Create repository"

### Étape 3 : Uploader vos fichiers

**Option A - Via l'interface web (plus simple) :**

1. Sur la page de votre repository, cliquez sur "uploading an existing file"
2. Glissez-déposez TOUS les fichiers et dossiers de votre site
3. Attendez que l'upload soit terminé
4. Ajoutez un message de commit (ex: "Premier upload du portfolio")
5. Cliquez sur "Commit changes"

**Option B - Via GitHub Desktop (recommandé pour les mises à jour fréquentes) :**

1. Téléchargez [GitHub Desktop](https://desktop.github.com/)
2. Connectez-vous avec votre compte GitHub
3. Clonez votre repository
4. Copiez tous les fichiers du site dans le dossier cloné
5. Dans GitHub Desktop, ajoutez un message de commit
6. Cliquez sur "Commit to main" puis "Push origin"

### Étape 4 : Activer GitHub Pages

1. Dans votre repository sur GitHub, allez dans "Settings"
2. Dans le menu de gauche, cliquez sur "Pages"
3. Sous "Source", sélectionnez "main" (ou "master")
4. Sélectionnez la racine "/" (root)
5. Cliquez sur "Save"
6. Attendez 2-3 minutes

Votre site sera accessible à l'adresse :
```
https://votre-nom-utilisateur.github.io/nom-du-repository/
```

## ✏️ Comment Ajouter ou Modifier un Projet

### Méthode Simple (sans code)

Tous les projets sont définis dans le fichier `data/projects.json`. Vous n'avez qu'à modifier ce fichier pour ajouter, supprimer ou modifier des projets.

### Ajouter un Nouveau Projet

1. **Préparez vos images :**
   - Créez un dossier dans `images/projects/` avec le nom de votre projet (ex: `villa-moderne`)
   - Ajoutez vos images dans ce dossier :
     - `thumb.jpg` : image miniature (recommandé : 800x1000px)
     - `image1.jpg`, `image2.jpg`, etc. : images pour la galerie

2. **Modifiez le fichier `data/projects.json` :**

   Ouvrez le fichier et ajoutez votre projet dans la liste. Voici un exemple :

   ```json
   {
     "id": "villa-moderne",
     "title": "Villa Moderne",
     "context": "Résidentiel",
     "year": "2024",
     "shortDescription": "Villa contemporaine avec piscine à débordement.",
     "thumbnail": "images/projects/villa-moderne/thumb.jpg",
     "images": [
       "images/projects/villa-moderne/image1.jpg",
       "images/projects/villa-moderne/image2.jpg",
       "images/projects/villa-moderne/image3.jpg"
     ],
     "longDescription": "<p>Description détaillée du projet...</p><p>Vous pouvez ajouter plusieurs paragraphes.</p>"
   }
   ```

3. **Explication des champs :**

   - `id` : Identifiant unique (utilisez des lettres minuscules et tirets, sans espaces)
   - `title` : Titre du projet
   - `context` : Type de projet (Résidentiel, Commercial, Rénovation, etc.)
   - `year` : Année de réalisation
   - `shortDescription` : Description courte (1 phrase)
   - `thumbnail` : Chemin vers l'image miniature
   - `images` : Liste des chemins vers les images de la galerie
   - `longDescription` : Description longue avec HTML (utilisez `<p>` pour les paragraphes)

4. **Uploadez vos modifications sur GitHub :**
   - Soit via l'interface web : allez sur le fichier, cliquez sur le crayon pour éditer, faites vos modifications, puis "Commit changes"
   - Soit via GitHub Desktop : modifiez le fichier localement, committez et pushez

### Modifier un Projet Existant

Ouvrez `data/projects.json` et modifiez directement les informations du projet concerné.

### Supprimer un Projet

Dans `data/projects.json`, supprimez l'entrée complète du projet (de `{` à `}`), en faisant attention à ne pas casser la structure JSON.

## 🎨 Personnaliser le Site

### Modifier les Informations Personnelles

1. **Photo de profil :** Remplacez `images/profile/photo.jpg` par votre photo
2. **Section "Qui suis-je ?" :** Éditez `index.html`, section `section-about`
3. **CV :** Éditez `index.html`, section `section-cv`
4. **Contact :** Éditez `index.html`, section `section-contact`

### Modifier les Couleurs

Ouvrez `css/style.css` et modifiez les variables CSS au début du fichier :

```css
:root {
    --color-bg: #fafaf8;        /* Couleur de fond */
    --color-text: #1a1a1a;      /* Couleur du texte */
    --color-accent: #b8866f;    /* Couleur d'accent */
    /* ... */
}
```

### Modifier le Titre du Site

Dans `index.html`, changez le contenu de la balise `<title>` et le texte dans la section `.hero`.

## 📧 Configuration du Formulaire de Contact

Le formulaire de contact actuel affiche simplement une alerte. Pour qu'il envoie vraiment des emails, vous avez plusieurs options :

### Option 1 : Formspree (Gratuit et Simple)

1. Allez sur [formspree.io](https://formspree.io/)
2. Créez un compte gratuit
3. Créez un nouveau formulaire
4. Copiez l'URL fournie
5. Dans `index.html`, remplacez `<form class="contact-form" id="contact-form">` par :
   ```html
   <form class="contact-form" action="VOTRE_URL_FORMSPREE" method="POST">
   ```
6. Supprimez `id="contact-form"`

### Option 2 : EmailJS (Gratuit jusqu'à 200 emails/mois)

1. Créez un compte sur [emailjs.com](https://www.emailjs.com/)
2. Suivez leur documentation pour configurer le service
3. Ajoutez leur SDK dans votre HTML

### Option 3 : Netlify Forms (si vous hébergez sur Netlify)

Ajoutez simplement `netlify` dans la balise form :
```html
<form class="contact-form" name="contact" method="POST" data-netlify="true">
```

## 🖼️ Conseils pour les Images

### Dimensions Recommandées

- **Images miniatures (thumbnails) :** 800x1000px (ratio 4:5)
- **Images de galerie :** 1920x1280px maximum
- **Photo de profil :** 800x1000px (ratio 4:5)

### Optimisation

Pour de meilleures performances, optimisez vos images avant de les uploader :
- Utilisez des outils en ligne comme [TinyPNG](https://tinypng.com/) ou [Squoosh](https://squoosh.app/)
- Format JPEG pour les photos, PNG pour les graphiques
- Qualité 80-85% pour un bon compromis poids/qualité

### Nommage

Utilisez des noms de fichiers simples sans espaces ni caractères spéciaux :
- ✅ `villa-moderne-facade.jpg`
- ❌ `Villa Moderne - Façade (2024).jpg`

## 🔧 Dépannage

### Les projets ne s'affichent pas

- Vérifiez que `data/projects.json` est bien formaté (utilisez [JSONLint](https://jsonlint.com/))
- Vérifiez que les chemins d'images sont corrects
- Ouvrez la console du navigateur (F12) pour voir les erreurs

### Les images ne s'affichent pas

- Vérifiez que les chemins dans `projects.json` correspondent exactement aux fichiers
- Vérifiez que les images sont bien uploadées sur GitHub
- Les chemins sont sensibles à la casse (majuscules/minuscules)

### Le site ne se met pas à jour

- Attendez 2-3 minutes après un commit
- Videz le cache de votre navigateur (Ctrl+F5)
- Vérifiez que GitHub Pages est bien activé dans Settings > Pages

## 📱 Responsive Design

Le site est automatiquement adapté aux mobiles et tablettes. Pas besoin de configuration supplémentaire.

## 🆘 Besoin d'Aide ?

- Vérifiez la console du navigateur (touche F12) pour les erreurs
- Consultez la [documentation GitHub Pages](https://docs.github.com/en/pages)
- Vérifiez que votre fichier JSON est valide sur [JSONLint](https://jsonlint.com/)

## 📄 Licence

Ce site est libre d'utilisation pour votre portfolio personnel.

---

**Astuce :** Faites régulièrement des sauvegardes de votre dossier `data/projects.json` avant de le modifier !
