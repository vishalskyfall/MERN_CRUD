import React, { createContext, useState } from "react";

export const addData = createContext("");

export const updateData = createContext("");

export const delData = createContext("");

const ContextProvider = ({ children }) => {
    const [udata, setUdata] = useState("");
    const [updata, setUPdata] = useState("");
    const [dltdata, setDLTdata] = useState("");


    return (
        <addData.Provider value={{ udata, setUdata }}>
            <updateData.Provider value={{ updata, setUPdata }}>
                <delData.Provider value={{dltdata, setDLTdata}}>
                    {children}
                </delData.Provider>

            </updateData.Provider>

        </addData.Provider>
  );
};

export default ContextProvider;
