# Mon Kakeibo

Carnet de comptes inspiré de la méthode japonaise Kakeibo : épargne d'abord, dépenses par pilier (Survie, Optionnel, Culture, Imprévus), récurrents mensuels ou annuels, objectifs d'épargne avec photos et bilan mensuel.

En ligne : https://mon-kakeibo-rho.vercel.app

## Lancer l'appli en local

Aucune installation ni compilation : c'est une page web statique. Il faut seulement la servir depuis la racine du dossier.

Avec Node.js :

```bash
npm start
```

Ou avec Python :

```bash
python3 -m http.server 5173
```

Puis ouvrir http://localhost:5173 et se connecter avec le même compte que sur la version en ligne. Les données sont les mêmes partout.

Ouvrir directement `index.html` en double-cliquant ne fonctionne pas : la connexion et le mode hors ligne ont besoin d'une adresse `http://`.

## Où sont les données

- **Dans Supabase** (projet `kakeibo`, région Paris), table `docs` : une ligne par document (`settings`, un mois `AAAA-MM`, un objectif `goal-…`). C'est la copie de référence.
- **Une copie dans le navigateur** (`localStorage`) sert au mode hors ligne. Les modifications faites hors ligne sont envoyées au retour du réseau.

Chaque compte ne voit que ses propres lignes : la base l'impose avec des règles de sécurité au niveau des lignes (voir `supabase/migrations`). La clé écrite dans `index.html` est la clé publique de Supabase, faite pour être dans le code d'une page web ; elle ne donne accès à rien sans connexion.

Effacer l'historique ou les données du navigateur ne supprime rien dans Supabase : il suffit de se reconnecter. Seules des modifications faites hors ligne et pas encore synchronisées seraient perdues.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Toute l'appli : interface, calculs, connexion et synchro |
| `sw.js` | Service worker : installation et mode hors ligne |
| `manifest.webmanifest`, `icon.svg`, `apple-touch-icon.png` | Installation sur l'écran d'accueil |
| `vercel.json` | En-têtes pour l'hébergement sur Vercel |
| `supabase/migrations/` | Structure et règles de sécurité de la base |

## Sauvegarde

En bas de l'appli : « Exporter mes données » télécharge un fichier JSON, « Importer » le recharge.
