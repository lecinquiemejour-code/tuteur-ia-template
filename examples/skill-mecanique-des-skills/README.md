# Comprendre la mécanique des skills

Un skill **pédagogique** pour Claude : il explique, en vulgarisation et avec des
schémas, comment fonctionnent les *skills* de Claude et sa *fenêtre de contexte*
— structure d'un skill, déclenchement, chaîne de tokens, architecture du
contexte, ordres de grandeur, débordement, et hygiène du contexte.

## ⬇️ Télécharger le skill

1. Sur la page d'accueil de ce dépôt GitHub, cliquez sur le bouton vert **`<> Code`**.
2. Cliquez sur **`Download ZIP`**.

*(Note : Le fichier `.zip` ainsi téléchargé sert directement de package pour le skill. N'extrayez pas son contenu).*

## Contenu du dépôt

- `SKILL.md` — le tuteur (rôle, méthode, message d'accueil, carte des modules).
- `references/` — le contenu pédagogique détaillé (modules 0 à 7 + encart),
  le catalogue d'illustrations, et l'annexe installation/partage.
- `assets/` — 10 illustrations SVG autonomes.

## Installation

### Dans l'app Claude (claude.ai) et Claude Desktop
1. Téléchargez le fichier ZIP du dépôt (voir **Télécharger le skill** ci-dessus).
2. Dans Claude, allez dans **Customize** (Personnaliser) → **Skills** (Compétences) → **« + »** → **« + Create skill »** (Créer une compétence) → **« Upload a skill »** (Importer une compétence).
3. Téléversez le fichier `.zip` téléchargé.
4. Activez le skill (toggle sur **ON**).
5. **Claude Desktop :** Si vous utilisez l'application de bureau, il peut être nécessaire de **quitter complètement et relancer Claude Desktop** pour que le nouveau skill soit visible et actif.

> Prérequis : l'**exécution de code** doit être activée dans vos préférences (Settings → Capabilities).

### Dans Claude Code
```bash
git clone https://github.com/lecinquiemejour-code/mecanique-des-skills.git ~/.claude/skills/mecanique-des-skills
```

## Affichage des illustrations

Les schémas sont des fichiers SVG autonomes dans `assets/`. Le tuteur les affiche
au moment opportun via un outil de rendu visuel ; le catalogue et les
déclencheurs sont décrits dans `references/illustrations.md`.

## Sécurité

Un skill peut, en principe, faire exécuter du code par Claude. **Relisez toujours
le contenu d'un skill avant de l'activer.** Celui-ci ne contient que du Markdown
et des SVG — aucun script, aucune dépendance.

## Auteur & licence

Créé par [Jean Noël Lefebvre (L5J)](https://cv-jean-noel.netlify.app/). Distribué sous licence **GNU GPL v3.0** (voir `LICENSE`).
