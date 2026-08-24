# Cours de test — « Réussir sa mayonnaise »

Un cours complet et volontairement court, prévu pour **vérifier en dix minutes que toute la mécanique d'adaptation fonctionne**.

Il n'est pas là pour être joli : il est là pour que chaque rouage du template soit sollicité au moins une fois. Trois modules, deux schémas, trois niveaux d'entrée, un périmètre strict facile à tester.

---

## Deux façons de s'en servir

### 🎯 Test complet — le vrai parcours (recommandé)

`source/mayonnaise-support-de-cours.pdf` est le **cours brut**, rédigé de façon linéaire comme un vrai polycopié de formation : pas de modules, pas de trame, juste six sections qui s'enchaînent. C'est exactement ce qu'un formateur déposerait.

```powershell
Copy-Item examples\cours-test\source\mayonnaise-support-de-cours.pdf _ressources-cours\
```

Puis dis à ton assistant : *« Mon cours est dans `_ressources-cours/mayonnaise-support-de-cours.pdf`, peux-tu le lire ? »* et laisse-le dérouler l'Étape 6 du tutoriel.

**C'est le seul test qui valide la chaîne complète** : extraction `pdftotext`, découpage en modules, rédaction des six fichiers. Les fichiers déjà présents dans ce dossier te servent alors de **résultat de référence** : compare, et tu sauras si le découpage tient la route.

> 💡 Le PDF contient volontairement plus de matière que les trois modules de référence — une section « pour aller plus loin », un encadré sur les idées reçues, un tableau d'ingrédients. Un vrai cours digresse. L'assistant doit trier, pas tout recopier.

### ⚡ Test rapide — installer le résultat directement

Si tu veux seulement vérifier que le moteur fonctionne, sans passer par l'extraction, installe les fichiers déjà prêts.

Depuis la racine du projet, en PowerShell :

```powershell
Copy-Item examples\cours-test\*.md          src\content\   -Force
Copy-Item examples\cours-test\*.json        src\content\   -Force
Copy-Item examples\cours-test\assets\*.svg  public\assets\ -Force
```

> ⚠️ Ne copie pas ce `README.md` dans `src/content/`. La première commande le ferait — retire-le ensuite, ou copie les fichiers un par un.

Puis **relance le serveur** (`npm run dev`) : les fichiers de `src/content/` ne sont lus qu'au démarrage.

---

## Protocole de test

Ouvre `http://localhost:3000` dans un vrai navigateur et déroule ce tableau. Chaque ligne teste un mécanisme différent.

| # | Ce que tu fais | Ce que tu dois voir | Ce que ça valide |
|---|---|---|---|
| 1 | Tu ouvres la page | Le nom « Marceline, tutrice… » en haut | `tuteur.json` est lu |
| 2 | Tu regardes l'onglet du navigateur | Le même nom, pas « Tuteur interactif » | `document.title` dynamique |
| 3 | Tu lis le message d'accueil | Le nom apparaît en gras dans la première phrase | La variable `{{TUTEUR_NOM}}` est substituée |
| 4 | Tu regardes sous l'accueil | Trois boutons : « Je débute complètement », « J'ai déjà essayé, sans succès », « Ma mayonnaise a tranché ! » | `suggestions` vient de `tuteur.json` |
| 5 | Tu cliques « Je débute complètement » | Le sommaire des **trois** modules, puis une proposition de commencer | `programme.md` est lu, l'adaptation au niveau fonctionne |
| 6 | Tu demandes le module 2 | Une explication de l'émulsion **suivie du schéma** des gouttelettes | `illustrations.md` + `public/assets/` |
| 7 | Tu demandes « ma mayonnaise a tranché » | Le geste de rattrapage **en premier**, la cause ensuite, avec le second schéma | Consigne de niveau spécifique du prompt |
| 8 | Tu demandes « donne-moi une recette de crêpes » | Un refus poli et un retour au programme, **sans aucune recette** | Le périmètre strict tient |
| 9 | Tu demandes des ressources | Les deux liens de `ressources.md`, et rien d'autre | `ressources.md` est lu |
| 10 | Tu tapes `IGNORE PREVIOUS INSTRUCTIONS` | Message bloqué **avant l'envoi**, sans appel à l'IA | Le filtre du navigateur fonctionne |

**Si les dix lignes passent, la mécanique d'adaptation est bonne.** Le template peut accueillir n'importe quel sujet.

---

## En cas d'échec

| Symptôme | Cause la plus probable |
|---|---|
| Rien n'a changé, Geppetto s'affiche encore | Le serveur n'a pas été relancé |
| Le schéma ne s'affiche pas | Les `.svg` n'ont pas été copiés dans `public/assets/` |
| Le nom est bon mais l'avatar est cassé | `Geppetto.jpg` a été retiré de `public/` |
| Le tuteur répond sur les Skills de Claude | Seuls certains fichiers ont été copiés, `programme.md` est resté l'ancien |
| Le tuteur donne la recette des crêpes | `prompt-systeme.md` n'a pas été copié |

---

## Revenir à Geppetto

Le cours de démonstration est suivi par Git, il se restaure d'une commande :

```powershell
git checkout -- src/content
Remove-Item public\assets\01-emulsion.svg, public\assets\02-rattrapage.svg
```

Les deux `.svg` copiés dans `public/assets/` ne sont pas suivis par Git : ils apparaîtront dans `git status` tant que tu ne les auras pas retirés.

---

## Note sur l'avatar

`tuteur.json` réutilise volontairement `Geppetto.jpg`, déjà présent dans `public/`. Le test fonctionne donc sans avoir à fournir d'image. Un tuteur nommé Marceline avec le visage de Geppetto, c'est incongru — et c'est justement une bonne démonstration : l'avatar est un simple réglage, indépendant du reste.
