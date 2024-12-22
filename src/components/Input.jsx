import { useEffect, useState } from "react";

const Input = ({amount, setValorInput, isChile, trasnformToPeso, trasnformToUf, isReverse, toClp}) => {

    const handleChange = (event) => {
        const regexNumbers = /^(?!^\.)(?:\d+\.?\d*)$/;
        if (!isReverse) {
            const isOnlyNumbers = event.target.value.match(regexNumbers);
            if (isOnlyNumbers || event.target.value === '') {
                setValorInput(event.target.value);
            }
        } else {
            const formatValue = event.target.value.replace("$", "").replaceAll(".", "");
            const isOnlyNumbers = formatValue.match(regexNumbers);
            if (isOnlyNumbers || formatValue === '') {
                const value = toClp(+formatValue);
                setValorInput(value);
            }
            
        }
    };

    const textPlaceholder = () => {
        if ((isReverse && isChile) || (!isReverse && !isChile)) {
            return "Ingrese Monto"
        }
        return "0";
    };

    const isDisabled = () => {
        return (!isReverse && isChile) || (isReverse && !isChile);
    }

    useEffect(() => {
        if (!isReverse) {
            trasnformToPeso();
        } else {
            trasnformToUf();
        }
    }, [amount]);

    return (
        <div>
        <input
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder={textPlaceholder()}
            disabled={isDisabled()}
            value={amount}
            onChange={handleChange}
        />
        </div>
    );
}

export default Input