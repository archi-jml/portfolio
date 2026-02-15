# 🚀 DÉMARRAGE RAPIDE

## En 5 Minutes

### 1. Téléchargez le Site
Téléchargez tous les fichiers du site sur votre ordinateur.

### 2. Personnalisez Votre Contenu

**a) Ajoutez votre photo de profil**
- Remplacez `images/profile/photo.jpg` par votre photo

**b) Modifiez vos informations**
- Ouvrez `index.html` avec un éditeur de texte (Notepad, TextEdit, ou VS Code)
- Cherchez et remplacez :
  - Section "Qui suis-je ?" (ligne ~85)
  - Section "CV" (ligne ~115)
  - Section "Contact" (ligne ~155) : email, téléphone, localisation

**c) Ajoutez vos projets**
- Mettez vos images de projets dans `images/projects/nom-du-projet/`
- Modifiez `data/projects.json` (suivez les exemples)

### 3. Testez Localement
- Double-cliquez sur `index.html`
- Le site s'ouvre dans votre navigateur
- Vérifiez que tout fonctionne

### 4. Publiez sur GitHub Pages

1. Créez un compte sur [github.com](https://github.com)
2. Créez un nouveau repository (bouton "+")
3. Uploadez tous vos fichiers
4. Allez dans Settings > Pages
5. Sélectionnez "main" et "/" puis cliquez Save

**Votre site sera en ligne en 2-3 minutes ! 🎉**

---

## 📋 Checklist Avant Publication

- [ ] Photo de profil ajoutée
- [ ] Informations personnelles modifiées (À propos, CV, Contact)
- [ ] Au moins 3-4 projets ajoutés avec images
- [ ] Testé le site en local
- [ ] Vérifié que toutes les images s'affichent
- [ ] Vérifié le formulaire de contact

---

## 🎨 Personnalisation Facile

### Changer les Couleurs
Ouvrez `css/style.css` et modifiez les lignes 8-12 :
```css
--color-accent: #b8866f;  ← Changez cette couleur
```

### Changer le Titre
Dans `index.html`, ligne ~30, modifiez :
```html
<span class="hero-title-line">Architecture</span>
<span class="hero-title-line">& Design</span>
```

---

## 💡 Exemples de Modifications Courantes

### Ajouter un Projet
1. Créez un dossier : `images/projects/mon-nouveau-projet/`
2. Ajoutez vos images dedans
3. Ouvrez `data/projects.json`
4. Copiez un projet existant
5. Modifiez les informations
6. Uploadez sur GitHub

### Modifier les Couleurs
`css/style.css` → lignes 8-14

### Modifier le Texte "À propos"
`index.html` → lignes 85-105

---

## 🆘 Problèmes Fréquents

**Les images ne s'affichent pas ?**
→ Vérifiez les chemins dans `projects.json`

**Le JSON ne marche pas ?**
→ Vérifiez sur [jsonlint.com](https://jsonlint.com/)

**Le site ne se met pas à jour ?**
→ Attendez 2-3 minutes et videz le cache (Ctrl+F5)

---

**Pour plus de détails, consultez le README.md complet**
