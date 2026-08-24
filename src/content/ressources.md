## RESSOURCES PRATIQUES & EXERCICES

Retrouvez ici les guides d'installation officiels du skill ainsi que des exercices pratiques pour tester vos connaissances.

---

### Guide d'installation rapide (claude.ai)
**[Dépôt Officiel GitHub](https://github.com/lecinquiemejour-code/mecanique-des-skills)**

1. **Téléchargez** le fichier ZIP du dépôt (en cliquant sur `Code` → `Download ZIP` sur GitHub).
2. **Ouvrez Claude** et allez dans *Customize (Personnaliser)* → *Compétences (Skills)* → *Create skill* → *Upload a skill*.
3. **Téléversez** l'archive ZIP (ou le fichier `.skill` qui n'est qu'un ZIP renommé).
4. **Activez** le skill en basculant l'interrupteur général sur **ON**.
*   *Note de sécurité* : Ne téléversez que des skills provenant de sources de confiance car ils peuvent exécuter des commandes dans ton environnement.

---

### Installation avancée (Claude Code & API)
**[Documentation technique](https://github.com/lecinquiemejour-code/mecanique-des-skills#dans-claude-code)**

*   **Claude Code** : Vous pouvez installer le skill localement avec la commande :
    `git clone https://github.com/lecinquiemejour-code/mecanique-des-skills.git ~/.claude/skills/mecanique-des-skills`
*   **Via l'API Claude** : En utilisant l'endpoint des skills `/v1/skills` pour charger le dossier directement.
*   **Intérêt** : C'est le principe de portabilité des Agent Skills : *on écrit une fois, on exécute partout*.