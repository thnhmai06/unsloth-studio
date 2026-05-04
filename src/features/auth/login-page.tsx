// SPDX-License-Identifier: AGPL-3.0-only
// Copyright 2026-present the Unsloth AI Inc. team. All rights reserved. See /studio/LICENSE.AGPL-3.0

import { AuthForm } from "./components/auth-form";
import { LoginPageView } from "./login-page.view";

export function LoginPage() {
  return <LoginPageView authFormComponent={<AuthForm mode="login" />} />;
}
