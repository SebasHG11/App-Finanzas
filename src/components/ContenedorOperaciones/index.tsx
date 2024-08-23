import React from "react";

type Props = {
    children: React.ReactNode;
}

export const ContenedorOperaciones = ({ children }: Props):JSX.Element =>{
    return(
        <div className="max-w-full overflow-x-auto m-4 flex flex-row gap-7 custom-scrollbar">
            {children}
        </div>
    );
}