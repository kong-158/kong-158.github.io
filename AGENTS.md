# AGENTS.md

## Goal
Maintain this repository as Liu Kehong's long-term public writing and archive website.

## Privacy and publishing rules
- Never assume a project, experience, employer, research result, current activity, or personal plan should be public.
- New content defaults to `draft: true`, `visibility: private`, and `recommended: false`.
- Publishing requires explicit approval from the author.
- Private content must not be built into the public site.
- Unlisted content may have a direct route but must not appear in lists, categories, archives, feeds, or search.
- Do not create or expose a project page unless the author explicitly requests it.

## Recommendation rules
- Recommendation is a separate and explicit editorial decision.
- Only content with `recommended: true` may appear in the recommendation module.
- If no public content is recommended, hide the entire module without an empty-state placeholder.
- Never infer recommendation status from recency, quality, technical difficulty, career value, traffic, topic, or AI judgment.

## Content organization
- Normal public content should appear chronologically and under its declared topic.
- Categories are navigation tools, not claims about the author's identity or priorities.
- Do not add invented projects, metrics, achievements, current focus, or promotional copy.
- Preserve the author's original reasoning and writing style.

## CMC content source (important)
- The public `/writing/cmc-calculus/` page renders `src/components/CmcCalculusNotes.astro` via a special branch in `src/pages/writing/[...id].astro`.
- `src/content/writing/cmc-calculus.md` is **metadata only**; its Markdown body is **not rendered**. Never put CMC chapter content or worked examples there. Put all CMC chapters, formulas, question notes, and navigation anchors in the Astro component.
- When changing CMC notes, verify that the heading and linked anchor exist in the rendered component, and check build/deployment status before claiming the published page is updated.
