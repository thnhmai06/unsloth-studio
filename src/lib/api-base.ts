// SPDX-License-Identifier: AGPL-3.0-only
// Copyright 2026-present the Unsloth AI Inc. team. All rights reserved. See /studio/LICENSE.AGPL-3.0

let apiBase = '';

// In a real web environment, this might come from an env var
if (import.meta.env.VITE_API_BASE) {
  apiBase = import.meta.env.VITE_API_BASE;
}

export function resetApiBase() {
  apiBase = import.meta.env.VITE_API_BASE || '';
}

export function setApiBase(url: string) {
  apiBase = url;
}

export function getApiBase(): string {
  return apiBase;
}

export function apiUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return `${apiBase}${path}`;
}

export const isTauri = false;
