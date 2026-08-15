
import React, { useState, useMemo } from 'react';
import { unitCategories, convert } from '../utils/unitConverter';

const selectClass = 'w-full p-2 rounded-md bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:outline-none transition-colors';
const inputClass = selectClass;
const labelClass = 'block text-sm font-medium text-light-secondary dark:text-dark-secondary mb-1';

const SwapIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4M16 17H4m0 0l4 4m-4-4l4-4" />
    </svg>
);

const UnitConverter: React.FC = () => {
    const [categoryId, setCategoryId] = useState(unitCategories[0].id);
    const category = unitCategories.find(c => c.id === categoryId)!;

    const [fromUnit, setFromUnit] = useState(category.units[0].id);
    const [toUnit, setToUnit] = useState(category.units[1].id);
    const [value, setValue] = useState('1');

    const handleCategoryChange = (newCategoryId: string) => {
        const newCategory = unitCategories.find(c => c.id === newCategoryId)!;
        setCategoryId(newCategoryId);
        setFromUnit(newCategory.units[0].id);
        setToUnit(newCategory.units[1].id);
    };

    const handleSwap = () => {
        setFromUnit(toUnit);
        setToUnit(fromUnit);
    };

    const result = useMemo(() => {
        const numericValue = Number(value);
        if (value.trim() === '' || Number.isNaN(numericValue)) return null;
        return convert(numericValue, fromUnit, toUnit, category);
    }, [value, fromUnit, toUnit, category]);

    return (
        <div className="space-y-6 max-w-lg mx-auto">
            <div>
                <label className={labelClass} htmlFor="category-select">Categoria</label>
                <select id="category-select" value={categoryId} onChange={e => handleCategoryChange(e.target.value)} className={selectClass}>
                    {unitCategories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-end">
                <div>
                    <label className={labelClass} htmlFor="from-unit">De</label>
                    <select id="from-unit" value={fromUnit} onChange={e => setFromUnit(e.target.value)} className={selectClass}>
                        {category.units.map(u => <option key={u.id} value={u.id}>{u.label}</option>)}
                    </select>
                </div>
                <button
                    onClick={handleSwap}
                    className="justify-self-center p-2 rounded-md text-light-secondary dark:text-dark-secondary hover:text-light-primary dark:hover:text-dark-primary"
                    aria-label="Trocar unidades"
                >
                    <SwapIcon />
                </button>
                <div>
                    <label className={labelClass} htmlFor="to-unit">Para</label>
                    <select id="to-unit" value={toUnit} onChange={e => setToUnit(e.target.value)} className={selectClass}>
                        {category.units.map(u => <option key={u.id} value={u.id}>{u.label}</option>)}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className={labelClass} htmlFor="value-input">Valor</label>
                    <input id="value-input" type="text" inputMode="decimal" value={value}
                        onChange={e => setValue(e.target.value)} className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Resultado</label>
                    <div className="p-2 rounded-md bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 font-mono text-lg text-light-primary dark:text-dark-primary">
                        {result === null ? '—' : Number(result.toFixed(6)).toString()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UnitConverter;
