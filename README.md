# Questionnaire garanties: GitHub Pages + stockage des reponses

Ce projet contient un questionnaire statique que vous pouvez publier sur GitHub Pages.

## 1) Publier le site sur GitHub Pages

1. Creez un depot GitHub (ex: `koffr-market-survey`).
2. Ajoutez ce fichier principal a la racine: `questionnaire_garanties.html`.
3. Renommez-le en `index.html` (recommande pour Pages).
4. Poussez sur la branche `main`.
5. Dans GitHub: `Settings` -> `Pages`.
6. Source: `Deploy from a branch`, branche `main`, dossier `/ (root)`.
7. Votre questionnaire sera disponible sur `https://<votre-user>.github.io/<votre-repo>/`.

## 2) Stocker les reponses dans Google Sheets (export CSV/Excel)

Cette option est la plus simple avec GitHub Pages (site statique).

### A. Creer le backend Google Apps Script

1. Creez un Google Sheet vide.
2. Ouvrez `Extensions` -> `Apps Script`.
3. Collez le contenu de `google_apps_script_backend.gs`.
4. Remplacez `REPLACE_WITH_YOUR_SPREADSHEET_ID` par l'ID du Google Sheet.
5. Cliquez `Deploy` -> `New deployment` -> type `Web app`.
6. `Execute as`: vous.
7. `Who has access`: `Anyone`.
8. Copiez l'URL du web app.

### B. Connecter le formulaire

1. Ouvrez `questionnaire_garanties.html`.
2. Modifiez la constante `STORAGE_ENDPOINT` avec l'URL du web app Google Apps Script.
3. Commit/push de la modif.

## 3) Recuperer les donnees en CSV ou Excel

Depuis Google Sheets:
- `File` -> `Download` -> `Comma separated values (.csv)`
- `File` -> `Download` -> `Microsoft Excel (.xlsx)`

## 4) Option SQLite (si necessaire)

GitHub Pages seul ne peut pas ecrire directement dans SQLite (pas de backend serveur).

Pour SQLite, il faut ajouter un backend (ex: Cloudflare Worker + D1 SQLite, Render/Fly.io + API).
Le HTML est deja pret pour envoyer vers un endpoint HTTP: vous pouvez remplacer `STORAGE_ENDPOINT` par cette API.

## 5) Securite et fiabilite

- Ne mettez pas de cle API secrete dans le HTML.
- Le formulaire fait un fallback: si le backend est indisponible, un fichier CSV local est telecharge pour eviter la perte des reponses.
- Testez un envoi complet apres chaque deploiement.
