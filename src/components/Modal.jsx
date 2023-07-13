// Hooks
import { useState, useEffect } from "react";

// Components
import Message from "./Message";

// SVG
import closeModalIcon from "../img/cerrar.svg";

const Modal = ({setModal, animateModal, setAnimateModal, saveExpend, editExpend, modifyExpend}) => {

    const [ name, setName ] = useState("");
    const [ amount, setAmount ] = useState(0);
    const [ category, setCategory ] = useState("");

    const [ message, setMessage ] = useState("");

    const closeModal = () => {
        setAnimateModal(false);

        setTimeout(() => {
            setModal(false); 
        }, 500);
    }

    useEffect(() => {
        if(editExpend.id) {
            setName(editExpend.name);
            setAmount(editExpend.amount);
            setCategory(editExpend.category);
        }
    }, [])

    const handleSubmit = e => {
        e.preventDefault();

        if([name,amount,category].includes("") || amount <= 0){
            setMessage("ERROR: Todos los campos son necesarios");
            
            setTimeout(() => {
                setMessage("");
            }, 2000);

            return;
        }

        if(editExpend.id) {
            const newModifyObj = {name, amount, category, id: editExpend.id, date: Date.now()}
            modifyExpend(newModifyObj);
        }else {
            saveExpend({name, amount, category, date: Date.now()});
        }
    }

  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img 
                src={closeModalIcon}
                alt="icono de cierre del modal" 
                onClick={closeModal}
            />
        </div>

        <form action="" className={`formulario ${animateModal ? "animar": "cerrar"}`} onSubmit={handleSubmit}>
            <legend>{editExpend.id ? "Editar Gasto" : "Nuevo Gasto"}</legend>

            {message && (
                <Message type="error">
                    {message}
                </Message>
            )}

            <div className="campo">
                <label htmlFor="expenseName">Nombre de gasto</label>
                <input 
                    type="text"
                    placeholder="Ingrese el nombre del gasto"
                    id="expenseName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="campo">
                <label htmlFor="amount">Cantidad</label>
                <input 
                    type="number"
                    placeholder="Ingrese la cantidad a gastar: ej. 300"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                />
            </div>

            <div className="campo">
                <label htmlFor="category">Categoria</label>
                <select name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="" hidden>-- Seleccione una cetegoria --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="varios">Gastos varios</option>
                    <option value="hobbies">Hobbies</option>
                    <option value="salud">Salud</option>
                    <option value="subscribciones">Subscripciones</option>
                </select>
            </div>

            <input 
                type="submit" 
                value={editExpend.id ? "Guardar Cambios" : "Añadir gasto"}
            />
        </form>
    </div>
  )
}

export default Modal;