import { useState, type SubmitEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    // Honeypot field — real users never fill this in, bots often do.
    if (formData.get("company")) {
      setStatus("success");
      return;
    }

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-moss-200 bg-moss-50 p-6 text-moss-700">
        <p className="font-semibold">Thanks for reaching out!</p>
        <p className="mt-1 text-sm">
          We've received your message and will get back to you within a
          couple of days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot — hidden from real users via CSS, not display:none so
          basic bots that skip hidden fields still fill it in. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-moss-700">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1 w-full rounded-lg border border-moss-200 px-3 py-2 text-moss-900 focus:border-moss-500 focus:outline-none focus:ring-1 focus:ring-moss-500"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-moss-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-lg border border-moss-200 px-3 py-2 text-moss-900 focus:border-moss-500 focus:outline-none focus:ring-1 focus:ring-moss-500"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-moss-700">
          Phone <span className="text-moss-400">(optional)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="mt-1 w-full rounded-lg border border-moss-200 px-3 py-2 text-moss-900 focus:border-moss-500 focus:outline-none focus:ring-1 focus:ring-moss-500"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-moss-700">
          Tell us about your project
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-1 w-full rounded-lg border border-moss-200 px-3 py-2 text-moss-900 focus:border-moss-500 focus:outline-none focus:ring-1 focus:ring-moss-500"
        />
      </div>

      {status === "error" && errorMessage && (
        <p className="text-sm text-red-600" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-full bg-moss-700 px-6 py-3 text-sm font-semibold text-white hover:bg-moss-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
