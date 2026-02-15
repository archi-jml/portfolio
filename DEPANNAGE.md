# 🔧 Guide de Dépannage

## Problèmes Courants et Solutions

### 1. Les Projets Ne S'Affichent Pas

#### Symptômes
- La page se charge mais la grille de projets est vide
- Message "Erreur lors du chargement des projets"

#### Solutions

**A) Vérifiez le fichier JSON**
1. Ouvrez votre fichier `data/projects.json`
2. Copiez tout son contenu
3. Allez sur [JSONLint.com](https://jsonlint.com/)
4. Collez votre code et cliquez "Validate JSON"
5. Si des erreurs apparaissent, corrigez-les :
   - Virgules manquantes ou en trop
   - Guillemets mal fermés
   - Accolades mal fermées

**B) Vérifiez la console du navigateur**
1. Ouvrez votre site
2. Appuyez sur F12 (ou Ctrl+Shift+I / Cmd+Option+I sur Mac)
3. Cliquez sur l'onglet "Console"
4. Recherchez les messages d'erreur en rouge

**C) Erreurs JSON Fréquentes**

❌ **Virgule en trop après le dernier élément**
```json
{
  "projects": [
    {...},
    {...},  ← Cette virgule va causer une erreur
  ]
}
```

✅ **Correct**
```json
{
  "projects": [
    {...},
    {...}   ← Pas de virgule
  ]
}
```

---

### 2. Les Images Ne S'Affichent Pas

#### Symptômes
- Carrés gris à la place des images
- Message "Image X" dans un rectangle gris

#### Solutions

**A) Vérifiez les chemins dans projects.json**

Les chemins sont SENSIBLES À LA CASSE. `Image1.jpg` ≠ `image1.jpg`

✅ **Correct**
```json
"thumbnail": "images/projects/maison-moderne/thumb.jpg"
```

❌ **Incorrect**
```json
"thumbnail": "Images/Projects/Maison-Moderne/Thumb.JPG"
```

**B) Vérifiez que les fichiers sont bien uploadés**
1. Allez sur votre repository GitHub
2. Naviguez dans les dossiers
3. Vérifiez que les images sont présentes
4. Vérifiez les noms de fichiers EXACTS

**C) Vérifiez les formats d'image**
- Formats supportés : `.jpg`, `.jpeg`, `.png`, `.webp`
- Évitez les formats exotiques

---

### 3. Le Site Ne Se Met Pas à Jour

#### Symptômes
- Vous avez modifié le site mais les changements n'apparaissent pas
- La version affichée est ancienne

#### Solutions

**A) Videz le cache du navigateur**

**Chrome/Edge :**
- Windows : Ctrl+Shift+Delete
- Mac : Cmd+Shift+Delete
- Ou appuyez sur Ctrl+F5 (Cmd+Shift+R sur Mac)

**Firefox :**
- Windows : Ctrl+Shift+Delete
- Mac : Cmd+Shift+Delete
- Ou appuyez sur Ctrl+F5

**Safari :**
- Cmd+Option+E pour vider le cache
- Puis Cmd+R pour recharger

**B) Attendez quelques minutes**
GitHub Pages peut prendre 2-5 minutes pour se mettre à jour

**C) Vérifiez le statut du déploiement**
1. Allez sur votre repository GitHub
2. Cliquez sur "Actions" (en haut)
3. Vérifiez qu'il n'y a pas d'erreur de build
4. Le dernier workflow doit être vert (✓)

---

### 4. Erreur 404 - Page Non Trouvée

#### Symptômes
- Le lien vers votre site affiche "404"
- Page blanche avec "Site not found"

#### Solutions

**A) Vérifiez que GitHub Pages est activé**
1. Settings > Pages
2. "Source" doit être sur "main" ou "master"
3. Le dossier doit être "/" (root)

**B) Vérifiez l'URL**
L'URL correcte est :
```
https://votre-nom-utilisateur.github.io/nom-du-repository/
```

**C) Attendez le déploiement initial**
Le premier déploiement peut prendre 5-10 minutes

---

### 5. Le Formulaire de Contact Ne Fonctionne Pas

#### Symptômes
- Bouton "Envoyer" ne fait rien
- Message d'alerte s'affiche

#### Solution

C'est normal ! Le formulaire est configuré par défaut pour afficher une alerte.

**Pour qu'il envoie vraiment des emails :**
1. Consultez la section "Configuration du Formulaire de Contact" dans le README.md
2. Configurez Formspree, EmailJS ou Netlify Forms
3. Suivez les instructions fournies

---

### 6. Le Site Est Lent à Charger

#### Solutions

**A) Optimisez vos images**
1. Utilisez [TinyPNG](https://tinypng.com/)
2. Redimensionnez à 1920x1280px maximum
3. Qualité JPEG : 80-85%

**B) Limitez le nombre d'images par projet**
- 3-5 images par projet suffisent
- Évitez les images > 1MB

---

### 7. Problèmes de Mise en Page Mobile

#### Symptômes
- Le site ne s'affiche pas bien sur téléphone
- Éléments qui débordent

#### Solution

Le site est normalement responsive. Si vous avez des problèmes :
1. Vérifiez que vous n'avez pas modifié le CSS
2. Testez avec Chrome DevTools (F12 > Mode mobile)
3. Vérifiez qu'il n'y a pas d'erreurs dans la console

---

### 8. Caractères Spéciaux (é, à, ô, etc.) Mal Affichés

#### Symptômes
- "é" devient "Ã©"
- Accents cassés

#### Solution

**A) Vérifiez l'encodage des fichiers**
1. Ouvrez vos fichiers avec un éditeur de texte moderne (VS Code, Sublime Text)
2. Vérifiez que l'encodage est "UTF-8"
3. Sauvegardez en UTF-8 si nécessaire

**B) Dans VS Code**
En bas à droite, cliquez sur l'encodage et sélectionnez "UTF-8"

---

### 9. Le Clic sur un Projet Ne Fonctionne Pas

#### Symptômes
- Cliquer sur une carte projet ne fait rien
- La page de détail ne s'ouvre pas

#### Solutions

**A) Vérifiez la console**
1. F12 > Console
2. Cherchez les erreurs JavaScript

**B) Vérifiez que `project.html` existe**
Le fichier doit être à la racine du site

**C) Vérifiez l'ID du projet**
L'ID dans l'URL doit correspondre exactement à l'ID dans `projects.json`

---

### 10. GitHub Pages Est Désactivé

#### Symptômes
- L'option Pages n'apparaît pas dans Settings
- Message "Upgrade your plan"

#### Solution

**Vérifiez que votre repository est Public**
1. Settings > General
2. En bas de page : "Change repository visibility"
3. Sélectionnez "Public"
4. GitHub Pages est gratuit uniquement pour les repositories publics

---

## 🆘 Toujours Bloqué ?

### Checklist de Debug

- [ ] Le fichier JSON est valide (testé sur JSONLint)
- [ ] Tous les fichiers sont uploadés sur GitHub
- [ ] GitHub Pages est activé (Settings > Pages)
- [ ] Le cache du navigateur est vidé (Ctrl+F5)
- [ ] Attendu 5 minutes après le dernier commit
- [ ] Console du navigateur vérifiée (F12)
- [ ] Chemins d'images vérifiés (respect de la casse)

### Outils de Debug

1. **Console du navigateur** (F12)
   - Affiche toutes les erreurs JavaScript
   - Montre les fichiers qui ne se chargent pas

2. **JSONLint** ([jsonlint.com](https://jsonlint.com/))
   - Valide votre JSON
   - Montre exactement où sont les erreurs

3. **GitHub Actions**
   - Onglet "Actions" de votre repository
   - Montre si le déploiement a réussi

4. **Inspecteur d'élément** (Clic droit > Inspecter)
   - Vérifiez que les chemins d'images sont corrects
   - Regardez les requêtes réseau

---

## 📧 Besoin d'Aide Supplémentaire ?

Si vous êtes toujours bloqué après avoir essayé ces solutions :

1. Notez exactement le message d'erreur
2. Faites une capture d'écran de la console (F12)
3. Vérifiez que votre JSON est valide
4. Consultez la [documentation GitHub Pages](https://docs.github.com/en/pages)

---

**Astuce Pro :** Testez toujours votre site en local (en ouvrant index.html) avant de l'uploader sur GitHub !
