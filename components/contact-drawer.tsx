"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { AlertTriangle, CircleCheck, Mail, Send, X } from "lucide-react";
import { createPortal } from "react-dom";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ContactFormValues = {
  fullName: string;
  email: string;
  message: string;
  website: string;
};

const emptyFormValues: ContactFormValues = {
  fullName: "",
  email: "",
  message: "",
  website: "",
};

export const contactFormConfig = {
  fields: {
    fullName: "fi-sender-fullName",
    email: "fi-sender-email",
    message: "fi-text-message",
  },
} as const;

export function hasContactDraft(values: ContactFormValues) {
  return (
    values.fullName.length > 0 ||
    values.email.length > 0 ||
    values.message.length > 0
  );
}

export function isContactFormComplete(values: ContactFormValues) {
  return (
    values.fullName.trim().length > 0 &&
    values.email.trim().length > 0 &&
    values.message.trim().length > 0
  );
}

type ContactDrawerProps = {
  className?: string;
};

const fieldClassName =
  "mt-2 min-h-11 w-full rounded-md border border-[#d4d4d8] bg-[#fff] px-3 text-sm font-medium text-[#18181b] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[#a1a1aa] focus:border-[#18181b] focus:ring-2 focus:ring-[#18181b]/15 dark:border-[#27272a] dark:bg-[#09090b] dark:text-[#f4f4f5] dark:placeholder:text-[#71717a] dark:focus:border-[#fff] dark:focus:ring-[#fff]/15";

function useReducedMotion() {
  const [reduceMotion, setReduceMotion] = useState(() =>
    typeof window === "undefined"
      ? false
      : window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setReduceMotion(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return reduceMotion;
}

export function ContactDrawer({ className }: ContactDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRenderDrawer, setShouldRenderDrawer] = useState(false);
  const [showCloseConfirmation, setShowCloseConfirmation] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [values, setValues] = useState<ContactFormValues>(emptyFormValues);
  const drawerOverlayRef = useRef<HTMLDivElement | null>(null);
  const drawerPanelRef = useRef<HTMLElement | null>(null);
  const successDialogRef = useRef<HTMLDivElement | null>(null);
  const confirmDialogRef = useRef<HTMLDivElement | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const isFormComplete = isContactFormComplete(values);
  const reduceMotion = useReducedMotion();
  const portalTarget = typeof document === "undefined" ? null : document.body;

  const requestClose = useCallback(() => {
    if (hasContactDraft(values)) {
      setShowCloseConfirmation(true);
      return;
    }

    setIsOpen(false);
  }, [values]);

  const closeAndReset = () => {
    setShowCloseConfirmation(false);
    setIsOpen(false);
    setValues(emptyFormValues);
    setSubmitStatus("idle");
    setSubmitError(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormComplete || submitStatus === "loading") {
      return;
    }

    setSubmitStatus("loading");
    setSubmitError(null);

    try {
      const response = await fetch("/api/resend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: values.fullName.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
          website: values.website.trim(),
        }),
      });

      const payload = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!response.ok) {
        setSubmitStatus("error");
        setSubmitError(payload?.error ?? "No se pudo enviar el mensaje.");
        return;
      }

      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
      setSubmitError("No se pudo enviar el mensaje.");
    }
  };

  useEffect(() => {
    if (!shouldRenderDrawer) {
      return;
    }

    const overlay = drawerOverlayRef.current;
    const panel = drawerPanelRef.current;

    if (!overlay || !panel) {
      return;
    }

    const duration = reduceMotion ? 0 : 0.26;

    if (isOpen) {
      gsap.killTweensOf([overlay, panel]);
      gsap.fromTo(
        overlay,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: reduceMotion ? 0 : 0.16, ease: "power2.out" },
      );
      gsap.fromTo(
        panel,
        { xPercent: 100 },
        {
          xPercent: 0,
          duration,
          ease: "power3.out",
          overwrite: "auto",
        },
      );
      return;
    }

    const timeline = gsap.timeline({
      defaults: { overwrite: "auto" },
      onComplete: () => setShouldRenderDrawer(false),
    });

    timeline
      .to(panel, {
        xPercent: 100,
        duration,
        ease: "power3.in",
      })
      .to(
        overlay,
        {
          autoAlpha: 0,
          duration: reduceMotion ? 0 : 0.14,
          ease: "power2.out",
        },
        0,
      );

    return () => {
      timeline.kill();
    };
  }, [isOpen, reduceMotion, shouldRenderDrawer]);

  useEffect(() => {
    if (!shouldRenderDrawer) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [shouldRenderDrawer]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const focusTimer = window.setTimeout(() => {
      nameInputRef.current?.focus();
    }, reduceMotion ? 0 : 180);

    return () => {
      window.clearTimeout(focusTimer);
    };
  }, [isOpen, reduceMotion]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        requestClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, requestClose]);

  useEffect(() => {
    if (submitStatus !== "success") {
      return;
    }

    gsap.fromTo(
      successDialogRef.current,
      { autoAlpha: 0, y: 8, scale: 0.98 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: reduceMotion ? 0 : 0.18,
        ease: "power2.out",
        overwrite: "auto",
      },
    );

    const successTimer = window.setTimeout(() => {
      closeAndReset();
    }, 5000);

    return () => window.clearTimeout(successTimer);
  }, [reduceMotion, submitStatus]);

  useEffect(() => {
    if (!showCloseConfirmation) {
      return;
    }

    gsap.fromTo(
      confirmDialogRef.current,
      { autoAlpha: 0, y: 8, scale: 0.98 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: reduceMotion ? 0 : 0.18,
        ease: "power2.out",
        overwrite: "auto",
      },
    );
  }, [reduceMotion, showCloseConfirmation]);

  return (
    <>
      <Button
        aria-controls="contact-drawer"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label="Abrir formulario de contacto"
        className={className}
        onClick={() => {
          setShouldRenderDrawer(true);
          setIsOpen(true);
        }}
        type="button"
      >
        <Mail size={13} strokeWidth={2} aria-hidden="true" />
        Contacto
      </Button>

      {portalTarget && shouldRenderDrawer
        ? createPortal(
            <div
              ref={drawerOverlayRef}
              aria-labelledby="contact-drawer-title"
              aria-modal="true"
              className="fixed inset-0 z-[200] flex justify-end overflow-hidden bg-white backdrop-blur-none dark:bg-black sm:bg-white/35 sm:backdrop-blur-md sm:dark:bg-black/55"
              role="dialog"
            >
              <button
                aria-label="Cerrar formulario de contacto"
                className="absolute inset-0 hidden cursor-default sm:block"
                onClick={requestClose}
                type="button"
              />

              <aside
                ref={drawerPanelRef}
                id="contact-drawer"
                className="relative z-10 flex h-dvh w-full max-w-none flex-col border-l-0 border-[#d4d4d8] bg-white text-[#18181b] shadow-none dark:border-[#27272a] dark:bg-black dark:text-[#f4f4f5] sm:max-w-[min(92vw,420px)] sm:border-l sm:shadow-[0_24px_80px_rgba(0,0,0,0.22)] sm:dark:shadow-[0_24px_80px_rgba(0,0,0,0.72)]"
              >
                <div className="flex min-h-16 items-center justify-between border-b border-[#e4e4e7] px-5 dark:border-[#27272a] sm:px-6">
                  <div className="min-w-0">
                    <p
                      id="contact-drawer-title"
                      className="text-sm font-bold uppercase leading-none"
                    >
                      Contacto
                    </p>
                    <p className="mt-2 text-xs font-medium leading-none text-[#71717a] dark:text-[#a1a1aa]">
                      Enviame un mensaje directo
                    </p>
                  </div>

                  <Button
                    aria-label="Cerrar formulario"
                    className="h-10 w-10 border-[#d4d4d8] bg-transparent p-0 text-[#52525c] hover:border-[#18181b] hover:bg-[#f4f4f5] hover:text-[#18181b] dark:border-[#27272a] dark:text-[#d4d4d8] dark:hover:border-white dark:hover:bg-[#18181b] dark:hover:text-white"
                    onClick={requestClose}
                    size="icon"
                    type="button"
                  >
                    <X size={16} strokeWidth={2.5} aria-hidden="true" />
                  </Button>
                </div>

                <form
                  className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-5 py-6 sm:px-6"
                  onSubmit={handleSubmit}
                >
                  <label className="text-sm font-bold leading-none text-[#18181b] dark:text-[#f4f4f5]">
                    Nombre completo <span aria-hidden="true">*</span>
                    <input
                      ref={nameInputRef}
                      autoComplete="name"
                      className={fieldClassName}
                      name={contactFormConfig.fields.fullName}
                      placeholder="Ingresa tu nombre"
                      onChange={(event) =>
                        setValues((currentValues) => ({
                          ...currentValues,
                          fullName: event.target.value,
                        }))
                      }
                      required
                      type="text"
                      value={values.fullName}
                    />
                  </label>

                  <label className="text-sm font-bold leading-none text-[#18181b] dark:text-[#f4f4f5]">
                    Correo electronico <span aria-hidden="true">*</span>
                    <input
                      autoComplete="email"
                      className={fieldClassName}
                      inputMode="email"
                      name={contactFormConfig.fields.email}
                      placeholder="correo@ejemplo.com"
                      onChange={(event) =>
                        setValues((currentValues) => ({
                          ...currentValues,
                          email: event.target.value,
                        }))
                      }
                      required
                      type="email"
                      value={values.email}
                    />
                  </label>

                  <label className="text-sm font-bold leading-none text-[#18181b] dark:text-[#f4f4f5]">
                    Mensaje <span aria-hidden="true">*</span>
                    <textarea
                      className={cn(fieldClassName, "min-h-36 resize-none py-3")}
                      name={contactFormConfig.fields.message}
                      placeholder="Escribe tu mensaje..."
                      onChange={(event) =>
                        setValues((currentValues) => ({
                          ...currentValues,
                          message: event.target.value,
                        }))
                      }
                      required
                      value={values.message}
                    />
                  </label>

                  <div
                    className="pointer-events-none absolute left-[-9999px] h-0 w-0 overflow-hidden opacity-0"
                    aria-hidden="true"
                  >
                    <label>
                      Website
                      <input
                        autoComplete="off"
                        name="website"
                        tabIndex={-1}
                        value={values.website}
                        onChange={(event) =>
                          setValues((currentValues) => ({
                            ...currentValues,
                            website: event.target.value,
                          }))
                        }
                      />
                    </label>
                  </div>

                  <Button
                    className="mt-auto h-11 w-full gap-2 border-black bg-black px-4 text-xs font-bold leading-none text-[#d4d4d8] transition-[background-color,border-color,color,opacity,transform] duration-300 ease-out hover:border-[#18181b] hover:bg-[#18181b] hover:text-white disabled:cursor-not-allowed disabled:border-[#18181b]/20 disabled:bg-[#18181b]/15 disabled:text-[#18181b]/40 disabled:opacity-100 dark:border-white dark:bg-white dark:text-[#52525c] dark:hover:border-[#d4d4d8] dark:hover:bg-[#d4d4d8] dark:hover:text-black dark:disabled:border-white/20 dark:disabled:bg-white/15 dark:disabled:text-white/40"
                    disabled={!isFormComplete || submitStatus === "loading"}
                    type="submit"
                  >
                    <Send size={14} strokeWidth={2.5} aria-hidden="true" />
                    {submitStatus === "loading" ? "Enviando..." : "Enviar"}
                  </Button>

                  {submitStatus === "error" ? (
                    <p
                      className="text-center text-xs font-medium leading-5 text-[#b91c1c] dark:text-[#fca5a5]"
                      role="alert"
                    >
                      {submitError ?? "No se pudo enviar el mensaje."}
                    </p>
                  ) : null}
                </form>

                {submitStatus === "success" ? (
                  <div
                    aria-labelledby="contact-success-title"
                    aria-modal="true"
                    className="absolute inset-0 z-20 grid place-items-center bg-white/55 px-4 backdrop-blur-sm dark:bg-black/65"
                    role="alertdialog"
                  >
                    <div
                      ref={successDialogRef}
                      className="w-full max-w-[320px] rounded-lg border border-[#d4d4d8] bg-white p-5 text-left shadow-[0_22px_60px_rgba(0,0,0,0.2)] dark:border-[#27272a] dark:bg-[#09090b] dark:shadow-[0_22px_60px_rgba(0,0,0,0.66)]"
                    >
                      <div className="flex items-center gap-3">
                        <span className="grid h-10 w-10 shrink-0 place-items-center text-[#52525c] dark:text-[#d4d4d8]">
                          <CircleCheck
                            size={18}
                            strokeWidth={2.5}
                            aria-hidden="true"
                          />
                        </span>

                        <div className="min-w-0">
                          <p
                            id="contact-success-title"
                            className="text-sm font-bold leading-tight text-[#18181b] dark:text-[#f4f4f5]"
                          >
                            Mensaje enviado correctamente
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}

                {showCloseConfirmation ? (
                  <div
                    aria-labelledby="contact-close-title"
                    aria-modal="true"
                    className="absolute inset-0 z-20 grid place-items-center bg-white/55 px-4 backdrop-blur-sm dark:bg-black/65"
                    role="alertdialog"
                  >
                    <div
                      ref={confirmDialogRef}
                      className="w-full max-w-[320px] rounded-lg border border-[#d4d4d8] bg-white p-5 text-left shadow-[0_22px_60px_rgba(0,0,0,0.2)] dark:border-[#27272a] dark:bg-[#09090b] dark:shadow-[0_22px_60px_rgba(0,0,0,0.66)]"
                    >
                      <div className="flex items-start gap-3">
                        <span className="grid h-10 w-10 shrink-0 place-items-center text-[#52525c] dark:text-[#d4d4d8]">
                          <AlertTriangle
                            size={18}
                            strokeWidth={2.25}
                            aria-hidden="true"
                          />
                        </span>

                        <div className="min-w-0">
                          <p
                            id="contact-close-title"
                            className="text-sm font-bold leading-tight text-[#18181b] dark:text-[#f4f4f5]"
                          >
                            Deseas cerrar y borrar el contenido?
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        <Button
                          className="h-10 border-[#d4d4d8] bg-transparent px-3 text-xs font-bold text-[#52525c] hover:border-[#18181b] hover:bg-[#f4f4f5] hover:text-[#18181b] dark:border-[#27272a] dark:text-[#d4d4d8] dark:hover:border-white dark:hover:bg-[#18181b] dark:hover:text-white"
                          onClick={() => setShowCloseConfirmation(false)}
                          type="button"
                        >
                          No cerrar
                        </Button>
                        <Button
                          className="h-10 border-black bg-black px-3 text-xs font-bold text-[#d4d4d8] hover:border-[#18181b] hover:bg-[#18181b] hover:text-white dark:border-white dark:bg-white dark:text-[#52525c] dark:hover:border-[#d4d4d8] dark:hover:bg-[#d4d4d8] dark:hover:text-black"
                          onClick={closeAndReset}
                          type="button"
                        >
                          Cerrar
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </aside>
            </div>,
            portalTarget,
          )
        : null}
    </>
  );
}
