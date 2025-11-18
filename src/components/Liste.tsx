import ListeItem from "./ListeItem"

type TypeListeProps ={
  todoDepense:TypeTodoDepense[];
   deleteItem:(e:number)=>void
}
function Liste({todoDepense , deleteItem}:TypeListeProps) {
  return (
     <ul className="bg-base-300 rounded-md normal-case m-2 p-3 pl-7 divide-y divide-white">
            {todoDepense.length === 0 ? (
              <li className="text-center normal-case opacity-70">
                Aucune dépense enregistrée pour le moment{" "}
               </li>
            ) : (
              todoDepense.map((todo , index) => (
               <ListeItem key={index} deleteItem={deleteItem} todo={todo}/>
              ))
            )}
          </ul>
  )
}

export default Liste;