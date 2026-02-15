# 🏛️ Portfolio Architecture - Site Statique

## 📦 Contenu du Package

Vous venez de recevoir un site portfolio complet, prêt à être déployé sur GitHub Pages !

---

## 🗂️ Structure des Fichiers

```
portfolio/
│
├── 📄 index.html                  # Page d'accueil (4 sections)
├── 📄 project.html                # Template page détail projet
│
├── 📁 css/
│   └── style.css                  # Tous les styles du site
│
├── 📁 js/
│   ├── main.js                    # Script page d'accueil
│   └── project.js                 # Script page projet
│
├── 📁 data/
│   └── projects.json              # ⭐ FICHIER À MODIFIER pour vos projets
│
├── 📁 images/
│   ├── README.md                  # Guide d'organisation des images
│   ├── profile/                   # Votre photo de profil
│   └── projects/                  # Images de vos projets
│       ├── maison-contemporaine/
│       ├── renovation-loft/
│       ├── batiment-bureaux/
│       └── extension-villa/
│
└── 📚 DOCUMENTATION
    ├── README.md                  # Guide complet (LIRE EN PREMIER)
    ├── DEMARRAGE-RAPIDE.md        # 🚀 Démarrage en 5 minutes
    ├── TEMPLATE-PROJET.md         # Template pour ajouter un projet
    └── DEPANNAGE.md               # Solutions aux problèmes courants
```

---

## 🚀 Par Où Commencer ?

### Pour un démarrage ultra-rapide (5 min) :
➡️ **Lisez `DEMARRAGE-RAPIDE.md`**

### Pour un guide complet :
➡️ **Lisez `README.md`**

### En cas de problème :
➡️ **Consultez `DEPANNAGE.md`**

---

## ✨ Caractéristiques du Site

### ✅ Ce qui est inclus :

- **Design épuré et moderne** adapté à l'architecture
- **Responsive** (mobile, tablette, desktop)
- **Animations subtiles** et professionnelles
- **Système modulaire** via JSON (facile à maintenir)
- **4 sections** : Projets, À propos, CV, Contact
- **Pages détail** pour chaque projet avec galerie
- **Prêt pour GitHub Pages** (gratuit)
- **Aucune dépendance** externe (fonctionne partout)

### 🎨 Design Features :

- Typographie distinctive (Cormorant Garamond + Work Sans)
- Palette de couleurs architecturale
- Grille forte et espaces généreux
- Transitions fluides
- Images optimisées avec fallbacks

---

## 🎯 Les 3 Étapes Essentielles

### 1️⃣ Personnalisez votre contenu
- Modifiez `data/projects.json` avec vos projets
- Ajoutez vos images dans `images/`
- Éditez `index.html` pour vos infos personnelles

### 2️⃣ Testez localement
- Double-cliquez sur `index.html`
- Vérifiez que tout fonctionne

### 3️⃣ Publiez sur GitHub Pages
- Créez un compte GitHub
- Uploadez vos fichiers
- Activez GitHub Pages
- Votre site sera en ligne !

---

## 📝 Fichiers à Personnaliser

### 🔴 OBLIGATOIRE (pour que le site fonctionne) :

1. **`data/projects.json`**
   - Ajoutez vos projets
   - Suivez les exemples fournis
   - Utilisez `TEMPLATE-PROJET.md` comme guide

2. **`images/projects/`**
   - Ajoutez vos images de projets
   - 1 dossier par projet
   - Voir `images/README.md` pour les consignes

3. **`images/profile/photo.jpg`**
   - Votre photo de profil

### 🟡 RECOMMANDÉ (pour personnaliser) :

4. **`index.html`**
   - Section "Qui suis-je ?" (ligne ~85)
   - Section "CV" (ligne ~115)
   - Section "Contact" (ligne ~155)

### 🟢 OPTIONNEL (si vous voulez customiser) :

5. **`css/style.css`**
   - Variables de couleur (lignes 8-14)
   - Uniquement si vous voulez changer les couleurs

---

## 🔑 Fichiers Techniques (Ne Pas Modifier)

- `index.html` (structure) - OK de modifier le CONTENU, pas la structure
- `project.html` - Ne pas toucher
- `js/main.js` - Ne pas toucher
- `js/project.js` - Ne pas toucher
- `css/style.css` - OK de modifier les couleurs uniquement

---

## 💡 Conseils Importants

### ✅ DO (À FAIRE) :

- Testez toujours en local avant d'uploader
- Validez votre JSON sur jsonlint.com
- Optimisez vos images (< 1MB)
- Faites des sauvegardes de `projects.json`
- Lisez les guides avant de modifier

### ❌ DON'T (À ÉVITER) :

- Ne modifiez pas la structure HTML
- N'utilisez pas d'espaces dans les noms de fichiers
- Ne supprimez pas les fichiers JS ou CSS
- N'oubliez pas les virgules dans le JSON
- Ne uploadez pas d'images géantes (> 5MB)

---

## 📚 Documentation Fournie

| Fichier | Contenu | Quand le lire |
|---------|---------|---------------|
| **README.md** | Guide complet et détaillé | Premier déploiement |
| **DEMARRAGE-RAPIDE.md** | Mise en route rapide | Maintenant ! |
| **TEMPLATE-PROJET.md** | Template pour projets | Quand vous ajoutez un projet |
| **DEPANNAGE.md** | Solutions aux problèmes | Si quelque chose ne marche pas |
| **images/README.md** | Organisation des images | Avant d'ajouter des images |

---

## 🎓 Niveau de Compétence Requis

**AUCUNE compétence en code nécessaire !**

Vous aurez juste besoin de :
- Savoir éditer un fichier texte
- Savoir uploader des fichiers
- Savoir copier-coller

Le reste est déjà fait pour vous !

---

## 🌐 Déploiement GitHub Pages

Le site est **100% compatible** avec GitHub Pages :
- ✅ Pas de serveur nécessaire
- ✅ Hébergement gratuit
- ✅ HTTPS automatique
- ✅ Nom de domaine personnalisé possible
- ✅ Mise à jour instantanée

---

## 🆘 Besoin d'Aide ?

1. **Consultez d'abord** `DEPANNAGE.md`
2. **Vérifiez** votre JSON sur [jsonlint.com](https://jsonlint.com/)
3. **Regardez** la console du navigateur (F12)
4. **Attendez** 2-3 minutes après chaque commit

---

## 📈 Prochaines Étapes

1. ✅ Lisez `DEMARRAGE-RAPIDE.md`
2. ✅ Personnalisez votre contenu
3. ✅ Testez en local
4. ✅ Déployez sur GitHub Pages
5. ✅ Partagez votre portfolio ! 🎉

---

## 📄 Licence

Ce site est libre d'utilisation pour votre portfolio personnel.

---

**🎯 Objectif : Avoir votre site en ligne en moins de 30 minutes !**

Bon courage ! 🚀
