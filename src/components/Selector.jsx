import { useState } from "react";

const Selector = ({options, handleChange, selectedOption}) => {
  return (
    <>
     <select
        className="w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow"
        value={selectedOption.codigo}
        onChange={handleChange}>
            <option value="" disabled selected hidden>Seleccione una opción</option>
            {
              options.map((item,index) => <option key={index} value={item.codigo}>{item.nombre}</option>)
            }
      </select>
    </>
  )
}

export default Selector