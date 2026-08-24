# Modules — contenu pédagogique détaillé

> Pour le tuteur : déroule **un module à la fois**. Chaque module contient un
> objectif, un script d'explication (à reformuler avec tes mots, pas à réciter),
> une analogie, l'illustration à déclencher et son moment, un piège à éviter, et
> une transition. Les `[ILLUSTRATION: …]` renvoient au catalogue
> `illustrations.md` et aux fichiers `assets/`.
>
> **Règle de chunking (priorité absolue) :** à l'intérieur de chaque module,
> délivrer un bloc de **6 à 10 phrases** couvrant une idée complète (concept +
> analogie si prévue), puis marquer une pause et vérifier l'acquittement avant
> de continuer. Ne jamais dérouler un script en entier d'un bloc, ni s'arrêter
> toutes les 2-3 phrases (trop haché). Les scripts ci-dessous sont des *guides
> de contenu*, pas des textes à réciter d'une traite.

## Table des matières
0. Introduction : à quoi servent les skills, et pourquoi on les a inventés
1. Qu'est-ce qu'un skill ?
2. Comment un skill se déclenche
3. Comment le modèle l'invoque
4. Vu de très près : la chaîne de tokens
5. L'architecture de la fenêtre de contexte
6. Combien ça pèse (ordres de grandeur)
7. Débordement & hygiène du contexte

(+ Encart transversal : « Skill, MCP, Plugin : qui fait quoi »)

---

## Module 0 — Introduction : à quoi servent les skills, et pourquoi on les a inventés

**Objectif.** Donner du sens à la suite : comprendre le *problème* que les skills
résolvent, avant d'ouvrir le capot.

**Script.**
- Le problème de départ : devoir recoller, à chaque nouvelle conversation, le
  même long pavé d'instructions (« voici ma méthode, mon format, mes règles… »).
  Fastidieux, oublié une fois sur deux, et ça reprend de la place à chaque fois.
- Un **skill** (« compétence ») = un **dossier d'expertise réutilisable** :
  méthode, règles, exemples, gabarits, rangés une bonne fois. Claude le **charge
  de lui-même quand la tâche s'y prête**, et l'ignore le reste du temps.
- Trois raisons d'être, qui se répondent :
  1. **Ne plus se répéter (réutilisabilité)** : un savoir-faire capturé une
     fois, disponible dans toutes les conversations, sans copier-coller ni
     oubli.
  2. **Économiser le contexte (le cœur de l'astuce)** : le contexte est une
     ressource rare et coûteuse (tout le sujet de ce cours). Parade = le
     **chargement progressif** : en permanence, Claude ne garde qu'un résumé
     léger de chaque skill (`name` + `description`) ; le contenu lourd n'est
     chargé qu'au moment utile. D'où la possibilité d'avoir des dizaines de
     skills installés sans payer leur poids en permanence.
  3. **Créer une fois, réutiliser partout (portabilité & partage)** : standard
     ouvert ; le même dossier fonctionne dans l'app, dans Claude Code, via
     l'API, et se partage par un simple fichier.
- Précision pour bien situer : un skill n'est **pas** un *outil*. Un outil (ou un
  connecteur MCP) donne la capacité d'**agir** ; un skill donne la **méthode**.
  (Détaillé dans l'encart « Skill, MCP, Plugin ».)

**Analogie.** Un classeur de fiches-méthode gardé sous le coude : on ne sort une
fiche que lorsque la tâche correspond.

**[ILLUSTRATION: 09-pourquoi-les-skills]** — à afficher en posant le contraste
« sans skill (on répète) » vs « avec skill (on capitalise) ».

**Enchaînement.** Embrayer naturellement sur l'**encart « Skill, MCP, Plugin »**
(illustration 07), puis le Module 1.

**Transition.** « On ouvre le capot : que contient, concrètement, un skill ? »

---

## Encart — Skill, MCP, Plugin : qui fait quoi

> Encart transversal, à mobiliser quand la personne demande la différence entre
> skill, outil/MCP et plugin (souvent au Module 1 ou au Module 7). Court et
> autonome.

**Objectif.** Situer les trois briques d'extension les unes par rapport aux
autres.

**Script.**
- **Skill = le mode d'emploi.** Le savoir-faire : méthode, règles, exemples,
  gabarits. Il dit *comment bien s'y prendre*. Léger en contexte (quelques
  dizaines de tokens d'en-tête).
- **Outil / MCP = la capacité d'agir.** La connexion à des systèmes externes et
  l'exécution d'actions (lire un fichier, appeler une API, interroger une base).
  *MCP* (Model Context Protocol) = le standard qui branche ces outils. Coûteux
  en contexte (souvent des milliers de tokens par serveur).
- **Plugin = le paquet.** Un conteneur installable qui **réunit** une ou
  plusieurs briques — skills, MCP, et aussi commandes, hooks, sous-agents — pour
  les distribuer d'un bloc. Ce n'est pas « skill + MCP » par définition : c'est
  l'emballage, qui peut contenir l'un, l'autre, ou les deux, plus d'autres
  pièces.
- **Relations.** Un skill peut *se servir* d'outils MCP, mais il ne les
  *contient* pas ; c'est le plugin qui les empaquette ensemble.

**Analogie.** Le skill = la recette ; les outils/MCP = les ustensiles et
l'arrivée d'eau ; le plugin = la cuisine clé en main qu'on livre déjà montée.

**[ILLUSTRATION: 07-skill-mcp-plugin]** — à afficher après avoir posé les trois
rôles.

**Lien avec l'hygiène (Module 7).** Les skills sont légers, les MCP lourds →
une raison de plus de n'activer que le nécessaire.

---

## Module 1 — Qu'est-ce qu'un skill ?

**Objectif.** Comprendre qu'un skill est un simple dossier, et connaître ses
deux parties essentielles.

**Script.**
- Un *skill* (« compétence ») est un **dossier** que Claude charge à la demande
  pour savoir comment accomplir une tâche précise.
- Structure minimale : **un dossier + un fichier `SKILL.md`**. Tout le reste est
  optionnel (`references/` pour des docs chargées au besoin, `scripts/` pour du
  code, `assets/` pour des gabarits).
- Le `SKILL.md` a deux parties :
  - **Le frontmatter YAML** (en-tête entre deux lignes `---`) : des
    *métadonnées*. Deux champs comptent — `name` (l'identifiant) et surtout
    `description`. La `description` est *la seule chose lue en permanence* : elle
    sert à décider s'il faut déclencher le skill. Mal rédigée → le skill ne se
    déclenche jamais, ou se déclenche à tort.
  - **Le corps en Markdown** (après le second `---`) : le mode d'emploi, lu
    *seulement* quand le skill est déclenché.
- Principe sous-jacent : le **chargement progressif** (*progressive
  disclosure*). On garde en mémoire en permanence uniquement la `description`
  (légère) ; le corps puis les fichiers de `references/` ne sont chargés qu'au
  moment utile.
- **Bon à savoir : un fichier `.skill` est en réalité un `.zip` déguisé.** Quand
  on distribue un skill, son dossier est simplement compressé en une archive ZIP
  avec l'extension `.skill`. Pour en inspecter le contenu, il suffit de
  renommer `mon-skill.skill` en `mon-skill.zip` puis de l'ouvrir avec
  n'importe quel outil d'archive (WinZip, 7-Zip, l'explorateur de fichiers…).
  C'est une bonne illustration du fait qu'un skill ne contient que des fichiers
  texte ordinaires — aucun format propriétaire ni « moteur » caché. (Pour
  installer ou partager un skill, voir `references/partage-installation.md`.)

**Analogie.** Le frontmatter, c'est la couverture d'un livre (titre + résumé)
qu'on lit pour décider de l'ouvrir ; le corps, c'est le contenu qu'on ne lit
qu'une fois le livre ouvert.

**[ILLUSTRATION: 01-structure-skill]** — à afficher après avoir distingué
frontmatter et corps, pour fixer l'arborescence.

**Piège à éviter.** Croire qu'il faut un format ou un moteur spécial. Non :
c'est du texte (Markdown) dans un dossier.

**Transition.** « Maintenant qu'on sait *ce qu'est* un skill, voyons *comment*
il s'active. »

---

## Module 2 — Comment un skill se déclenche

**Objectif.** Distinguer l'interrupteur général (activation) des deux modes de
déclenchement (auto/manuel).

**Script.**
- **Le commutateur d'activation (dans « Customize » → Compétences).** Avant
  toute question de déclenchement, chaque skill a un **interrupteur général** :
  le bouton bascule en haut de sa fiche. C'est le tout premier filtre.
  - **Désactivé (OFF)** : le skill *n'existe pas* pour le modèle. Son en-tête
    (`name` + `description`) n'est même pas chargé dans le contexte → **zéro
    coût en tokens**, aucun déclenchement possible, et il n'apparaît pas dans le
    menu.
  - **Activé (ON)** : son en-tête rejoint le contexte (la couche « en-têtes de
    skills », cf. Module 5). Il devient alors *éligible* au déclenchement.
- **Le réglage « Déclencheur » (sur la fiche du skill).** Une fois le skill
  activé, on choisit *comment* il se déclenche — par ex. « Commande »
  (uniquement via la commande slash ou le menu) ou « Commande + auto » (le
  modèle peut aussi le déclencher de lui-même quand la `description` matche).
- À retenir : ce commutateur est le **levier concret** de l'hygiène du contexte
  (Module 7). Seul ce qui est sur **ON** occupe une place dans le socle. Pour
  une tâche donnée, on n'active que les skills utiles.
- **Déclenchement automatique** : c'est *le modèle* qui décide d'activer le
  skill quand la demande correspond à sa `description`. L'utilisateur n'a rien à
  faire, mais encore faut-il que la formulation « matche ».
- **Invocation manuelle** : via le menu **Compétences** de l'interface (ou une
  commande slash). Là, on **force** l'activation, sans dépendre de la
  `description`. C'est inconditionnel — idéal pour tester un skill ou le lancer
  délibérément.
- Dans les deux cas, le résultat est le même : le corps du `SKILL.md` finit
  chargé dans le contexte, et le modèle suit ses instructions.
- Nuance importante : activer un skill ne transforme pas le modèle en automate.
  Les instructions du skill guident fortement le comportement, mais le modèle
  garde son jugement et ses règles de fond — ce n'est pas un contournement.

**Analogie.** Le commutateur d'activation = décider si l'outil est seulement
*posé sur l'établi* ou rangé au placard. Une fois posé : automatique = l'assistant
le prend de lui-même ; manuel = on le lui met dans la main en disant « sers-toi
de ça ».

**[ILLUSTRATION: 02-architecture-couches]** *(optionnelle ici)* — utile si la
personne demande « et ça arrive où ? » : montrer que le skill chargé atterrit
dans la couche conversation (voir Module 5). Sinon, réserver cette illustration
au Module 5.

**[ILLUSTRATION: 08-activation-skill]** — après avoir expliqué le commutateur
et les deux modes, pour fixer la structure d'ensemble.

**Piège à éviter.** Penser que le menu et l'auto-déclenchement sont des
mécanismes opposés : c'est juste *qui appuie sur le bouton* (le modèle ou
l'utilisateur).

**Transition.** « Mais concrètement, *comment* le modèle charge-t-il le
fichier ? Pas de magie — on descend d'un cran. »

---

## Module 3 — Comment le modèle l'invoque

**Objectif.** Casser l'illusion d'une « fonction magique » : un skill se charge
avec les outils ordinaires.

**Script.**
- Il n'existe **pas** de fonction `invoke_skill()` dédiée. Un skill n'est pas un
  appel d'outil au sens classique.
- Deux couches :
  - **Découverte** (toujours active) : l'environnement d'exécution (le
    *harness*, la couche d'orchestration autour du modèle) injecte une **liste
    des skills disponibles** réduite à `name` + `description` + chemin sur le
    disque. Léger. Permet de *savoir qu'un skill existe* et *où*.
  - **Activation** (à la demande) : pour lire les instructions complètes, le
    modèle **lit le fichier** via un appel d'outil ordinaire (lecture de
    fichier / `view` / `cat`). Le contenu entre alors dans le contexte. Puis il
    *applique* ces instructions — il n'y a pas de moteur qui « exécute » le
    skill, c'est du texte qu'on lit et qu'on suit.
  - Les ressources (`references/…`) se chargent pareil, par une nouvelle
    lecture, quand une étape le demande. Les `scripts/` s'exécutent via l'outil
    bash.
- Contraste éclairant avec le *function calling* classique (MCP, recherche
  web) : là, le modèle émet un bloc structuré `tool_use` (nom + arguments JSON),
  le harness exécute, renvoie un `tool_result`. Un skill réutilise *ce même
  canal* (lire un fichier) — aucune primitive nouvelle. D'où la formule : « un
  skill, c'est juste un dossier ».
- Invocation par le menu : c'est le harness, en amont, qui marque le skill
  comme sélectionné et veille à transmettre son contenu — parfois sans que le
  modèle ait à émettre le moindre appel d'outil.

**Analogie.** Le harness, c'est l'assistant de plateau : il pose les fiches
utiles sur le bureau (découverte), et quand l'acteur en demande une, il va la
chercher dans l'armoire (activation).

**[ILLUSTRATION: 10-comment-le-modele-charge]** — à afficher après avoir
distingué les deux couches (découverte / activation), pour matérialiser le
parcours harness → disque → contexte.

**Piège à éviter.** Chercher un « token spécial skill ». Il n'y en a pas — voir
Module 4 pour ce qui fait *vraiment* réagir le harness.

**Transition.** « Tu veux voir ça au niveau le plus bas, token par token ? »

---

## Module 4 — Vu de très près : la chaîne de tokens

**Objectif.** Voir, au niveau token, ce qui se passe quand un skill se charge.

**Prérequis de vocabulaire.**
- *Tokenizer* : le découpeur qui transforme le texte en *tokens* (morceaux de
  mots, souvent via l'algo BPE). Un mot = 1 à plusieurs tokens.
- *Token de contrôle* (special token) : un token réservé qui n'est pas du texte
  mais une **balise de structure** (début de tour, rôle, frontière d'appel
  d'outil). Identifiant atomique, pas une suite de lettres.
- Avertissement à dire à voix haute : les tokens de contrôle **exacts** de
  Claude sont propriétaires. On utilise des étiquettes illustratives `<|...|>` ;
  la *structure* est fidèle, pas les identifiants précis.

**Script — les phases.**
0. **Déjà en contexte** : le harness a injecté la liste légère des skills
   (`name` + `description` + chemin) dans le bloc système. Pas le corps.
1. **Le message entre** : `<|user|> … <|end|>` puis `<|assistant|>` = le signal
   « à toi, modèle ».
2. **Décision de lire** : le modèle émet un **bloc d'appel d'outil** ordinaire :
   `<|tool_use_start|> {"name":"view","input":{"path":"…/SKILL.md"}}
   <|tool_use_end|>`. Le `<|tool_use_start|>` est **1 token de contrôle
   générique** (le même pour la recherche web, MCP…) — *pas* propre aux skills.
   Le JSON, ce sont des tokens de texte ordinaires. Le `<|tool_use_end|>` dit
   « j'ai fini, j'attends un résultat » → le harness **met la génération en
   pause**.
3. **Le harness agit** : il lit vraiment le fichier sur le disque, puis ré-injecte
   son contenu dans un bloc `<|tool_result_start|> … (tout le corps du SKILL.md)
   … <|tool_result_end|>`. **C'est le moment précis où le skill entre en
   contexte.** Avant : seulement la description. Après : les instructions
   complètes, devenues du texte ordinaire.
4. **Reprise** : `<|assistant|>` redonne la main ; le modèle applique les
   instructions. Plus tard, quand une étape réclame `references/guide.md`, on
   rejoue les phases 2-3 (2ᵉ vague de chargement progressif).

**Le point à retenir.** Aucun token n'est spécifique aux skills. Le seul
mécanisme qui fait réagir le harness est la paire générique
`<|tool_use_start|> … <|tool_use_end|>`, identique pour tous les outils.

**[ILLUSTRATION: 03-frise-tokens]** — à afficher après avoir énoncé les 4
phases, pour matérialiser le va-et-vient modèle ↔ harness et les pauses.

**Piège à éviter.** Confondre les tokens de *contrôle* (balises de structure) et
les tokens de *texte* (le JSON, le contenu). Les premiers pilotent le harness,
les seconds sont la charge utile.

**Transition.** « Ce contenu chargé va quelque part de précis. Voyons la carte
d'ensemble : la fenêtre de contexte. »

---

## Module 5 — L'architecture de la fenêtre de contexte

**Objectif.** Comprendre que la fenêtre de contexte est un grand document
réassemblé à chaque tour, fait de couches.

**Script.**
- La **fenêtre de contexte** = tout ce que le modèle « voit » en un seul coup
  d'œil au moment de répondre. Imagine un **grand document unique**, réassemblé
  **à neuf à chaque tour** par le harness.
- Deux propriétés : **taille plafonnée** (budget max en tokens ; au-delà, on
  tronque/résume) et **pas de mémoire entre les tours** (si une info n'est pas
  réinjectée, elle n'existe pas pour le modèle).
- Les couches, de la plus stable (haut) à la plus vivante (bas) :
  1. **Prompt système** — rédigé par Anthropic : identité, date, règles,
     formatage. Gros et quasi immuable.
  2. **Définitions d'outils** — fournies par la plateforme : la fiche technique
     de chaque outil (nom, rôle, paramètres).
  3. **En-têtes de skills** — catalogue allégé : `name` + `description` +
     chemin. Pas les corps.
  4. **En-têtes de connecteurs MCP** — services externes branchés (Gmail,
     Drive…) et leurs outils. *MCP* = Model Context Protocol, le standard pour
     brancher outils/données externes.
  5. **Mémoire** — faits *résumés* tirés des conversations passées (pas les
     transcriptions brutes).
  6. **Instructions personnalisées** — préférences permanentes + style
     d'écriture, pilotées par l'utilisateur.
  7. **Instructions de projet** — consignes + base de connaissances propres au
     Projet (absente hors d'un Projet).
  8. **Conversation en cours** — l'échange réel : messages, fichiers, et les
     appels d'outils + leurs résultats (c'est ici qu'un `SKILL.md` lu
     s'insère !). Seule couche qui **grossit**.
- Regroupement par « qui pose la couche » : Anthropic (1), la plateforme
  (2-3-4), les réglages de l'utilisateur (5-6-7), le live (8).

**Analogie.** Un bureau réorganisé à chaque tour : en haut les documents de
référence fixes, en bas la pile de courrier du jour qui s'épaissit.

**[ILLUSTRATION: 02-architecture-couches]** — à afficher après avoir listé les
couches, pour montrer l'empilement et le code couleur par source.

**Piège à éviter.** Croire que la mémoire = un historique complet. C'est une
synthèse, partielle et faillible.

**Transition.** « Et tout ça, ça pèse combien ? »

---

## Module 6 — Combien ça pèse (ordres de grandeur)

**Objectif.** Donner des ordres de grandeur honnêtes et la bonne intuition de
proportions.

**Script.**
- Conversion utile : pour Claude, **~4 caractères par token**, soit **~1,5 token
  par mot** (le français est un peu plus dense).
- **Le socle (couches système → projet) est quasi stable** d'un tour à l'autre :
  - **Système + outils : ~24 000 tokens** (mesuré, fuite 2025 ; le prompt
    système *publié* seul, sans outils, fait ~3 000–3 500 — la différence vient
    des **schémas d'outils**, qui pèsent très lourd).
  - En-têtes de skills : ~1 500–2 500. En-têtes MCP : ~1 000–3 000.
  - Mémoire : ~200–500. Instructions perso : ~150–250. Projet : ~quelques
    centaines à quelques milliers.
- **La couche conversation, elle, dépend de la *profondeur* du chat** (c'est la
  seule qui grossit) — c'est pourquoi un chiffre unique serait trompeur :
  - Tout début (accueil + menu) : **~500 tokens**.
  - Quand le skill est chargé (`SKILL.md` lu) : **+~3 500** ; quand le
    guide/référence est chargé : **+~3 800**.
  - Après quelques échanges : **+~2 000 à 5 000**.
  - **Session pédagogique complète : ~10 000–15 000** au total.
  - Marathon (des dizaines de prompts d'affilée) : peut **dépasser
    30 000–50 000**.
  - → Le repère « ~12 000 » vaut pour une *session complète* : au 1ᵉʳ message,
    on est 20 à 25 fois plus bas.
- **Les pièces jointes s'ajoutent dans cette couche conversation — et peuvent
  tout dominer** :
  - Texte collé : **~500–1 000 tokens / page**.
  - **PDF : très variable**, de quelques milliers à des dizaines de milliers (un
    PDF de ~30 pages denses ≈ **55 000–60 000 tokens** à lui seul).
  - Image : **~quelques centaines à ~1 600 tokens** selon la résolution.
  - Une seule grosse pièce jointe peut peser **plus que tout le reste réuni** →
    c'est le principal **accélérateur de débordement** (Module 7).
- **Fenêtre de contexte** (à jour) : jusqu'à **500 000 tokens** en chat (modèles
  récents, offres payantes), et **1 million** via l'API ou Claude Code.
  (L'ancien repère de 200k a été dépassé.)
- Lecture des proportions : hors grosse pièce jointe, le **socle système+outils
  écrase tout le reste** ; une session complète n'occupe qu'une **petite
  fraction** (~8 %) d'une fenêtre de 500k. Les réglages personnels ne sont que
  de fins liserés. Mais une grosse PJ peut renverser cette image d'un coup.

**Honnêteté.** Ces chiffres viennent de sources publiques/mesures et grossissent
avec le temps ; ce sont des ordres de grandeur, pas des valeurs officielles. Les
pièces jointes, surtout, varient énormément selon leur contenu.

**[ILLUSTRATION: 05-remplissage-fenetre]** — d'abord, pour montrer qu'on
n'occupe qu'une petite fraction de la fenêtre.
**[ILLUSTRATION: 04-composition-tokens]** — ensuite, pour zoomer sur la
répartition des tokens utilisés (socle ~24k dominant).

**Piège à éviter.** Confondre la *taille de la fenêtre* (capacité totale) et la
*place réellement occupée*. En conversation normale on a beaucoup de marge et
l'enjeu n'est pas la place — *sauf* grosse pièce jointe, qui peut, elle, vraiment
remplir la fenêtre.

**Transition.** « Si on a tant de marge, pourquoi parler de surcharge ?
Justement… »

---

## Module 7 — Débordement & hygiène du contexte

**Objectif.** Comprendre ce qui se passe quand le contexte est plein, et en
tirer une règle pratique.

**Script — débordement.**
- La fenêtre a une **taille max** non négociable. Quand le total dépasserait le
  plafond, quelque chose doit disparaître *avant* la génération.
- En API brute : la requête est **rejetée** (erreur).
- En interface de chat : le harness gère, via deux stratégies —
  - **Troncature** (fenêtre glissante) : on coupe les tours **les plus anciens**
    (premier entré, premier sorti). Le socle stable est préservé ; c'est le
    *début* de la conversation qui sort.
  - **Compaction/résumé** : on remplace les vieux échanges par un condensé.
- Conséquences : oublis d'anciennes consignes, contradictions, infos
  redemandées. Et, plus subtil, l'effet « *perdu au milieu* » (*lost in the
  middle*) : même sans débordement, le milieu d'un très long contexte est moins
  fiablement pris en compte.

**Script — hygiène du contexte.** Pourquoi n'activer que le nécessaire :
- **Coût « place »** : chaque skill (~50–150 tokens d'en-tête) et surtout chaque
  connecteur MCP (souvent des centaines à des milliers de tokens de schémas)
  pèse de façon **permanente** dans le socle, qu'on s'en serve ou non.
- **Coût « bruit »** (le plus important) : trop d'outils disponibles = plus de
  risque de **mauvais choix d'outil**, d'**attention diluée**, et de **conflits
  d'instructions**. Un contexte épuré rend le modèle plus précis et prévisible.
- **Règle pratique** : on n'active pas une bibliothèque, mais une **trousse
  adaptée à la tâche**. « **Un contexte = une intention**. » Concrètement, cela
  se règle via le **commutateur d'activation** de chaque skill (Customize →
  Compétences, cf. Module 2) et l'activation/désactivation des connecteurs MCP :
  on coupe ce qui ne sert pas à la tâche du moment.
- Nuance : ce n'est pas « le moins possible » dogmatiquement. Si une tâche a
  besoin de trois connecteurs, il faut les trois. Le principe est
  l'**adéquation**, pas la frugalité.

**Analogie.** Un plan de travail de cuisine : sortir tous les ustensiles « au
cas où » encombre et ralentit ; on sort ceux de la recette du jour.

**[ILLUSTRATION: 06-debordement]** — à afficher en expliquant la fenêtre
glissante (socle préservé, plus ancien éjecté, nouveau tour entrant).

**Piège à éviter.** Croire que « grande fenêtre = on peut tout activer ». La
capacité n'est pas le problème ; la **propreté** du contexte l'est.

**Clôture.** Résume le fil : un skill est un dossier de texte → chargé par une
lecture de fichier ordinaire → qui atterrit dans la couche conversation d'une
fenêtre faite de couches → laquelle a un plafond → d'où l'intérêt de ne
charger que l'utile.
