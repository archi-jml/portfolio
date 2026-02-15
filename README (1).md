# Organisation des Images

## Structure des Dossiers

```
images/
├── profile/
│   └── photo.jpg          ← Votre photo de profil
└── projects/
    ├── maison-contemporaine/
    │   ├── thumb.jpg      ← Image miniature (800x1000px)
    │   ├── image1.jpg     ← Images de galerie
    │   ├── image2.jpg
    │   └── image3.jpg
    ├── renovation-loft/
    │   ├── thumb.jpg
    │   ├── image1.jpg
    │   └── image2.jpg
    └── ...
```

## Pour Chaque Projet

### 1. Créez un dossier
- Nom = identifiant du projet (celui utilisé dans `projects.json`)
- Exemple : `villa-moderne`
- Utilisez des lettres minuscules et tirets (pas d'espaces)

### 2. Ajoutez vos images

**Image miniature (obligatoire) :**
- Nom du fichier : `thumb.jpg`
- Dimensions recommandées : 800x1000px (ratio 4:5)
- Format : JPEG
- Poids : <500KB

**Images de galerie :**
- Noms : `image1.jpg`, `image2.jpg`, `image3.jpg`, etc.
- Dimensions recommandées : 1920x1280px maximum
- Format : JPEG
- Poids : <1MB chacune

## Conseils d'Optimisation

### Redimensionnement
Utilisez un outil gratuit pour redimensionner vos images :
- Windows : Paint, Photos
- Mac : Aperçu
- En ligne : [ResizeImage.net](https://resizeimage.net/)

### Compression
Pour réduire le poids sans perdre en qualité :
- [TinyPNG](https://tinypng.com/) - recommandé
- [Squoosh](https://squoosh.app/) - plus d'options
- [CompressJPEG](https://compressjpeg.com/)

### Formats
- **JPEG** : Pour les photos de projets (préféré)
- **PNG** : Pour les logos ou images avec transparence
- **WebP** : Moderne et léger (mais moins compatible)

## Exemples de Nommage

✅ **BON**
```
images/projects/villa-moderne/thumb.jpg
images/projects/villa-moderne/image1.jpg
images/projects/loft-industriel/thumb.jpg
```

❌ **MAUVAIS**
```
images/projects/Villa Moderne/Miniature.jpg  ← espaces
images/projects/loft/IMG_1234.JPG            ← nom générique
images/PROJETS/façade.jpg                    ← caractères spéciaux
```

## Photo de Profil

Placez votre photo dans `images/profile/photo.jpg`
- Dimensions : 800x1000px (ratio 4:5)
- Format : JPEG
- Photo professionnelle de préférence

---

**Important :** Les chemins dans `projects.json` doivent correspondre EXACTEMENT aux noms de fichiers (sensible à la casse).
