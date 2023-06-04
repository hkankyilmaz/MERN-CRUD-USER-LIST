import * as React from "react";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import Toolbar from "@mui/material/Toolbar";
import GroupIcon from "@mui/icons-material/Group";
import TaskIcon from "@mui/icons-material/Task";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import PersonIcon from "@mui/icons-material/Person";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import LogoutIcon from "@mui/icons-material/Logout";
import UpgradeIcon from "@mui/icons-material/Upgrade";

import { signOut } from "next-auth/react";

/* User button actions-- located side bar bottom */

function Drawer_(props) {
  const actions = [
    { icon: <LogoutIcon onClick={() => signOut()} />, name: "Log Out" },
    {
      icon: (
        <UpgradeIcon
          onClick={() => {
            props.setWhichForm("Update");
            props.setOpen(true);
          }}
        />
      ),
      name: "Upgrade Info",
    },
  ];

  return (
    <div>
      <Toolbar className="logo">MALWATİON</Toolbar>
      <Divider />
      <List>
        {["Users", "Security Log", "Mail", "Others"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {text == "Users" ? (
                  <GroupIcon />
                ) : text == "Security Log" ? (
                  <TaskIcon />
                ) : text == "Mail" ? (
                  <MailIcon />
                ) : (
                  <CalendarViewMonthIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Tasks", "Mail", "Others"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box
        sx={{
          height: "100%",
          transform: "translateZ(0px)",
          flexGrow: 1,
        }}
      >
        <SpeedDial
          className="translate-x-[-50%]"
          ariaLabel="SpeedDial basic example"
          sx={{ position: "absolute", bottom: 16, left: "50%" }}
          icon={<PersonIcon sx={{ fontSize: "30px" }} />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
            />
          ))}
        </SpeedDial>
      </Box>
      <div className="h-full relative bg-[#F0F2F5]">
        <span className="absolute top-[7px] sm:top-6 text-slate-400/80 left-[50%] translate-x-[-50%]">
          @hkyilmaz
        </span>
      </div>
    </div>
  );
}

export default Drawer_;
