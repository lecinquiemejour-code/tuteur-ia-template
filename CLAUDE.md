# CLAUDE.md

Les consignes de ce projet sont centralisées dans **[`AGENTS.md`](AGENTS.md)**.

Lis-le avant toute intervention : il contient l'architecture, la frontière entre contenu et moteur, les pièges connus et les règles de conduite.

Trois points à retenir immédiatement :

1. **Le contenu vit dans `src/content/`.** Une demande de contenu ne se traite jamais en modifiant le code.
2. **Le prompt système est assemblé dans deux fichiers** — `server.ts` et `netlify/functions/chat.ts`. Toute modification de l'assemblage doit être faite dans les deux.
3. **Rien n'est modifié sans le « GO » explicite de l'utilisateur.**
