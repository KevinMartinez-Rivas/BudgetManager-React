// Hooks
import { useState, useEffect } from 'react';

// Components
import Header from './components/Header';
import Modal from './components/Modal';
import ExpensesList from './components/ExpensesList';
import Filter from './components/Filter';

// Functions/Helpers
import { generateID } from './helpers';

// SVG
import NewExpenseIcon from './img/nuevo-gasto.svg';


function App() {
  // Budget and Expends
  const [ budget, setBudget ] = useState(0);
  const [ expends, setExpends ] = useState([]);
  const [ filter, setFilter ] = useState("Todos");
  const [ filterExpends, setFilterExpends ] = useState([]);
  const [ isValidBudget, setIsValidBudget ] = useState(false);
  
  // Modal
  const [ modal, setModal ] = useState(false);
  const [ animateModal, setAnimateModal ] = useState(false);

  // Edits
  const [ editExpend, setEditExpend ] = useState({});

  useEffect(() => {
    const budgetLS = JSON.parse(localStorage.getItem("budget"));
    const expendsLS = JSON.parse(localStorage.getItem("expends"));
    if(budgetLS > 0) {
      setBudget(budgetLS);
      setExpends(expendsLS);
      setIsValidBudget(true);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("budget", JSON.stringify(budget));

    if(budget <= 0){
      setIsValidBudget(false);
    }
  }, [budget])

  useEffect(() => {
    localStorage.setItem("expends", JSON.stringify(expends));

    if(filter === "Todos"){
      setFilterExpends(expends);
    } else {
      const newFilter = expends.filter(exp => exp.category === filter);
      setFilterExpends(newFilter);
    }
  }, [expends])

  useEffect(() => {
    if(editExpend.id) {
      setModal(true);

      setTimeout(() => {
        setAnimateModal(true);
      }, 400);
    }
  }, [editExpend])

  useEffect(() => {
    if(filter === "Todos"){
      setFilterExpends(expends);
    }else {
      const newFilter = expends.filter(exp => exp.category === filter);
      setFilterExpends(newFilter);
    }
  }, [filter])

  const handleNewExpense = () => {
    setEditExpend({});
    setModal(true);

    setTimeout(() => {
      setAnimateModal(true);
    }, 400);
  }

  const saveExpend = expend => {
    expend.id = generateID();
    setExpends([...expends, expend]);

    setAnimateModal(false);

    setTimeout(() => {
        setModal(false); 
    }, 500);
  }

  const modifyExpend = expend => {
    const newExpendsList = expends.map(exp => exp.id === expend.id ? expend : exp);
    setExpends(newExpendsList);

    setEditExpend({});

    setAnimateModal(false);

    setTimeout(() => {
        setModal(false); 
    }, 500);
  }

  const deleteExpend = (id) => {
      const newExpendsList = expends.filter(exp => exp.id !== id);
      setExpends(newExpendsList);
  }

  return (
    <div className={modal ? "fijar" : ""}>
      <Header 
        expends={expends}
        budget={budget}
        setBudget={setBudget}
        setExpends={setExpends}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
      />

      {isValidBudget && (
        <>
          <main>
            <Filter 
              filter={filter}
              setFilter={setFilter}
            />

            <ExpensesList 
              setEditExpend={setEditExpend}
              expends={filterExpends}
              deleteExpend={deleteExpend}
            />
          </main>

          <div className='nuevo-gasto'>
            <img 
              src={NewExpenseIcon} 
              alt="Icono para realizar un nuevo gasto"
              onClick={handleNewExpense} 
            />
          </div>
        </>
      )}

      {modal && ( // MODAL FOR NEW EXPENSES
        <Modal
          setModal={setModal}
          animateModal={animateModal}
          setAnimateModal={setAnimateModal}
          saveExpend={saveExpend}
          editExpend={editExpend}
          modifyExpend={modifyExpend}
        />
      )}
    </div>
  )
}

export default App
