// SPDX-License-Identifier: AGPL-3.0-only
// Copyright 2026-present the Unsloth AI Inc. team. All rights reserved. See /studio/LICENSE.AGPL-3.0

/**
 * Open a URL in a new tab.
 * Handles anchor links and mailto: natively.
 * Returns true when the caller should preventDefault.
 */
export function openLink(url: string): boolean {
  if (!url) return false;

  // Anchor links — scroll within the page, don't open externally
  if (url.startsWith("#")) {
    window.location.hash = url;
    return true;
  }

  // Relative URLs — let the browser / router handle them natively
  if (!url.includes("://") && !url.startsWith("mailto:")) {
    return false;
  }

  window.open(url, "_blank", "noopener,noreferrer");
  return true;
}
