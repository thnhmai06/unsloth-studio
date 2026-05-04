// SPDX-License-Identifier: AGPL-3.0-only
// Copyright 2026-present the Unsloth AI Inc. team. All rights reserved. See /studio/LICENSE.AGPL-3.0

import { AppSidebar } from "@/components/app-sidebar";
import type { ReactElement, ReactNode } from "react";
import { DashboardLayoutView } from "./dashboard-layout.view";

export function DashboardLayout({
  children,
}: { children: ReactNode }): ReactElement {
  return (
    <DashboardLayoutView sidebar={<AppSidebar />}>
      {children}
    </DashboardLayoutView>
  );
}
