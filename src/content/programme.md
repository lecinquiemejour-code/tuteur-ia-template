# LE PROGRAMME DU COURS EXHAUSTIF — MÉCANIQUE DES SKILLS

> Ce document contient l'intégralité du contenu pédagogique du cours "Comprendre la mécanique des skills de Claude et la fenêtre de contexte".

## Table des matières
0. Introduction : à quoi servent les skills, et pourquoi on les a inventés
1. Qu'est-ce qu'un skill ?
2. Comment un skill se déclenche
3. Comment le modèle l'invoque
4. Vu de très près : la chaîne de tokens
5. L'architecture de la fenêtre de contexte
6. Combien ça pèse (ordres de grandeur)
7. Débordement & hygiène du contexte

---

## Module 0 — Introduction : à quoi servent les skills, et pourquoi on les a inventés

**Objectif.** Donner du sens à la suite : comprendre le *problème* que les skills résolvent, avant d'ouvrir le capot.

**Script.**
- Le problème de départ : devoir recoller, à chaque nouvelle conversation, le même long pavé d'instructions (« voici ma méthode, mon format, mes règles… »). Fastidieux, oublié une fois sur deux, et ça reprend de la place à chaque fois.
- Un **skill** (« compétence ») = un **dossier d'expertise réutilisable** : méthode, règles, exemples, gabarits, rangés une bonne fois. Claude le **charge de lui-même quand la tâche s'y prête**, et l'ignore le reste du temps.
- Trois raisons d'être, qui se répondent :
  1. **Ne plus se répéter (réutilisabilité)** : un savoir-faire capturé une fois, disponible dans toutes les conversations, sans copier-coller ni oubli.
  2. **Économiser le contexte (le cœur de l'astuce)** : le contexte est une ressource rare et coûteuse. Parade = le **chargement progressif** : en permanence, Claude ne garde qu'un résumé léger de chaque skill (`name` + `description`) ; le contenu lourd n'est chargé qu'au moment utile. D'où la possibilité d'avoir des dizaines de skills installés sans payer leur poids en permanence.
  3. **Créer une fois, réutiliser partout (portabilité & partage)** : standard ouvert ; le même dossier fonctionne dans l'app, dans Claude Code, via l'API, et se partage par un simple fichier.
- Précision pour bien situer : un skill n'est **pas** un *outil*. Un outil (ou un connecteur MCP) donne la capacité d'**agir** ; un skill donne la **méthode**. (Détaillé dans l'encart « Skill, MCP, Plugin ».)

**Analogie.** Un classeur de fiches-méthode gardé sous le coude : on ne sort une fiche que lorsque la tâche correspond.

**Illustration à afficher.** `/assets/09-pourquoi-les-skills.svg` — à afficher en posant le contraste « sans skill (on répète) » vs « avec skill (on capitalise) ».

**Transition.** « On ouvre le capot : que contient, concrètement, un skill ? »

---

## Encart — Skill, MCP, Plugin : qui fait quoi

**Objectif.** Situer les trois briques d'extension les unes par rapport aux autres.

**Script.**
- **Skill = le mode d'emploi.** Le savoir-faire : méthode, règles, exemples, gabarits. Il dit *comment bien s'y prendre*. Léger en contexte (quelques dizaines de tokens d'en-tête).
- **Outil / MCP = la capacité d'agir.** La connexion à des systèmes externes et l'exécution d'actions (lire un fichier, appeler une API, interroger une base). *MCP* (Model Context Protocol) = le standard qui branche ces outils. Coûteux en contexte (souvent des milliers de tokens par serveur).
- **Plugin = le paquet.** Un conteneur installable qui **réunit** une ou plusieurs briques — skills, MCP, et aussi commandes, hooks, sous-agents — pour les distribuer d'un bloc. Ce n'est pas « skill + MCP » par définition : c'est l'emballage, qui peut contenir l'un, l'autre, ou les deux, plus d'autres pièces.
- **Relations.** Un skill peut *se servir* d'outils MCP, mais il ne les *contient* pas ; c'est le plugin qui les empaquette ensemble.

**Analogie.** Le skill = la recette ; les outils/MCP = les ustensiles et l'arrivée d'eau ; le plugin = la cuisine clé en main qu'on livre déjà montée.

**Illustration à afficher.** `/assets/07-skill-mcp-plugin.svg` — à afficher après avoir posé les trois rôles.

---

## Module 1 — Qu'est-ce qu'un skill ?

**Objectif.** Comprendre qu'un skill est un simple dossier, et connaître ses deux parties essentielles.

**Script.**
- Un *skill* (« compétence ») est un **dossier** que Claude charge à la demande pour savoir comment accomplir une tâche précise.
- Structure minimale : **un dossier + un fichier `SKILL.md`**. Tout le reste est optionnel (`references/` pour des docs chargées au besoin, `scripts/` pour du code, `assets/` pour des gabarits).
- Le `SKILL.md` a deux parties :
  - **Le frontmatter YAML** (en-tête entre deux lignes `---`) : des *métadonnées*. Deux champs comptent — `name` (l'identifiant) et surtout `description`. La `description` est *la seule chose lue en permanence* : elle sert à décider s'il faut déclencher le skill. Mal rédigée → le skill ne se déclenche jamais, ou se déclenche à tort.
  - **Le corps en Markdown** (après le second `---`) : le mode d'emploi, lu *seulement* quand le skill est déclenché.
- Principe sous-jacent : le **chargement progressif** (*progressive disclosure*). On garde en mémoire en permanence uniquement la `description` (légère) ; le corps puis les fichiers de `references/` ne sont chargés qu'au moment utile.
- **Bon à savoir : un fichier `.skill` est en réalité un `.zip` déguisé.** Quand on distribue un skill, son dossier est simplement compressé en une archive ZIP avec l'extension `.skill`. Pour en inspecter le contenu, il suffit de renommer `mon-skill.skill` en `mon-skill.zip` puis de l'ouvrir. C'est du texte brut Markdown et YAML.

**Analogie.** Le frontmatter, c'est la couverture d'un livre (titre + résumé) qu'on lit pour décider de l'ouvrir ; le corps, c'est le contenu qu'on ne lit qu'une fois le livre ouvert.

**Illustration à afficher.** `/assets/01-structure-skill.svg` — à afficher après avoir distingué frontmatter et corps, pour fixer l'arborescence.

**Transition.** « Maintenant qu'on sait *ce qu'est* un skill, voyons *comment* il s'active. »

---

## Module 2 — Comment un skill se déclenche

**Objectif.** Distinguer l'interrupteur général (activation) des deux modes de déclenchement (auto/manuel).

**Script.**
- **Le commutateur d'activation (dans « Customize » → Compétences).** Avant toute question de déclenchement, chaque skill a un **interrupteur général** : le bouton bascule en haut de sa fiche.
  - **Désactivé (OFF)** : le skill *n'existe pas* pour le modèle. Son en-tête (`name` + `description`) n'est même pas chargé dans le contexte → **zéro coût en tokens**, aucun déclenchement possible.
  - **Activé (ON)** : son en-tête rejoint le contexte permanent. Il devient alors *éligible* au déclenchement.
- **Le réglage « Déclencheur » (sur la fiche du skill).** Une fois le skill activé, on choisit *comment* il se déclenche — par ex. « Commande » (uniquement via la commande slash ou le menu) ou « Commande + auto » (le modèle peut aussi le déclencher de lui-même quand la `description` matche).
- **Déclenchement automatique** : c'est *le modèle* qui décide d'activer le skill quand la demande correspond à sa `description`.
- **Invocation manuelle** : via le menu **Compétences** (ou une commande slash). On **force** l'activation, sans dépendre de la `description`.
- Dans les deux cas, le corps du `SKILL.md` finit chargé dans le contexte, et le modèle suit ses instructions.

**Analogie.** Le commutateur d'activation = décider si l'outil est seulement *posé sur l'établi* ou rangé au placard. Une fois posé : automatique = l'assistant le prend de lui-même ; manuel = on le lui met dans la main en disant « sers-toi de ça ».

**Illustration à afficher.** `/assets/08-activation-skill.svg` — après avoir expliqué le commutateur et les deux modes, pour fixer la structure d'ensemble.

**Transition.** « Mais concrètement, *comment* le modèle charge-t-il le fichier ? Pas de magie. »

---

## Module 3 — Comment le modèle l'invoque

**Objectif.** Casser l'illusion d'une « fonction magique » : un skill se charge avec les outils ordinaires.

**Script.**
- Il n'existe **pas** de fonction `invoke_skill()` dédiée. Un skill n'est pas un appel d'outil au sens classique.
- Deux couches :
  - **Découverte** (toujours active) : l'environnement d'exécution (le *harness*, la couche d'orchestration autour du modèle) injecte une **liste des skills disponibles** (nom, description, chemin).
  - **Activation** (à la demande) : pour lire les instructions, le modèle **lit le fichier** via un appel d'outil ordinaire (lecture de fichier / `view` / `cat`). Le contenu entre alors dans le contexte.
- Contraste avec le *function calling* classique (MCP, recherche web) : là, le modèle émet un bloc structuré `tool_use` (nom + arguments JSON), le harness exécute, renvoie un `tool_result`. Un skill réutilise *ce même canal* (lire un fichier).

**Analogie.** Le harness, c'est l'assistant de plateau : il pose les fiches utiles sur le bureau (découverte), et quand l'acteur en demande une, il va la chercher dans l'armoire (activation).

**Illustration à afficher.** `/assets/10-comment-le-modele-charge.svg` — à afficher après avoir distingué les deux couches (découverte / activation), pour matérialiser le parcours harness → disque → contexte.

**Transition.** « Tu veux voir ça au niveau le plus bas, token par token ? »

---

## Module 4 — Vu de très près : la chaîne de tokens

**Objectif.** Voir, au niveau token, ce qui se passe quand un skill se charge.

**Définitions.**
- *Tokenizer* : le découpeur qui transforme le texte en *tokens* (morceaux de mots).
- *Token de contrôle* (special token) : un token réservé qui sert de **balise de structure** (début de tour, rôle, frontière d'appel d'outil).

**Script — les phases.**
1. **Déjà en contexte** : le harness a injecté la liste légère des en-têtes de skills dans le bloc système.
2. **Le message de l'utilisateur entre** : le modèle décide de lire le skill et émet un **bloc d'appel d'outil** ordinaire : `<|tool_use_start|> {"name":"view","input":{"path":".../SKILL.md"}} <|tool_use_end|>`. La génération est mise en pause.
3. **Le harness agit** : il lit le fichier sur le disque, puis ré-injecte son contenu dans un bloc `<|tool_result_start|> ... (corps du SKILL.md) ... <|tool_result_end|>`. **C'est le moment précis où le skill entre en contexte.**
4. **Reprise** : le modèle reprend la main et applique les instructions du skill.

**Illustration à afficher.** `/assets/03-frise-tokens.svg` — à afficher après avoir énoncé les phases, pour matérialiser le va-et-vient modèle ↔ harness.

**Transition.** « Ce contenu chargé va dans la fenêtre de contexte. Voyons sa structure. »

---

## Module 5 — L'architecture de la fenêtre de contexte

**Objectif.** Comprendre que la fenêtre de contexte est un grand document réassemblé à chaque tour, fait de couches.

**Script.**
- La **fenêtre de contexte** = tout ce que le modèle « voit » en un seul coup d'œil au moment de répondre. C'est un **grand document unique**, réassemblé **à neuf à chaque tour** par le harness.
- Propriétés : **taille plafonnée** et **pas de mémoire entre les tours** (si une info n'est pas réinjectée, elle disparaît).
- Les couches, de la plus stable (haut) à la plus vivante (bas) :
  1. **Prompt système** — rédigé par Anthropic : identité, dates, règles (quasi immuable).
  2. **Définitions d'outils** — la fiche technique de chaque outil.
  3. **En-têtes de skills** — catalogue allégé (`name` + `description`).
  4. **En-têtes de connecteurs MCP** — définitions des outils et données externes connectés.
  5. **Mémoire** — faits résumés des conversations passées.
  6. **Instructions personnalisées** — préférences permanentes de style de l'utilisateur.
  7. **Instructions de projet** — consignes propres au Projet en cours.
  8. **Conversation en cours** — l'échange réel : messages, fichiers et corps des skills chargés. Seule couche qui grossit.

**Analogie.** Un bureau réorganisé à chaque tour : en haut les documents de référence fixes, en bas la pile de courrier du jour qui s'épaissit.

**Illustration à afficher.** `/assets/02-architecture-couches.svg` — à afficher après avoir listé les couches, pour montrer l'empilement.

**Transition.** « Et tout ça, ça pèse combien ? »

---

## Module 6 — Combien ça pèse (ordres de grandeur)

**Objectif.** Donner des ordres de grandeur et la bonne intuition de proportions.

**Script.**
- Conversion utile : **~4 caractères par token** en français, soit **~1,5 token par mot**.
- **Le socle fixe (système + outils) est très lourd : ~24 000 tokens** (le prompt système d'Anthropic pèse ~3 500 tokens, mais les définitions des outils et schémas pèsent la majorité du reste).
- Les en-têtes de skills pèsent ~1 500–2 500 tokens. Les en-têtes MCP pèsent ~1 000–3 000 tokens.
- **La couche conversation** commence légère (~500 tokens) et grossit : charger le corps du skill ajoute ~3 500 tokens. Une session complète classique fait environ 10 000 à 15 000 tokens.
- **Les pièces jointes dominent le budget** :
  - Texte brut : ~500–1 000 tokens / page.
  - Image : ~quelques centaines à 1 600 tokens.
  - PDF dense : peut peser de 10 000 à plus de 60 000 tokens. Un seul gros PDF peut peser plus lourd que tout le reste réuni.
- **Capacité de la fenêtre** : jusqu'à **500 000 tokens** en chat (offres récentes) et **1 million** de tokens via l'API ou Claude Code. Le socle immuable n'occupe donc qu'une petite fraction de la fenêtre totale, sauf si de grosses pièces jointes sont envoyées.

**Illustrations à afficher.** 
- `/assets/05-remplissage-fenetre.svg` (montre la proportion occupée dans la fenêtre globale).
- `/assets/04-composition-tokens.svg` (zoom sur la répartition des tokens utilisés).

**Transition.** « Si on a tant de marge, pourquoi parler de surcharge ? »

---

## Module 7 — Débordement & hygiène du contexte

**Objectif.** Comprendre ce qui se passe quand le contexte est plein, et en tirer une règle pratique.

**Script.**
- **Débordement** :
  - Via l'API : La requête est rejetée (erreur).
  - En chat : Le harness applique la **troncature** (fenêtre glissante : éjection des messages les plus anciens) ou la **compaction** (résumé des vieux tours). Le socle est préservé, mais la mémoire de début de chat s'efface.
- **Effet "Lost in the Middle"** : Le modèle perd en précision pour les données situées au milieu d'un très long contexte.
- **Hygiène du contexte** : Trop d'outils ou de skills activés provoquent un risque de dilution de l'attention, de conflits d'instructions et de mauvais choix d'outils.
- **Règle pratique** : *Un contexte = une intention*. Désactiver (OFF) les skills et serveurs MCP inutiles pour la tâche en cours.

**Analogie.** Un plan de travail de cuisine : sortir tous les ustensiles « au cas où » encombre et ralentit ; on ne sort que ceux de la recette du jour.

**Illustration à afficher.** `/assets/06-debordement.svg` — à afficher en expliquant la fenêtre glissante.

**Pour aller plus loin.** Si tu souhaites apprendre à créer tes propres compétences (*skills*) pour Claude et maîtriser ce format en détail, tu peux consulter la documentation officielle de référence d'Anthropic : [Docs Anthropic - Agent Skills](https://support.claude.com/fr/articles/12512198-comment-creer-des-competences-personnalisees).