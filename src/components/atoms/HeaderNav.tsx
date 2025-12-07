import { Button } from "@/components/ui/button";
import {
  HomeIcon,
  AnalyticsIcon,
  RevenueIcon,
  CrmIcon,
  AppsIcon,
  NotificationIcon,
  MessageIcon,
  BurgerIcon,
  // BurgerIcon is replaced by HeaderDrawer (trigger inside organism)
} from "./icons";
import useSWR from "swr";
import ProfileAvatar from "./ProfileAvatar";
import { getUser } from "@/lib/actions";
import getInitialsFromUser from "@/lib/utils/getInitials";
import { cn } from "@/lib/utils";
import type { UserResponse } from "@/lib/types/api";

const NAV_ITEMS = [
  { key: "home", label: "Home", Icon: HomeIcon },
  { key: "analytics", label: "Analytics", Icon: AnalyticsIcon },
  { key: "revenue", label: "Revenue", Icon: RevenueIcon },
  { key: "crm", label: "CRM", Icon: CrmIcon },
  { key: "apps", label: "Apps", Icon: AppsIcon },
];

const HeaderNav = () => {
  const activeKey = "revenue";
  const { data: user } = useSWR<UserResponse>("/user", getUser);

  const getInitials = (u?: UserResponse) => getInitialsFromUser(u);

  return (
    <div className="header-nav fixed bg-white top-4 left-4 right-4 z-50 flex font-sans text-3xl h-16 justify-between rounded-full items-center px-4 py-3.5 shadow-[0px_2px_4px_0px_rgba(32,56,67,0.05),0px_2px_6px_0px_rgba(32,56,67,0.06)]">
      <img src="/assets/images/mainstack-logo.png" className="h-9 w-9" />

      <nav>
        <ul className="list-none m-0 p-0 flex items-center gap-5 text-[#56616B] font-degular">
          {NAV_ITEMS.map((item) => {
            const isActive = item.key === activeKey;
            const Icon = item.Icon;
            return (
              <li key={item.key}>
                <Button
                  size="sm"
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    isActive
                      ? "font-semibold flex items-center gap-1.5 text-white"
                      : "opacity-80 flex items-center gap-2",
                    "rounded-full py-2 px-3.5 text-base h-10"
                  )}
                >
                  <Icon size={20} color={isActive ? "inherit" : undefined} />
                  {item.label}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <NotificationIcon size={20} />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Submit">
          <MessageIcon size={20} />
        </Button>

        <div className="p-1.5 pr-3 rounded-full flex w-max items-center bg-[#EFF1F6] h-10  gap-2">
          <ProfileAvatar size={32} initials={getInitials(user)} />
          <BurgerIcon size={24} />
        </div>
      </div>
    </div>
  );
};

export default HeaderNav;
