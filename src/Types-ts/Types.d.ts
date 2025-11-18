declare global {
  interface TypeTodoDepense {
    id: number;
    depenseName: string;
    depenseDate: string;
    depensePrix: number;
  }
  type TypeEtatForm =
    | "saisirDEpenseName"
    | "plusInfoSurDepenses"
    | "confirmerDepense";
    type TypeMois = number;
}

export {};
