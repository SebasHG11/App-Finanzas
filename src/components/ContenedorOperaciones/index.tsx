import React from "react";

type Props = {
    children: React.ReactNode;
}

export const ContenedorOperaciones = ({ children }: Props):JSX.Element =>{
    return(
        <div className="m-4 flex items-center content-around gap-7">
            {children}
        </div>
    );
}