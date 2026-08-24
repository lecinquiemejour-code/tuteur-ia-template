# 🎓 Tuteur IA — le template

<p align="center">
  <img src="public/Geppetto.jpg" alt="Geppetto, le tuteur livré en démonstration" width="280">
</p>

**Crée ton propre tuteur pédagogique interactif** : un chatbot qui enseigne *ton* sujet, à *ton* public, avec *tes* schémas, hébergé en ligne à ton adresse.

Tu n'écris pas de code. Tu remplaces six fichiers de contenu.

👀 **Voir ce que ça donne** : [geppetto-mecanique-des-skills.netlify.app](https://geppetto-mecanique-des-skills.netlify.app/) — un tuteur qui explique le fonctionnement des Skills de Claude. C'est le cours de démonstration livré avec ce template : tu le remplaceras par le tien.

---

## Ce que le template sait faire

| | |
|---|---|
| 🎚️ **S'adapter au niveau** | L'apprenant annonce où il en est, le tuteur ajuste ses explications |
| 🖼️ **Illustrer** | Les schémas s'affichent au bon moment, agrandissables dans un volet latéral |
| 📚 **Suivre un programme** | Le cours avance module par module, avec des pauses de vérification |
| 🛡️ **Tenir son périmètre** | Il refuse les hors-sujet et résiste aux tentatives de manipulation |
| 🖨️ **S'imprimer** | La conversation entière s'exporte en PDF |
| 💸 **Coûter zéro** | Gemini, Netlify et GitHub suffisent en offre gratuite |

---

## Deux façons de démarrer

### 🐣 Tu débutes — le tutoriel guidé

Tu n'as jamais utilisé Git, ni installé Node, ni déployé un site ? C'est prévu. Le fichier **[`TUTORIAL.md`](TUTORIAL.md)** est un tutoriel que tu fais lire à un assistant IA : il t'accompagne pas à pas, de l'installation des outils jusqu'à la mise en ligne, en te demandant ton feu vert à chaque étape.

Tu n'écris aucune ligne de code. Tu réponds à des questions.

### 🚀 Tu es à l'aise — démarrage rapide

```bash
# 1. Clique sur « Use this template » en haut de cette page, puis :
git clone https://github.com/TON-COMPTE/TON-PROJET.git
cd TON-PROJET

# 2. Installe les dépendances
npm install

# 3. Crée ton fichier d'environnement et renseigne ta clé Gemini
cp .env.example .env      # puis ouvre .env et remplis API_KEY

# 4. Lance
npm run dev               # http://localhost:3000
```

La clé API se crée sur [Google AI Studio](https://aistudio.google.com/) → *Get API key*.

> 🔒 La clé n'est **jamais** exposée côté navigateur. Elle reste sur le serveur, qui relaie les appels.

---

## Adapter le tuteur à ton sujet

Tout se joue dans **`src/content/`**. Six fichiers, aucun code.

| Fichier | Ce que tu y mets |
|---|---|
| `programme.md` | **Ton cours**, module par module. C'est l'essentiel du travail. |
| `tuteur.json` | Nom du tuteur, avatar, contact, boutons de réponse rapide |
| `prompt-systeme.md` | Sa personnalité, son ton, son périmètre |
| `accueil.md` | Le premier message que voit l'apprenant |
| `ressources.md` | Les liens et documents qu'il peut recommander |
| `illustrations.md` | Quelle image afficher, et à quel moment |

Le dossier **[`examples/tuteur-vierge/`](examples/tuteur-vierge/)** contient ces six fichiers **vides et commentés**, avec une trame de module réutilisable. Copie-les par-dessus `src/content/` et remplis les cases — son README explique l'ordre conseillé.

**Tes images** vont dans `public/assets/`, et tu les déclares dans `illustrations.md`. Le format SVG est recommandé : quelques kilo-octets, net à tout zoom, et une IA sait en générer.

> ⚠️ Les fichiers de `src/content/` sont lus au démarrage du serveur. Après une modification, **relance `npm run dev`**.

---

## Mettre en ligne

1. **Pousse** ton dépôt sur GitHub
2. Sur [Netlify](https://www.netlify.com/) : *Add new site* → *Import an existing project* → choisis ton dépôt
3. **Déclare ta clé** : *Site configuration* → *Environment variables* → `API_KEY`
4. Déploie

Le fichier `netlify.toml` contient déjà la configuration : commande de build, dossier publié, et l'inclusion de `src/content/` dans le bundle de la fonction serveur.

Ensuite, chaque `git push` redéploie automatiquement.

---

## Structure du dépôt

```
src/content/          ← tes six fichiers de contenu
public/               ← ce que le visiteur voit (avatar, schémas)
  assets/             ← les illustrations du cours
examples/
  tuteur-vierge/      ← les gabarits à copier pour ton propre sujet
  skill-mecanique-... ← le skill Claude du cours de démonstration
src/App.tsx           ← l'interface
server.ts             ← serveur de développement local
netlify/functions/    ← la fonction serveur en production
_ressources-cours/    ← dépose ici ta matière première (PDF, notes…)
```

Les autres documents : [`ROADMAP.md`](ROADMAP.md) (évolutions envisagées), [`ABONNEMENTS_ET_LIMITES.md`](ABONNEMENTS_ET_LIMITES.md) (quotas et coûts), [`RESET-ENVIRONNEMENT.md`](RESET-ENVIRONNEMENT.md) (repartir de zéro).

---

## Sous le capot

| Couche | Technologies |
|---|---|
| **Interface** | React 19 · Vite 6 · TailwindCSS 4 |
| **Serveur local** | Express (`server.ts`, lancé via `tsx`) |
| **Serveur en production** | Netlify Functions (`netlify/functions/chat.ts`) |
| **IA** | Google Gemini, modèle et température réglables dans `ai-config.json` |
| **Hébergement** | Netlify |

---

## ⚖️ Licence

Double licence :

- **Open source / non commercial** → [GPL v3](https://www.gnu.org/licenses/gpl-3.0.html)
- **Usage commercial** → licence commerciale requise

📩 Demandes d'usage commercial : lecinquiemejour@gmail.com

## ✍️ Auteur

**Jean-Noël Lefebvre** — [LinkedIn](https://www.linkedin.com/company/le-5-%C3%A8me-jour/) · [GitHub](https://github.com/lecinquiemejour-code) · lecinquiemejour@gmail.com
