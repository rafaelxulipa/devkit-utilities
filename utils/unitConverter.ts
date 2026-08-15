export interface UnitDef {
    id: string;
    label: string;
    toBase: number; // fator de multiplicação para chegar na unidade-base da categoria
}

export type UnitCategoryType = 'linear' | 'temperature';

export interface UnitCategory {
    id: string;
    label: string;
    type: UnitCategoryType;
    units: UnitDef[];
}

const lengthUnits: UnitDef[] = [
    { id: 'mm', label: 'Milímetro (mm)', toBase: 0.001 },
    { id: 'cm', label: 'Centímetro (cm)', toBase: 0.01 },
    { id: 'm', label: 'Metro (m)', toBase: 1 },
    { id: 'km', label: 'Quilômetro (km)', toBase: 1000 },
    { id: 'in', label: 'Polegada (in)', toBase: 0.0254 },
    { id: 'ft', label: 'Pé (ft)', toBase: 0.3048 },
    { id: 'yd', label: 'Jarda (yd)', toBase: 0.9144 },
    { id: 'mi', label: 'Milha (mi)', toBase: 1609.344 },
];

const weightUnits: UnitDef[] = [
    { id: 'mg', label: 'Miligrama (mg)', toBase: 0.000001 },
    { id: 'g', label: 'Grama (g)', toBase: 0.001 },
    { id: 'kg', label: 'Quilograma (kg)', toBase: 1 },
    { id: 'ton', label: 'Tonelada (t)', toBase: 1000 },
    { id: 'lb', label: 'Libra (lb)', toBase: 0.45359237 },
    { id: 'oz', label: 'Onça (oz)', toBase: 0.0283495231 },
];

const volumeUnits: UnitDef[] = [
    { id: 'ml', label: 'Mililitro (mL)', toBase: 0.001 },
    { id: 'l', label: 'Litro (L)', toBase: 1 },
    { id: 'm3', label: 'Metro cúbico (m³)', toBase: 1000 },
    { id: 'gal', label: 'Galão americano (gal)', toBase: 3.785411784 },
    { id: 'qt', label: 'Quarto (qt)', toBase: 0.946352946 },
    { id: 'cup', label: 'Xícara (cup)', toBase: 0.2365882365 },
];

const temperatureUnits: UnitDef[] = [
    { id: 'c', label: 'Celsius (°C)', toBase: 1 },
    { id: 'f', label: 'Fahrenheit (°F)', toBase: 1 },
    { id: 'k', label: 'Kelvin (K)', toBase: 1 },
];

export const unitCategories: UnitCategory[] = [
    { id: 'length', label: 'Comprimento', type: 'linear', units: lengthUnits },
    { id: 'weight', label: 'Peso/Massa', type: 'linear', units: weightUnits },
    { id: 'volume', label: 'Volume', type: 'linear', units: volumeUnits },
    { id: 'temperature', label: 'Temperatura', type: 'temperature', units: temperatureUnits },
];

const toCelsius = (value: number, unit: string): number => {
    if (unit === 'f') return (value - 32) * (5 / 9);
    if (unit === 'k') return value - 273.15;
    return value;
};

const fromCelsius = (celsius: number, unit: string): number => {
    if (unit === 'f') return celsius * (9 / 5) + 32;
    if (unit === 'k') return celsius + 273.15;
    return celsius;
};

export const convert = (value: number, fromUnitId: string, toUnitId: string, category: UnitCategory): number => {
    if (category.type === 'temperature') {
        return fromCelsius(toCelsius(value, fromUnitId), toUnitId);
    }
    const fromDef = category.units.find(u => u.id === fromUnitId);
    const toDef = category.units.find(u => u.id === toUnitId);
    if (!fromDef || !toDef) return NaN;
    return (value * fromDef.toBase) / toDef.toBase;
};
