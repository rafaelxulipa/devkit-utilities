export type DiffLineType = 'equal' | 'added' | 'removed';

export interface DiffLine {
    type: DiffLineType;
    value: string;
}

const toLines = (text: string): string[] => (text === '' ? [] : text.split('\n'));

// Diff linha a linha via LCS (Longest Common Subsequence) — algoritmo clássico O(n*m).
export const diffLines = (textA: string, textB: string): DiffLine[] => {
    const linesA = toLines(textA);
    const linesB = toLines(textB);
    const n = linesA.length;
    const m = linesB.length;

    const lcs: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
    for (let i = n - 1; i >= 0; i--) {
        for (let j = m - 1; j >= 0; j--) {
            lcs[i][j] = linesA[i] === linesB[j] ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
        }
    }

    const result: DiffLine[] = [];
    let i = 0;
    let j = 0;
    while (i < n && j < m) {
        if (linesA[i] === linesB[j]) {
            result.push({ type: 'equal', value: linesA[i] });
            i++; j++;
        } else if (lcs[i + 1][j] >= lcs[i][j + 1]) {
            result.push({ type: 'removed', value: linesA[i] });
            i++;
        } else {
            result.push({ type: 'added', value: linesB[j] });
            j++;
        }
    }
    while (i < n) { result.push({ type: 'removed', value: linesA[i] }); i++; }
    while (j < m) { result.push({ type: 'added', value: linesB[j] }); j++; }

    return result;
};

export interface DiffStats {
    added: number;
    removed: number;
    unchanged: number;
}

export const getDiffStats = (diff: DiffLine[]): DiffStats =>
    diff.reduce((acc, line) => {
        if (line.type === 'added') acc.added++;
        else if (line.type === 'removed') acc.removed++;
        else acc.unchanged++;
        return acc;
    }, { added: 0, removed: 0, unchanged: 0 } as DiffStats);
