/**
 * Persistance de la conversation dans le navigateur.
 *
 * POURQUOI ce module existe : le serveur est volontairement sans mémoire. A chaque
 * message, c'est le navigateur qui lui renvoie l'historique complet (voir ai.ts).
 * Sans stockage cote navigateur, un simple rafraichissement de page remet donc la
 * conversation a zero et le tuteur oublie tout ce qui a ete dit.
 *
 * CHOIX TECHNIQUE : sessionStorage, et non localStorage. Le contexte survit au
 * rafraichissement de la page, mais s'efface a la fermeture de l'onglet. Sur un
 * poste partage (salle de classe, poste de formation), l'apprenant suivant ne
 * retrouve pas la conversation du precedent.
 */

/** Un message de la conversation, tel qu'affiche et tel que stocke. */
export type Message = {
  id: string;
  role: 'user' | 'ai';
  content: string;
};

const PREFIXE_CLE = 'tuteur-historique';

/**
 * Construit la cle de stockage.
 * La version de l'application fait partie de la cle : ainsi, quand le cours ou le
 * message d'accueil evoluent, les conversations enregistrees avec l'ancienne
 * version sont ignorees plutot que d'etre reaffichees telles quelles.
 *
 * @param version Version de l'application (APP_VERSION)
 * @returns La cle utilisee dans sessionStorage
 */
const cleDeStockage = (version: string): string => `${PREFIXE_CLE}-${version}`;

/**
 * Verifie qu'une donnee relue du stockage a bien la forme d'un message.
 * Le contenu de sessionStorage est modifiable par l'utilisateur : on ne lui fait
 * jamais confiance aveuglement.
 *
 * @param valeur Donnee issue de JSON.parse
 * @returns true si la donnee est un message exploitable
 */
const estUnMessage = (valeur: unknown): valeur is Message => {
  if (typeof valeur !== 'object' || valeur === null) return false;
  const m = valeur as Record<string, unknown>;
  return typeof m.id === 'string'
    && typeof m.content === 'string'
    && (m.role === 'user' || m.role === 'ai');
};

/**
 * Relit la conversation enregistree pour cette version de l'application.
 *
 * @param version Version de l'application (APP_VERSION)
 * @returns La liste des messages, ou null si rien d'exploitable n'est stocke
 */
export function chargerHistorique(version: string): Message[] | null {
  try {
    const brut = sessionStorage.getItem(cleDeStockage(version));
    if (!brut) {
      console.log('[HISTORIQUE] Aucune conversation enregistree : demarrage a neuf.');
      return null;
    }

    const donnees: unknown = JSON.parse(brut);
    if (!Array.isArray(donnees) || !donnees.every(estUnMessage)) {
      console.warn('[HISTORIQUE] Donnees stockees illisibles : elles sont ignorees.');
      return null;
    }

    console.log(`[HISTORIQUE] Conversation restauree : ${donnees.length} message(s).`);
    return donnees;
  } catch (erreur) {
    // Stockage desactive par le navigateur, quota, JSON corrompu : on repart a neuf
    // plutot que de casser l'affichage.
    console.error('[HISTORIQUE] Lecture impossible, demarrage a neuf :', erreur);
    return null;
  }
}

/**
 * Enregistre la conversation en cours.
 *
 * @param version Version de l'application (APP_VERSION)
 * @param messages La conversation complete a enregistrer
 */
export function sauvegarderHistorique(version: string, messages: Message[]): void {
  try {
    sessionStorage.setItem(cleDeStockage(version), JSON.stringify(messages));
    console.log(`[HISTORIQUE] Conversation enregistree : ${messages.length} message(s).`);
  } catch (erreur) {
    // Une sauvegarde qui echoue ne doit jamais interrompre la conversation en cours.
    console.error('[HISTORIQUE] Enregistrement impossible :', erreur);
  }
}
