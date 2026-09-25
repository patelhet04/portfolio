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
  const title = `${span.name} — ${site.name}`;
  const url = `/experience/${span.slug}`;
  return {
    title,
    description: span.summary,
    alternates: { canonical: url },
    openGraph: { title, description: span.summary, url, siteName: site.name, type: "article", images: [site.ogImage] },
    twitter: { card: "summary_large_image", title, description: span.summary, images: [site.ogImage.url] },
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
