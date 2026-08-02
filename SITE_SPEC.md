# Site Specification

## Positioning
A personal research workspace covering finance, computer science, AI systems, mathematics, trading, projects, and career notes.

## Information architecture
- `/`: identity, current focus, selected projects, knowledge map
- `/projects/`: project portfolio and ongoing work
- `/notes/`: topic-based knowledge map
- `/writing/`: public long-form writing and retrospectives
- `/about/`: concise personal positioning and site purpose

## Design principles
- Clear but not plain
- Editorial typography over decorative illustrations
- Warm neutral background, dark ink, lime accent, blue secondary accent
- Responsive, accessible, no external font dependency
- Dark mode supported

## Maintenance principles
- Content and presentation remain separated
- New public writing is Markdown-based
- Project metadata lives in `src/data/site.ts` until a project collection is needed
- Every change is reviewed through a pull request
