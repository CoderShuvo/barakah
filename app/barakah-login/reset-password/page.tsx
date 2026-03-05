"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, ShieldCheck, KeyRound, ArrowRight, Lock } from "lucide-react";
import { resetPasswordAction } from "@/server/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    const result = await resetPasswordAction(password);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Password updated successfully");
      router.push("/barakah-login");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFCFB] p-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FBD3C1]/20 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00B4D8]/10 rounded-full blur-3xl -ml-48 -mb-48" />

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-black text-3xl text-[#3F1200] tracking-tight group"
          >
            <ShieldCheck className="w-8 h-8 text-[#E76F3D] group-hover:rotate-12 transition-transform" />
            <span>
              BARAKAH <span className="text-[#E76F3D]">ADMIN</span>
            </span>
          </Link>
        </div>

        <Card className="border-none shadow-[0_32px_64px_-12px_rgba(63,18,0,0.08)] rounded-[2rem] overflow-hidden">
          <CardHeader className="text-center pt-10 pb-6">
            <CardTitle className="text-2xl font-black text-[#3F1200]">
              Create New Password
            </CardTitle>
            <CardDescription className="text-[#5c4033]/60 font-medium">
              Choose a strong password to secure your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  title="password"
                  className="text-sm font-bold text-[#3F1200] ml-1"
                >
                  New Password
                </Label>
                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5c4033]/40" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    className="h-12 pl-11 rounded-2xl border-[#F0EBE8] bg-[#FDFCFB] focus-visible:ring-[#E76F3D] focus-visible:border-[#E76F3D] transition-all"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  title="confirmPassword"
                  className="text-sm font-bold text-[#3F1200] ml-1"
                >
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5c4033]/40" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    className="h-12 pl-11 rounded-2xl border-[#F0EBE8] bg-[#FDFCFB] focus-visible:ring-[#E76F3D] focus-visible:border-[#E76F3D] transition-all"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 rounded-2xl bg-[#E76F3D] hover:bg-[#D65D2D] text-white font-black text-base shadow-lg shadow-[#E76F3D]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <div className="flex items-center gap-2">
                    Set New Password <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
