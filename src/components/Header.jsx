// Hooks
import { useState, useEffect } from "react";

// Components
import NewBudget from "./NewBudget";
import BudgetManager from "./BudgetManager";

const Header = ({budget, setBudget, isValidBudget, setIsValidBudget, expends, setExpends}) => {
  return (
    <header>
        <h1>Planificador de gastos</h1>
        
        {isValidBudget ? (
            <BudgetManager 
                expends={expends}
                budget={budget}
                setBudget={setBudget}
                setExpends={setExpends}
            />
        ) : (
            <NewBudget 
            budget={budget}
            setBudget={setBudget}
            setIsValidBudget={setIsValidBudget}
        />
        )}

    </header>
  )
}

export default Header