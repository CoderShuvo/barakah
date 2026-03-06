import Link from "next/link";
import { getNotFoundSettings } from "@/server/settings-actions";
import { Button } from "@/components/ui/button";

export default async function NotFound() {
  const { data: settings } = await getNotFoundSettings();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="space-y-6 max-w-lg">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {settings?.headline || "Oops! Page Not Found"}
        </h1>
        <p className="text-lg text-muted-foreground">
          {settings?.message ||
            "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."}
        </p>
        <div className="pt-4">
          <Button asChild size="lg">
            <Link href={settings?.cta_link || "/"}>
              {settings?.cta_text || "Back to Home"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
