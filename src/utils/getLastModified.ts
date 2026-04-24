import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const cache = new Map<string, Date | null>();

/**
 * Returns the ISO date of the most recent commit that touched the file.
 * Returns null if the file isn't tracked in git yet, or if git isn't available
 * (e.g., shallow clone without the file in history, or untracked staging).
 *
 * Callers should fall back to frontmatter `updatedDate` or `new Date()` when
 * this returns null.
 */
export function getGitLastModified(absoluteFilepath: string): Date | null {
  if (cache.has(absoluteFilepath)) return cache.get(absoluteFilepath)!;
  try {
    const output = execFileSync(
      'git',
      ['log', '-1', '--format=%aI', '--', absoluteFilepath],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] },
    ).trim();
    if (!output) {
      cache.set(absoluteFilepath, null);
      return null;
    }
    const d = new Date(output);
    cache.set(absoluteFilepath, d);
    return d;
  } catch {
    cache.set(absoluteFilepath, null);
    return null;
  }
}

/**
 * Effective "last updated" date for display + schema dateModified.
 *
 * Priority: max(git last-commit date, frontmatter updatedDate).
 * Falls back to frontmatter, then to today if neither is available.
 *
 * Rationale: git is the source of truth for incidental edits (we can stop
 * manually bumping frontmatter on every typo fix). Frontmatter stays as an
 * editorial override — set it when an update is intentionally forward-dated
 * (e.g., a scheduled republish) or when the git history isn't meaningful
 * (e.g., a bulk migration that touched 200 files without changing their
 * editorial content).
 */
export function getEffectiveUpdatedDate(
  absoluteFilepath: string | undefined,
  frontmatterDate?: Date,
): Date {
  const gitDate = absoluteFilepath ? getGitLastModified(absoluteFilepath) : null;
  if (gitDate && frontmatterDate) {
    return gitDate > frontmatterDate ? gitDate : frontmatterDate;
  }
  return gitDate ?? frontmatterDate ?? new Date();
}

/**
 * Convenience wrapper: pass `import.meta.url` from an .astro page to compute
 * the page's own last-modified date. Useful for standalone pages (pricing,
 * privacy, hub pages) that have no content-collection entry.
 */
export function getSelfLastModified(importMetaUrl: string, frontmatterDate?: Date): Date {
  const selfPath = fileURLToPath(importMetaUrl);
  return getEffectiveUpdatedDate(selfPath, frontmatterDate);
}

/**
 * Compute the absolute filesystem path for a content-collection entry.
 * Astro 5 exposes `entry.filePath` on content entries. Earlier Astro versions
 * require reconstructing the path — this helper uses entry.filePath when
 * present and constructs a best-effort path otherwise.
 */
export function getEntryFilepath(
  entry: { filePath?: string; id?: string; collection?: string },
): string | undefined {
  if (entry.filePath) {
    return path.isAbsolute(entry.filePath)
      ? entry.filePath
      : path.resolve(process.cwd(), entry.filePath);
  }
  if (entry.id && entry.collection) {
    // Fallback: construct path relative to src/content/<collection>/
    // Caller should verify — Astro versions vary in id format.
    return path.resolve(process.cwd(), 'src/content', entry.collection, `${entry.id}.md`);
  }
  return undefined;
}
