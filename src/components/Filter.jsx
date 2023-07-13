import {useEffect, useState} from 'react'

const Filter = ({filter, setFilter}) => {
  return (
    <div className='filtros sombra contenedor'>
        <form action="">
            <div className='campo'>
                <label htmlFor="filter">Filtrar gastos:</label>
                <select name="filter" id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="Todos">Todos</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="varios">Gastos varios</option>
                    <option value="hobbies">Hobbies</option>
                    <option value="salud">Salud</option>
                    <option value="subscribciones">Subscripciones</option>
                </select>
            </div>
        </form>
    </div>
  )
}

export default Filter;