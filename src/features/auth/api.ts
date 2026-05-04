// SPDX-License-Identifier: AGPL-3.0-only
// Copyright 2026-present the Unsloth AI Inc. team. All rights reserved. See /studio/LICENSE.AGPL-3.0

import { apiUrl } from "@/lib/api-base";
import {
  clearAuthTokens,
  getAuthToken,
} from "./session";

export async function refreshSession(): Promise<boolean> {
  return true;
}

export async function authFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  const resolvedInput = typeof input === 'string' ? apiUrl(input) : input;
  const headers = new Headers(init?.headers);
  
  const accessToken = getAuthToken();
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return await fetch(resolvedInput, {
    ...init,
    headers,
  });
}

export function logout(): void {
  clearAuthTokens();
}
