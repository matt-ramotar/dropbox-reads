import {
  faAngleRight,
  faCaretDown,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Grid, Link, Typography } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import styles from "./Nav.module.scss";

export default function Nav(): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const navigate = useNavigate();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickSettings = () => {
    navigate("/settings");
  };
  return (
    <Grid container className={styles.root}>
      <Grid className={styles.logo}>
        <Link href="/">
          <img src={logo} alt="Mighty logo" className={styles.smallLogo} />
        </Link>
      </Grid>

      <Grid className={styles.right}>
        <Button className={styles.icon__button} onClick={handleClick}>
          <FontAwesomeIcon
            icon={faCaretDown}
            className={styles.icon}
            size="lg"
          />
        </Button>
      </Grid>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        className={styles.menu}
      >
        <MenuItem onClick={handleClickSettings}>
          <Grid container className={styles.menuItem__grid}>
            <FontAwesomeIcon
              icon={faCog}
              className={styles.icon__cog}
              size="lg"
            />
            <Typography variant="body1" className={styles.menuItem__text}>
              Settings
            </Typography>
            <FontAwesomeIcon
              icon={faAngleRight}
              className={styles.icon__angle}
              size="lg"
            />
          </Grid>
        </MenuItem>
      </Menu>
    </Grid>
  );
}
