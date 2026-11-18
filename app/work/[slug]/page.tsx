import type { Metadata } from "next";
import { caseStudies } from "@/content/case-studies";
import { getCaseStudy } from "@/content";
import { CaseStudyPage } from "@/components/case-study-page";
import { caseMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getCaseStudy("en", (await params).slug);
  return c ? caseMetadata("en", c) : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <CaseStudyPage locale="en" slug={(await params).slug} />;
}
