import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "HOME",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/dashboard",
  },
  {
    navlabel: true,
    subheader: "SERVICES",
  },
  {
    id: uniqueId(),
    title: "Add Prescriptions",
    icon: IconTypography,
    href: "/doc/components/addprescription",
  },
  {
    id: uniqueId(),
    title: "Live Prescriptions",
    icon: IconCopy,
    href: "/utilities/shadow",
  },
  {
    navlabel: true,
    subheader: "ANALYTICS",
  },
  {
    id: uniqueId(),
    title: "Manage Prescriptions",
    icon: IconLogin,
    href: "/utilities/prescription",
  },
  {
    id: uniqueId(),
    title: "Manage Crypto Wallet",
    icon: IconUserPlus,
    href: "/doc/components/cryptowallet",
  },
  {
    navlabel: true,
    subheader: "OTHERS",
  },
  {
    id: uniqueId(),
    title: "Settings",
    icon: IconMoodHappy,
    href: "/",
  },
  {
    id: uniqueId(),
    title: "Ask your Query",
    icon: IconAperture,
    href: "/",
  },

];

export default Menuitems;
