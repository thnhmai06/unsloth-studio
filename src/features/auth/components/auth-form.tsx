// SPDX-License-Identifier: AGPL-3.0-only
// Copyright 2026-present the Unsloth AI Inc. team. All rights reserved. See /studio/LICENSE.AGPL-3.0

import { apiUrl } from "@/lib/api-base";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { ReactElement, SyntheticEvent } from "react";
import { usePlatformStore } from "@/config/env";
import { refreshSession } from "../api";
import { AuthFormView } from "./auth-form.view";
import type { AuthMode } from "./auth-form.view";

// Bootstrap credentials injected into index.html by the backend
declare global {
  interface Window {
    __UNSLOTH_BOOTSTRAP__?: { username: string; password: string };
  }
}

import {
  clearAuthTokens,
  getAuthToken,
  getPostAuthRoute,
  hasAuthToken,
  hasRefreshToken,
  mustChangePassword,
  resetOnboardingDone,
  setMustChangePassword,
  storeAuthTokens,
} from "../session";

type AuthStatusResponse = {
  initialized: boolean;
  requires_password_change: boolean;
};

type TokenResponse = {
  access_token: string;
  refresh_token: string;
  must_change_password: boolean;
};

async function loginWithPassword(
  username: string,
  password: string,
): Promise<TokenResponse> {
  const response = await fetch(apiUrl("/api/auth/login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username.trim(),
      password,
    }),
  });

  if (!response.ok) {
    const errorPayload = (await response.json().catch(() => null)) as { detail?: string } | null;
    throw new Error(errorPayload?.detail ?? "Login failed.");
  }

  return (await response.json()) as TokenResponse;
}

type AuthFormProps = {
  mode: AuthMode;
};

const HIDDEN_LOGIN_USERNAME = "unsloth";

export function AuthForm({ mode }: AuthFormProps): ReactElement | null {
  const navigate = useNavigate();
  const isLoginMode = mode === "login";
  const [showPassword, setShowPassword] = useState(false);
  const username = HIDDEN_LOGIN_USERNAME;
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(true);
  const [initialized, setInitialized] = useState<boolean | null>(null);
  const [requiresPasswordChange, setRequiresPasswordChange] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let canceled = false;

    async function initializeAuthForm(): Promise<void> {
      try {
        const response = await fetch(apiUrl("/api/auth/status"));
        if (!response.ok) throw new Error("Failed to load auth status.");
        const result = (await response.json()) as AuthStatusResponse;
        if (!canceled) {
          setInitialized(result.initialized);
          setRequiresPasswordChange(result.requires_password_change);

          if (mode === "login" && result.requires_password_change) {
            navigate({ to: "/change-password" });
            return;
          }
          if (mode === "change-password" && !result.requires_password_change && !mustChangePassword()) {
            navigate({ to: "/login" });
            return;
          }

          if (isLoginMode && !result.requires_password_change) {
            if (hasRefreshToken()) {
              const refreshed = await refreshSession();
              if (refreshed) {
                if (!canceled) setStatusLoading(false);
                navigate({ to: getPostAuthRoute() });
                return;
              }
            }
            if (hasAuthToken()) {
              if (!canceled) setStatusLoading(false);
              navigate({ to: getPostAuthRoute() });
              return;
            }
          }
        }
      } catch (err: unknown) {
        if (!canceled) {
          setError(err instanceof Error ? err.message : "Failed to load.");
        }
      } finally {
        if (!canceled) setStatusLoading(false);
      }
    }

    void initializeAuthForm();

    return () => {
      canceled = true;
    };
  }, [navigate, mode, isLoginMode]);

  useEffect(() => {
    function loadBootstrap() {
      const bootstrap = window.__UNSLOTH_BOOTSTRAP__;
      if (bootstrap && !isLoginMode && !password) {
        setPassword(bootstrap.password);
      }
    }
    loadBootstrap();
  }, [isLoginMode, password]);

  const blockedByState =
    initialized === false ||
    (mode === "login" && requiresPasswordChange) ||
    (mode === "change-password" && !requiresPasswordChange && !mustChangePassword());

  let helperText: string | null = null;
  if (initialized === false) {
    helperText = "Auth is still bootstrapping the default admin account.";
  } else if (isLoginMode && requiresPasswordChange) {
    helperText = "Sign in once with the seeded credentials to change the password.";
  } else if (!isLoginMode && !requiresPasswordChange && !mustChangePassword()) {
    helperText = "Password already updated. Use the login screen.";
  }

  const title = isLoginMode ? "Welcome back" : "Setup your account";
  const subtitle = isLoginMode  
    ? "Sign in with your password."
    : "Choose a new password";
  const submitLabel = isLoginMode ? "Login" : "Change password";
  const showSwitchLink = !isLoginMode;
  const switchText = "Password already setup? ";
  const switchLinkTo = "/login";
  const switchLinkText = "Back to login";
  
  const currentPassword = password || window.__UNSLOTH_BOOTSTRAP__?.password || "";
  
  const invalidChangePasswordForm =
    !isLoginMode &&
    (newPassword.length < 8 || newPassword !== confirmPassword || currentPassword === newPassword);
  
  const showPasswordMismatchWarning =
    !isLoginMode &&
    newPassword.length > 0 &&
    confirmPassword.length > 0 &&
    newPassword !== confirmPassword;

  const isSubmitDisabled =
    loading ||
    statusLoading ||
    blockedByState ||
    (isLoginMode && password.length < 8) ||
    invalidChangePasswordForm;

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!isLoginMode) {
      if (!currentPassword) {
        setError("Unable to initialize setup. Reload the page and try again.");
        return;
      }
      if (newPassword.length < 8) {
        setError("New password must be at least 8 characters.");
        return;
      }
      if (newPassword !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (currentPassword === newPassword) {
        setError("New password must be different from your current password.");
        return;
      }
    }

    setLoading(true);
    try {
      let token: TokenResponse;

      if (isLoginMode) {
        token = await loginWithPassword(username, password);
      } else {
        let accessToken = getAuthToken();

        if (hasRefreshToken()) {
          const refreshed = await refreshSession();
          accessToken = getAuthToken();
          if (!refreshed) {
            clearAuthTokens();
            accessToken = null;
          }
        }

        if (!accessToken) {
          const bootstrapToken = await loginWithPassword(username, currentPassword);
          storeAuthTokens(
            bootstrapToken.access_token,
            bootstrapToken.refresh_token,
            bootstrapToken.must_change_password,
          );
          setMustChangePassword(bootstrapToken.must_change_password);
          accessToken = bootstrapToken.access_token;
        }

        const response = await fetch(apiUrl("/api/auth/change-password"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            current_password: currentPassword,
            new_password: newPassword,
          }),
        });

        if (!response.ok) {
          let message = "Password update failed.";
          const errorPayload = (await response
            .json()
            .catch(() => null)) as { detail?: string } | null;
          if (errorPayload?.detail) message = errorPayload.detail;
          throw new Error(message);
        }

        token = (await response.json()) as TokenResponse;
      }

      if (!isLoginMode) {
        resetOnboardingDone();
        setRequiresPasswordChange(false);
        setMustChangePassword(false);
      } else {
        setMustChangePassword(token.must_change_password);
      }
      storeAuthTokens(
        token.access_token,
        token.refresh_token,
        token.must_change_password,
      );
      navigate({ to: getPostAuthRoute() });
    } catch (err: unknown) {
      let msg = err instanceof Error ? err.message : "Auth failed.";
      if (msg.includes("unsloth studio reset-password") && usePlatformStore.getState().deviceType === "windows") {
        msg = msg.replace(
          "unsloth studio reset-password",
          ".\\unsloth_studio\\Scripts\\unsloth.exe studio reset-password",
        );
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthFormView
      mode={mode}
      title={title}
      subtitle={subtitle}
      submitLabel={submitLabel}
      loading={loading}
      statusLoading={statusLoading}
      error={error}
      helperText={helperText}
      passwordValue={password}
      onPasswordChange={setPassword}
      newPasswordValue={newPassword}
      onNewPasswordChange={setNewPassword}
      confirmPasswordValue={confirmPassword}
      onConfirmPasswordChange={setConfirmPassword}
      showPasswordState={showPassword}
      onToggleShowPassword={() => setShowPassword((prev) => !prev)}
      onSubmit={handleSubmit}
      isSubmitDisabled={isSubmitDisabled}
      showPasswordMismatchWarning={showPasswordMismatchWarning}
      showSwitchLink={showSwitchLink}
      switchText={switchText}
      switchLinkTo={switchLinkTo}
      switchLinkText={switchLinkText}
    />
  );
}
