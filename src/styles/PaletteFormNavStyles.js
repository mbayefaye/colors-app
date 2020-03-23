import { makeStyles } from "@material-ui/core/styles";
import { DRAWER_WIDTH } from "../constant";
import sizes from "./size";

const styles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    flexDirection: "row",
    justifyContent: "space-between",
    height: "64px",
    alignItems: "center"
  },
  appBarShift: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: DRAWER_WIDTH,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  NavBtns: {
    marginRight: "1rem",
    "& a": {
      textDecoration: "none"
    },
    [sizes.down("xs")]: {
      marginRight: "0.5rem"
    }
  },
  button: {
    margin: "0 0.5rem",
    [sizes.down("xs")]: {
      marginRight: 0
    }
  }
}));

export default styles;
