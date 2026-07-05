"use client";

import { useState } from "react";
import { Section } from "./section";
import { Reveal } from "./reveal";
import { profile } from "@/lib/data";

export function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const launch = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = name
      ? `Hello Kevin — from ${name}`
      : "Hello Kevin — from your portfolio";
    const body = name ? `${message}\n\n— ${name}` : message;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  const channels = [
    { label: "email", value: profile.email, href: `mailto:${profile.email}` },
    { label: "github", value: "github.com/kevgom018", href: profile.github },
    {
      label: "linkedin",
      value: "in/kevin-gómez",
      href: profile.linkedin,
    },
  ];

  return (
    <Section
      id="contact"
      index="05"
      label="open a channel"
      title="Let's build something autonomous."
    >
      <div className="grid gap-12 lg:grid-cols-2">
        <Reveal>
          <div>
            <p className="max-w-md text-lg leading-relaxed text-fg2">
              Looking for an intern who treats software like a championship
              robot — tuned, tested, and reliable? My inbox is open for
              internships, collaborations, and robot talk.
            </p>
            <ul className="mt-10 space-y-5">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                    className="group flex items-baseline gap-5"
                  >
                    <span className="telemetry w-20 shrink-0 text-fg3">
                      {c.label}
                    </span>
                    <span className="border-b border-transparent text-fg transition-colors group-hover:border-accent group-hover:text-accent">
                      {c.value}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <form
            onSubmit={launch}
            className="rounded-2xl border border-line bg-surface p-7"
          >
            <p className="telemetry mb-5 text-accent">compose transmission</p>
            <label className="telemetry mb-2 block text-fg3" htmlFor="contact-name">
              name
            </label>
            <input
              id="contact-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ada Lovelace"
              autoComplete="name"
              className="w-full rounded-lg border border-line bg-bg px-4 py-3 text-sm text-fg outline-none transition-colors placeholder:text-fg3 focus:border-accent"
            />
            <label
              className="telemetry mb-2 mt-5 block text-fg3"
              htmlFor="contact-message"
            >
              message
            </label>
            <textarea
              id="contact-message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Kevin — we have an internship with your name on it…"
              className="w-full resize-y rounded-lg border border-line bg-bg px-4 py-3 text-sm text-fg outline-none transition-colors placeholder:text-fg3 focus:border-accent"
            />
            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-accent py-3.5 text-sm font-medium text-bg transition-transform duration-300 hover:-translate-y-0.5"
            >
              Send transmission
            </button>
            <p className="telemetry mt-4 text-center text-fg3">
              opens your email client — nothing is stored
            </p>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
