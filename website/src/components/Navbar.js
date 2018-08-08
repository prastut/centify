import React from "react";
import injectSheet from "react-jss";
import { Link } from "react-router-dom";

const styles = {
  root: {
    position: "absolute",
    width: "100%"
  },
  wrapper: {
    width: "calc(100vw*0.8)",
    padding: "20px 0",
    margin: "0 auto",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  brand: {
    margin: 0
  },
  links: {
    marginLeft: "20px"
  }
};

const Navbar = ({ classes, brand, navLinks }) => (
  <div className={classes.root}>
    <div className={classes.wrapper}>
      <Link to="/">
        <h2 className={classes.brand}>{brand}</h2>
      </Link>
      <div>
        {navLinks.map(link => (
          <Link key={link} className={classes.links} to={link.toLowerCase()}>
            {link}
          </Link>
        ))}
      </div>
    </div>
  </div>
);

export default injectSheet(styles)(Navbar);
