import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  setFilter: React.Dispatch<React.SetStateAction<number>>;
}

const FilterChoice: React.FC<Props> = ({ setFilter }) => {
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const tabMois = [
    { mois: "Janvier", idMois: 0 },
    { mois: "Fevrier", idMois: 1 },
    { mois: "Mars", idMois: 2 },
    { mois: "Avril", idMois: 3 },
    { mois: "Mai", idMois: 4 },
    { mois: "Juin", idMois: 5 },
    { mois: "Juillet", idMois: 6 },
    { mois: "Aout", idMois: 7 },
    { mois: "Septembre", idMois: 8 },
    { mois: "Octobre", idMois: 9 },
    { mois: "Novembre", idMois: 10 },
    { mois: "Decembre", idMois: 11 },
    { mois: "Afficher toutes vos depenses", idMois: 12 },
  ];
  const toggleOpenFilter = () => {
    setOpenFilter(!openFilter);
  };

  return (
    <div className=" flex flex-col items-center justify-center bg-linear-to-br from-[#0f172a] to-[#1e293b] p-5 text-white">
      <div className="w-full max-w-sm space-y-4">
        <div
          className={`rounded-2xl p-4 transition-all duration-500 shadow-lg ${
            openFilter
              ? "bg-[#1e293b]/90"
              : "bg-[#1e293b]/70 hover:bg-[#334155]"
          }`}
        >
          <div
            onClick={() => toggleOpenFilter()}
            className="flex justify-between items-center cursor-pointer select-none"
          >
            <h2 className="text-lg font-semibold">
              Filtrer vos depenses seleon les mois
            </h2>
            {openFilter ? (
              <ChevronUp className="transition-transform duration-300" />
            ) : (
              <ChevronDown className="transition-transform duration-300" />
            )}
          </div>

          <div
            className={`grid grid-cols-3 gap-4 mt-4 transition-all duration-500 overflow-hidden
           ${openFilter ? " opacity-100" : "max-h-0 opacity-0"}`}
          >
            {tabMois.map((mois, index) => (
              <button 
                type="button"
                key={index}
                onClick={() => setFilter(mois.idMois)}
                className={`bg-[#0f172a] py-2 rounded-xl transition duration-300 shadow-md shadow-white
                   hover:bg-[#1e293b] hover:shadow hover:shadow-amber-200
                   ${mois.idMois === 12 ? "col-span-full m-4 p-4" : ""}`}
              >
                {mois.mois}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterChoice;
