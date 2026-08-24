# Annexe — Partager et installer un skill

> Contenu pratique, à mobiliser si l'utilisateur demande « comment installer ce
> skill » ou « comment le partager ». Procédures vérifiées sur la documentation
> Anthropic ; l'interface peut évoluer, rester prudent sur les libellés exacts.

## Installer un skill (claude.ai)

1. Ouvrir **Customize → Compétences** (Skills).
2. Cliquer sur **« + » / « Ajouter une compétence »**.
3. Téléverser le **dossier du skill compressé en ZIP**. Rappel utile : un
   fichier `.skill` *est déjà* un ZIP — au besoin, le renommer en `.zip` pour le
   téléverser.
4. Le skill apparaît dans la liste. Vérifier qu'il est **activé** (commutateur
   sur ON, cf. Module 2) et, le cas échéant, régler son mode de déclenchement.

Points d'attention :
- **Prérequis** : l'environnement d'exécution de code doit être disponible — les
  skills en dépendent pour fonctionner.
- **Confidentialité** : les skills que l'on téléverse sont **privés à son compte
  individuel** (hors mécanismes de partage organisationnel ci-dessous).
- **Sécurité** : un skill peut contenir, ou demander d'installer, du code et des
  paquets tiers que Claude exécutera. **N'installer que des skills de sources de
  confiance**, et **relire les fichiers avant d'activer** (c'est là que le fait
  qu'un `.skill` soit un ZIP inspectable devient précieux — cf. Module 1).

## Partager un skill

Trois voies, selon le contexte :

- **Le plus simple (toutes offres) — envoyer le fichier.** Transmettre le
  `.skill` (= ZIP) à la personne ; elle le téléverse comme ci-dessus. Méthode
  universelle, indépendante du plan.
- **Team / Enterprise — partage natif.** On peut partager un skill avec des
  collègues précis ou toute l'organisation. Mais le bouton **« Partager »** de la
  fiche n'apparaît **que si** un propriétaire a activé le partage dans
  **Organization settings → Skills** (« Share with organization » et/ou
  « Skill sharing »). Le partage est **désactivé par défaut**.
- **Provisionnement (Team / Enterprise).** Un propriétaire peut déployer des
  skills pour l'ensemble des utilisateurs via les paramètres d'organisation.

## Au-delà de claude.ai (rappel multi-produits)

Le même dossier (dossier + `SKILL.md`) fonctionne aussi :
- dans **Claude Code** : dossier personnel `~/.claude/skills/` ou de projet
  `.claude/skills/` (partageable via Git ou via les plugins Claude Code) ;
- via l'**API Claude** : téléversement par l'endpoint Skills (`/v1/skills`).

C'est tout l'intérêt du standard ouvert des Agent Skills : **on crée une fois,
on réutilise partout**.
