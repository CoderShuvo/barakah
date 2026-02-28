"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NewsletterPopupProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewsletterPopup({
  isOpen,
  onOpenChange,
}: NewsletterPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none bg-transparent shadow-none">
        <div className="relative bg-[#FFF5F2] rounded-[2.5rem] p-8 md:p-12 overflow-hidden border border-[#FFE2D9]">
          {/* Decorative Background Element */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#E76F3D]/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#E76F3D]/5 rounded-full blur-3xl" />

          <div className="relative z-10 space-y-8">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-white rounded-3xl shadow-sm border border-[#FFE2D9] flex items-center justify-center -rotate-6">
                <Mail className="w-10 h-10 text-[#E76F3D]" />
              </div>
            </div>

            <div className="text-center space-y-3">
              <DialogTitle className="text-3xl md:text-4xl font-black text-[#3F1200] leading-tight">
                Join Our Ethical <br /> Marketing Newsletter
              </DialogTitle>
              <DialogDescription className="text-[#5c4033] text-base md:text-lg font-medium leading-relaxed">
                Get the latest ideas, strategies, and best practices delivered
                to your inbox.
              </DialogDescription>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="relative group">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="h-14 px-6 rounded-2xl border-[#FFE2D9] bg-white text-[#3F1200] placeholder:text-[#5c4033]/40 focus:ring-[#E76F3D]/20 focus:border-[#E76F3D] text-lg shadow-sm transition-all"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full h-14 bg-[#E76F3D] hover:bg-[#D45E32] text-white font-bold text-lg rounded-2xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#E76F3D]/20 group"
              >
                Join Now
                <div className="bg-white rounded-full p-1 group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="h-4 w-4 text-[#E76F3D]" />
                </div>
              </Button>
            </form>

            <p className="text-center text-[#5c4033]/60 text-sm font-medium">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
