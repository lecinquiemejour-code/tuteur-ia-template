# 🗺️ Roadmap d'évolutions — Tuteur-IA-Template

> Roadmap héritée du template d'origine, 7 évolutions retenues sur 10.
> L'évolution #5 a été réalisée depuis. Les six autres restent ouvertes.

---

## Légende

| Symbole | Signification |
|---------|---------------|
| 🟢 | Facile (< 1h) |
| 🟡 | Moyen (1-3h) |
| ⭐ | Haute priorité |

---

## 📋 Tableau récapitulatif

| # | Évolution | Difficulté | Statut |
|---|-----------|------------|--------|
| 1 | Modèle Gemini configurable via Netlify (env vars) | 🟢 Facile | 📋 À faire |
| 2 | Page diagnostic IA (`/api/health`) | 🟡 Moyen | 📋 À faire |
| 3 | Mode multi-langue | 🟡 Moyen | 📋 À faire |
| 4 | Thème personnalisable + dark mode | 🟡 Moyen | 📋 À faire |
| 5 | Suggestions dynamiques dans `tuteur.json` | 🟢 Facile | ✅ **Fait** |
| 7 | Persistance localStorage + bouton Effacer | 🟢 Facile | 📋 À faire |
| 9 | Limitation 50 messages/session (`ai-config.json`) | 🟢 Facile | 📋 À faire |

---

## ⭐ Évolution #1 — Modèle Gemini configurable via Netlify 🟢

### Problème
Le modèle IA est défini dans `ai-config.json` (commité dans Git). Pour changer de modèle, il faut modifier le fichier, committer, pusher et attendre le redéploiement (~1-2 min).

> ⚠️ **Attention si cette évolution est reprise** : le nom du modèle est aussi *affiché* au visiteur, et cet affichage lit `ai-config.json` **à la compilation**. Une variable d'environnement, invisible depuis le navigateur, ferait donc mentir l'affichage. Il faudrait en plus exposer le modèle réel au client (petite route `/api/config`).

### Solution
Ajouter deux variables d'environnement Netlify **optionnelles** :
- `GEMINI_MODEL` → nom du modèle
- `GEMINI_TEMPERATURE` → température

Le code de `chat.ts` lit **d'abord** les env vars, puis `ai-config.json` en fallback.

### Fichiers impactés
- `netlify/functions/chat.ts`
- `TUTORIAL.md`
- `.env.example`

---

## ⭐ Évolution #2 — Page diagnostic IA (`/api/health`) 🟡

### Problème
Quand le chatbot ne répond pas, l'utilisateur ne sait pas diagnostiquer la cause (clé API invalide, modèle en panne, quota dépassé, problème réseau).

### Solution
Créer une Netlify Function `/api/health` qui vérifie :
1. La clé fournie par le visiteur est-elle acceptée ?
2. Le modèle répond-il ? (micro-appel test)
3. Le quota est-il ok ?

Retourne un JSON clair avec le statut, le modèle utilisé et la latence.

### Fichiers impactés
- `netlify/functions/health.ts` (nouveau)
- `TUTORIAL.md` (documenter l'endpoint)

---

## Évolution #3 — Mode multi-langue 🟡

### Problème
Le template est 100% francophone (interface, instructions IA, messages d'erreur). Un utilisateur non-francophone doit tout réécrire.

### Solution
- Ajouter `"language": "fr"` dans `tuteur.json`
- Externaliser les textes d'interface dans un dictionnaire i18n
- Adapter `prompt-systeme.md` avec un placeholder `{{LANGUAGE}}`

### Fichiers impactés
- `src/content/tuteur.json`
- `src/App.tsx`
- `src/content/prompt-systeme.md`
- Nouveau fichier dictionnaire i18n

---

## Évolution #4 — Thème personnalisable + dark mode 🟡

### Problème
Les couleurs (indigo/blanc/gris) sont codées en dur dans `App.tsx`. Tous les tuteurs se ressemblent.

### Solution
Ajouter une section `"theme"` dans `tuteur.json` :
```json
{
  "theme": {
    "primary_color": "#4f46e5",
    "dark_mode": false
  }
}
```
Injection via CSS custom properties (`--color-primary`).

### Fichiers impactés
- `src/content/tuteur.json`
- `src/App.tsx`
- `src/index.css`

---

## ✅ Évolution #5 — Suggestions dynamiques 🟢 — RÉALISÉE

### Problème (résolu)
Les suggestions étaient codées en dur dans `App.tsx`. Elles ne reflétaient donc pas le sujet de chaque tuteur.

### Solution appliquée
La liste vient désormais de `tuteur.json` :
```json
{
  "suggestions": ["Niveau Débutant", "Niveau Intermédiaire", "Niveau Avancé"]
}
```
Une liste vide fait disparaître les boutons proprement.

### Fichiers concernés
- `src/content/tuteur.json`
- `src/App.tsx`

---

## Évolution #7 — Persistance localStorage + bouton Effacer 🟢

### Problème
La conversation est perdue au rechargement de page (state React volatile). Pas de moyen de repartir à zéro proprement.

### Solution
1. **Persistance** : synchroniser le state `messages` avec `localStorage` via un `useEffect`
2. **Bouton "Nouvelle conversation"** 🗑️ dans le header : vide le localStorage et réinitialise au message de bienvenue + suggestions

### Fichiers impactés
- `src/App.tsx`

---

## Évolution #9 — Limitation 50 messages/session 🟢

### Problème
Aucune limite sur le nombre de messages par visiteur. Risque de consommation excessive des quotas API (surtout en tier gratuit Gemini).

### Solution
Paramètre dans `ai-config.json` :
```json
{
  "max_messages_per_session": 50
}
```
Au-delà : message invitant à contacter directement par email/LinkedIn. Compteur côté frontend (state ou localStorage).

### Fichiers impactés
- `ai-config.json`
- `src/App.tsx`

---

> **Prochaine étape** : Commencer l'implémentation par l'évolution #1 (la plus prioritaire et la plus simple).
