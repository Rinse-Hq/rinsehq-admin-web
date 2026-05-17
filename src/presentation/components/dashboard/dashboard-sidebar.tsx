"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/presentation/lib/utils";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  hasChevron?: boolean;
};

const primaryNav: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: GridIcon },
  { href: "/dashboard/orders", label: "Order", icon: OrderIcon, hasChevron: true },
  { href: "/dashboard/transactions", label: "Transaction", icon: TransactionIcon, hasChevron: true },
  { href: "/dashboard/services", label: "Service", icon: ServiceIcon },
  { href: "/dashboard/account", label: "Account", icon: AccountIcon },
];

const secondaryNav: NavItem[] = [
  { href: "/dashboard/notifications", label: "Notification", icon: BellIcon },
  { href: "/dashboard/help", label: "Help & Support", icon: HelpIcon },
  { href: "/dashboard/tickets", label: "Ticket", icon: TicketIcon },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[220px] shrink-0 flex-col bg-sidebar text-white lg:flex">
      <nav className="flex flex-1 flex-col px-3 py-6">
        <ul className="space-y-1">
          {primaryNav.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} />
          ))}
        </ul>

        <div className="my-4 border-t border-white/20" />

        <ul className="space-y-1">
          {secondaryNav.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} />
          ))}
        </ul>
      </nav>
    </aside>
  );
}

function NavLink({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string;
}) {
  const { href, label, icon: Icon, hasChevron } = item;
  const active =
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  return (
    <li>
      <Link
        href={href}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
          active
            ? "bg-sidebar-active text-white"
            : "text-white/90 hover:bg-white/10",
        )}
      >
        <Icon className="h-5 w-5 shrink-0 opacity-90" />
        <span className="flex-1">{label}</span>
        {hasChevron ? (
          <ChevronIcon className="h-4 w-4 opacity-70" />
        ) : null}
      </Link>
    </li>
  );
}

function GridIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function OrderIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8 6H20M8 12H20M8 18H20M4 6H4.01M4 12H4.01M4 18H4.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function TransactionIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3V21M7 8L12 3L17 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ServiceIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="5" y="4" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 9H15M9 13H15M9 17H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function AccountIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 20C5 16.13 8.13 13 12 13C15.87 13 19 16.13 19 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function BellIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M15 17H9L9.5 19H14.5L15 17ZM18 13V9C18 5.69 15.31 3 12 3C8.69 3 6 5.69 6 9V13L4 15V16H20V15L18 13Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function HelpIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9.5 9.5C9.5 8.12 10.62 7 12 7C13.38 7 14.5 8.12 14.5 9.5C14.5 10.88 12 11.5 12 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="16.5" r="0.75" fill="currentColor" />
    </svg>
  );
}

function TicketIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 9C4 7.9 4.9 7 6 7H18C19.1 7 20 7.9 20 9V10C18.9 10 18 10.9 18 12C18 13.1 18.9 14 20 14V15C20 16.1 19.1 17 18 17H6C4.9 17 4 16.1 4 15V14C5.1 14 6 13.1 6 12C6 10.9 5.1 10 4 10V9Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
