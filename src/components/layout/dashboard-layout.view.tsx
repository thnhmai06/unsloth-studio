// SPDX-License-Identifier: AGPL-3.0-only
// Copyright 2026-present the Unsloth AI Inc. team. All rights reserved. See /studio/LICENSE.AGPL-3.0

import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import type { ReactElement, ReactNode } from "react";

export interface DashboardLayoutViewProps {
  sidebar: ReactNode;
  children: ReactNode;
  header?: ReactNode;
}

export function DashboardLayoutView({
  sidebar,
  children,
  header,
}: DashboardLayoutViewProps): ReactElement {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        {sidebar}
        <div className="flex min-w-0 flex-1 flex-col">
          {header}
          <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
