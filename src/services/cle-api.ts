/**
 * Gestion de la cle API Gemini apportee par l'apprenant.
 *
 * POURQUOI ce module existe : le serveur ne detient plus aucune cle. Chaque
 * apprenant apporte la sienne, et c'est le navigateur qui la conserve le temps
 * de sa visite.
 *
 * CHOIX TECHNIQUE : sessionStorage, jamais localStorage. La cle disparait donc
 * a la fermeture de l'onglet. Sur un poste partage (salle de formation),
 * l'apprenant suivant n'herite jamais de la cle du precedent — et cette
 * protection ne repose sur aucun minuteur ni reglage : elle decoule du fait
 * qu'on ne persiste rien.
 *
 * La memorisation confortable, pour qui travaille sur sa propre machine, est
 * deleguee au gestionnaire de mots de passe du navigateur (voir le champ de
 * saisie dans App.tsx, annote pour qu'il propose l'enregistrement).
 *
 * Ce module ne journalise JAMAIS la valeur de la cle, uniquement sa presence.
 */

/** Cle de rangement dans sessionStorage. */
const CLE_STOCKAGE = 'tuteur-cle-api';

/**
 * Retire ce qu'un copier-coller ramene involontairement : espaces, retours a
 * la ligne, et guillemets encadrants (une cle recopiee depuis un fichier .env
 * s'ecrit API_KEY="AIza..." — les guillemets font partie du fichier, pas de la cle).
 *
 * @param saisie Texte brut colle par l'apprenant
 * @returns La cle nettoyee
 */
export function nettoyerCle(saisie: string): string {
  return saisie.trim().replace(/^["']|["']$/g, '').trim();
}

/**
 * Verifie la FORME de la cle, sans appeler Google.
 * Une cle Google AI Studio s'ecrit "AIza" suivi de 35 caracteres.
 * POURQUOI cette verification locale : elle rattrape les fautes de frappe
 * instantanement, sans consommer le quota de l'apprenant.
 *
 * @param cle Cle deja nettoyee
 * @returns true si la forme est plausible
 */
export function cleEstBienFormee(cle: string): boolean {
  return /^AIza[A-Za-z0-9_-]{35}$/.test(cle);
}

/**
 * Reduit la cle a ses 4 derniers caracteres, pour affichage.
 * @param cle La cle complete
 * @returns Une forme du type "...RYMs"
 */
export function masquerCle(cle: string): string {
  return `...${cle.slice(-4)}`;
}

/**
 * Lit la cle rangee pour cet onglet.
 * @returns La cle, ou null si l'apprenant n'en a pas encore saisi
 */
export function lireCle(): string | null {
  try {
    const cle = sessionStorage.getItem(CLE_STOCKAGE);
    console.log(`[CLE] Lecture : ${cle ? 'une cle est presente' : 'aucune cle'}`);
    return cle;
  } catch (erreur) {
    // sessionStorage peut etre indisponible (navigation privee verrouillee,
    // stockage desactive). On degrade sans casser : l'apprenant ressaisira.
    console.error('[CLE] Lecture impossible :', erreur);
    return null;
  }
}

/**
 * Range la cle pour la duree de l'onglet.
 * @param cle Cle nettoyee et bien formee
 */
export function enregistrerCle(cle: string): void {
  try {
    sessionStorage.setItem(CLE_STOCKAGE, cle);
    console.log('[CLE] Enregistree pour la duree de cet onglet.');
  } catch (erreur) {
    console.error('[CLE] Enregistrement impossible :', erreur);
  }
}

/** Oublie la cle, sur demande explicite de l'apprenant (croix de la pastille). */
export function effacerCle(): void {
  try {
    sessionStorage.removeItem(CLE_STOCKAGE);
    console.log('[CLE] Effacee.');
  } catch (erreur) {
    console.error('[CLE] Effacement impossible :', erreur);
  }
}
