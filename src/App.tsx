import { useEffect, useState } from "react";
import Liste from "./components/Liste";
import FilterChoice from "./components/FilterChoice";

function App() {
  // Récupération des données du localStorage
  const saveTodoDepense = localStorage.getItem("saveTodoDepense");
  const saveEtatForm = localStorage.getItem("saveEtatForm");

  const initialEtatForm =
    saveEtatForm === "saisirDEpenseName" ||
    saveEtatForm === "plusInfoSurDepenses" ||
    saveEtatForm === "confirmerDepense"
      ? saveEtatForm
      : "saisirDEpenseName";
  const initialTodoDepense: TypeTodoDepense[] = saveTodoDepense
    ? JSON.parse(saveTodoDepense)
    : [];
  const [filter, setFilter] = useState<TypeMois>(12);
  const [etatForm, setEtatForm] = useState<TypeEtatForm>(initialEtatForm);
  const today = new Date().toISOString().split("T")[0]; // "2025-11-01"

  const [depenseCaracteristique, setDepenseCaracteristique] = useState({
    depenseValue: "",
    depenseDate: today,
    depensePrix: 0,
  });

  const [todoDepense, setTodoDepense] =
    useState<TypeTodoDepense[]>(initialTodoDepense);

  useEffect(() => {
    localStorage.setItem("saveTodoDepense", JSON.stringify(todoDepense));
    localStorage.setItem("saveEtatForm", etatForm);
  }, [todoDepense, etatForm]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodoDepense: TypeTodoDepense = {
      id: Date.now(),
      depenseName: depenseCaracteristique.depenseValue,
      depenseDate: depenseCaracteristique.depenseDate,
      depensePrix: depenseCaracteristique.depensePrix,
    };

    const globalTodoDepense = [newTodoDepense, ...todoDepense];
    setTodoDepense(globalTodoDepense);

    setDepenseCaracteristique({
      depenseValue: "",
      depenseDate: today,
      depensePrix: 0,
    });
    setEtatForm("saisirDEpenseName");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setDepenseCaracteristique((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const deleteItem: (id: number) => void = (id) => {
    const filterItem: TypeTodoDepense[] = todoDepense.filter(
      (currenTtodo) => currenTtodo.id !== id
    );
    setTodoDepense(filterItem);
  };
  let filterTodo: TypeTodoDepense[] = [];
  let depenseTotal;
  if (filter === 12) {
    filterTodo = todoDepense;
  } else {
    filterTodo = todoDepense.filter(
      (currentTodo) => new Date(currentTodo.depenseDate).getMonth() === filter
    );
  }
  depenseTotal = filterTodo.reduce(
    (somme, depense) => somme + Number(depense.depensePrix),
    0
  );

  return (
    <>
      <div className="flex normal-case flex-col justify-center gap-1.5 min-h-screen m-3 p-2 w-full">
        <FilterChoice setFilter={setFilter} />
        <form
          className="flex justify-around items-center gap-4 transition"
          onSubmit={handleSubmit}
        >
          {etatForm === "saisirDEpenseName" ? (
            <>
              <input
                type="text"
                name="depenseValue"
                placeholder="Veuillez renseigner votre dépense"
                className="input input-primary flex-1"
                value={depenseCaracteristique.depenseValue}
                onChange={handleChange}
              />
              <button
                onClick={() => {
                  if (!depenseCaracteristique.depenseValue.trim()) {
                    return null;
                  }
                  setEtatForm("plusInfoSurDepenses");
                }}
                className="btn btn-primary"
                type="button"
              >
                Soumettre le nom
              </button>
            </>
          ) : etatForm === "plusInfoSurDepenses" ? (
            <>
              <label className="input">
                <span className="label">date de la depense</span>
                <input
                  type="date"
                  lang="fr"
                  value={depenseCaracteristique.depenseDate}
                  name="depenseDate"
                  aria-label="Saisir la date de la dépense"
                  onChange={handleChange}
                />
              </label>
              <input
                type="number"
                name="depensePrix"
                value={depenseCaracteristique.depensePrix}
                onChange={handleChange}
                aria-label="saisir le montant de votre depense"
                className="input input-secondary"
              />

              <button
                onClick={() => {
                  if (
                    depenseCaracteristique.depensePrix === 0 ||
                    !depenseCaracteristique.depenseDate.trim()
                  ) {
                    return null;
                  }
                  setEtatForm("confirmerDepense");
                }}
                className="btn btn-primary"
                type="button"
              >
                Soumettre
              </button>
            </>
          ) : etatForm === "confirmerDepense" ? (
            <div className="flex justify-around items-center w-full text-white font-bold">
              <button className="btn btn-primary" type="submit">
                Confirmer la depense
              </button>
              <button
                className="btn btn-error text-white font-bold"
                type="button"
                onClick={() => {
                  setDepenseCaracteristique({
                    depenseValue: "",
                    depenseDate: "",
                    depensePrix: 0,
                  });
                  setEtatForm("saisirDEpenseName");
                }}
              >
                Ne pas confirmer la depense
              </button>
            </div>
          ) : null}
        </form>

        <div className="normal-case">
          <Liste todoDepense={filterTodo} deleteItem={deleteItem} />
        </div>
        <div
          className="bg-base-200 flex justify-between items-center rounded-xl mx-2.5 p-3 
        hover:bg-base-100"
        >
          <p>Le montant total de votre depense est :</p>

          <button
            type="button"
            className="btn btn-soft btn-primary btn-sm"
          >{`${depenseTotal} fcfa`}</button>
        </div>
      </div>
    </>
  );
}

export default App;
