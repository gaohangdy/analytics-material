import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  NotificationsNone as NotificationsIcon,
  FormatSize as TypographyIcon,
  FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon,
  Dashboard as DashboardIcon,
  RecordVoiceOver as RecordVoiceOverIcon,
  Assignment as AssignmentIcon,
  TouchApp as TouchAppIcon,
  Settings as SettingsIcon,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
import Dot from "./components/Dot";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

const structure = [
  {
    id: 1,
    label: "Dashboard",
    link: "/app/customer",
    icon: <DashboardIcon />,
    children: [
      { label: "顧客の声", link: "/app/customer" },
      { label: "店舗の声", link: "/app/store" },
      { label: "新商品提案", link: "/app/product" },
      { label: "販売分析", link: "/app/sales" },
      { label: "履歴検索", link: "/app/history" },
      { label: "カスタマイズ", link: "/app/customize" },      
    ],
  },
  { id: 2, label: "辞書", link: "/app/dictionary", icon: <AssignmentIcon /> },
  { id: 3, label: "キーワード", link: "/app/keywords", icon: <TouchAppIcon /> },
  { id: 4, label: "設定", link: "/app/settings", icon: <SettingsIcon /> },

  // { id: 5, type: "divider" },
  // { id: 6, type: "title", label: "Reference" },
  // { id: 99, label: "Cloud Dashboard", link: "/app/cloud", icon: <DashboardIcon /> },
  // { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
  // {
  //   id: 1,
  //   label: "Typography",
  //   link: "/app/typography",
  //   icon: <TypographyIcon />,
  // },
  // { id: 2, label: "Tables", link: "/app/tables", icon: <TableIcon /> },
  // {
  //   id: 3,
  //   label: "Notifications",
  //   link: "/app/notifications",
  //   icon: <NotificationsIcon />,
  // },
  // {
  //   id: 4,
  //   label: "UI Elements",
  //   link: "/app/ui",
  //   icon: <UIElementsIcon />,
  //   children: [
  //     { label: "Icons", link: "/app/ui/icons" },
  //     { label: "Charts", link: "/app/ui/charts" },
  //     { label: "Maps", link: "/app/ui/maps" },
  //   ],
  // },
  // { id: 5, type: "divider" },
  // { id: 6, type: "title", label: "HELP" },
  // { id: 7, label: "Library", link: "", icon: <LibraryIcon /> },
  // { id: 8, label: "Support", link: "", icon: <SupportIcon /> },
  // { id: 9, label: "FAQ", link: "", icon: <FAQIcon /> },
  // { id: 10, type: "divider" },
  // { id: 11, type: "title", label: "PROJECTS" },
  // {
  //   id: 12,
  //   label: "My recent",
  //   link: "",
  //   icon: <Dot size="small" color="warning" />,
  // },
  // {
  //   id: 13,
  //   label: "Starred",
  //   link: "",
  //   icon: <Dot size="small" color="primary" />,
  // },
  // {
  //   id: 14,
  //   label: "Background",
  //   link: "",
  //   icon: <Dot size="small" color="secondary" />,
  // },
];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
