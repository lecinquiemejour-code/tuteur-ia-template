# Catalogue des illustrations

> Pour le tuteur : chaque illustration est un fichier SVG **autonome** dans
> `assets/`. Affiche-la **après** avoir posé l'idée en mots, une à la fois,
> puis commente ses 2-3 éléments clés. Si tu disposes d'un rendu visuel inline,
> rends le contenu du fichier ; sinon, décris-la ou fournis le fichier.

---

### 01 — Structure d'un skill
- **Fichier :** `assets/01-structure-skill.svg`
- **Module :** 1
- **Ce qu'elle montre :** l'arborescence d'un skill — le dossier, le `SKILL.md`
  obligatoire décomposé en *frontmatter* (name + description) et *corps*
  Markdown, et les ressources optionnelles (`references/`, `scripts/`,
  `assets/`). Une étiquette signale que seule la `description` est lue en
  permanence (chargement progressif).
- **Déclencheur :** dans le Module 1, juste après avoir distingué frontmatter et
  corps. Renforce l'idée « un skill = un dossier ».

### 02 — Architecture en couches de la fenêtre de contexte
- **Fichier :** `assets/02-architecture-couches.svg`
- **Modules :** 5 (principal), 2 (optionnel)
- **Ce qu'elle montre :** les 8 couches empilées, de la plus stable (prompt
  système, en haut) à la plus vivante (conversation, en bas), colorées par
  source (système & plateforme / réglages de l'utilisateur / conversation
  live). Annotations : « chargé à la demande » pour les en-têtes
  skills/MCP, « grossit à chaque tour » pour la conversation.
- **Déclencheur :** dans le Module 5, après avoir énuméré les couches.

### 03 — Frise des tokens (modèle ↔ harness)
- **Fichier :** `assets/03-frise-tokens.svg`
- **Module :** 4
- **Ce qu'elle montre :** la séquence temporelle quand un skill se charge —
  bloc système (liste légère), message utilisateur, bloc `tool_use` émis par le
  modèle, **pause**, action du harness (lecture disque), bloc `tool_result`
  ré-injecté (le skill entre en contexte), reprise. Les frontières sont des
  tokens de contrôle génériques `<|…|>`.
- **Déclencheur :** dans le Module 4, après avoir décrit les 4 phases.

### 04 — Composition des tokens utilisés (à l'échelle)
- **Fichier :** `assets/04-composition-tokens.svg`
- **Module :** 6
- **Ce qu'elle montre :** une colonne empilée où la hauteur ≈ le poids en
  tokens. Le socle « système + outils » (~24k) domine, la conversation (~12k)
  suit, et mémoire/préférences/projet sont de fins liserés (agrandis au minimum
  pour rester lisibles — se fier aux chiffres).
- **Déclencheur :** dans le Module 6, *après* l'illustration 05, pour zoomer sur
  la répartition.
- **Note :** chiffres pour une *session complète sans grosse pièce jointe* ; une
  grosse PJ (PDF dense, etc.) renverse cette répartition — le préciser à l'oral.

### 05 — Remplissage de la fenêtre (500k)
- **Fichier :** `assets/05-remplissage-fenetre.svg`
- **Module :** 6
- **Ce qu'elle montre :** une barre représentant 500 000 tokens ; une session
  complète n'en occupe qu'environ 8 % (petit liseré à gauche), laissant ~92 %
  d'espace libre.
- **Déclencheur :** dans le Module 6, *avant* l'illustration 04, pour faire
  sentir l'ampleur de la marge disponible.
- **Note :** le « ~8 % » suppose une *session complète sans grosse pièce
  jointe* ; une grosse PJ peut à elle seule remplir une bonne part de la barre.

### 06 — Débordement / fenêtre glissante
- **Fichier :** `assets/06-debordement.svg`
- **Module :** 7
- **Ce qu'elle montre :** une fenêtre de capacité fixe sous un plafond ; le
  socle fixe est épinglé en haut et préservé ; les tours de conversation
  s'empilent ; le plus ancien sort par le haut (tronqué/résumé) pendant qu'un
  nouveau tour entre par le bas.
- **Déclencheur :** dans le Module 7, en expliquant la troncature.

### 07 — Skill / MCP / Plugin : qui fait quoi
- **Fichier :** `assets/07-skill-mcp-plugin.svg`
- **Rattachement :** Encart « Skill, MCP, Plugin » (transversal ; souvent
  M1 ou M7)
- **Ce qu'elle montre :** un conteneur « Plugin » (en pointillés) qui réunit deux
  briques — « Skill » (le mode d'emploi, méthode/règles/exemples) et « Outils /
  MCP » (la capacité d'agir) — plus une note « + commandes · hooks ·
  sous-agents ». Une flèche « utilise » va du skill vers les outils. Synthèse :
  le skill dit comment faire, l'outil/MCP fait, le plugin réunit et distribue.
- **Déclencheur :** dans l'encart, après avoir posé les trois rôles.

### 08 — Activation et modes de déclenchement
- **Fichier :** `assets/08-activation-skill.svg`
- **Module :** 2
- **Ce qu'elle montre :** deux états côte à côte — Toggle OFF (skill absent du
  contexte, 0 token, invisible au menu) et Toggle ON (en-tête présent : name +
  description chargés). En état ON, deux modes : Auto (description matche →
  se déclenche seul) et Commande (/slash ou menu → tu déclenches). Les deux
  convergent vers « SKILL.md chargé — instructions appliquées ».
- **Déclencheur :** dans le Module 2, après avoir expliqué le commutateur et
  les deux modes, pour fixer la structure d'ensemble.

### 09 — Pourquoi les skills (avant / après)
- **Fichier :** `assets/09-pourquoi-les-skills.svg`
- **Module :** 0
- **Ce qu'elle montre :** à gauche « sans skill », trois conversations où l'on
  recolle les mêmes instructions ; à droite « avec skill », les instructions
  rangées une fois et chargées au besoin pour chaque nouvelle conversation.
- **Déclencheur :** dans le Module 0, en posant le contraste répétition vs
  capitalisation.

### 10 — Comment le modèle charge un skill
- **Fichier :** `assets/10-comment-le-modele-charge.svg`
- **Module :** 3
- **Ce qu'elle montre :** Phase 1 (découverte, toujours active) — le harness
  injecte une liste légère (name + description + chemin). Phase 2 (activation,
  à la demande) — le modèle émet un appel d'outil pour lire le fichier, le
  harness lit le disque et réinjecte le corps du SKILL.md en contexte, puis le
  modèle applique. Message : aucune primitive spéciale.
- **Déclencheur :** dans le Module 3, après avoir distingué les deux couches.

---

## Ordre d'apparition recommandé (parcours complet 1→7)
1. `01-structure-skill` (M1)
2. `03-frise-tokens` (M4)
3. `02-architecture-couches` (M5)
4. `05-remplissage-fenetre` (M6)
5. `04-composition-tokens` (M6)
6. `06-debordement` (M7)
