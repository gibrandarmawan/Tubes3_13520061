import { Link  } from "react-router-dom";
import '../Styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1><img src={process.env.PUBLIC_URL+"borrom.gif"} className="Logo-Borrom" alt="logo"/> RS Borromeus</h1>
      <div className="links header">
        <Link to="/" style={{ textDecoration: 'none' }}><strong>Home   </strong></Link >
        <Link to="/addPenyakit" style={{ textDecoration: 'none' }}><strong>TambahkanPenyakit   </strong></Link>
        <Link to="/testDNA" style={{ textDecoration: 'none' }}><strong>TestDNA   </strong></Link>
        <Link to="/searchHasil" style={{ textDecoration: 'none' }}><strong>PencarianHasil</strong></Link>
      </div>
    </nav>
  );
}
 
export default Navbar;