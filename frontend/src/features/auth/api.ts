// SPDX-License-Identifier: AGPL-3.0-only
// Copyright 2026-present the Unsloth AI Inc. team. All rights reserved. See /studio/LICENSE.AGPL-3.0

import { apiUrl, isTauri } from "@/lib/api-base";
import {
  clearAuthTokens,
  getAuthToken,
  getRefreshToken,
  mustChangePassword,
  storeAuthTokens,
} from "./session";

type RefreshResponse = {
  access_token: string;
  refresh_token: string;
  must_change_password: boolean;
};

let isRedirecting = false;

const TAURI_FETCH_RETRY_DELAYS_MS = [250, 750, 1500] as const;

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithTauriNetworkRetry(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  for (let attempt = 0; ; attempt++) {
    try {
      return await fetch(input, init);
    } catch (error) {
      if (
        !isTauri ||
        !(error instanceof TypeError) ||
        attempt >= TAURI_FETCH_RETRY_DELAYS_MS.length
      ) {
        throw error;
      }
      await wait(TAURI_FETCH_RETRY_DELAYS_MS[attempt]);
    }
  }
}

async function isPasswordChangeRequiredResponse(response: Response): Promise<boolean> {
  if (response.status !== 403) return false;

  try {
    const payload = (await response.clone().json()) as { detail?: string };
    return payload.detail === "Password change required";
  } catch {
    return false;
  }
}

async function redirectToAuth(): Promise<void> {
  // Authentication bypassed: do nothing.
  return;
}

export async function authFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  const resolvedInput = typeof input === 'string' ? apiUrl(input) : input;
  const headers = new Headers(init?.headers);
  
  // We keep sending the token if it exists for compatibility, 
  // but the backend will ignore it.
  const accessToken = getAuthToken();
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  try {
    return await fetchWithTauriNetworkRetry(resolvedInput, {
      ...init,
      headers,
    });
  } catch (err) {
    if (err instanceof TypeError) {
      throw new Error("Studio isn't running -- please relaunch it.");
    }
    throw err;
  }
}

export function logout(): void {
  clearAuthTokens();
}
