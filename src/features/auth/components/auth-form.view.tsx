// SPDX-License-Identifier: AGPL-3.0-only
// Copyright 2026-present the Unsloth AI Inc. team. All rights reserved. See /studio/LICENSE.AGPL-3.0

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import type { ReactElement, SyntheticEvent } from "react";

export type AuthMode = "login" | "change-password";

export interface AuthFormViewProps {
  mode: AuthMode;
  title: string;
  subtitle: string;
  submitLabel: string;
  loading: boolean;
  statusLoading: boolean;
  error: string | null;
  helperText: string | null;
  passwordValue: string;
  onPasswordChange: (value: string) => void;
  newPasswordValue: string;
  onNewPasswordChange: (value: string) => void;
  confirmPasswordValue: string;
  onConfirmPasswordChange: (value: string) => void;
  showPasswordState: boolean;
  onToggleShowPassword: () => void;
  onSubmit: (event: SyntheticEvent<HTMLFormElement>) => void;
  isSubmitDisabled: boolean;
  showPasswordMismatchWarning: boolean;
  showSwitchLink: boolean;
  switchText?: string;
  switchLinkTo?: string;
  switchLinkText?: string;
}

export const MOCK_AUTH_FORM_VIEW_PROPS: AuthFormViewProps = {
  mode: "login",
  title: "Welcome back",
  subtitle: "Sign in with your password.",
  submitLabel: "Login",
  loading: false,
  statusLoading: false,
  error: null,
  helperText: null,
  passwordValue: "",
  onPasswordChange: () => {},
  newPasswordValue: "",
  onNewPasswordChange: () => {},
  confirmPasswordValue: "",
  onConfirmPasswordChange: () => {},
  showPasswordState: false,
  onToggleShowPassword: () => {},
  onSubmit: (e) => e.preventDefault(),
  isSubmitDisabled: false,
  showPasswordMismatchWarning: false,
  showSwitchLink: false,
};

export function AuthFormView({
  mode,
  title,
  subtitle,
  submitLabel,
  loading,
  statusLoading,
  error,
  helperText,
  passwordValue,
  onPasswordChange,
  newPasswordValue,
  onNewPasswordChange,
  confirmPasswordValue,
  onConfirmPasswordChange,
  showPasswordState,
  onToggleShowPassword,
  onSubmit,
  isSubmitDisabled,
  showPasswordMismatchWarning,
  showSwitchLink,
  switchText,
  switchLinkTo,
  switchLinkText,
}: AuthFormViewProps): ReactElement | null {
  if (statusLoading && error === null) return null;

  const isLoginMode = mode === "login";

  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="space-y-1.5 text-center">
        <img
          src="/Sloth emojis/large sloth wave.png"
          alt="Unsloth waving mascot"
          className="mx-auto mb-2 h-20 w-20 object-contain"
        />
        <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
      <form className="space-y-5" onSubmit={onSubmit}>
        {isLoginMode && (
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPasswordState ? "text" : "password"}
                className="pr-10"
                autoComplete="current-password"
                value={passwordValue}
                onChange={(event) => onPasswordChange(event.target.value)}
                minLength={8}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:bg-transparent"
                onClick={onToggleShowPassword}
              >
                {showPasswordState ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        )}

        {!isLoginMode && (
          <>
            <div className="space-y-2">
              <Label htmlFor="new-password">New password</Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showPasswordState ? "text" : "password"}
                  className="pr-10"
                  autoComplete="new-password"
                  value={newPasswordValue}
                  onChange={(event) => onNewPasswordChange(event.target.value)}
                  minLength={8}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:bg-transparent"
                  onClick={onToggleShowPassword}
                >
                  {showPasswordState ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm password</Label>
              <Input
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                value={confirmPasswordValue}
                onChange={(event) => onConfirmPasswordChange(event.target.value)}
                minLength={8}
                required
              />
            </div>
            <p
              className={`min-h-4 text-xs ${
                showPasswordMismatchWarning ? "text-destructive" : "text-muted-foreground"
              }`}
              aria-live="polite"
            >
              {showPasswordMismatchWarning
                ? "Please ensure passwords match."
                : "Must be at least 8 characters."}
            </p>
          </>
        )}

        {helperText && (
          <p className="text-center text-sm text-amber-600">{helperText}</p>
        )}
        {error && <p className="text-center text-sm text-destructive">{error}</p>}

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitDisabled}
        >
          {loading ? "Please wait..." : submitLabel}
        </Button>
      </form>

      {showSwitchLink && switchLinkTo && (
        <p className="text-center text-sm text-muted-foreground">
          {switchText}
          <Link to={switchLinkTo} className="text-primary hover:underline">
            {switchLinkText}
          </Link>
        </p>
      )}
    </div>
  );
}
