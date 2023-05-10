import { createContext, useReducer } from 'react';

// Création de l'interface qui décrit la forme d'un objet article
interface Article {
  nom: string;
  prix: number;
  quantite: number;
}

// Création de l'interface qui décrit la forme de l'état du panier, qui contient un tableau d'articles
interface PanierState {
  articles: Article[];
}

// Création de l'interface PanierProps qui décrit les propriétés du composant Panier
//Children est une propriété spéciale qui permet de récupérer les enfants du composant, dans ce cas les enfants du composant Panier sont les composants qui sont à l'intérieur de la balise <Panier> : <Panier> <Composant1 /> <Composant2 /> </Panier>
interface PanierProps {
    children: React.ReactNode;
}
  

// Définit une constante qui est à l'état initial du panier
const initialState: PanierState = {
  articles: [
    { nom: 'Monstera', prix: 8, quantite: 1 },
    { nom: 'Lierre', prix: 10, quantite: 1 },
    { nom: 'Bouquet de fleurs', prix: 15, quantite: 1 },
  ],
};


// Création du type Action qui décrit les dfférentes actions qui peuvent être effectuées sur le panier qui sont:
type Action =
  | { type: 'ajouter_article'; nom: string }
  | { type: 'supprimer_article'; nom: string }
  | { type: 'modifier_quantite'; nom: string; quantite: number };


// Création de la fonction reducer qui prend en paramètre l'état initial du panier et une action à effectuer, puis retourne le nouvel état du panier. La fonction reducer utilise la méthode switch pour déterminer quelle action est effectuée en fonction du type de l'action 
const reducer = (state: PanierState, action: Action): PanierState => {
  switch (action.type) {
    case 'ajouter_article':
      return {
        ...state,
        articles: [
          ...state.articles,
          {
            nom: action.nom,
            prix: 10,
            quantite: 1,
          },
        ],
      };
    case 'supprimer_article':
      return {
        ...state,
        articles: state.articles.filter((article) => article.nom !== action.nom),
      };
    case 'modifier_quantite':
      return {
        ...state,
        articles: state.articles.map((article) =>
          article.nom === action.nom ? { ...article, quantite: action.quantite } : article
        ),
      };
    default:
      return state;
  }
};



export const PanierContext = createContext<{
  state: PanierState;
  ajouterArticle: (nom: string) => void;
  supprimerArticle: (nom: string) => void;
  modifierQuantite: (nom: string, quantite: number) => void;
}>({
  state: initialState,
  ajouterArticle: () => {},
  supprimerArticle: () => {},
  modifierQuantite: () => {},
});

export const Panier = ({ children }: PanierProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const ajouterArticle = (nom: string) => {
    dispatch({ type: 'ajouter_article', nom });
  };

  const supprimerArticle = (nom: string) => {
    dispatch({ type: 'supprimer_article', nom });
  };

  const modifierQuantite = (nom: string, quantite: number) => {
    dispatch({ type: 'modifier_quantite', nom, quantite });
  };

  return (
    <PanierContext.Provider value={{ state, ajouterArticle, supprimerArticle, modifierQuantite }}>
      {children}
    </PanierContext.Provider>
  );
};




