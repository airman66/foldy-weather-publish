import React, {useContext} from "react";
import {Context} from "../context";

const UnitsMode = () => {
    const {onUnitsModeChange, imperialUnits} = useContext(Context);

    return (
        <div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="unitsMode" id="metric"
                       value="metric" defaultChecked={!imperialUnits}
                       onClick={(e) => onUnitsModeChange(e)} />
                    <label className="form-check-label" htmlFor="metric">
                        &deg;C
                    </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="unitsMode" id="imperial"
                       value="imperial"
                       defaultChecked={imperialUnits}
                       onClick={(e) => onUnitsModeChange(e)} />
                <label className="form-check-label" htmlFor="imperial">
                    &deg;F
                </label>
            </div>
        </div>
    );
};

export default UnitsMode;