# Gabarits — ton tuteur, page blanche

Ce dossier contient les **six fichiers de contenu, vides et commentés**. Tu les copies par-dessus `src/content/` le jour où tu remplaces le cours de démonstration par le tien.

Rien ici n'est lu par l'application. C'est une réserve.

---

## Copier les gabarits

**Le plus simple : demander à ton assistant IA**

> « Copie les gabarits de `examples/tuteur-vierge/` dans `src/content/`, puis aide-moi à les remplir. Mon sujet est : … »

**À la main, dans un terminal PowerShell à la racine du projet**

```powershell
Copy-Item examples\tuteur-vierge\*.md   src\content\ -Force
Copy-Item examples\tuteur-vierge\*.json src\content\ -Force
```

> ⚠️ Cette copie **écrase** le cours de démonstration sur les Skills. Il reste récupérable dans l'historique Git, mais si tu veux le garder sous la main, duplique `src/content/` ailleurs avant.
>
> ⚠️ Ne copie pas `README.md` (ce fichier) dans `src/content/`.

---

## Les six fichiers

| Fichier | Ce que tu y mets | Effort |
|---|---|---|
| `programme.md` | **ton cours**, module par module | l'essentiel du travail |
| `tuteur.json` | nom, avatar, contact, boutons de réponse rapide | 5 min |
| `prompt-systeme.md` | la personnalité du tuteur et son périmètre | 15 min |
| `accueil.md` | le premier message que voit l'apprenant | 10 min |
| `ressources.md` | liens et documents que le tuteur peut citer | 10 min |
| `illustrations.md` | quelle image afficher, et quand | 10 min |

---

## L'ordre conseillé

1. **`programme.md`** d'abord. C'est ton cours : tout le reste en découle, et c'est là qu'est le vrai travail.
2. **`tuteur.json`** ensuite. Donne-lui un nom et un visage, ça rend le projet concret.
3. **`prompt-systeme.md`** : ajuste le périmètre et le ton à ce que tu viens d'écrire.
4. **`accueil.md`** : rédige la première impression, en cohérence avec les boutons de `tuteur.json`.
5. **`ressources.md`** et **`illustrations.md`** pour finir.

---

## Trois choses qu'on oublie

**Les images ne vont pas ici.** L'avatar du tuteur va dans `public/`, les schémas du cours dans `public/assets/`. Ce dossier ne contient que du texte.

**Il faut redémarrer le serveur.** Les fichiers de `src/content/` sont lus au démarrage. Après une modification, arrête `npm run dev` et relance-le, sinon tu testeras l'ancienne version sans comprendre pourquoi.

**Le tuteur ne sait que ce qui est écrit.** S'il répond « je n'ai pas cette information », ce n'est pas un bug : c'est que ça manque dans `programme.md`. C'est le comportement voulu, il vaut mieux un tuteur qui se tait qu'un tuteur qui invente.

---

## Les variables disponibles

Trois variables sont remplacées automatiquement par les valeurs de `tuteur.json` :

| Variable | Remplacée par | Utilisable dans |
|---|---|---|
| `{{TUTEUR_NOM}}` | `basics.name` | `prompt-systeme.md`, `accueil.md` |
| `{{TUTEUR_EMAIL}}` | `basics.email` | `prompt-systeme.md` |
| `{{TUTEUR_LIEN}}` | `basics.linkedin` | `prompt-systeme.md` |

Toute autre écriture entre doubles accolades restera affichée telle quelle.
