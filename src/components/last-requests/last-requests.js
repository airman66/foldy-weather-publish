import React, {useContext} from "react";
import Dropdown from "react-bootstrap/Dropdown";
import {Context} from "../context";

const LastRequests = () => {
    const {lastRequests, onLastRequestClick, areThereRequests} = useContext(Context);
    const reversedLastRequests = lastRequests.filter(el => el).reverse();
    const elements = reversedLastRequests.map((el, idx) => {
        return (
            <Dropdown.Item
                key={idx}
                bsPrefix="dropdown-item text-uppercase font-weight-bold"
                as="button"
                onClick={() => onLastRequestClick(el)}
            >
                {el}
            </Dropdown.Item>
        );
    });

    if (areThereRequests) {
        return (
            <Dropdown>
                <Dropdown.Toggle bsPrefix="dropdown-toggle btn btn-block btn-primary">
                    Последние запросы
                </Dropdown.Toggle>

                <Dropdown.Menu bsPrefix="dropdown-menu w-100">
                    {elements}
                </Dropdown.Menu>
            </Dropdown>
        );
    } else {
        return null;
    }
};

export default LastRequests;