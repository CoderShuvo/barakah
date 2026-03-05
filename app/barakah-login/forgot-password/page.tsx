"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Loader2,
  ShieldCheck,
  Mail,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { requestPasswordReset } from "@/server/actions";
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

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    const result = await requestPasswordReset(email);

    if (result.error) {
      toast.error(result.error);
    } else {
      setIsSent(true);
      toast.success("Reset link sent successfully");
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
              Reset Password
            </CardTitle>
            <CardDescription className="text-[#5c4033]/60 font-medium">
              We'll send a recovery link to your email.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-10">
            {isSent ? (
              <div className="text-center space-y-6 py-4">
                <div className="w-20 h-20 bg-[#00B4D8]/10 rounded-full flex items-center justify-center mx-auto scale-in-center">
                  <CheckCircle2 className="w-10 h-10 text-[#00B4D8]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-[#3F1200]">
                    Check your email
                  </h3>
                  <p className="text-sm text-[#5c4033]/60 leading-relaxed max-w-[280px] mx-auto">
                    We've sent a instructions to reset your password. Please
                    check your inbox.
                  </p>
                </div>
                <Button
                  asChild
                  className="w-full h-12 rounded-2xl bg-[#E76F3D] hover:bg-[#D65D2D] text-white font-black transition-all hover:scale-[1.02]"
                >
                  <Link href="/barakah-login">Return to Sign In</Link>
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-bold text-[#3F1200] ml-1"
                  >
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5c4033]/40" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="admin@barakahagency.com"
                      className="h-12 pl-11 rounded-2xl border-[#F0EBE8] bg-[#FDFCFB] focus-visible:ring-[#E76F3D] focus-visible:border-[#E76F3D] transition-all"
                      required
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
                    "Send Recovery Link"
                  )}
                </Button>

                <div className="text-center">
                  <Link
                    href="/barakah-login"
                    className="text-sm font-bold text-[#5c4033]/60 hover:text-[#E76F3D] transition-colors inline-flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back to sign in
                  </Link>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
