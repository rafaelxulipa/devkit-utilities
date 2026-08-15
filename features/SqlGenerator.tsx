
import React, { useState } from 'react';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { useToast } from '../contexts/ToastContext';
import { buildSql, SqlCommand } from '../utils/sqlGenerator';

interface ColumnRow {
    id: number;
    name: string;
    value: string;
    dataType: string;
    primaryKey: boolean;
    notNull: boolean;
}

let nextId = 1;
const newColumn = (): ColumnRow => ({ id: nextId++, name: '', value: '', dataType: 'VARCHAR(255)', primaryKey: false, notNull: false });

const commands: { id: SqlCommand; label: string }[] = [
    { id: 'INSERT', label: 'INSERT (inserir linha)' },
    { id: 'SELECT', label: 'SELECT (consultar)' },
    { id: 'UPDATE', label: 'UPDATE (atualizar)' },
    { id: 'DELETE', label: 'DELETE (remover)' },
    { id: 'CREATE_TABLE', label: 'CREATE TABLE (criar tabela)' },
];

const inputClass = 'w-full p-2 rounded-md bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:outline-none transition-colors font-mono text-sm';
const labelClass = 'block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1';

const SqlGenerator: React.FC = () => {
    const [command, setCommand] = useState<SqlCommand>('INSERT');
    const [tableName, setTableName] = useState('usuarios');
    const [columns, setColumns] = useState<ColumnRow[]>([newColumn(), newColumn()]);
    const [whereClause, setWhereClause] = useState('');
    const [orderBy, setOrderBy] = useState('');
    const [limit, setLimit] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [_isCopied, copy] = useCopyToClipboard();
    const { addToast } = useToast();

    const showColumns = command !== 'DELETE';
    const showValues = command === 'INSERT' || command === 'UPDATE';
    const showDataType = command === 'CREATE_TABLE';
    const showWhere = command === 'SELECT' || command === 'UPDATE' || command === 'DELETE';
    const showSelectExtras = command === 'SELECT';

    const updateColumn = (id: number, patch: Partial<ColumnRow>) => {
        setColumns(cols => cols.map(c => (c.id === id ? { ...c, ...patch } : c)));
    };

    const addColumn = () => setColumns(cols => [...cols, newColumn()]);
    const removeColumn = (id: number) => setColumns(cols => cols.filter(c => c.id !== id));

    const handleGenerate = async () => {
        setError('');
        setOutput('');
        setLoading(true);
        try {
            const rawSql = buildSql({ command, tableName, columns, whereClause, orderBy, limit });
            const { format } = await import('https://esm.sh/sql-formatter@15.4.0');
            setOutput(format(rawSql, { language: 'sql', tabWidth: 2, keywordCase: 'upper' }));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Não foi possível gerar o SQL.');
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        if (output) {
            copy(output);
            addToast('SQL copiado!', 'success');
        }
    };

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className={labelClass} htmlFor="command-select">Comando</label>
                    <select id="command-select" value={command} onChange={e => setCommand(e.target.value as SqlCommand)} className={inputClass}>
                        {commands.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                    </select>
                </div>
                <div>
                    <label className={labelClass} htmlFor="table-name">Nome da Tabela</label>
                    <input id="table-name" type="text" value={tableName} onChange={e => setTableName(e.target.value)} className={inputClass} />
                </div>
            </div>

            {showColumns && (
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label className={labelClass + ' mb-0'}>
                            {command === 'SELECT' ? 'Colunas (vazio = todas)' : 'Colunas'}
                        </label>
                        <Button onClick={addColumn} variant="secondary">+ Adicionar Coluna</Button>
                    </div>
                    <div className="space-y-2">
                        {columns.map(col => (
                            <div key={col.id} className="flex flex-wrap items-center gap-2 p-2 rounded-md bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20">
                                <input type="text" placeholder="nome_coluna" value={col.name}
                                    onChange={e => updateColumn(col.id, { name: e.target.value })}
                                    className={inputClass + ' flex-1 min-w-[120px]'} />

                                {showValues && (
                                    <input type="text" placeholder="valor" value={col.value}
                                        onChange={e => updateColumn(col.id, { value: e.target.value })}
                                        className={inputClass + ' flex-1 min-w-[120px]'} />
                                )}

                                {showDataType && (
                                    <>
                                        <input type="text" placeholder="VARCHAR(255)" value={col.dataType}
                                            onChange={e => updateColumn(col.id, { dataType: e.target.value })}
                                            className={inputClass + ' flex-1 min-w-[120px]'} />
                                        <Checkbox label="PK" checked={col.primaryKey} onChange={e => updateColumn(col.id, { primaryKey: e.target.checked })} />
                                        <Checkbox label="NOT NULL" checked={col.notNull} onChange={e => updateColumn(col.id, { notNull: e.target.checked })} />
                                    </>
                                )}

                                <button onClick={() => removeColumn(col.id)} aria-label="Remover coluna"
                                    className="px-2 text-light-secondary dark:text-dark-secondary hover:text-red-500">
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {showWhere && (
                <div>
                    <label className={labelClass} htmlFor="where-clause">Condição WHERE (opcional)</label>
                    <input id="where-clause" type="text" value={whereClause} onChange={e => setWhereClause(e.target.value)}
                        placeholder="id = 1" className={inputClass} />
                </div>
            )}

            {showSelectExtras && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className={labelClass} htmlFor="order-by">ORDER BY (opcional)</label>
                        <input id="order-by" type="text" value={orderBy} onChange={e => setOrderBy(e.target.value)}
                            placeholder="nome ASC" className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass} htmlFor="limit">LIMIT (opcional)</label>
                        <input id="limit" type="text" value={limit} onChange={e => setLimit(e.target.value)}
                            placeholder="10" className={inputClass} />
                    </div>
                </div>
            )}

            <div className="text-center">
                <Button onClick={handleGenerate} disabled={loading}>
                    {loading ? 'Gerando...' : 'Gerar SQL'}
                </Button>
            </div>

            {error && <p className="text-center text-sm font-semibold text-red-600 dark:text-red-400">{error}</p>}

            {output && (
                <div className="relative">
                    <pre className="p-3 pr-12 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 font-mono text-sm overflow-x-auto whitespace-pre-wrap">
                        {output}
                    </pre>
                    <button onClick={handleCopy} className="absolute top-3 right-3 text-light-secondary dark:text-dark-secondary hover:text-light-primary dark:hover:text-dark-primary" aria-label="Copiar SQL">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};

export default SqlGenerator;
