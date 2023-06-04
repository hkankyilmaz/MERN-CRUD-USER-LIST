const drawerWidth = 240;

export const drawerOne = {
  display: { xs: "block", sm: "none" },
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    width: drawerWidth,
  },
};

export const drwaerTwo = {
  display: { xs: "none", sm: "block" },
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    width: drawerWidth,
  },
};

export const main_ = {
  flexGrow: 1,
  p: 3,
  width: { sm: `calc(100% - ${drawerWidth}px)` },
};

export const Appbar = {
  width: { sm: `calc(100% - ${drawerWidth}px)` },
  ml: { sm: `${drawerWidth}px` },
};
