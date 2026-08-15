
import React, { useState } from 'react';
import Button from '../components/Button';
import {
    TimestampUnit,
    commonTimezones,
    timestampToDate,
    dateToUnixSeconds,
    dateToUnixMilliseconds,
    formatInTimeZone,
} from '../utils/timestampUtils';

type Mode = 'timestamp-to-date' | 'date-to-timestamp';

const inputClass = 'w-full p-2 rounded-md bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:outline-none transition-colors';
const labelClass = 'block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1';

const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const TimestampConverter: React.FC = () => {
    const [mode, setMode] = useState<Mode>('timestamp-to-date');

    const [timestampInput, setTimestampInput] = useState(String(Math.floor(Date.now() / 1000)));
    const [unit, setUnit] = useState<TimestampUnit>('seconds');
    const [dateResults, setDateResults] = useState<{ zone: string; label: string; value: string }[] | null>(null);
    const [dateError, setDateError] = useState('');

    const [dateTimeInput, setDateTimeInput] = useState('');
    const [tsResults, setTsResults] = useState<{ seconds: number; ms: number; iso: string } | null>(null);
    const [tsError, setTsError] = useState('');

    const handleConvertTimestamp = () => {
        setDateError('');
        setDateResults(null);
        const value = Number(timestampInput);
        if (!timestampInput || Number.isNaN(value)) {
            setDateError('Informe um timestamp numérico válido.');
            return;
        }
        const date = timestampToDate(value, unit);
        if (Number.isNaN(date.getTime())) {
            setDateError('Timestamp inválido.');
            return;
        }
        const zones = [{ id: localTimezone, label: `Horário Local (${localTimezone})` }, ...commonTimezones];
        setDateResults(zones.map(z => ({ zone: z.id, label: z.label, value: formatInTimeZone(date, z.id) })));
    };

    const handleUseNow = () => {
        setTimestampInput(String(unit === 'seconds' ? Math.floor(Date.now() / 1000) : Date.now()));
    };

    const handleConvertDate = () => {
        setTsError('');
        setTsResults(null);
        if (!dateTimeInput) {
            setTsError('Selecione uma data e hora.');
            return;
        }
        const date = new Date(dateTimeInput);
        if (Number.isNaN(date.getTime())) {
            setTsError('Data inválida.');
            return;
        }
        setTsResults({
            seconds: dateToUnixSeconds(date),
            ms: dateToUnixMilliseconds(date),
            iso: date.toISOString(),
        });
    };

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex flex-wrap items-center gap-4">
                <label htmlFor="mode-select" className="font-semibold">Conversor:</label>
                <select
                    id="mode-select"
                    value={mode}
                    onChange={(e) => { setMode(e.target.value as Mode); setDateResults(null); setTsResults(null); setDateError(''); setTsError(''); }}
                    className={inputClass + ' w-auto'}
                >
                    <option value="timestamp-to-date">Timestamp Unix → Data</option>
                    <option value="date-to-timestamp">Data → Timestamp Unix</option>
                </select>
            </div>

            {mode === 'timestamp-to-date' && (
                <div className="p-4 border border-light-secondary/20 dark:border-dark-secondary/20 rounded-lg space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <label className={labelClass} htmlFor="ts-input">Timestamp Unix</label>
                            <input id="ts-input" type="text" inputMode="numeric" value={timestampInput}
                                onChange={e => setTimestampInput(e.target.value)} className={inputClass} />
                        </div>
                        <div>
                            <label className={labelClass} htmlFor="ts-unit">Unidade</label>
                            <select id="ts-unit" value={unit} onChange={e => setUnit(e.target.value as TimestampUnit)} className={inputClass}>
                                <option value="seconds">Segundos</option>
                                <option value="milliseconds">Milissegundos</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-center gap-3">
                        <Button onClick={handleUseNow} variant="secondary">Usar Agora</Button>
                        <Button onClick={handleConvertTimestamp}>Converter</Button>
                    </div>
                </div>
            )}

            {mode === 'date-to-timestamp' && (
                <div className="p-4 border border-light-secondary/20 dark:border-dark-secondary/20 rounded-lg space-y-4">
                    <div>
                        <label className={labelClass} htmlFor="dt-input">Data e Hora (fuso local do navegador: {localTimezone})</label>
                        <input id="dt-input" type="datetime-local" step="1" value={dateTimeInput}
                            onChange={e => setDateTimeInput(e.target.value)} className={inputClass} />
                    </div>
                    <div className="text-center">
                        <Button onClick={handleConvertDate}>Converter</Button>
                    </div>
                </div>
            )}

            {dateError && <p className="text-center text-sm font-semibold text-red-600 dark:text-red-400">{dateError}</p>}
            {tsError && <p className="text-center text-sm font-semibold text-red-600 dark:text-red-400">{tsError}</p>}

            {dateResults && (
                <div className="p-4 bg-light-bg dark:bg-dark-bg rounded-lg">
                    {dateResults.map(r => (
                        <div key={r.zone} className="flex justify-between items-baseline py-2 border-b border-light-secondary/10 dark:border-dark-secondary/10 last:border-0">
                            <span className="text-sm">{r.label}</span>
                            <span className="font-mono font-medium">{r.value}</span>
                        </div>
                    ))}
                </div>
            )}

            {tsResults && (
                <div className="p-4 bg-light-bg dark:bg-dark-bg rounded-lg space-y-2">
                    <div className="flex justify-between items-baseline py-2 border-b border-light-secondary/10 dark:border-dark-secondary/10">
                        <span className="text-sm">Timestamp (segundos)</span>
                        <span className="font-mono font-medium">{tsResults.seconds}</span>
                    </div>
                    <div className="flex justify-between items-baseline py-2 border-b border-light-secondary/10 dark:border-dark-secondary/10">
                        <span className="text-sm">Timestamp (milissegundos)</span>
                        <span className="font-mono font-medium">{tsResults.ms}</span>
                    </div>
                    <div className="flex justify-between items-baseline py-2">
                        <span className="text-sm">ISO 8601 (UTC)</span>
                        <span className="font-mono font-medium">{tsResults.iso}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TimestampConverter;
