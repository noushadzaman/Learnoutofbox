"use client";

import { BarChart, BookCheck, ClipboardPlus, CopyPlus } from "lucide-react";

import { BookOpen } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { BookA } from "lucide-react";
import { Radio } from "lucide-react";

const routes = [
  {
    icon: BarChart,
    label: "Analytics",
    href: "/dashboard",
  },
  {
    icon: BookOpen,
    label: "Courses",
    href: "/dashboard/courses",
  },
  {
    icon: CopyPlus,
    label: "Add Course",
    href: "/dashboard/courses/add",
  },
  {
    icon: BookCheck,
    label: "Tests",
    href: "/dashboard/tests",
  },
  {
    icon: ClipboardPlus,
    label: "Add Test",
    href: "/dashboard/tests/add",
  },
  {
    icon: BookA,
    label: "Quizes",
    href: "/dashboard/quiz-sets",
  },
  // {
  //   icon: Radio,
  //   label: "Lives",
  //   href: "/dashboard/lives",
  // },
];

export const SidebarRoutes = () => {
  // const pathname = usePathname();

  // const isTeacherPage = pathname?.includes("/teacher");

  // const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
