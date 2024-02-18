import { useEffect, useState } from "react";

const Input = ({amount, setValorInput, isChile, trasnformToPeso}) => {

    const handleChange = (event) => {
        if (!isChile) {
            setValorInput(event.target.value);
        }
    };
    useEffect(() => {
        if (!isChile) {
            trasnformToPeso();
        }
    }, [amount]);

    return (
        <div>
        <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder={isChile ? '0' : 'Ingrese Monto'}
            disabled={isChile}
            value={amount}
            onChange={handleChange}
        />
        </div>
    );
}

export default Input