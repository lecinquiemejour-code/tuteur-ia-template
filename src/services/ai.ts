const MAX_CONTEXT_MESSAGES = 30;

/**
 * Traduit un code HTTP en message comprehensible.
 *
 * POURQUOI c'est important ici : depuis que chaque apprenant apporte sa propre
 * cle, un 401 ou un 429 ne parle plus d'une panne du site mais de SA cle a lui.
 * Le message doit le dire, sinon il croit le service en panne.
 */
const MESSAGES_ERREUR: Record<number, string> = {
  401: "Votre clé Gemini a été refusée. Vérifiez qu'elle est toujours active dans Google AI Studio.",
  429: "Votre clé a atteint sa limite d'utilisation gratuite. Elle se réinitialise sous 24 heures.",
  503: "Le service IA est momentanément indisponible. Veuillez réessayer dans quelques instants.",
};

/**
 * Envoie un message de l'utilisateur à l'IA via notre serveur local sécurisé.
 * 
 * @param message Le texte saisi par l'utilisateur
 * @param history L'historique de la conversation
 * @param apiKey La clé Gemini apportée par l'apprenant (voir services/cle-api.ts)
 * @param onUpdate Fonction de rappel appelée à chaque nouveau morceau de texte reçu
 */
export async function sendMessageToAI(
  message: string, 
  history: {role: string, content: string}[],
  apiKey: string,
  onUpdate: (chunk: string) => void
): Promise<void> {
  try {
    console.log("[UI] Envoi du message au serveur local...");
    
    // Règle 8 (KISS) : On ne garde que les MAX_CONTEXT_MESSAGES derniers messages pour éviter de surcharger
    // l'IA avec un historique trop long, limitant les coûts et la latence réseau.
    const recentHistory = history.slice(-MAX_CONTEXT_MESSAGES);
    console.log(`[UI] Taille du buffer de contexte envoyé : ${recentHistory.length} message(s) préparé(s) sur une limite de ${MAX_CONTEXT_MESSAGES}.`);

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // POURQUOI la clé voyage dans le corps et jamais dans l'URL : une URL se
      // retrouve dans les journaux de serveur et l'historique du navigateur.
      body: JSON.stringify({ message, history: recentHistory, apiKey }),
    });

    if (!response.ok) {
      let backendError = "";
      try {
        const errorData = await response.json();
        if (errorData && errorData.error) {
          backendError = errorData.error;
        }
      } catch (e) {
        // Ignorer silencieusement si ce n'est pas un JSON valide
      }

      // POURQUOI cet ordre : le message technique renvoye par le serveur
      // (« ApiError: {...} ») est illisible pour un apprenant. Notre traduction
      // passe donc en premier, l'erreur brute ne servant que de dernier recours.
      const baseMessage = MESSAGES_ERREUR[response.status] || backendError || "Une erreur technique est survenue.";
      const finalMessage = `${baseMessage} (Code HTTP: ${response.status})`;

      console.error(`[AI] Erreur HTTP ${response.status} reçue du serveur. Détail: ${backendError}`);
      throw new Error(finalMessage);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("Impossible de lire le flux de réponse.");
    }

    const decoder = new TextDecoder('utf-8');
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value, { stream: true });
      if (chunk) {
        onUpdate(chunk);
      }
    }
  } catch (error) {
    console.error("[UI] Erreur lors de la communication avec le serveur :", error);
    if (error instanceof Error && error.message && error.message !== "Failed to fetch") {
      throw error;
    }
    throw new Error("Une erreur inattendue est survenue lors de la communication avec l'assistant. Veuillez vérifier votre connexion.");
  }
}

/**
 * Verifie qu'une cle est reellement acceptee par Google, avant que l'apprenant
 * ne commence a discuter.
 *
 * POURQUOI cette fonction existe : la validation de forme (cle-api.ts) ne
 * detecte qu'une faute de frappe. Une cle bien formee mais revoquee ne se
 * revele qu'au premier appel — donc, sans ce bouton, au milieu d'une
 * conversation, sous la forme d'un message d'erreur technique.
 *
 * CHOIX TECHNIQUE : on reutilise /api/chat plutot que de creer une route
 * dediee. Cela evite d'ajouter un endpoint dans les DEUX moteurs (server.ts et
 * netlify/functions/chat.ts), et cela teste exactement le chemin qui servira.
 *
 * @param apiKey La cle a verifier
 * @returns null si la cle fonctionne, sinon le message d'erreur a afficher
 */
export async function verifierCleApi(apiKey: string): Promise<string | null> {
  console.log("[CLE] Vérification de la clé auprès du serveur...");
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Bonjour', history: [], apiKey }),
    });

    if (response.ok) {
      // On coupe le flux immediatement : seul le statut nous interesse,
      // inutile de laisser le modele rediger une reponse complete.
      await response.body?.cancel();
      console.log("[CLE] Clé acceptée.");
      return null;
    }

    let detail = "";
    try {
      const donnees = await response.json();
      detail = donnees?.error ?? "";
    } catch (e) {
      // Reponse non JSON : on se rabat sur le code HTTP
    }

    const message = MESSAGES_ERREUR[response.status] ?? detail ?? "Cette clé n'a pas été acceptée.";
    console.error(`[CLE] Clé refusée (HTTP ${response.status}).`);
    return message;
  } catch (erreur) {
    console.error("[CLE] Vérification impossible :", erreur);
    return "Impossible de joindre le serveur pour vérifier la clé.";
  }
}
