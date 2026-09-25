import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { careerSpans, getSpan, orderedSpans } from "@/utils/experience";
import { site } from "@/utils/site";
import SpanPage from "./SpanPage";

export function generateStaticParams() {
  return careerSpans.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const span = getSpan(params.slug);
  if (!span) return {};
  return {
    title: `${span.name} — ${site.name}`,
    description: span.summary,
    alternates: { canonical: `/experience/${span.slug}` },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const span = getSpan(params.slug);
  if (!span) notFound();
  const i = orderedSpans.findIndex((s) => s.slug === span.slug);
  const prev = orderedSpans[(i - 1 + orderedSpans.length) % orderedSpans.length];
  const next = orderedSpans[(i + 1) % orderedSpans.length];
  return <SpanPage slug={span.slug} prevSlug={prev.slug} nextSlug={next.slug} />;
}
