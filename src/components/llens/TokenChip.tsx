interface TokenChipProps {
  token: string;
}

export function TokenChip({ token }: TokenChipProps) {
  const chars = Array.from(token).map((char, index) => {
    if (char === " ") {
      return (
        <span
          key={`space-${index}`}
          className="inline-block h-2.5 w-2.5 rounded-full bg-orange-200 ring-1 ring-orange-300/70"
          aria-hidden="true"
        />
      );
    }

    if (char === "\n") {
      return (
        <span
          key={`newline-${index}`}
          className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-orange-100 text-orange-600 ring-1 ring-orange-200"
          aria-label="newline"
        >
          <svg viewBox="0 0 24 24" className="h-3 w-3">
            <path
              d="M6 8h8a4 4 0 0 1 0 8H9m0 0 3-3m-3 3 3 3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      );
    }

    if (char === "\t") {
      return (
        <span
          key={`tab-${index}`}
          className="inline-flex items-center text-[10px] font-semibold text-orange-400"
        >
          ⇥
        </span>
      );
    }

    return (
      <span key={`char-${index}`} className="text-foreground">
        {char}
      </span>
    );
  });

  return (
    <span className="rounded-xl border border-border/60 bg-background/70 px-3 py-1.5 text-sm">
      <span className="inline-flex flex-wrap items-center gap-0.5">{chars}</span>
    </span>
  );
}
