export type SqlCommand = 'INSERT' | 'SELECT' | 'UPDATE' | 'DELETE' | 'CREATE_TABLE';

export interface SqlColumn {
    name: string;
    value: string;    // usado em INSERT (VALUES) e UPDATE (SET)
    dataType: string; // usado em CREATE TABLE
    primaryKey: boolean;
    notNull: boolean;
}

export interface SqlBuildInput {
    command: SqlCommand;
    tableName: string;
    columns: SqlColumn[];
    whereClause: string;
    orderBy: string;
    limit: string;
}

const isNumericLiteral = (value: string): boolean => /^-?\d+(\.\d+)?$/.test(value.trim());
const isKeywordLiteral = (value: string): boolean => /^(null|true|false)$/i.test(value.trim());

export const formatSqlValue = (value: string): string => {
    const trimmed = value.trim();
    if (trimmed === '') return 'NULL';
    if (isNumericLiteral(trimmed) || isKeywordLiteral(trimmed)) return trimmed.toUpperCase() === 'NULL' ? 'NULL' : trimmed;
    return `'${trimmed.replace(/'/g, "''")}'`;
};

export const buildSql = (input: SqlBuildInput): string => {
    const { command, tableName, columns, whereClause, orderBy, limit } = input;
    const table = tableName.trim() || 'tabela';
    const namedColumns = columns.filter(c => c.name.trim() !== '');

    switch (command) {
        case 'INSERT': {
            if (namedColumns.length === 0) throw new Error('Adicione ao menos uma coluna.');
            const names = namedColumns.map(c => c.name.trim()).join(', ');
            const values = namedColumns.map(c => formatSqlValue(c.value)).join(', ');
            return `INSERT INTO ${table} (${names}) VALUES (${values});`;
        }
        case 'SELECT': {
            const cols = namedColumns.length > 0 ? namedColumns.map(c => c.name.trim()).join(', ') : '*';
            let sql = `SELECT ${cols} FROM ${table}`;
            if (whereClause.trim()) sql += ` WHERE ${whereClause.trim()}`;
            if (orderBy.trim()) sql += ` ORDER BY ${orderBy.trim()}`;
            if (limit.trim()) sql += ` LIMIT ${limit.trim()}`;
            return `${sql};`;
        }
        case 'UPDATE': {
            if (namedColumns.length === 0) throw new Error('Adicione ao menos uma coluna.');
            const sets = namedColumns.map(c => `${c.name.trim()} = ${formatSqlValue(c.value)}`).join(', ');
            let sql = `UPDATE ${table} SET ${sets}`;
            if (whereClause.trim()) sql += ` WHERE ${whereClause.trim()}`;
            return `${sql};`;
        }
        case 'DELETE': {
            let sql = `DELETE FROM ${table}`;
            if (whereClause.trim()) sql += ` WHERE ${whereClause.trim()}`;
            return `${sql};`;
        }
        case 'CREATE_TABLE': {
            if (namedColumns.length === 0) throw new Error('Adicione ao menos uma coluna.');
            const defs = namedColumns.map(c => {
                let def = `${c.name.trim()} ${c.dataType.trim() || 'VARCHAR(255)'}`;
                if (c.notNull) def += ' NOT NULL';
                if (c.primaryKey) def += ' PRIMARY KEY';
                return def;
            });
            return `CREATE TABLE ${table} (\n  ${defs.join(',\n  ')}\n);`;
        }
    }
};
