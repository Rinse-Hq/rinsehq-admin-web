"use client";

import { useState } from "react";
import { Button } from "@/presentation/components/ui/button";
import { PasswordInput } from "@/presentation/components/ui/password-input";

type ChangePasswordFormProps = {
  onSave: (current: string, next: string) => boolean;
};

export function ChangePasswordForm({ onSave }: ChangePasswordFormProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setSaved(false);

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    const success = onSave(currentPassword, newPassword);
    if (!success) {
      setError("Current password is incorrect.");
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-5">
        <PasswordInput
          name="currentPassword"
          label="Current password"
          placeholder="Enter current password"
          autoComplete="current-password"
          value={currentPassword}
          onChange={(e) => {
            setCurrentPassword(e.target.value);
            setError("");
          }}
          required
        />

        <PasswordInput
          name="newPassword"
          label="New password"
          placeholder="Enter new password"
          autoComplete="new-password"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            setError("");
          }}
          required
        />

        <PasswordInput
          name="confirmPassword"
          label="Confirm new password"
          placeholder="Re-enter new password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setError("");
          }}
          required
        />

        {error ? (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button type="submit" className="h-10 w-auto px-8">
            Update password
          </Button>
          {saved ? (
            <p className="text-sm text-green-600">Password updated successfully.</p>
          ) : null}
        </div>
    </form>
  );
}
