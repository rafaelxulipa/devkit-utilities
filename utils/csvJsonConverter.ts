// --- Parser CSV (RFC 4180: campos entre aspas, vírgulas/quebras de linha dentro de aspas, "" como aspas escapada) ---
const parseCSV = (text: string, delimiter: string): string[][] => {
    const rows: string[][] = [];
    let row: string[] = [];
    let field = '';
    let inQuotes = false;
    let i = 0;

    while (i < text.length) {
        const char = text[i];
        if (inQuotes) {
            if (char === '"') {
                if (text[i + 1] === '"') { field += '"'; i += 2; continue; }
                inQuotes = false; i++; continue;
            }
            field += char; i++; continue;
        }
        if (char === '"') { inQuotes = true; i++; continue; }
        if (char === delimiter) { row.push(field); field = ''; i++; continue; }
        if (char === '\r') { i++; continue; }
        if (char === '\n') { row.push(field); rows.push(row); row = []; field = ''; i++; continue; }
        field += char; i++;
    }
    if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }
    return rows;
};

const escapeCsvField = (value: string, delimiter: string): string => {
    if (value.includes(delimiter) || value.includes('"') || value.includes('\n') || value.includes('\r')) {
        return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
};

export const csvToJson = (csvText: string, delimiter: string, hasHeader: boolean): unknown[] => {
    const rows = parseCSV(csvText.trim(), delimiter).filter(r => !(r.length === 1 && r[0] === ''));
    if (rows.length === 0) return [];

    if (!hasHeader) return rows;

    const [header, ...dataRows] = rows;
    return dataRows.map(row => {
        const obj: Record<string, string> = {};
        header.forEach((key, idx) => { obj[key || `coluna${idx + 1}`] = row[idx] ?? ''; });
        return obj;
    });
};

export const jsonToCsv = (jsonText: string, delimiter: string): string => {
    const parsed = JSON.parse(jsonText);
    const rows: unknown[] = Array.isArray(parsed) ? parsed : [parsed];
    if (rows.length === 0) return '';

    if (Array.isArray(rows[0])) {
        return (rows as unknown[][])
            .map(row => row.map(cell => escapeCsvField(String(cell ?? ''), delimiter)).join(delimiter))
            .join('\n');
    }

    const headerSet = new Set<string>();
    rows.forEach(row => Object.keys(row as Record<string, unknown>).forEach(key => headerSet.add(key)));
    const header = Array.from(headerSet);

    const lines = [header.map(h => escapeCsvField(h, delimiter)).join(delimiter)];
    rows.forEach(row => {
        const record = row as Record<string, unknown>;
        lines.push(header.map(key => escapeCsvField(record[key] === undefined || record[key] === null ? '' : String(record[key]), delimiter)).join(delimiter));
    });
    return lines.join('\n');
};
