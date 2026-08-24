# AGENTS.md — consignes pour tout assistant IA travaillant sur ce projet

Ce fichier est la **source de référence** des règles de ce projet. Il est lu automatiquement par les assistants qui suivent la convention `AGENTS.md` (Codex et compatibles). `CLAUDE.md` y renvoie. Pour Antigravity, le contenu de la section « Règles de conduite » se copie dans les *Global rules* — la procédure est décrite dans `TUTORIAL.md`, Étape 3.

> ⚠️ Les règles de conduite ci-dessous sont reproduites dans `TUTORIAL.md` (Étape 3). **En cas de divergence, ce fichier fait foi.** Si tu modifies l'une des deux copies, mets l'autre à jour.

---

## 1. Ce qu'est ce projet

Un **template** permettant de créer un chatbot tuteur pédagogique : il enseigne un sujet, module par module, en s'adaptant au niveau de l'apprenant et en affichant des schémas au bon moment.

Le dépôt est livré avec un **cours de démonstration** (la mécanique des Skills de Claude, incarnée par un tuteur nommé Geppetto). Toute personne qui utilise le template remplace ce contenu par le sien.

Le public visé est **non technique**. Il est accompagné pas à pas par `TUTORIAL.md`, un tutoriel en 9 étapes destiné à être lu et joué par un assistant IA.

---

## 2. La règle structurante : contenu ≠ moteur

C'est la frontière qui organise tout le projet.

| | Où | Qui le modifie |
|---|---|---|
| **Le contenu** — ce que le tuteur enseigne | `src/content/` et `public/assets/` | L'utilisateur, à chaque adaptation |
| **Le moteur** — comment il l'enseigne | tout le reste | Rarement, et jamais sans raison |

**Conséquence pratique** : une demande du type « ajoute un module », « change le ton du tuteur », « affiche ce schéma » se traite **exclusivement** dans `src/content/`. Si tu te retrouves à modifier `App.tsx` pour répondre à une demande de contenu, tu as pris le mauvais chemin.

---

## 3. Architecture en 30 secondes

```
src/content/          les 6 fichiers de contenu (voir §4)
public/               ce que le visiteur voit : avatar, schémas
  assets/             les illustrations du cours
src/App.tsx           l'interface de chat (React)
src/services/ai.ts    appelle /api/chat, gère le streaming
server.ts             serveur de DÉVELOPPEMENT local (Express + Vite)
netlify/functions/    serveur de PRODUCTION (Netlify Function)
ai-config.json        modèle Gemini et température
examples/             gabarits vierges + skill de démonstration
```

**Le prompt système est assemblé à deux endroits** : `server.ts` pour le développement local, `netlify/functions/chat.ts` pour la production. Les deux lisent les mêmes fichiers de `src/content/` et produisent le même prompt. **Toute modification de l'assemblage doit être faite dans les deux fichiers**, sans quoi le comportement local et le comportement en ligne divergent.

---

## 4. Les six fichiers de contenu

| Fichier | Rôle |
|---|---|
| `programme.md` | Le cours, module par module. La seule matière que le tuteur connaît. |
| `prompt-systeme.md` | Sa personnalité, son ton, son périmètre, ses règles de sécurité |
| `tuteur.json` | Son nom, son avatar, son contact, ses boutons de réponse rapide |
| `accueil.md` | Le premier message affiché |
| `ressources.md` | Les liens qu'il peut recommander |
| `illustrations.md` | Le catalogue : quelle image afficher, à quel moment |

Trois variables sont substituées à l'assemblage, depuis `tuteur.json` :
`{{TUTEUR_NOM}}` · `{{TUTEUR_EMAIL}}` · `{{TUTEUR_LIEN}}`

---

## 5. Pièges connus

| Piège | Symptôme | Cause |
|---|---|---|
| **Serveur non redémarré** | Une modification de `src/content/` n'apparaît pas | Ces fichiers sont lus **au démarrage** du serveur, pas à chaud |
| **Image non déclarée** | Un schéma déposé dans `public/assets/` ne s'affiche jamais | Il faut AUSSI l'ajouter au catalogue `illustrations.md` |
| **Assemblage divergent** | Le tuteur se comporte différemment en local et en ligne | `server.ts` et `chat.ts` n'ont pas été modifiés tous les deux |
| **Deux SDK Gemini** | — | `server.ts` utilise `@google/genai`, `chat.ts` utilise `@google/generative-ai`. C'est ainsi, ne pas unifier sans demande explicite. |
| **Faux positifs du filtre** | Un message légitime est bloqué | `SUSPICIOUS_PATTERNS` filtre par sous-chaîne : `ACT AS` bloque « cont**act as**sistant » |

---

## 6. Règles de conduite

Ces règles encadrent ton comportement dans ce projet. Elles sont non négociables.

### GARDE-FOUS

**Règle 1 — Checkpoint obligatoire**
Ne jamais écrire ou modifier du code sans approbation explicite (« GO »).

**Règle 2 — Périmètre strict**
Ne modifie que ce qui est explicitement demandé.

**Règle 2b — Librairies et modèle AI intouchables**
Ne change JAMAIS la librairie AI (`@google/generative-ai` dans `chat.ts`, `@google/genai` dans `server.ts`), le modèle AI (`ai-config.json`), ni les dépendances `package.json` sans le GO explicite de l'utilisateur.

**Règle 2c — Le contenu vit dans `src/content/`**
Pour changer ce que le tuteur enseigne, modifie les fichiers de `src/content/`, jamais le code. Après CHAQUE modification de `src/content/`, rappelle à l'utilisateur de relancer `npm run dev`.

**Règle 3 — Réflexion avant action**
Avant de demander le « GO », explique ton raisonnement de manière pédagogique. Avant ET pendant chaque action, explique en termes simples CE QUE tu fais et POURQUOI. L'utilisateur doit comprendre et apprendre, même passivement.

### MÉTHODE DE TRAVAIL

**Règle 4 — Décomposition en sous-tâches**
Décompose chaque tâche complexe en étapes petites et séquentielles.

**Règle 5 — 3 options systématiques**
Propose 3 approches distinctes pour chaque modification significative.

**Règle 6 — Plan d'action dans la todo list**
Rédige un plan d'action détaillé avant chaque génération de code.

**Règle 7 — Todo list à jour en permanence**
Mets à jour la todo list en temps réel.

### QUALITÉ DU CODE

**Règle 8 — Simplicité d'abord (KISS)**
Privilégie toujours la solution la plus simple.

**Règle 9 — Rien de superflu (YAGNI)**
N'ajoute jamais de fonctionnalité non demandée.

**Règle 10 — Code modulaire**
Structure le code de manière modulaire (un fichier par responsabilité).

**Règle 11 — Logs de débogage détaillés**
Ajoute des `console.log` explicites à chaque étape clé.

**Règle 12 — Commentaires utiles**
Explique le POURQUOI (intention) plutôt que le QUOI.

### POSTURE

**Règle 13 — Communication pédagogique**
Explique chaque décision technique en termes accessibles.

### ENVIRONNEMENT

**Règle 14 — PowerShell**
PowerShell n'accepte pas `&&`. Utilise `;` pour enchaîner les commandes.

### MODE TUTORIEL INTERACTIF

**Règle 15 — Lire le fichier TUTORIAL.md au démarrage**
Au démarrage de ce projet, lis le fichier `TUTORIAL.md` et adopte le rôle d'assistant tutoriel interactif qui y est décrit. Guide l'utilisateur étape par étape.

---

## 7. Commandes

```bash
npm install     # installer les dépendances
npm run dev     # serveur local sur http://localhost:3000
npm run build   # compiler pour la production
npm run lint    # vérification TypeScript (tsc --noEmit)
```

Une clé API Gemini doit être présente dans `.env` sous la forme `API_KEY="..."`. Ce fichier n'est jamais commité.
