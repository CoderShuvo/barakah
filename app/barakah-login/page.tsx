"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Loader2,
  ShieldCheck,
  AlertCircle,
  KeyRound,
  Mail,
} from "lucide-react";
import { loginAction } from "@/server/actions";
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
import { Suspense } from "react";

function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await loginAction(formData);

    if (result.error) {
      setError(result.error);
      toast.error(result.error);
    } else if (result.success) {
      toast.success("Successfully signed in");
      router.push("/admin");
      router.refresh();
    }
    setIsLoading(false);
  };

  return (
    <>
      {reason === "timeout" && (
        <div className="mb-6 p-4 rounded-2xl bg-[#E76F3D]/10 border border-[#E76F3D]/20 text-[#3F1200] text-sm flex gap-3 animate-in fade-in slide-in-from-top-4 duration-500">
          <AlertCircle className="w-5 h-5 text-[#E76F3D] shrink-0" />
          <p>
            Your session has timed out due to inactivity. Please sign in again
            to continue.
          </p>
        </div>
      )}

      {searchParams.get("error") === "unauthorized" && (
        <div className="mb-6 p-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex gap-3 animate-in fade-in slide-in-from-top-4 duration-500">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>
            Oops! Your profile is unauthorized to view the dashboard. Please
            contact the administrator.
          </p>
        </div>
      )}

      <Card className="border-none shadow-[0_32px_64px_-12px_rgba(63,18,0,0.08)] rounded-[2rem] overflow-hidden">
        <CardHeader className="text-center pt-10 pb-6">
          <CardTitle className="text-2xl font-black text-[#3F1200]">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-[#5c4033]/60 font-medium">
            Authorized personnel only. Please sign in.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8 pb-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-bold text-[#3F1200] ml-1"
              >
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5c4033]/40" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ziad@barakah.agency"
                  className="h-12 pl-11 rounded-2xl border-[#F0EBE8] bg-[#FDFCFB] focus-visible:ring-[#E76F3D] focus-visible:border-[#E76F3D] transition-all"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <Label
                  htmlFor="password"
                  title="password"
                  className="text-sm font-bold text-[#3F1200]"
                >
                  Password
                </Label>
                <Link
                  href="/barakah-login/forgot-password"
                  title="forgot password"
                  className="text-xs font-bold text-[#E76F3D] hover:underline transition-all"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5c4033]/40" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  className="h-12 pl-11 rounded-2xl border-[#F0EBE8] bg-[#FDFCFB] focus-visible:ring-[#E76F3D] focus-visible:border-[#E76F3D] transition-all"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-2xl bg-destructive/5 text-destructive text-sm font-medium flex gap-3 border border-destructive/10 animate-shake whitespace-pre-wrap">
                <AlertCircle className="w-5 h-5 shrink-0" />
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 rounded-2xl bg-[#E76F3D] hover:bg-[#D65D2D] text-white font-black text-base shadow-lg shadow-[#E76F3D]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Sign In to Dashboard"
              )}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-[#F0EBE8] text-center">
            <Link
              href="/"
              className="text-sm font-bold text-[#5c4033]/60 hover:text-[#E76F3D] transition-colors inline-flex items-center gap-2"
            >
              <span>&larr;</span> Back to website
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default function BarakahLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFCFB] p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FBD3C1]/20 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00B4D8]/10 rounded-full blur-3xl -ml-48 -mb-48" />

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-10 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center transition-transform hover:scale-105"
          >
            <Image
              src="/assets/logo.webp"
              alt="Barakah"
              width={180}
              height={60}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        <Suspense
          fallback={
            <Card className="border-none shadow-xl rounded-[2rem] h-96 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-[#E76F3D]" />
            </Card>
          }
        >
          <LoginForm />
        </Suspense>

        <p className="mt-8 text-center text-xs text-[#5c4033]/40 font-medium">
          &copy; {new Date().getFullYear()} Barakah Agency.
        </p>
      </div>
    </div>
  );
}
