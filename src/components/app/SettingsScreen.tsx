import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronRight,
  LogOut,
  Briefcase,
  SlidersHorizontal,
  UserCircle2,
  Users,
  X,
  Check,
  Loader2,
  AlertCircle,
  Lock,
} from "lucide-react";

// Reserved + already-taken slugs (mock availability backend)
const TAKEN_SLUGS = new Set([
  "admin",
  "app",
  "api",
  "settings",
  "support",
  "marcus",
  "kingstoncuts",
  "sasha",
]);

const SLUG_REGEX = /^[a-z0-9](?:[a-z0-9-]{1,28}[a-z0-9])?$/;

type SlugStatus =
  | { kind: "idle" }
  | { kind: "invalid"; message: string }
  | { kind: "checking" }
  | { kind: "taken" }
  | { kind: "available" };

function validateSlugFormat(slug: string): string | null {
  if (slug.length === 0) return "Required";
  if (slug.length < 3) return "At least 3 characters";
  if (slug.length > 30) return "Max 30 characters";
  if (!SLUG_REGEX.test(slug))
    return "Lowercase letters, numbers and hyphens only";
  return null;
}

export function SettingsScreen() {
  const navigate = useNavigate();
  const [isPro, setIsPro] = useState(false);
  const [slug, setSlug] = useState("marcus-cuts");
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(slug);
  const [status, setStatus] = useState<SlugStatus>({ kind: "idle" });

  // Live validation + debounced "availability" check
  useEffect(() => {
    if (!editing) return;
    const trimmed = draft.trim().toLowerCase();
    if (trimmed === slug) {
      setStatus({ kind: "idle" });
      return;
    }
    const formatError = validateSlugFormat(trimmed);
    if (formatError) {
      setStatus({ kind: "invalid", message: formatError });
      return;
    }
    setStatus({ kind: "checking" });
    const t = setTimeout(() => {
      if (TAKEN_SLUGS.has(trimmed)) {
        setStatus({ kind: "taken" });
      } else {
        setStatus({ kind: "available" });
      }
    }, 450);
    return () => clearTimeout(t);
  }, [draft, editing, slug]);

  const openEditor = () => {
    if (!isPro) {
      navigate({ to: "/app/upgrade" });
      return;
    }
    setDraft(slug);
    setStatus({ kind: "idle" });
    setEditing(true);
  };

  const closeEditor = () => {
    setEditing(false);
  };

  const canSave = status.kind === "available";

  const handleSave = () => {
    if (!canSave) return;
    setSlug(draft.trim().toLowerCase());
    setEditing(false);
  };

  type SettingsItem = {
    label: string;
    value: string;
    action: (() => void) | null;
    to?: "/app/clients" | "/app/upgrade";
    pro?: boolean;
  };

  const businessItems: SettingsItem[] = useMemo(
    () => [
      { label: "Business name", value: "Marcus Cuts", action: null },
      { label: "Booking link", value: `linkup.app/${slug}`, action: openEditor, pro: true },
      { label: "Working hours", value: "Mon–Fri, 9–5", action: null },
      { label: "Services", value: "5 services", action: null },
    ],
    // openEditor depends on isPro; recompute when plan changes too
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [slug, isPro],
  );

  const sections = [
    {
      title: "Business",
      icon: Briefcase,
      iconBg: "bg-tint-blue",
      iconColor: "text-primary",
      items: businessItems,
    },
    {
      title: "Manage",
      icon: Users,
      iconBg: "bg-tint-violet",
      iconColor: "text-primary",
      items: [
        { label: "Clients", value: "", to: "/app/clients" as const, action: null },
      ],
    },
    {
      title: "Preferences",
      icon: SlidersHorizontal,
      iconBg: "bg-tint-amber",
      iconColor: "text-warning",
      items: [{ label: "Reminders", value: "1 hour before", action: null }],
    },
    {
      title: "Account",
      icon: UserCircle2,
      iconBg: "bg-tint-violet",
      iconColor: "text-primary",
      items: [
        { label: "Subscription", value: "Free plan", to: "/app/upgrade" as const, action: null },
        { label: "Support", value: "", action: null },
      ],
    },
  ];

  return (
    <div className="max-w-lg mx-auto">
      <div className="px-5 pt-8 pb-4 animate-fade-up">
        <h1 className="text-lg font-semibold text-foreground">Settings</h1>
      </div>

      <div className="px-5 space-y-6 mb-8">
        {sections.map((section, i) => {
          const Icon = section.icon;
          return (
            <div key={i} className="animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-5 h-5 rounded-md flex items-center justify-center ${section.iconBg}`}>
                  <Icon className={`w-3 h-3 ${section.iconColor}`} />
                </div>
                <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{section.title}</h2>
              </div>
              <div className="rounded-xl border border-border/50 bg-card divide-y divide-border/40 overflow-hidden">
                {section.items.map((item, j) => {
                  const content = (
                    <div className="flex items-center justify-between py-3.5 px-3.5 hover:bg-secondary/40 transition-all duration-200 active:scale-[0.99]">
                      <span className="text-sm text-foreground">{item.label}</span>
                      <div className="flex items-center gap-1.5 shrink-0 min-w-0">
                        {item.value && (
                          <span className="text-xs text-muted-foreground truncate max-w-[180px]">{item.value}</span>
                        )}
                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground transition-transform duration-150 shrink-0" />
                      </div>
                    </div>
                  );
                  if ("to" in item && item.to) {
                    return (
                      <Link key={j} to={item.to}>
                        {content}
                      </Link>
                    );
                  }
                  if (item.action) {
                    return (
                      <button key={j} type="button" onClick={item.action} className="w-full text-left">
                        {content}
                      </button>
                    );
                  }
                  return (
                    <div key={j} className="cursor-pointer">
                      {content}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <button
          onClick={() => navigate({ to: "/" })}
          className="flex items-center gap-2 py-3 text-sm text-destructive transition-all duration-150 hover:opacity-80 hover:translate-x-0.5 active:scale-[0.98]"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>

      {editing && (
        <div
          className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-[2px] flex items-end justify-center animate-fade-in"
          onClick={closeEditor}
        >
          <div
            className="bg-card w-full max-w-lg rounded-t-2xl p-5 safe-bottom shadow-lg animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-8 h-1 rounded-full bg-muted mx-auto mb-4" />
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-base font-semibold text-foreground">Booking link</h2>
              <button
                onClick={closeEditor}
                className="p-1 transition-all duration-150 active:scale-90"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Your public booking page address. Clients will use this link to book themselves.
            </p>

            <label htmlFor="slug-input" className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
              Custom slug
            </label>
            <div
              className={`mt-1.5 flex items-center rounded-lg border bg-muted/40 transition-colors ${
                status.kind === "invalid" || status.kind === "taken"
                  ? "border-destructive/60"
                  : status.kind === "available"
                  ? "border-success/60"
                  : "border-border/60"
              }`}
            >
              <span className="pl-3 pr-1.5 text-xs text-muted-foreground font-mono select-none">linkup.app/</span>
              <input
                id="slug-input"
                type="text"
                inputMode="url"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                maxLength={30}
                value={draft}
                onChange={(e) => setDraft(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                className="flex-1 min-w-0 bg-transparent py-2.5 pr-2 text-sm text-foreground font-mono placeholder:text-muted-foreground focus:outline-none"
                placeholder="your-business"
              />
              <div className="pr-3 shrink-0 w-5 flex items-center justify-center">
                {status.kind === "checking" && (
                  <Loader2 className="w-3.5 h-3.5 text-muted-foreground animate-spin" />
                )}
                {status.kind === "available" && <Check className="w-3.5 h-3.5 text-success" />}
                {(status.kind === "taken" || status.kind === "invalid") && (
                  <AlertCircle className="w-3.5 h-3.5 text-destructive" />
                )}
              </div>
            </div>

            <div className="mt-2 min-h-[18px] text-xs">
              {status.kind === "invalid" && (
                <span className="text-destructive">{status.message}</span>
              )}
              {status.kind === "taken" && (
                <span className="text-destructive">That slug is already taken</span>
              )}
              {status.kind === "available" && (
                <span className="text-success">Available</span>
              )}
              {status.kind === "checking" && (
                <span className="text-muted-foreground">Checking availability…</span>
              )}
              {status.kind === "idle" && (
                <span className="text-muted-foreground">3–30 characters. Lowercase, numbers and hyphens.</span>
              )}
            </div>

            <div className="mt-5 flex gap-2">
              <button
                onClick={closeEditor}
                className="flex-1 h-10 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium transition-all duration-200 active:scale-[0.97]"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!canSave}
                className="flex-1 h-10 rounded-lg bg-primary text-primary-foreground text-sm font-medium transition-all duration-200 active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
