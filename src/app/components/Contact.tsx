"use client";
import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { site } from "@/utils/site";
import { ArrowOut, ArrowUp } from "./Icons";
import { revealWords } from "../lib/stream";
import RevealText from "./RevealText";

const emailjsKeys = {
  service: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  template: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_USER_ID,
};

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState("");
  const [state, setState] = useState<"idle" | "sending">("idle");
  const [reply, setReply] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const replyRef = useRef<HTMLParagraphElement>(null);
  const sendRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!reply) return;
    const words = Array.from(replyRef.current!.querySelectorAll<HTMLElement>(".w"));
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { timers } = revealWords(words, reduce ? { step: 0 } : { delay: 60, step: 45 });
    return () => timers.forEach(clearTimeout);
  }, [reply]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current!;
    const data = new FormData(form);
    const name = String(data.get("from_name") ?? "").trim();
    const email = String(data.get("from_email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const focus = (field: string) => form.querySelector<HTMLElement>(`[name="${field}"]`)?.focus();
    if (!message) return setError("Add a message first. A one-liner is fine."), focus("message");
    if (!name) return setError("Add your name so I know who's writing."), focus("from_name");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("That email doesn't look right. Check it so I can reply."), focus("from_email");
    const failed = `That didn't send. Email me directly at ${site.email} and it'll reach me.`;
    // Builds without the EmailJS keys (local dev, forks) can't send; say so without a failed request
    if (!emailjsKeys.service || !emailjsKeys.template || !emailjsKeys.publicKey) return setError(failed);
    setError("");
    setState("sending");
    (form.elements.namedItem("subject") as HTMLInputElement).value = `Portfolio message from ${name}`;
    let settle: () => void;
    try {
      await emailjs.sendForm(emailjsKeys.service, emailjsKeys.template, form, { publicKey: emailjsKeys.publicKey });
      settle = () => {
        setReply(`Received, thanks ${name.split(" ")[0]}. I'll reply to ${email} soon.`);
        form.reset();
      };
    } catch {
      settle = () => setError(failed);
    }
    // The arrow finishes the launch it's in before the button settles, so it never snaps mid-flight
    await new Promise<void>((done) => {
      const svg = sendRef.current?.querySelector("svg");
      if (!svg?.getAnimations().length) return done();
      svg.addEventListener("animationiteration", () => done(), { once: true });
      window.setTimeout(done, 700);
    });
    settle();
    setState("idle");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
    } catch {
      /* clipboard can be blocked; the address is still visible */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section className="block" id="contact">
      <div className="wrap">
        <div className="head">
          <RevealText className="h2" runs={["Send a prompt."]} />
          <p className="lede">Pitch a role, ask about an agent build, or just say hi. It lands straight in my inbox.</p>
        </div>
        <div className="contact">
          <div className="contact__main">
            <form className="composer" ref={formRef} onSubmit={onSubmit} noValidate>
              <input type="hidden" name="to_name" value="Het Patel" />
              <input type="hidden" name="subject" />
              <label className="sr-only" htmlFor="msg">
                Message
              </label>
              <textarea id="msg" name="message" placeholder="Hi Het, we're building…" onInput={() => error && setError("")} />
              <div className="err" role="alert">
                {error}
              </div>
              <div className="composer__foot">
                <div className="field">
                  <label className="mono" htmlFor="name">
                    name
                  </label>
                  <input id="name" name="from_name" autoComplete="name" onInput={() => error && setError("")} />
                </div>
                <div className="field">
                  <label className="mono" htmlFor="email">
                    email
                  </label>
                  <input id="email" name="from_email" type="email" autoComplete="email" onInput={() => error && setError("")} />
                </div>
                <button className="send" type="submit" ref={sendRef} data-state={state} aria-label={state === "sending" ? "Sending" : "Send message"}>
                  <ArrowUp />
                </button>
              </div>
            </form>
            {reply && (
              <div className="reply" aria-live="polite">
                <span className="reply__who">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/assets/Memoji.png" alt="" width={30} height={30} />
                </span>
                <p ref={replyRef}>
                  {reply.split(" ").map((w, i) => (
                    <span key={i}>
                      <span className="w">{w}</span>{" "}
                    </span>
                  ))}
                </p>
              </div>
            )}
          </div>
          <div className="direct">
            <div>
              <span className="k mono">email</span>
              <span style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <a className="v" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
                <button className="copy mono" type="button" onClick={copy} data-copied={copied} aria-live="polite">
                  <span key={String(copied)}>{copied ? "copied" : "copy"}</span>
                </button>
              </span>
            </div>
            <div>
              <span className="k mono">phone</span>
              <a className="v" href={site.phoneHref}>
                {site.phone}
              </a>
            </div>
            <div>
              <span className="k mono">based</span>
              <span className="v">{site.location}</span>
            </div>
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                <span className="v">{s.label}</span>
                <ArrowOut className="" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
