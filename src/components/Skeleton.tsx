import React from "react";

/**
 * Skeleton primitives + section-shaped loading placeholders.
 * Shapes mirror each lazy section so swapping in the real content
 * causes no layout shift. Shimmer respects prefers-reduced-motion (see index.css).
 */

type BlockProps = {
  className?: string;
};

function Block({ className = "" }: BlockProps) {
  return <div aria-hidden="true" className={`skeleton rounded-md ${className}`} />;
}

function Line({ className = "" }: BlockProps) {
  return <Block className={`h-4 ${className}`} />;
}

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[1.5rem] border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur-md md:p-8 ${className}`}
    >
      {children}
    </div>
  );
}

function SectionHeader() {
  return (
    <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-[0.75fr_1.25fr] md:items-end">
      <div className="space-y-3">
        <Block className="h-3 w-28" />
        <Block className="h-9 w-3/4 md:h-12" />
      </div>
      <div className="space-y-2.5">
        <Line className="w-full" />
        <Line className="w-11/12" />
        <Line className="w-2/3" />
      </div>
    </div>
  );
}

export function AboutSkeleton() {
  return (
    <section className="bg-transparent px-6 py-16 md:px-12 md:py-24" aria-busy="true" aria-label="Loading about">
      <div className="mx-auto flex max-w-6xl flex-col items-center">
        <Block className="mb-8 h-9 w-40 md:h-12" />
        <GlassCard className="w-full p-8 md:p-12 lg:p-16">
          <div className="flex flex-col items-start gap-8 md:flex-row md:gap-12">
            <Block className="h-48 w-48 flex-shrink-0 rounded-[1.5rem] md:h-64 md:w-64" />
            <div className="flex-1 space-y-4">
              <Block className="h-8 w-56" />
              <Line className="w-40" />
              <div className="space-y-2.5 pt-2">
                <Line className="w-full" />
                <Line className="w-11/12" />
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {Array.from({ length: 7 }).map((_, i) => (
                  <Block key={i} className="h-9 w-24 rounded-full" />
                ))}
              </div>
              <div className="space-y-2.5 pt-2">
                <Line className="w-full" />
                <Line className="w-10/12" />
                <Line className="w-3/4" />
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

export function ExperienceSkeleton() {
  return (
    <section className="bg-transparent px-6 py-16 md:px-12 md:py-24" aria-busy="true" aria-label="Loading experience">
      <div className="mx-auto max-w-7xl">
        <SectionHeader />
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col gap-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <GlassCard key={i}>
                <div className="flex items-start gap-4">
                  <Block className="h-12 w-12 flex-none rounded-2xl" />
                  <div className="min-w-0 flex-1 space-y-2.5">
                    <Block className="h-6 w-48" />
                    <Line className="w-40" />
                    <Line className="w-32" />
                    <div className="space-y-2 pt-3">
                      <Line className="w-full" />
                      <Line className="w-10/12" />
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
          <GlassCard>
            <div className="mb-5 flex items-center gap-3">
              <Block className="h-10 w-10 rounded-2xl" />
              <Block className="h-6 w-40" />
            </div>
            <div className="divide-y divide-black/5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0 flex-1 space-y-2">
                    <Line className="w-3/4" />
                    <Block className="h-3 w-24" />
                  </div>
                  <Block className="h-3 w-16 flex-none" />
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

export function ProjectsSkeleton() {
  return (
    <section className="bg-transparent px-6 py-16 md:px-12 md:py-24" aria-busy="true" aria-label="Loading projects">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl space-y-4 md:mb-16">
          <Block className="h-3 w-32" />
          <Block className="h-9 w-3/4 md:h-12" />
          <Line className="w-full" />
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <GlassCard key={i} className="flex min-h-[360px] flex-col justify-between rounded-[1.75rem]">
              <div className="space-y-4">
                <div className="mb-4 flex items-center justify-between">
                  <Block className="h-12 w-12 rounded-2xl" />
                  <Block className="h-5 w-5 rounded" />
                </div>
                <Block className="h-3 w-24" />
                <Block className="h-7 w-2/3" />
                <div className="space-y-2.5">
                  <Line className="w-full" />
                  <Line className="w-11/12" />
                  <Line className="w-3/4" />
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-6">
                {Array.from({ length: 4 }).map((_, j) => (
                  <Block key={j} className="h-6 w-16 rounded-full" />
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SkillsSkeleton() {
  return (
    <section className="bg-transparent px-6 py-16 md:px-12 md:py-24" aria-busy="true" aria-label="Loading skills">
      <div className="mx-auto max-w-7xl">
        <SectionHeader />
        <div className="grid gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="grid gap-5 rounded-[1.5rem] border border-black/10 bg-white/65 p-5 shadow-sm backdrop-blur-md md:grid-cols-[240px_1fr] md:items-center"
            >
              <div className="flex items-center gap-4">
                <Block className="h-12 w-12 rounded-2xl" />
                <Block className="h-6 w-32" />
              </div>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 6 }).map((_, j) => (
                  <Block key={j} className="h-8 w-24 rounded-full" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ResumeSkeleton() {
  return (
    <section className="bg-transparent px-6 py-16 md:px-12 md:py-24" aria-busy="true" aria-label="Loading resume">
      <div className="mx-auto flex max-w-7xl flex-col items-center">
        <Block className="mb-4 h-9 w-44 md:h-12" />
        <Block className="mb-10 h-6 w-2/3 max-w-xl" />
        <div className="flex w-full max-w-4xl flex-col items-center rounded-[1.5rem] border border-black/10 bg-white/70 p-5 shadow-sm backdrop-blur-md">
          <Block className="h-[70vh] min-h-[500px] w-full max-w-[700px] rounded-lg" />
        </div>
        <Block className="mt-6 h-10 w-36 rounded-full" />
      </div>
    </section>
  );
}

export function ContactSkeleton() {
  return (
    <section className="bg-transparent px-6 py-16 md:px-12 md:py-24" aria-busy="true" aria-label="Loading contact">
      <div className="mx-auto flex max-w-2xl flex-col items-center">
        <Block className="mb-4 h-9 w-44 md:h-12" />
        <Block className="mb-10 h-6 w-2/3" />
        <GlassCard className="w-full space-y-5">
          <div className="space-y-2">
            <Line className="w-20" />
            <Block className="h-11 w-full rounded-xl" />
          </div>
          <div className="space-y-2">
            <Line className="w-20" />
            <Block className="h-11 w-full rounded-xl" />
          </div>
          <div className="space-y-2">
            <Line className="w-24" />
            <Block className="h-28 w-full rounded-xl" />
          </div>
          <Block className="h-11 w-full rounded-full" />
        </GlassCard>
      </div>
    </section>
  );
}

export function FooterSkeleton() {
  return (
    <div className="px-6 pb-8 pt-16 md:px-12 md:pb-10 md:pt-24" aria-busy="true" aria-label="Loading footer">
      <div className="mx-auto max-w-7xl rounded-[1.75rem] border border-black/10 bg-white/75 p-6 shadow-sm backdrop-blur-xl md:p-8">
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div className="space-y-4">
            <Block className="h-10 w-44 rounded-full" />
            <Line className="w-3/4" />
          </div>
          <div className="flex flex-wrap gap-2 md:justify-end">
            {Array.from({ length: 6 }).map((_, i) => (
              <Block key={i} className="h-9 w-20 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
