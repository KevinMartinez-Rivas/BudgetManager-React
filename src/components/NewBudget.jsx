import { useEffect, useState } from "react";
import Message from "./Message";

const NewBudget = ({budget, setBudget, setIsValidBudget}) => {

    const [message, setMessage] = useState("");

    const handleBudget = (e) => {
        e.preventDefault();

        if(!budget || budget <= 0){
            setMessage("ERROR: El presupuesto no es válido");
            return;
        }

        // Resetear Message
        setMessage("");

        // Validar
        setIsValidBudget(true);
    }

    return (
        <div className="contenedor-presupuesto contenedor sombra">
            <form action="" className="formulario">
                <div className="campo">
                    <label htmlFor="budget">Definir Presupuesto</label>
                    <input 
                        className="nuevo-presupuesto"
                        id="budget"
                        type="number" 
                        placeholder="Añade tu presupuesto"
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                    />
                </div>

                <input type="submit" value="Añadir" onClick={handleBudget}/>
                {message && <Message type="error">{message}</Message>}
            </form>

        </div>
    )
}

export default NewBudget;