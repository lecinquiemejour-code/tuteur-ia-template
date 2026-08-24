# CATALOGUE DES ILLUSTRATIONS

Ce fichier indique au tuteur **quelle image afficher, et à quel moment**.

---

## Comment l'utiliser (pour toi qui adaptes le template)

1. Dépose tes images dans le dossier `public/assets/`
2. Déclare chaque image dans le tableau « Catalogue » ci-dessous
3. C'est tout : le tuteur les affichera au bon moment dans la conversation

**Formats acceptés** : `.svg` (recommandé — quelques Ko, net à tout zoom, et
une IA sait en générer et en modifier), `.png`, `.jpg`, `.webp`.

**Bon à savoir** : le visiteur peut cliquer sur une image pour l'agrandir
dans un volet latéral. Inutile de prévoir des vignettes.

**Si tu n'as pas d'illustrations** : laisse le tableau vide. Le tuteur
fonctionnera normalement, simplement sans schémas.

---

## Règle d'affichage (pour le tuteur)

Pour chaque notion expliquée, affiche l'illustration correspondante en
écrivant exactement :

`![[Titre affiché sous l'image]](/assets/nom-du-fichier.svg)`

Trois consignes impératives :

- N'affiche **jamais** une image absente du tableau ci-dessous.
- Si aucune image ne correspond à ce que tu expliques, n'en affiche aucune.
  Mieux vaut pas de schéma qu'un schéma hors sujet.
- Une seule illustration à la fois, placée après l'explication qu'elle
  illustre, jamais avant.

---

## Catalogue

| Fichier | À afficher quand |
|---|---|
| `09-pourquoi-les-skills.svg` | Module 0 — pourquoi les skills existent (comparaison sans skill / avec skill) |
| `07-skill-mcp-plugin.svg` | Encart — différence entre Skill, MCP et Plugin |
| `01-structure-skill.svg` | Module 1 — structure du dossier, YAML vs Markdown |
| `08-activation-skill.svg` | Module 2 — bouton ON/OFF, déclenchement automatique ou manuel |
| `10-comment-le-modele-charge.svg` | Module 3 — le harness qui lit le fichier sur le disque |
| `03-frise-tokens.svg` | Module 4 — la chaîne de tokens, les pauses et le tool_result |
| `02-architecture-couches.svg` | Module 5 — les couches de la fenêtre de contexte |
| `05-remplissage-fenetre.svg` | Module 6 — remplissage global de la fenêtre de contexte |
| `04-composition-tokens.svg` | Module 6 — zoom sur les 24k tokens du socle fixe |
| `06-debordement.svg` | Module 7 — le débordement de contexte et la fenêtre glissante |
