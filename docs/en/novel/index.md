---
title: Novel
---

# Novel

The Chinese novel currently lives at the root `/novel/` routes. The English locale is ready at `/en/novel/` and can receive translated chapters progressively.

## Current Structure

- Prologue: foundations before entering the kernel world.
- Volume 1: boot and early kernel initialization.
- Later volumes: processes, scheduling, memory management, filesystems, networking, drivers, security, architecture, and maintainership.

## Next Translation Step

Add translated chapters under paths such as:

```text
docs/en/novel/vol1-chaos/ch01.md
```

Then add the corresponding link to `docs/.vitepress/sidebar.ts`.
