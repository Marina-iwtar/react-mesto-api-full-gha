import React from "react";

function Footer() {
  return (
    <div>
      <footer className="footer">
        <p className="footer__copyright">&copy;{new Date().getFullYear()} Mesto Russia</p>
      </footer>
    </div>
  );
}
export default Footer;
