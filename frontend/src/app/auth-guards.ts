// SPDX-License-Identifier: AGPL-3.0-only
// Copyright 2026-present the Unsloth AI Inc. team. All rights reserved. See /studio/LICENSE.AGPL-3.0

import { redirect } from "@tanstack/react-router";
import { getPostAuthRoute } from "@/features/auth";

export async function requireAuth(): Promise<void> {
  return; // Bypass auth
}

export async function requireGuest(): Promise<void> {
  throw redirect({ to: getPostAuthRoute() }); // Always redirect guests to post-auth route
}

export async function requirePasswordChangeFlow(): Promise<void> {
  return; // Bypass auth
}
