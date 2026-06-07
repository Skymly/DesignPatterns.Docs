export interface SiteMeta {
  lastUpdated: string
  commitSha: string
  shortSha: string
}

const docsRepo = 'https://github.com/Skymly/DesignPatterns.Docs'

export function commitUrl(sha: string): string {
  return sha ? `${docsRepo}/commit/${sha}` : docsRepo
}

declare const __SITE_META__: SiteMeta

export const siteMeta: SiteMeta = __SITE_META__
