import { Trash2 } from "lucide-react";
type TypeListeItemProps = {
  todo: TypeTodoDepense;
  deleteItem: (e: number) => void;
};
function ListeItem({ todo, deleteItem }: TypeListeItemProps) {
  return (
    <>
      <li
        key={todo.id}
        className="flex normal-case justify-between items-center py-1 m-2 rounded-lg 
       shadow shadow-white hover:bg-base-100 font-semibold hover:shadow-amber-100">
        <p className="w-3/5 normal-case flex justify-between pr-5 pl-2 ">
          <p>
            <span>{todo.depenseName}</span>
          </p>
          <p>
            <span onClick={() => deleteItem(todo.id)}>
              <Trash2
                className="cursor-pointer bg-red-400  p-1 rounded-sm 
              hover:bg-red-500 hover:text-black active:bg-amber-50 active:text-black"
              />
            </span>
          </p>
        </p>

        <p className="flex justify-between w-2/5">
          <button type="button" className="btn btn-soft btn-accent btn-sm ">
            {todo.depenseDate}
          </button>

          <button type="button" className="btn btn-soft btn-info btn-sm">
            {`${todo.depensePrix} fcfa`}
          </button>
        </p>
      </li>
    </>
  );
}

export default ListeItem;
