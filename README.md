# 🪵 Geppetto — Comprendre la mécanique des Skills

<p align="center">
  <img src="public/Geppetto.jpg" alt="Geppetto, tuteur pédagogique sur la mécanique des Skills de Claude" width="320">
</p>

**Geppetto** est un chatbot tuteur, propulsé par l'IA Google Gemini, qui explique de façon simple et progressive **comment fonctionnent les Skills de Claude et la fenêtre de contexte**.

👀 **Exemple en ligne** : [geppetto-mecanique-des-skills.netlify.app](https://geppetto-mecanique-des-skills.netlify.app/)

## 🎯 Objectif pédagogique

Vulgariser, pour un public curieux mais non spécialiste, la mécanique interne des Skills de Claude. Geppetto s'adapte au niveau de l'apprenant (Débutant · Intermédiaire · Avancé) et déroule un **cours structuré en 8 modules** (0 à 7) :

| Module | Sujet |
|---|---|
| 0 | À quoi servent les Skills, et pourquoi on les a inventés |
| 1 | Qu'est-ce qu'un Skill ? (dossier + `SKILL.md`) |
| 2 | Comment un Skill se déclenche (activation, auto vs manuel) |
| 3 | Comment le modèle l'invoque (le *harness*) |
| 4 | Vu de près : la chaîne de tokens (`tool_use` / `tool_result`) |
| 5 | L'architecture en couches de la fenêtre de contexte |
| 6 | Combien ça pèse (ordres de grandeur en tokens) |
| 7 | Débordement & hygiène du contexte |

Chaque notion est illustrée par un schéma SVG dédié.

## 🛠️ Stack technique

| Couche | Technologies |
|---|---|
| **Frontend** | React 19 · Vite 6 · TailwindCSS 4 |
| **Serveur (dev local)** | Express (`server.ts`, lancé via `tsx`) |
| **Backend (production)** | Netlify Functions (`netlify/functions/chat.ts`) |
| **IA** | Google Gemini API ([`@google/genai`](https://www.npmjs.com/package/@google/genai)) |
| **Hébergement** | Netlify |

> 🔒 **Sécurité** : la clé API Gemini n'est **jamais** exposée côté client. Elle reste sur le serveur (variable d'environnement `API_KEY`), qui relaie les appels à l'API.

## 🚀 Lancer le projet en local

### Prérequis
- [Node.js](https://nodejs.org/) (version 18 ou supérieure)
- Une clé API Google Gemini → [aistudio.google.com](https://aistudio.google.com/) → *Get API key*

### Étapes

```bash
# 1. Installer les dépendances
npm install

# 2. Créer le fichier d'environnement à partir de l'exemple
cp .env.example .env
```

Puis ouvre `.env` et renseigne ta clé :

```ini
API_KEY="ta_cle_gemini_ici"
```

```bash
# 3. Démarrer le serveur de développement
npm run dev
```

👉 L'application est disponible sur **http://localhost:3000**

> Le serveur Express sert à la fois le frontend (via le middleware Vite, avec rechargement à chaud) et l'API de chat sur la route `/api/chat`.
> ⚠️ Toute modification de `server.ts`, des fichiers `src/content/*` ou de `ai-config.json` nécessite un **redémarrage** du serveur.

## 📂 Personnaliser le contenu

Tout le contenu du tuteur est centralisé dans `src/content/`, sans toucher au code :

| Fichier | Rôle |
|---|---|
| `identity.json` | Identité du bot (nom, avatar, persona, anecdote « easter egg ») |
| `instructions.md` | Le prompt système : règles, persona, périmètre, format des réponses |
| `experiences.md` | Le programme du cours (curriculum des 8 modules) |
| `portfolio.md` | Ressources pratiques & guides d'installation |

Le choix du modèle Gemini et la température se règlent dans `ai-config.json` à la racine.

## ⚖️ Licence

Ce projet est distribué sous **double licence** :
- **Open source / non commercial** → [GPL v3](https://www.gnu.org/licenses/gpl-3.0.html)
- **Usage commercial** → Licence commerciale requise

📩 Pour toute demande d'usage commercial : lecinquiemejour@gmail.com

## ✍️ Auteur

**Jean-Noël Lefebvre** — [LinkedIn](https://www.linkedin.com/company/le-5-%C3%A8me-jour/) · [GitHub](https://github.com/lecinquiemejour-code) · lecinquiemejour@gmail.com
