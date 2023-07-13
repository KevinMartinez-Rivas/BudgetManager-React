// Hooks
import { useState, useEffect } from "react";

// Depencias
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import 'react-circular-progressbar/dist/styles.css';

const BudgetManager = ({budget, setBudget, expends, setExpends}) => {
    
    const [ available, setAvailable ] = useState(0);
    const [ expended, setExpended ] = useState(0);
    const [ percentage, setPercentage ] = useState(0);

    useEffect(() => {
        const totalExpended = expends.reduce((acumulator, expend) => acumulator + expend.amount, 0);
        const totalAvailable = budget - totalExpended;

        const newPercentage = (((budget - totalAvailable) / budget) * 100).toFixed(2);

        setAvailable(totalAvailable);
        setExpended(totalExpended);

        setTimeout(() => {
            setPercentage(newPercentage);
        }, 700);
    }, [expends])

    const budgetToNewFormat = (amount, format) => {
        return amount.toLocaleString('en-US', {
            style: "currency",
            currency: format
        })
    }

    const handleResetApp = () => {
        const res = confirm("¿Seguro/a de resetear toda la aplicación?");
        
        if(res){
            setBudget(0);
            setExpends([]);
        }
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">
            <div>
                <CircularProgressbar 
                    styles={buildStyles({
                        pathColor: available > 0 ? "#3b82f6" : "#de1f1f",
                        textColor: available > 0 ? "#3b82f6" : "#de1f1f",
                        trailColor: "#F5F5F5",
                    })}
                    value={percentage} 
                    text={`${percentage}% Gastado`} 
                />;
            </div>

            <div className="contenido-presupuesto">
                <button className="reset-app" type="button" onClick={handleResetApp}>Resetear Aplicación</button>
                <p><span>Presupuesto:</span> {budgetToNewFormat(budget, "USD")}</p>
                <p className={available <= 0 ? "negativo" : ""}><span>Disponible:</span> {budgetToNewFormat(available, "USD")}</p>
                <p><span>Gastado:</span> {budgetToNewFormat(expended, "USD")}</p>
            </div>
        </div>
    )
}

export default BudgetManager;