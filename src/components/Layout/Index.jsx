import { useEffect } from "react";

import { ToastContainer } from "react-toastify";

const Layout = ({ children, pageTitle }) => {
  useEffect(() => {
    document.title = `${pageTitle} | Todo Firebase`;
  });
  return (
    <div className="container">
      <div className="row">{children}</div>
      <ToastContainer />
    </div>
  );
};

export default Layout;
