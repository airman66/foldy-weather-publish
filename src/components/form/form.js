import React, {useContext} from "react";
import {Context} from "../context";

const Form = () => {
    const {label, onInputChange, onFormSubmit} = useContext(Context);

    return (
        <form
            onSubmit={(e) => onFormSubmit(e)}
            className="mb-4"
        >
            <label htmlFor="inputCity">Введите название города, в котором хотите узнать погоду:</label>
            <div className="d-flex align-items-center">
                <input
                    type="text"
                    id="inputCity"
                    className="form-control col-9 mr-2 text-uppercase font-weight-bold"
                    value={label}
                    onChange={(e) => onInputChange(e)}
                />
                <button
                    className="btn col-3 btn-primary"
                >
                    Узнать погоду
                </button>
            </div>
        </form>
    );
};

export default Form;