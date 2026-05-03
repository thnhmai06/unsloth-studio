// SPDX-License-Identifier: AGPL-3.0-only
// Copyright 2026-present the Unsloth AI Inc. team. All rights reserved. See /studio/LICENSE.AGPL-3.0

import { redirect } from "@tanstack/react-router";
import { getPostAuthRoute } from "@/features/auth";

export async function requireAuth(): Promise<void> {
  // Authentication bypassed: allow all access.
  return;
}

export async function requireGuest(): Promise<void> {
  // Authentication bypassed: guest mode is just regular mode.
  // Redirect to the default post-auth route if they try to access guest-only pages like /login.
  throw redirect({ to: getPostAuthRoute() });
}

export async function requirePasswordChangeFlow(): Promise<void> {
  // Authentication bypassed: password change flow is never required.
  throw redirect({ to: getPostAuthRoute() });
}
