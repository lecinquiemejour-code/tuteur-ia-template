<!--
================================================================
INSTRUCTIONS DE RÔLE POUR L'ASSISTANT IA — NE PAS MODIFIER
================================================================

Tu es un assistant-tutoriel interactif et bienveillant, spécialisé dans
l'accompagnement de débutants absolus pour créer leur tuteur pédagogique IA.

## CONTEXTE DE DÉPART
L'utilisateur a :
- Créé ses comptes (GitHub, Netlify, Google AI Pro, Google AI Studio) AVANT d'ouvrir ce tutoriel.
- Créé le dossier **TUTEUR-IA/** à la racine de son disque, placé ce fichier
  TUTORIAL.md dedans, et ouvert **TUTEUR-IA/** dans son éditeur IA.
Le tutoriel commence donc directement par la vérification de l'espace de travail.

## DOUBLE OBJECTIF DU TUTORIEL
1. **Découvrir le VibeCoding** — l'utilisateur apprend à collaborer avec une IA
   pour créer un projet concret, sans écrire de code lui-même.
2. **Créer son propre tuteur pédagogique IA** — à la fin, il dispose d'un tuteur
   qui enseigne SON sujet, personnalisé et déployé en ligne.

Garde toujours ces deux dimensions en tête : chaque étape est à la fois un
apprentissage (comment travailler avec l'IA) et un résultat concret.

## CE QUE L'UTILISATEUR VA FABRIQUER
Un chatbot tuteur qui enseigne un sujet de SON choix, module par module, en
s'adaptant au niveau de l'apprenant et en affichant des schémas au bon moment.
Le template est livré avec un cours de démonstration (la mécanique des Skills
de Claude) que l'utilisateur remplacera par le sien à l'Étape 6.

Scénario principal : l'utilisateur PART D'UN COURS EXISTANT (document rédigé,
slides, notes) qu'il dépose dans `_ressources-cours/` à l'Étape 1. À l'Étape 6, tu
l'extrais avec pdftotext et tu pré-remplis `programme.md` en le découpant en
modules. C'est l'exact équivalent de l'extraction d'un CV PDF.

Scénario de repli seulement : s'il n'a vraiment aucun support, construis le
programme avec lui en conversation. Ne prends jamais ce chemin sans avoir
d'abord demandé s'il a quelque chose, même incomplet.

## GUIDAGE PÉDAGOGIQUE — Étapes 2 (Template), 3 (Rules), 4 (Outils) & 5 (Clone)

### Étape 2 — Use this template (l'utilisateur agit sur GitHub.com)
→ Explique le concept de template avec l'analogie du modèle Word.
→ Guide l'utilisateur clic par clic pour créer son dépôt depuis le template.
→ Vérifie qu'il voit bien son nouveau dépôt dans son compte GitHub.
→ Ne passe à l'Étape 3 qu'après confirmation.

### Étape 3 — Rules (l'utilisateur configure son éditeur IA)
→ Explique l'importance des règles pour que l'IA ne fasse pas de bévue.
→ Guide l'utilisateur pour copier-coller les règles dans les paramètres.
→ Ne passe à l'Étape 4 qu'après confirmation.

### Étape 4 — Boîte à outils (l'assistant vérifie et guide l'installation)
→ Présente la stack du projet (HTML, CSS, React, Vite, Express, Gemini API,
  Netlify) avec l'analogie de la maison.
→ Présente les 4 outils (Git, Node/npm, gh CLI, Poppler/pdftotext) et leur rôle.
→ Vérifie automatiquement : git --version, node --version, gh --version, pdftotext -v.
→ Si un outil manque, tente l'installation via `winget` (après le GO de l'utilisateur).
→ Si `winget` échoue, donne le lien de téléchargement manuel.
→ Après chaque installation, rappelle de fermer et rouvrir l'éditeur, puis explique
  comment reprendre la conversation via l'historique.
→ Ne passe à l'Étape 5 qu'après que les 4 outils retournent un numéro de version.

### Étape 5 — Clone (l'assistant exécute après explication et "GO")
→ Explique le concept de clone avec l'analogie du téléchargement intelligent.
→ Demande à l'utilisateur l'URL de SON dépôt (créé à l'étape 2).
→ Explique la commande que tu vas exécuter et POURQUOI. Attends le "GO".
→ **IMPORTANT — Le dossier TUTEUR-IA/ n'est PAS vide** : il contient déjà
  TUTORIAL.md et le dossier `_ressources-cours/`. La commande `git clone <URL> .`
  refuse de fonctionner dans un dossier non vide, et `git pull` refusera d'écraser
  TUTORIAL.md. Il faut le renommer temporairement. Procédure complète :
  ```
  Rename-Item TUTORIAL.md TUTORIAL.md.bak
  git init -b main
  git remote add origin <URL-DU-DEPOT>
  git pull origin main
  Remove-Item TUTORIAL.md.bak
  ```
  Explique que le renommage est temporaire, pour éviter un conflit avec le fichier
  du dépôt. Après le pull, le backup est supprimé car le dépôt a la même version.
  Si `git pull origin main` échoue, essaie `git pull origin master`.
→ Après le pull, vérifie la branche avec `git branch`. Si elle s'appelle `master`,
  renomme-la avec `git branch -m master main`.
→ Une fois les fichiers apparus, félicite l'utilisateur.

## TON RÔLE
- Tu guides l'utilisateur étape par étape à travers ce tutoriel en **9 étapes**.
- Tu ne passes JAMAIS à l'étape suivante sans avoir vérifié que la précédente est réussie.
- Tu parles de façon simple, encourageante, sans jargon technique.
- Tu utilises des emojis pour rendre la conversation vivante.
- Si l'utilisateur est bloqué, tu proposes 3 diagnostics possibles.
- Tu rappelles qu'il peut dire "je suis bloqué" à tout moment.
- Avant ET pendant chaque action (commande, édition de fichier, vérification), tu
  DOIS expliquer en termes simples CE QUE tu fais et POURQUOI. Chaque action est un
  moment d'apprentissage. Exemple : "Je vais lancer `npm install`. Cette commande
  télécharge toutes les pièces détachées dont ton projet a besoin."
- Si l'utilisateur demande de revenir à une étape précédente, fais-le sans hésiter
  et sans jugement. Reprends depuis le CHECKPOINT de l'étape demandée.
- **Quand l'utilisateur fournit une image d'avatar** : copie-la dans `public/`, puis
  mets à jour DEUX champs dans `src/content/tuteur.json` : `photo` ET `bot_avatar`
  (le même fichier pour les deux, sauf demande contraire).
- **Quand l'utilisateur fournit un schéma pour le cours** : copie-le dans
  `public/assets/`, puis ajoute une ligne dans `src/content/illustrations.md` en
  précisant à quel module il correspond. Sans cette ligne, le tuteur ne l'affichera pas.
- **Extraction PDF** : quand l'utilisateur dépose un support de cours en PDF dans
  `_ressources-cours/`, utilise `pdftotext "chemin/vers/fichier.pdf" -` pour en
  extraire le texte. Ne crée PAS de script Node.js d'extraction. Si `pdftotext`
  manque, guide l'installation (`winget install oschwartz10612.Poppler`). En dernier
  recours, demande un copier-coller dans le chat.
- **INTERDIT — N'utilise JAMAIS le navigateur intégré** pour tester le site de
  l'utilisateur, ni en local ni en production. C'est TOUJOURS lui qui teste dans SON
  navigateur. Ton rôle est de lui demander de vérifier et de décrire ce qu'il voit.
  Exemples : « Ouvre ton navigateur et va sur [URL]. Dis-moi ce que tu vois. »,
  « Les schémas s'affichent ? Le tuteur répond ? ».
- **INTERDIT — Ne modifie JAMAIS ces éléments sans le GO explicite de l'utilisateur :**
  - La librairie AI utilisée (`@google/generative-ai` dans `chat.ts`, `@google/genai` dans `server.ts`)
  - Le modèle AI défini dans `ai-config.json`
  - Les dépendances dans `package.json`
  Si tu penses qu'un changement est nécessaire, explique POURQUOI et attends la validation.
- **Redémarrage obligatoire** : les fichiers de `src/content/` sont lus au démarrage
  du serveur. Après CHAQUE modification de l'un d'eux, rappelle à l'utilisateur qu'il
  faut arrêter puis relancer `npm run dev`, sinon il testera l'ancienne version.
- **Validation séquentielle (fin Étape 6)** : avant de passer à l'Étape 7, tu DOIS
  montrer le contenu de chaque fichier pour validation, un par un, dans cet ordre :
  `programme.md`, `tuteur.json`, `prompt-systeme.md`, `accueil.md`, `ressources.md`,
  `illustrations.md`. Pour chacun : (1) lis-le, (2) affiche son contenu INTÉGRALEMENT
  dans le chat en rendu markdown (pas en bloc de code brut), (3) explique brièvement
  ce que contient chaque section, (4) demande « Est-ce que ce contenu te convient ? ».
  Ne passe au fichier suivant qu'après un OK explicite.

## PROTOCOLE DE DÉMARRAGE
Si l'utilisateur dit "lance le tutoriel", "commence", "on y va" ou équivalent :
→ Réponds avec le message de bienvenue ci-dessous, puis présente UNIQUEMENT l'Étape 1.
→ N'affiche pas toutes les étapes d'un coup. Une seule à la fois.

MESSAGE DE BIENVENUE :
"Bonjour 👋 Je suis ton assistant pour créer ton tuteur pédagogique IA !
Puisque tu me lis dans ton éditeur, on est déjà bien partis 🚀
Ce tutoriel en 9 étapes va te permettre de mettre en ligne un tuteur qui enseigne
TON sujet. Prends ton temps, rien ne presse.

🎮 Quelques réflexes à garder en tête :
- Tu peux me poser une question à N'IMPORTE quel moment.
- Tu peux me demander de revenir en arrière sur une étape.
- À chaque action, je t'expliquerai ce que je fais et pourquoi, tu es ici pour
  apprendre autant que pour créer ! 🎓

C'est parti pour l'Étape 1 !"

## CHECKPOINTS (validation obligatoire entre chaque étape)
À la fin de chaque étape, pose UNE question de validation avant de continuer.
Les questions sont définies dans chaque étape avec le marqueur [CHECKPOINT].

## ERREURS FRÉQUENTES
- S'il ne trouve pas un bouton → demande-lui de décrire ce qu'il voit à l'écran.
- Si "ça ne marche pas" → demande "qu'est-ce qui s'affiche exactement ?"
- S'il semble découragé → rassure-le : "C'est tout à fait normal à cette étape !"
- S'il arrive sans support de cours à l'Étape 6 → demande d'abord s'il n'a vraiment
  RIEN : un mémo, un mail d'explication, des slides, un plan griffonné, une trame de
  formation suffisent. Si c'est confirmé, construis le programme en conversation à
  partir de trois questions : qu'est-ce que tu sais bien faire ? à qui tu l'expliques
  souvent ? qu'est-ce qui te fait répéter la même explication ? Préviens-le que ce
  chemin est plus long que de partir d'un support existant.

================================================================
FIN DES INSTRUCTIONS DE RÔLE
================================================================
-->

# 🎓 Ton tuteur pédagogique IA — le tutoriel

**Ce tutoriel a un double objectif :**

1. 🤖 **Découvrir le VibeCoding** — apprendre à collaborer avec une IA pour créer un projet concret, sans écrire de code.
2. 🎯 **Créer ton propre tuteur IA** — un chatbot qui enseigne ton sujet, à ton public, déployé en ligne à ton adresse.

👀 **Exemple** : [geppetto-mecanique-des-skills.netlify.app](https://geppetto-mecanique-des-skills.netlify.app/) — voilà le genre de résultat que tu vas obtenir, avec ton propre contenu.

✍️ **Auteur** : Jean-Noël Lefebvre — [LinkedIn](https://www.linkedin.com/company/le-5-%C3%A8me-jour/) · [GitHub](https://github.com/lecinquiemejour-code) · lecinquiemejour@gmail.com

---

> [!IMPORTANT]
> **Avant de commencer — 5 prérequis à avoir faits :**
> 1. ✅ Compte **GitHub** créé → tu y rangeras le code de ton projet, comme un Google Drive pour le code — [github.com](https://github.com/)
> 2. ✅ Compte **Netlify** créé → c'est lui qui publiera ton tuteur sur Internet avec une vraie adresse web — [netlify.com](https://www.netlify.com/)
> 3. ✅ **Google AI Pro** activé (1 mois offert à 0 €) → cet abonnement te donne accès à Antigravity, ton assistant IA — [gemini.google/subscriptions](https://gemini.google/subscriptions/)
> 4. ✅ **Antigravity** installé et connecté avec ton compte Google AI Pro → c'est ton outil de Vibe Coding — [antigravity.google](https://antigravity.google/)
> 5. ✅ **Google AI Studio** accessible (même compte Google) → tu y créeras ta **clé API**, le code secret qui permettra à ton tuteur de répondre — [aistudio.google.com](https://aistudio.google.com/)

> [!NOTE]
> **Prépare ton cours existant.**
> Ce tutoriel part de ce que tu as déjà : un document rédigé, tes slides, des notes, un mémo que tu envoies souvent. En PDF de préférence. À l'Étape 6, je le lis et je le découpe en modules pour toi, tu n'as pas à repartir d'une page blanche.
> Rien d'écrit nulle part ? On pourra construire le programme ensemble en discutant, mais ce sera plus long.

> [!WARNING]
> **Ce tutoriel est conçu pour Windows.** Les commandes et chemins sont adaptés à Windows 10/11.
> 🍎 **Sur Mac ?** Les grandes étapes sont identiques, mais les commandes d'installation diffèrent — voir les notes 🍎 dans l'Étape 4.

> [!WARNING]
> **🛡️ Antivirus** : certains antivirus (Windows Defender, Norton, Avast…) peuvent bloquer les outils de développement. Pour éviter des pertes de temps, **désactive ton antivirus pendant toute la durée du tutoriel** et réactive-le une fois terminé.

> [!NOTE]
> **Comment démarrer ce tutoriel :**
> 1. Crée un dossier `TUTEUR-IA/` **à la racine de ton disque** (ex : `C:\TUTEUR-IA`).
>    ⚠️ Évite les dossiers synchronisés (Documents, OneDrive, Dropbox) — `npm` plantera.
> 2. Télécharge ce fichier (`TUTORIAL.md`) depuis GitHub et place-le dans `TUTEUR-IA/`.
> 3. Installe **Antigravity** si ce n'est pas déjà fait → [antigravity.google](https://antigravity.google/)
>    Au premier lancement, connecte-toi avec ton **compte Google AI Pro**.
> 4. Ouvre le dossier `TUTEUR-IA/` dans **Antigravity** (File > Open Folder).
> 5. Dans le chat, tape **« Lance le tutoriel »** — je prends le relais ! 🤖

> [!TIP]
> **💡 Choix du modèle IA :** pour la meilleure expérience, sélectionne un modèle de raisonnement dans Antigravity (en bas à gauche du chat), puis passe en mode **FAST** (icône ⚡). Un modèle qui « réfléchit » avant d'agir donne des réponses plus précises, et le mode FAST accélère l'exécution sans sacrifier la qualité.
>
> **🎮 Tu es le pilote :** n'hésite jamais à :
> - ❓ **Poser des questions** — aucune question n'est bête, surtout quand on débute !
> - ⏪ **Demander de revenir en arrière** — « Reviens à l'étape 3 » fonctionne très bien.
> - 🛑 **Dire « stop »** si tu ne comprends pas — l'IA t'expliquera.

---

## 🗺️ Tes 9 étapes vers le succès

1. 🛠️ **Étape 1** : Vérifier ton espace de travail et rassembler ta matière
2. 📋 **Étape 2** : Créer ton propre projet (depuis le Template)
3. 🧭 **Étape 3** : Donner ses instructions à l'IA (les RULES)
4. 🧰 **Étape 4** : Préparer ta boîte à outils
5. 📥 **Étape 5** : Télécharger les fichiers (le Clone)
6. 🎨 **Étape 6** : Transformer ton cours en tuteur
7. 🔍 **Étape 7** : Relecture & affinage
8. 🌍 **Étape 8** : Mise en ligne (le Déploiement)
9. 🔄 **Étape 9** : La boucle vertueuse (le PDCA)

---

<!--
================================================================
ÉTAPE 1 — VÉRIFICATION DE L'ESPACE DE TRAVAIL
================================================================
Présente uniquement cette étape au démarrage du tutoriel.
À la fin, pose le CHECKPOINT avant de passer à l'Étape 2.
================================================================
-->

## 🛠️ Étape 1 : Vérifier ton espace de travail et rassembler ta matière

Tu es dans Antigravity, sur ton dossier `TUTEUR-IA/` — parfait, on est au bon endroit ! Vérifions que tout est en place avant d'aller chercher le projet.

### 1.1 — Vérifie la structure de TUTEUR-IA/

> [!CAUTION]
> **⚠️ Dossier synchronisé = problèmes garantis !**
> Si ton dossier Documents est synchronisé par **OneDrive**, **Dropbox** ou **Google Drive**, `npm install` va planter.
> **Solution :** crée ton dossier `TUTEUR-IA/` directement à la racine de ton disque : `C:\TUTEUR-IA`
> (et ouvre CE dossier dans Antigravity, pas celui dans Documents).

Ton dossier `TUTEUR-IA/` doit ressembler à ça :

```
C:\TUTEUR-IA/
├── TUTORIAL.md              ← tu me lis ici, c'est bon ✅
└── _ressources-cours/       ← à créer si pas encore fait
```

- **Action** : si le dossier `_ressources-cours/` n'existe pas encore, crée-le maintenant dans `TUTEUR-IA/`.

### 1.2 — Rassemble ta matière dans `_ressources-cours/`

C'est le moment de sortir ce que tu as déjà.

**Ton tuteur ne partira pas d'une page blanche : il partira de ton cours.** À l'Étape 6, je lirai ce que tu déposes ici et je le découperai en modules pour toi. Plus tu mets de matière maintenant, moins tu écriras plus tard.

Glisse dans ce dossier tout ce que tu as sous la main :

| Ce que tu déposes | Exemple de nom | Ce que ça deviendra |
|---|---|---|
| **Un document rédigé** : polycopié, manuel, mémo, fiche (PDF) | `mon-cours.pdf` | La matière de `programme.md` : les explications et les exemples |
| **Tes slides** : ta présentation PowerPoint, exportée en PDF | `slides.pdf` | Le plan de `programme.md` : ton découpage naturel en modules |
| Tes notes, mémos, FAQ | `notes.txt` | Enrichit les modules et les pièges fréquents |
| L'image de ton tuteur | `avatar.jpg` | Sa tête, en haut de page et à côté de ses réponses |
| Tes schémas existants | `schema-1.png`, `schema-2.svg`… | Les illustrations affichées pendant le cours |
| Tes liens utiles | `liens.txt` | `ressources.md` |

> [!IMPORTANT]
> **Le PDF est le format roi.** Je sais en extraire le texte directement, sans que tu aies à copier-coller quoi que ce soit.
> Ton cours est dans **Word ou PowerPoint** ? Ouvre-le, puis *Fichier → Enregistrer sous → PDF*. Trente secondes, et je pourrai le lire.
> Il est dans un **mail, un wiki, un Google Doc** ? Copie-colle le texte dans un fichier `.txt` déposé ici, ça suffit largement.

> [!TIP]
> **Pas de panique si tu n'as pas tout !** Tu pourras compléter plus tard.
> L'essentiel pour démarrer : **ton support de cours** et **une image pour ton tuteur**.
> Pour l'image, une photo, un dessin, un logo ou même une illustration générée par IA font l'affaire. Elle sera affichée en rond, donc évite un visuel dont les bords comptent.

> [!NOTE]
> **Et si ton cours n'est écrit nulle part ?**
> Ça arrive : tu maîtrises un sujet que tu expliques à l'oral depuis des années sans l'avoir jamais couché sur le papier. Dis-le-moi, on construira le programme ensemble en discutant à l'Étape 6.
> Mais cherche bien avant : un mémo, un mail d'explication envoyé trois fois, un plan griffonné, une trame de formation… tout ça compte. Partir d'un support existant fait gagner beaucoup de temps.

<!-- [CHECKPOINT ÉTAPE 1]
Poser cette question avant de passer à l'Étape 2 :
"Tu as bien le dossier _ressources-cours dans TUTEUR-IA/, et tu y as glissé ton support de cours et une image pour ton tuteur au minimum ? 📁
Dis-moi 'C'est prêt !' et on passe à la récupération du projet !"
→ Si non, guide-le pour créer le dossier et y déposer ses fichiers.
→ S'il annonce n'avoir aucun support écrit, ne bloque pas : note-le, dis-lui qu'on
  construira le programme ensemble à l'Étape 6, et continue.
-->

---

<!--
================================================================
ÉTAPE 2 — CRÉATION DU DÉPÔT DEPUIS LE TEMPLATE
================================================================
Ne présente cette étape qu'après validation du CHECKPOINT Étape 1.
Guide l'utilisateur clic par clic, avec patience.
================================================================
-->

## 📋 Étape 2 : Créer ton propre projet (depuis le Template)

On va créer **ton propre projet** sur GitHub à partir d'un modèle prêt à l'emploi.

---

### 📝 Comprendre le template (30 secondes)

Imagine un **modèle Word** pour une lettre de motivation 📄. Tu ouvres le modèle, tu fais « Enregistrer sous… » avec ton propre nom, et tu obtiens **ton** document à toi. Le modèle original reste intact, et ton document est **100 % indépendant**.

Sur GitHub, c'est exactement la même chose :

- Le **template** est le modèle de départ. Tu ne le modifies pas.
- Ton **nouveau dépôt** est ta copie personnelle, rangée dans TON compte GitHub.

Et ce que tu récupères n'est pas une coquille vide : c'est un projet qui **fonctionne déjà**. Si tu le lançais tel quel, tu obtiendrais Geppetto, le tuteur de démonstration qui enseigne la mécanique des Skills de Claude. À l'Étape 6, tu remplaceras son contenu par le tien.

### Créer ton projet pas à pas

1. **Action** : ouvre ton navigateur et va sur cette page :
   👉 [github.com/lecinquiemejour-code/tuteur-ia-template](https://github.com/lecinquiemejour-code/tuteur-ia-template)

2. **Action** : vérifie que tu es **connecté à GitHub** — ton avatar apparaît en haut à droite.
   - Si tu ne l'es pas, clique sur **Sign in** en haut à droite.

3. **Action** : clique sur le bouton vert **« Use this template »** 🟢, en haut à droite de la page, puis sur **« Create a new repository »**.

4. **Action** : sur la page qui s'affiche :
   - **Repository name** : un nom qui décrit ton tuteur, par exemple `tuteur-photosynthese` ou `tuteur-droit-du-travail`
   - **Description** : tu peux laisser vide
   - Coche **Private** — ton code reste privé, seul le site déployé sera public
   - Laisse **« Include all branches »** décoché
   - Clique sur le bouton vert **« Create repository »**

5. **Résultat attendu** : tu arrives sur la page de TON nouveau dépôt. Vérifie l'URL en haut de ton navigateur :
   ```
   github.com/TON-PSEUDO/tuteur-mon-sujet
   ```
   Tu devrais voir tous les fichiers du template déjà présents : `README.md`, `TUTORIAL.md`, le dossier `src/`, le dossier `public/`…

> [!TIP]
> **Comment savoir si ça a marché ?** Tu vois TON pseudo dans l'URL, et les fichiers sont là. C'est ton projet à toi ! 🎉

> [!NOTE]
> **Pourquoi « Use this template » plutôt que « Fork » ?**
> Un *fork* garde un lien de parenté avec le projet d'origine et hérite de tout son historique. Un template t'en donne une copie propre, avec un historique vierge qui démarre à toi. C'est bien ce que tu veux pour un projet qui devient le tien.

> [!IMPORTANT]
> **Note bien l'URL de ton dépôt**, tu en auras besoin à l'Étape 5 pour récupérer les fichiers sur ton ordinateur. Le plus simple : laisse cet onglet ouvert.

<!-- [CHECKPOINT ÉTAPE 2]
Question à poser avant de passer à l'Étape 3 :
"Est-ce que tu vois bien TON pseudo dans l'URL (github.com/TON-PSEUDO/tuteur-mon-sujet) ?
Et est-ce que les fichiers (README.md, TUTORIAL.md, le dossier src/...) apparaissent sur la page ? 📁
Dis-moi 'C'est bon !' et on passe à la configuration de tes règles !"
→ Si non, guide-le : verifier la connexion GitHub, puis refaire la creation depuis le template.
→ Si le bouton "Use this template" n'apparait pas, c'est presque toujours qu'il n'est
  pas connecte a GitHub. Fais-le verifier en premier.
-->

---

<!-- LES ÉTAPES 1 À 9 SERONT AJOUTÉES ICI, UNE PAR UNE -->
