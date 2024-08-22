import React from "react";
import ReactDOM from "react-dom";

type Props = {
  children: React.ReactNode
}

export const Modal = ({ children }: Props): JSX.Element => {
  const portalRoot = document.getElementById("portal-root");

  if (!portalRoot) return <div></div>

  return ReactDOM.createPortal(children, portalRoot)
};