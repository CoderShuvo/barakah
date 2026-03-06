"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Loader2,
  Settings2,
  Share2,
  Plug,
  Image as ImageIcon,
  AlertOctagon,
  MessageSquare,
} from "lucide-react";

import { MediaLibrary } from "@/components/admin/media-library";
import { Switch } from "@/components/ui/switch";
import {
  getGeneralSettings,
  updateGeneralSettings,
  getContactSettings,
  updateContactSettings,
  getIntegrationSettings,
  updateIntegrationSettings,
  getNotFoundSettings,
  updateNotFoundSettings,
  getFormSettings,
  updateFormSettings,
} from "@/server/settings-actions";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Forms State
  const [general, setGeneral] = useState({
    site_title: "",
    tagline: "",
    logo_url: "",
    favicon_url: "",
  });
  const [contact, setContact] = useState({
    email: "",
    phone: "",
    address: "",
    instagram: "",
    linkedin: "",
    facebook: "",
    twitter: "",
    youtube: "",
  });
  const [integrations, setIntegrations] = useState({
    gtm_id: "",
    ga4_id: "",
    gsc_id: "",
    header_scripts: "",
    footer_scripts: "",
  });
  const [notFound, setNotFound] = useState({
    headline: "Oops! Page Not Found",
    message: "The page you are looking for might have been removed.",
    cta_text: "Back to Home",
    cta_link: "/",
  });
  const [formSettings, setFormSettings] = useState({
    success_headline: "Message Sent!",
    success_message: "Thank you for reaching out.",
    submit_button_text: "Send Message",
    show_budget: true,
    show_service: true,
    show_company: false,
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const [genRes, conRes, intRes, nfRes, fsRes] = await Promise.all([
      getGeneralSettings(),
      getContactSettings(),
      getIntegrationSettings(),
      getNotFoundSettings(),
      getFormSettings(),
    ]);

    if (genRes.data) setGeneral(genRes.data as any);
    if (conRes.data) setContact(conRes.data as any);
    if (intRes.data) setIntegrations(intRes.data as any);
    if (nfRes.data) setNotFound(nfRes.data as any);
    if (fsRes.data) setFormSettings(fsRes.data as any);

    setLoading(false);
  }

  async function handleSaveGeneral() {
    setSaving(true);
    const res = await updateGeneralSettings(general);
    if (res?.error) toast.error("Failed to save: " + JSON.stringify(res.error));
    else toast.success("General settings saved");
    setSaving(false);
  }

  async function handleSaveContact() {
    setSaving(true);
    const res = await updateContactSettings({
      email: contact.email || "",
      phone: contact.phone || "",
      address: contact.address || "",
      instagram: contact.instagram || "",
      linkedin: contact.linkedin || "",
      facebook: contact.facebook || "",
      twitter: contact.twitter || "",
      youtube: contact.youtube || "",
    });
    if (res?.error) toast.error("Failed to save contact info");
    else toast.success("Contact settings saved");
    setSaving(false);
  }

  async function handleSaveIntegrations() {
    setSaving(true);
    const res = await updateIntegrationSettings(integrations);
    if (res?.error) toast.error("Failed to save integration settings");
    else toast.success("Integration settings saved");
    setSaving(false);
  }

  async function handleSaveNotFound() {
    setSaving(true);
    const res = await updateNotFoundSettings(notFound);
    if (res?.error) toast.error("Failed to save 404 settings");
    else toast.success("404 Page settings saved");
    setSaving(false);
  }

  async function handleSaveFormSettings() {
    setSaving(true);
    const res = await updateFormSettings(formSettings);
    if (res?.error) toast.error("Failed to save form settings");
    else toast.success("Form settings saved");
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Site Settings</h1>
        <p className="text-muted-foreground">
          Manage your global site configuration and media
        </p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="w-full justify-start grid grid-cols-4 md:flex gap-2 bg-transparent h-auto p-0 mb-6">
          <TabsTrigger
            value="general"
            className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary border bg-card"
          >
            <Settings2 className="mr-2 h-4 w-4" />{" "}
            <span className="hidden md:inline">General</span>
          </TabsTrigger>
          <TabsTrigger
            value="contact"
            className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary border bg-card"
          >
            <Share2 className="mr-2 h-4 w-4" />{" "}
            <span className="hidden md:inline">Contact</span>
          </TabsTrigger>
          <TabsTrigger
            value="integrations"
            className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary border bg-card"
          >
            <Plug className="mr-2 h-4 w-4" />{" "}
            <span className="hidden md:inline">Integrations</span>
          </TabsTrigger>
          <TabsTrigger
            value="404"
            className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary border bg-card"
          >
            <AlertOctagon className="mr-2 h-4 w-4" />{" "}
            <span className="hidden md:inline">404</span>
          </TabsTrigger>
          <TabsTrigger
            value="forms"
            className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary border bg-card"
          >
            <MessageSquare className="mr-2 h-4 w-4" />{" "}
            <span className="hidden md:inline">Forms</span>
          </TabsTrigger>
          <TabsTrigger
            value="media"
            className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary border bg-card"
          >
            <ImageIcon className="mr-2 h-4 w-4" />{" "}
            <span className="hidden md:inline">Media</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Brand and identity defaults</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Site Title</Label>
                  <Input
                    value={general.site_title}
                    onChange={(e) =>
                      setGeneral({ ...general, site_title: e.target.value })
                    }
                    placeholder="Barakah Agency"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tagline</Label>
                  <Input
                    value={general.tagline}
                    onChange={(e) =>
                      setGeneral({ ...general, tagline: e.target.value })
                    }
                    placeholder="Ethical Marketing Excellence"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Logo URL</Label>
                  <Input
                    value={general.logo_url}
                    onChange={(e) =>
                      setGeneral({ ...general, logo_url: e.target.value })
                    }
                    placeholder="Upload in Media tab and paste URL here"
                  />
                  {general.logo_url && (
                    <img
                      src={general.logo_url}
                      alt="Logo"
                      className="h-10 mt-2 p-1 bg-muted rounded-md border"
                    />
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Favicon URL</Label>
                  <Input
                    value={general.favicon_url}
                    onChange={(e) =>
                      setGeneral({ ...general, favicon_url: e.target.value })
                    }
                    placeholder="/favicon.ico or absolute URL"
                  />
                </div>
              </div>
              <Button onClick={handleSaveGeneral} disabled={saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{" "}
                Save General Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Details displayed on the site and in the footer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input
                    value={contact.email}
                    onChange={(e) =>
                      setContact({ ...contact, email: e.target.value })
                    }
                    placeholder="hello@barakahagency.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input
                    value={contact.phone}
                    onChange={(e) =>
                      setContact({ ...contact, phone: e.target.value })
                    }
                    placeholder="+44 123 456 7890"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Physical Address</Label>
                  <Input
                    value={contact.address}
                    onChange={(e) =>
                      setContact({ ...contact, address: e.target.value })
                    }
                    placeholder="123 Agency St, London"
                  />
                </div>
              </div>

              <Separator />
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Instagram URL</Label>
                  <Input
                    value={contact.instagram}
                    onChange={(e) =>
                      setContact({ ...contact, instagram: e.target.value })
                    }
                    placeholder="https://instagram.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>LinkedIn URL</Label>
                  <Input
                    value={contact.linkedin}
                    onChange={(e) =>
                      setContact({ ...contact, linkedin: e.target.value })
                    }
                    placeholder="https://linkedin.com/company/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>X/Twitter URL</Label>
                  <Input
                    value={contact.twitter}
                    onChange={(e) =>
                      setContact({ ...contact, twitter: e.target.value })
                    }
                    placeholder="https://twitter.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Facebook URL</Label>
                  <Input
                    value={contact.facebook}
                    onChange={(e) =>
                      setContact({ ...contact, facebook: e.target.value })
                    }
                    placeholder="https://facebook.com/..."
                  />
                </div>
              </div>
              <Button onClick={handleSaveContact} disabled={saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{" "}
                Save Contact Info
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integrations & Scripts</CardTitle>
              <CardDescription>
                Analytics, tracking, and custom injection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Google Tag Manager (GTM) ID</Label>
                  <Input
                    value={integrations.gtm_id}
                    onChange={(e) =>
                      setIntegrations({
                        ...integrations,
                        gtm_id: e.target.value,
                      })
                    }
                    placeholder="GTM-XXXXXXX"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Google Analytics 4 (GA4) Measurement ID</Label>
                  <Input
                    value={integrations.ga4_id}
                    onChange={(e) =>
                      setIntegrations({
                        ...integrations,
                        ga4_id: e.target.value,
                      })
                    }
                    placeholder="G-XXXXXXXXXX"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Google Search Console Verification</Label>
                  <Input
                    value={integrations.gsc_id}
                    onChange={(e) =>
                      setIntegrations({
                        ...integrations,
                        gsc_id: e.target.value,
                      })
                    }
                    placeholder="HTML tag code..."
                  />
                  <p className="text-xs text-muted-foreground">
                    Only paste the unique string code, not the full meta tag.
                  </p>
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <Label>Additional Header Scripts</Label>
                  <Input
                    value={integrations.header_scripts}
                    onChange={(e) =>
                      setIntegrations({
                        ...integrations,
                        header_scripts: e.target.value,
                      })
                    }
                    placeholder="<script>...</script>"
                  />
                  <p className="text-[10px] text-muted-foreground">
                    Injected before the closing &lt;/head&gt; tag.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Additional Footer Scripts</Label>
                  <Input
                    value={integrations.footer_scripts}
                    onChange={(e) =>
                      setIntegrations({
                        ...integrations,
                        footer_scripts: e.target.value,
                      })
                    }
                    placeholder="<script>...</script>"
                  />
                  <p className="text-[10px] text-muted-foreground">
                    Injected before the closing &lt;/body&gt; tag.
                  </p>
                </div>
              </div>
              <Button onClick={handleSaveIntegrations} disabled={saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{" "}
                Save Integrations
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="404">
          <Card>
            <CardHeader>
              <CardTitle>404 Page Content</CardTitle>
              <CardDescription>
                Customize what users see when a page is not found.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Headline</Label>
                  <Input
                    value={notFound.headline}
                    onChange={(e) =>
                      setNotFound({ ...notFound, headline: e.target.value })
                    }
                    placeholder="Oops! Page Not Found"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Message</Label>
                  <Input
                    value={notFound.message}
                    onChange={(e) =>
                      setNotFound({ ...notFound, message: e.target.value })
                    }
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>CTA Button Text</Label>
                    <Input
                      value={notFound.cta_text}
                      onChange={(e) =>
                        setNotFound({ ...notFound, cta_text: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>CTA Link</Label>
                    <Input
                      value={notFound.cta_link}
                      onChange={(e) =>
                        setNotFound({ ...notFound, cta_link: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
              <Button onClick={handleSaveNotFound} disabled={saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{" "}
                Save 404 Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forms">
          <Card>
            <CardHeader>
              <CardTitle>Contact Form Settings</CardTitle>
              <CardDescription>
                Manage form fields, labels, and success messages site-wide.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Success Headline</Label>
                  <Input
                    value={formSettings.success_headline}
                    onChange={(e) =>
                      setFormSettings({
                        ...formSettings,
                        success_headline: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Success Message</Label>
                  <Input
                    value={formSettings.success_message}
                    onChange={(e) =>
                      setFormSettings({
                        ...formSettings,
                        success_message: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Submit Button Text</Label>
                  <Input
                    value={formSettings.submit_button_text}
                    onChange={(e) =>
                      setFormSettings({
                        ...formSettings,
                        submit_button_text: e.target.value,
                      })
                    }
                  />
                </div>

                <Separator className="my-4" />

                <Label className="text-base font-medium">
                  Field Visibility
                </Label>
                <div className="space-y-4 mt-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Show "Budget" Field</Label>
                      <p className="text-[10px] text-muted-foreground">
                        Ask users for their estimated budget
                      </p>
                    </div>
                    <Switch
                      checked={formSettings.show_budget}
                      onCheckedChange={(checked) =>
                        setFormSettings({
                          ...formSettings,
                          show_budget: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Show "Service Interest" Field</Label>
                      <p className="text-[10px] text-muted-foreground">
                        Ask users what service they need
                      </p>
                    </div>
                    <Switch
                      checked={formSettings.show_service}
                      onCheckedChange={(checked) =>
                        setFormSettings({
                          ...formSettings,
                          show_service: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Show "Company Name" Field</Label>
                      <p className="text-[10px] text-muted-foreground">
                        Ask users for their company name
                      </p>
                    </div>
                    <Switch
                      checked={formSettings.show_company}
                      onCheckedChange={(checked) =>
                        setFormSettings({
                          ...formSettings,
                          show_company: checked,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <Button onClick={handleSaveFormSettings} disabled={saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{" "}
                Save Form Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media">
          <MediaLibrary />
        </TabsContent>
      </Tabs>
    </div>
  );
}
