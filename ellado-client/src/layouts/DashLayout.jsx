import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import PeopleIcon from "@mui/icons-material/People";
import Button from "@mui/material/Button";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 240;

const dashboardViews = [
  { label: "Dashboard", to: "/dashboard", icon: <DashboardIcon /> },
  { label: "Reports", to: "/dashboard/reports", icon: <BarChartIcon /> },
  { label: "Users", to: "/dashboard/users", icon: <PeopleIcon /> },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ open }) => ({
  zIndex: 1201,
  backgroundColor: "#B0C4DE", // clean white
  color: "#000",
  borderBottom: "1px solid #e0e0e0", // subtle line
  boxShadow: "none",
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
  }),
}));

const DrawerStyled = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",

  "& .MuiDrawer-paper": {
    backgroundColor: "#fff",
    borderRight: "1px solid #e0e0e0", // clean border
  },

  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),

  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  borderBottom: "1px solid #e0e0e0",
  ...theme.mixins.toolbar,
}));

const DashLayout = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname.split("/");
  const pageTitle =
    path[path.length - 1] === ""
      ? "Dashboard"
      : path[path.length - 1].charAt(0).toUpperCase() +
        path[path.length - 1].slice(1);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const handleLogout = () => navigate("/");

  return (
    <Box sx={{ display: "flex", backgroundColor: "#fafafa", minHeight: "100vh" }}>
      <CssBaseline />

      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            edge="start"
            onClick={handleDrawerOpen}
            sx={{
              marginRight: 2,
              color: "#000",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {pageTitle}
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Button
            variant="outlined"
            onClick={handleLogout}
            sx={{
              color: "#000",
              borderColor: "#000",
              textTransform: "none",
              borderRadius: 2,
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <DrawerStyled variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{ color: "#000" }}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider />

        <List sx={{ px: 1 }}>
          {dashboardViews.map(({ label, to, icon }) => (
            <ListItem key={to} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                component={Link}
                to={to}
                selected={location.pathname === to}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  borderRadius: 2,
                  justifyContent: open ? "initial" : "center",

                  "&.Mui-selected": {
                    backgroundColor: "#f5f5f5",
                    border: "1px solid #e0e0e0",
                  },

                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : "auto",
                    justifyContent: "center",
                    color: "#000",
                  }}
                >
                  {icon}
                </ListItemIcon>

                <ListItemText
                  primary={label}
                  sx={{
                    opacity: open ? 1 : 0,
                    color: "#000",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </DrawerStyled>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashLayout;