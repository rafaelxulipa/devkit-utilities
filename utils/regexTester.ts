export interface RegexMatch {
    match: string;
    index: number;
    groups: (string | undefined)[];
}

export interface RegexTestResult {
    matches: RegexMatch[];
    error: string | null;
}

const MAX_MATCHES = 5000;

export const testRegex = (pattern: string, flags: string, text: string): RegexTestResult => {
    if (!pattern) return { matches: [], error: null };
    try {
        const effectiveFlags = flags.includes('g') ? flags : `${flags}g`;
        const re = new RegExp(pattern, effectiveFlags);
        const matches: RegexMatch[] = [];
        let m: RegExpExecArray | null;
        while ((m = re.exec(text)) !== null) {
            matches.push({ match: m[0], index: m.index, groups: m.slice(1) });
            if (m[0] === '') re.lastIndex++; // evita loop infinito em matches vazios
            if (!flags.includes('g') || matches.length >= MAX_MATCHES) break;
        }
        return { matches, error: null };
    } catch (err) {
        return { matches: [], error: err instanceof Error ? err.message : 'Expressão regular inválida.' };
    }
};

export interface TextSegment {
    text: string;
    isMatch: boolean;
}

export const buildHighlightSegments = (text: string, matches: RegexMatch[]): TextSegment[] => {
    if (matches.length === 0) return [{ text, isMatch: false }];
    const segments: TextSegment[] = [];
    let cursor = 0;
    for (const m of matches) {
        if (m.index > cursor) segments.push({ text: text.slice(cursor, m.index), isMatch: false });
        segments.push({ text: m.match, isMatch: true });
        cursor = m.index + m.match.length;
    }
    if (cursor < text.length) segments.push({ text: text.slice(cursor), isMatch: false });
    return segments;
};
