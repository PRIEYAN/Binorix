import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconQrcode,
  IconWallet
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
    href: "/PharmacyDashboard",
  },
  {
    navlabel: true,
    subheader: "SERVICES",
  },
  {
    id: uniqueId(),
    title: "Scan QR Code",
    icon: IconQrcode,
    href: "/PharmacyDashboard/utilities/qrcode",
  },
  {
    id: uniqueId(),
    title: "Live Prescriptions",
    icon: IconCopy,
    href: "/PharmacyDashboard/utilities/prescription",
  },
  {
    navlabel: true,
    subheader: "ANALYTICS",
  },
  {
    id: uniqueId(),
    title: "Manage Prescriptions",
    icon: IconLogin,
    href: "/PharmacyDashboard/utilities/manageprescription",
  },
  {
    id: uniqueId(),
    title: "Crypto Wallet",
    icon: IconWallet,
    href: "/PharmacyDashboard/utilities/cryptowallet",
  },
  {
    navlabel: true,
    subheader: "OTHERS",
  },
  {
    id: uniqueId(),
    title: "Settings",
    icon: IconMoodHappy,
    href: "/icons",
  },
  {
    id: uniqueId(),
    title: "Ask your Query",
    icon: IconAperture,
    href: "/sample-page",
  },

];

export default Menuitems;
