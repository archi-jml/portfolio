# TEMPLATE POUR AJOUTER UN NOUVEAU PROJET

Copiez et collez ce template dans votre fichier `data/projects.json` et remplissez les informations.

```json
{
  "id": "identifiant-unique-du-projet",
  "title": "Titre du Projet",
  "context": "Type (Résidentiel / Commercial / Rénovation / Extension / etc.)",
  "year": "2024",
  "shortDescription": "Description courte en une phrase pour la carte projet.",
  "thumbnail": "images/projects/identifiant-unique-du-projet/thumb.jpg",
  "images": [
    "images/projects/identifiant-unique-du-projet/image1.jpg",
    "images/projects/identifiant-unique-du-projet/image2.jpg",
    "images/projects/identifiant-unique-du-projet/image3.jpg"
  ],
  "longDescription": "<p>Premier paragraphe de description détaillée.</p><p>Deuxième paragraphe avec plus d'informations sur le projet.</p><p>Troisième paragraphe si nécessaire.</p>"
}
```

## Instructions :

1. **id** : Utilisez un identifiant unique en minuscules avec tirets (ex: `maison-bois-2024`)
2. **title** : Le nom de votre projet tel qu'il apparaîtra sur le site
3. **context** : Le type de projet (gardez cohérent avec vos autres projets)
4. **year** : L'année de réalisation
5. **shortDescription** : Une phrase accrocheuse pour la carte projet
6. **thumbnail** : Chemin vers l'image miniature (800x1000px recommandé)
7. **images** : Liste des images pour la galerie (ajoutez-en autant que nécessaire)
8. **longDescription** : Description complète en HTML (utilisez `<p>` pour les paragraphes)

## ⚠️ ATTENTION :

- N'oubliez pas la virgule entre les projets dans le JSON !
- Le dernier projet de la liste ne doit PAS avoir de virgule après
- Vérifiez toujours votre JSON sur [jsonlint.com](https://jsonlint.com/) avant de l'uploader

## Exemple d'ajout :

Si vous avez déjà 2 projets et voulez en ajouter un 3ème :

```json
{
  "projects": [
    {
      "id": "projet-1",
      ...
    },  ← Virgule ici
    {
      "id": "projet-2",
      ...
    },  ← Virgule ici aussi
    {
      "id": "nouveau-projet-3",
      ...
    }   ← PAS de virgule pour le dernier
  ]
}
```
