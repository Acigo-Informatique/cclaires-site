<?php
// C’Claires — réception de la demande de démo et de devis (TODO-MANUEL FORM-03), à déposer chez OVH
// sur https://formulaire.cclaires.fr/ (voir LISEZMOI.md). Remplace Formspree : la demande ne quitte pas
// OVH, qui héberge déjà la messagerie. Le script vérifie les champs, envoie un e-mail à ACIGO et ne
// conserve rien sur le serveur : ni fichier, ni base, ni journal. Aucun cookie.
// Réponses : JSON quand le site envoie la demande par script (en-tête Accept: application/json),
// sinon une courte page HTML de confirmation (formulaire envoyé sans script).

declare(strict_types=1);

// ---------- réglages ----------
const DESTINATAIRE = 'contact@cclaires.fr';
const EXPEDITEUR = 'contact@cclaires.fr';      // une adresse existante du domaine, pour que l’envoi passe le SPF d’OVH
const SUJET = 'Demande de démo et de devis C’Claires';
const SITE = 'https://cclaires.fr/';
// Origines autorisées à envoyer la demande par script. Pendant la transition, ajouter l’adresse
// github.io du site (ex. 'https://acigo-informatique.github.io'), puis la retirer.
const ORIGINES = ['https://cclaires.fr', 'https://www.cclaires.fr'];
const METIERS = ['ostreiculture' => 'Ostréiculture', 'mytiliculture' => 'Mytiliculture', 'mareyage' => 'Mareyage', 'plusieurs' => 'Plusieurs métiers'];
const MARQUES = ['' => 'Non précisée', 'Zebra' => 'Zebra', 'Toshiba' => 'Toshiba', 'autre' => 'Autre marque', 'ne-sait-pas' => 'Je ne sais pas'];

header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: no-referrer');

$origine = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origine, ORIGINES, true)) {
    header('Access-Control-Allow-Origin: ' . $origine);
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Accept');
}
header('Vary: Origin');

$json = str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');

function repondre(int $code, bool $ok, array $erreurs = []): never
{
    global $json;
    http_response_code($code);
    if ($json) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($ok ? ['ok' => true] : ['ok' => false, 'erreurs' => $erreurs], JSON_UNESCAPED_UNICODE);
        exit;
    }
    header('Content-Type: text/html; charset=utf-8');
    $titre = $ok ? 'Merci, votre demande est partie' : 'La demande n’a pas pu partir';
    $texte = $ok
        ? 'Nous revenons vers vous pour fixer la démonstration et vous envoyer le devis.'
        : 'Revenez au formulaire pour compléter : ' . htmlspecialchars(implode(', ', $erreurs)) . '. Vous pouvez aussi écrire à ' . DESTINATAIRE . '.';
    echo '<!doctype html><html lang="fr"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">'
        . '<meta name="robots" content="noindex"><title>' . $titre . '</title>'
        . '<body style="max-width:40rem;margin:4rem auto;padding:0 1rem;font:1.125rem/1.5 system-ui,sans-serif">'
        . '<h1>' . $titre . '</h1><p>' . $texte . '</p><p><a href="' . SITE . '">Revenir sur cclaires.fr</a></p></body></html>';
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit;
}
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    repondre(405, false, ['méthode non acceptée']);
}

// le champ piège, invisible pour un humain : rempli, c’est un robot ; on lui répond comme si tout allait bien
if (trim((string) ($_POST['_gotcha'] ?? '')) !== '') {
    repondre(200, true);
}

// une valeur de champ, sur une seule ligne sauf pour le message, de longueur bornée
function champ(string $nom, int $max = 200, bool $lignes = false): string
{
    $v = trim((string) ($_POST[$nom] ?? ''));
    $v = $lignes ? str_replace("\r\n", "\n", $v) : preg_replace('/[\r\n\t]+/', ' ', $v);
    $v = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', (string) $v);
    return mb_substr((string) $v, 0, $max);
}

$d = [
    'nom' => champ('nom'),
    'entreprise' => champ('entreprise'),
    'metier' => champ('metier', 40),
    'telephone' => champ('telephone', 40),
    'email' => champ('email', 254),
    'utilisateurs' => champ('utilisateurs', 6),
    'etiqueteuses' => champ('etiqueteuses', 6),
    'marque' => champ('marque', 40),
    'message' => champ('message', 5000, true),
];

$erreurs = [];
if ($d['nom'] === '') $erreurs[] = 'nom et prénom';
if ($d['entreprise'] === '') $erreurs[] = 'entreprise';
if (!array_key_exists($d['metier'], METIERS)) $erreurs[] = 'métier';
if (!preg_match('/^[0-9 +().\-]{6,40}$/', $d['telephone'])) $erreurs[] = 'téléphone';
if (filter_var($d['email'], FILTER_VALIDATE_EMAIL) === false) $erreurs[] = 'e-mail';
if ($d['utilisateurs'] !== '' && !ctype_digit($d['utilisateurs'])) $erreurs[] = 'nombre d’utilisateurs';
if ($d['etiqueteuses'] !== '' && !ctype_digit($d['etiqueteuses'])) $erreurs[] = 'nombre d’étiqueteuses';
if (!array_key_exists($d['marque'], MARQUES)) $erreurs[] = 'marque des étiqueteuses';
if ($erreurs) {
    repondre(400, false, $erreurs);
}

$corps = implode("\n", [
    'Nouvelle demande de démo et de devis, reçue par le formulaire de cclaires.fr.',
    '',
    'Nom et prénom : ' . $d['nom'],
    'Entreprise : ' . $d['entreprise'],
    'Métier : ' . METIERS[$d['metier']],
    'Téléphone : ' . $d['telephone'],
    'E-mail : ' . $d['email'],
    'Utilisateurs : ' . ($d['utilisateurs'] !== '' ? $d['utilisateurs'] : 'non précisé'),
    'Étiqueteuses : ' . ($d['etiqueteuses'] !== '' ? $d['etiqueteuses'] : 'non précisé'),
    'Marque des étiqueteuses : ' . MARQUES[$d['marque']],
    '',
    'Message :',
    $d['message'] !== '' ? $d['message'] : '(aucun)',
    '',
    'Répondre à cet e-mail écrit directement au demandeur.',
]);

$entetes = implode("\r\n", [
    'From: =?UTF-8?B?' . base64_encode('Formulaire C’Claires') . '?= <' . EXPEDITEUR . '>',
    'Reply-To: ' . $d['email'],
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
]);

$envoye = mail(DESTINATAIRE, '=?UTF-8?B?' . base64_encode(SUJET) . '?=', $corps, $entetes);
if (!$envoye) {
    repondre(502, false, ['envoi de l’e-mail']);
}
repondre(200, true);
