import React from "react";

type Props = {
    children: React.ReactNode;
}

export const ContenedorOperaciones = ({ children }: Props):JSX.Element =>{
    return(
        <>
            {children}
        </>
    );
}