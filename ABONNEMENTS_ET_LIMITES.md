# Abonnements et limites — Tuteur IA

> Dernière mise à jour : 2026-08-26

## Vue d'ensemble

L'application fonctionne **entièrement avec des abonnements gratuits** (free tier).

| Service | Rôle | Payé par | Plan |
|---------|------|----------|------|
| **Google Gemini API** | Modèle IA (chatbot) | **chaque visiteur** | Free tier |
| **Netlify** | Hébergement + fonctions serverless | toi | Free tier |
| **GitHub** | Dépôt Git + déploiement automatique | toi | Free tier |

> **Le point structurant** : le site ne détient aucune clé Gemini. Chaque visiteur
> apporte la sienne et consomme **son propre quota**. Les limites du tableau ci-dessous
> s'appliquent donc à chacun individuellement, jamais à ton site dans son ensemble.

---

## 1. Google Gemini API

### Modèle utilisé

Le modèle est défini dans `ai-config.json`, **source unique de vérité**. Actuellement : **`gemini-3.5-flash-lite`**, celui dont le quota gratuit est le plus généreux de la gamme.

Le visiteur voit ce nom affiché sous sa clé, mais **ne peut pas le modifier**.

### Limites du free tier (Gemini 3.5 Flash Lite)

| Métrique | Limite |
|----------|--------|
| **RPM** (requêtes par minute) | 15 |
| **TPM** (tokens par minute) | 250 000 |
| **RPD** (requêtes par jour) | 500 |

> Ces limites sont consultables dans [Google AI Studio > Rate Limits](https://aistudio.google.com/rate-limit).
> Attention : les modèles **Flash** (non « Lite ») ont des quotas gratuits bien plus étroits — 5 RPM et 20 requêtes/jour.

### En pratique

**500 requêtes par jour et par apprenant.** À raison d'une dizaine de questions par séance, un apprenant peut travailler des heures sans jamais approcher la limite. Et le quota d'un apprenant n'affecte aucun autre.

### Tarifs du plan payant (par million de tokens)

| Élément | Prix |
|---------|------|
| Input (texte/image/vidéo) | $0.25 |
| Output | $1.50 |

Ce passage au payant relève de chaque apprenant, pour sa propre clé. Toi, tu n'as rien à facturer.

---

## 2. Netlify

### Plan : Starter (gratuit)

| Ressource | Limite |
|-----------|--------|
| **Fonctions serverless** | 300 000 invocations/mois |
| **Bande passante** | 100 Go/mois |
| **Temps de build** | 300 minutes/mois |
| **Sites** | Illimité |

> Chaque message envoyé dans le chat = 1 invocation de fonction.
> 300 000 invocations/mois = ~10 000 messages/jour, largement suffisant.

C'est la **seule** ressource que ton succès peut réellement consommer, puisque l'IA est payée par les visiteurs.

### Plans payants (si nécessaire à l'avenir)

| Plan | Prix | Invocations/mois |
|------|------|-----------------|
| Pro | $19/mois | 1 000 000 |
| Business | $99/mois | Personnalisable |

---

## 3. GitHub

### Plan : Free

- Dépôts publics et privés illimités
- GitHub Actions : 2 000 minutes/mois
- Aucune limite pertinente pour ce projet

---

## Gestion des erreurs

Les messages sont rédigés pour un apprenant, à qui la clé appartient désormais :

| Code HTTP | Cause | Message affiché |
|-----------|-------|----------------|
| **401** | Aucune clé saisie | *(pas de message : le portail de saisie remplace le chat)* |
| **401** | Clé refusée par Google | *« Votre clé Gemini a été refusée. Vérifiez qu'elle est toujours active dans Google AI Studio. »* |
| **429** | Quota de la clé dépassé | *« Votre clé a atteint sa limite d'utilisation gratuite. Elle se réinitialise sous 24 heures. »* |
| **503** | Service Gemini indisponible | *« Le service IA est momentanément indisponible. »* |

### Flux technique

1. L'API Gemini renvoie une erreur (ex : `API_KEY_INVALID`, `RESOURCE_EXHAUSTED`)
2. `server.ts` **et** `netlify/functions/chat.ts` classifient l'erreur et renvoient le même code HTTP — les deux doivent rester alignés
3. `src/services/ai.ts` traduit le code en message français
4. `src/App.tsx` l'affiche dans le fil de conversation

---

## La clé du visiteur

Il n'y a **plus rien à configurer** : ni dans `.env`, ni dans les variables d'environnement Netlify.

| Question | Réponse |
|---|---|
| Où est stockée la clé ? | Dans le `sessionStorage` du navigateur du visiteur |
| Combien de temps ? | Le temps de l'onglet. Un F5 la conserve, une fermeture l'efface |
| Le site la conserve-t-il ? | Jamais. Elle transite par la fonction serverless sans y être stockée |
| Poste partagé ? | L'apprenant suivant ne retrouve rien — c'est la raison du choix de `sessionStorage` |
| Comment éviter de la ressaisir ? | Le gestionnaire de mots de passe du navigateur la propose sous l'étiquette « Clé Gemini » |
| Comment l'oublier tout de suite ? | La croix ✕ à côté de la clé masquée, en haut à droite |

---

## Estimation des coûts mensuels

| Scénario | Visiteurs/jour | Coût pour toi |
|----------|---------------|---------------|
| **Faible** (usage personnel) | 1-10 | **0 €** |
| **Modéré** (tuteur partagé) | 10-50 | **0 €** |
| **Élevé** (forte visibilité) | 50-100 | **0 €** |
| **Très élevé** (viral) | 1 000+ | 0 € jusqu'à 300 000 messages/mois, puis plan Netlify Pro |

Le coût de l'IA ne t'incombe plus. Ta seule limite est le quota de fonctions Netlify.

---

## Ressources

- [Google AI Studio — Rate Limits](https://aistudio.google.com/rate-limit)
- [Google Gemini API — Pricing](https://ai.google.dev/gemini-api/docs/pricing)
- [Netlify — Pricing](https://www.netlify.com/pricing/)
