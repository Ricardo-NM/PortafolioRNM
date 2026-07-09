"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

export function ContactDrawer({ className }: ContactDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showCloseConfirmation, setShowCloseConfirmation] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [values, setValues] = useState<ContactFormValues>(emptyFormValues);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const isFormComplete = isContactFormComplete(values);
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
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => {
      nameInputRef.current?.focus();
    }, 180);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

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

    const successTimer = window.setTimeout(() => {
      closeAndReset();
    }, 5000);

    return () => window.clearTimeout(successTimer);
  }, [submitStatus]);

  return (
    <>
      <Button
        aria-controls="contact-drawer"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label="Abrir formulario de contacto"
        className={className}
        onClick={() => setIsOpen(true)}
        type="button"
      >
        <Mail size={13} strokeWidth={2.5} aria-hidden="true" />
        Contacto
      </Button>

      {portalTarget
        ? createPortal(
            <AnimatePresence>
              {isOpen ? (
                <motion.div
                  aria-labelledby="contact-drawer-title"
                  aria-modal="true"
                  className="fixed inset-0 z-100 flex justify-end overflow-hidden bg-white backdrop-blur-none dark:bg-black sm:bg-white/35 sm:backdrop-blur-md sm:dark:bg-black/55"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  role="dialog"
                  transition={{ duration: 0.18, ease: "easeOut" }}
                >
                  <button
                    aria-label="Cerrar formulario de contacto"
                    className="absolute inset-0 hidden cursor-default sm:block"
                    onClick={requestClose}
                    type="button"
                  />

                  <motion.aside
                    id="contact-drawer"
                    className="relative z-10 flex h-dvh w-full max-w-none flex-col border-l-0 border-[#d4d4d8] bg-white text-[#18181b] shadow-none dark:border-[#27272a] dark:bg-black dark:text-[#f4f4f5] sm:max-w-[min(92vw,420px)] sm:border-l sm:shadow-[0_24px_80px_rgba(0,0,0,0.22)] sm:dark:shadow-[0_24px_80px_rgba(0,0,0,0.72)]"
                    exit={{ x: "100%" }}
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
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
                          Envíame un mensaje directo
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
                        Correo electrónico <span aria-hidden="true">*</span>
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
                          className={cn(
                            fieldClassName,
                            "min-h-36 resize-none py-3",
                          )}
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

                    <AnimatePresence>
                      {submitStatus === "success" ? (
                        <motion.div
                          aria-labelledby="contact-success-title"
                          aria-modal="true"
                          className="absolute inset-0 z-20 grid place-items-center bg-white/55 px-4 backdrop-blur-sm dark:bg-black/65"
                          exit={{ opacity: 0 }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          role="alertdialog"
                          transition={{ duration: 0.16 }}
                        >
                          <motion.div
                            className="w-full max-w-[320px] rounded-lg border border-[#d4d4d8] bg-white p-5 text-left shadow-[0_22px_60px_rgba(0,0,0,0.2)] dark:border-[#27272a] dark:bg-[#09090b] dark:shadow-[0_22px_60px_rgba(0,0,0,0.66)]"
                            exit={{ y: 8, scale: 0.98 }}
                            initial={{ y: 8, scale: 0.98 }}
                            animate={{ y: 0, scale: 1 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
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
                          </motion.div>
                        </motion.div>
                      ) : null}

                      {showCloseConfirmation ? (
                        <motion.div
                          aria-labelledby="contact-close-title"
                          aria-modal="true"
                          className="absolute inset-0 z-20 grid place-items-center bg-white/55 px-4 backdrop-blur-sm dark:bg-black/65"
                          exit={{ opacity: 0 }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          role="alertdialog"
                          transition={{ duration: 0.16 }}
                        >
                          <motion.div
                            className="w-full max-w-[320px] rounded-lg border border-[#d4d4d8] bg-white p-5 text-left shadow-[0_22px_60px_rgba(0,0,0,0.2)] dark:border-[#27272a] dark:bg-[#09090b] dark:shadow-[0_22px_60px_rgba(0,0,0,0.66)]"
                            exit={{ y: 8, scale: 0.98 }}
                            initial={{ y: 8, scale: 0.98 }}
                            animate={{ y: 0, scale: 1 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
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
                                  ¿Deseas cerrar y borrar el contenido?
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
                          </motion.div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </motion.aside>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            portalTarget,
          )
        : null}
    </>
  );
}
