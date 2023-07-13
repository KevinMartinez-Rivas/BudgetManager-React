import Expend from "./Expend";

const ExpensesList = ({expends, setEditExpend, deleteExpend}) => {
  return (
    <div className="listado-gastos contenedor">
        <h2>{expends.length ? "Gastos": "No hay gastos aún"}</h2>

        {expends.map(expend => (
            <Expend 
                key={expend.id}
                expend={expend}
                setEditExpend={setEditExpend}
                deleteExpend={deleteExpend}
            />
        ))}
    </div>
  )
}

export default ExpensesList;