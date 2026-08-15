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
    { id: 'nm', label: 'Nanômetro (nm)', toBase: 0.000000001 },
    { id: 'mm', label: 'Milímetro (mm)', toBase: 0.001 },
    { id: 'cm', label: 'Centímetro (cm)', toBase: 0.01 },
    { id: 'm', label: 'Metro (m)', toBase: 1 },
    { id: 'km', label: 'Quilômetro (km)', toBase: 1000 },
    { id: 'in', label: 'Polegada (in)', toBase: 0.0254 },
    { id: 'ft', label: 'Pé (ft)', toBase: 0.3048 },
    { id: 'yd', label: 'Jarda (yd)', toBase: 0.9144 },
    { id: 'mi', label: 'Milha (mi)', toBase: 1609.344 },
    { id: 'nmi', label: 'Milha náutica (nmi)', toBase: 1852 },
];

const weightUnits: UnitDef[] = [
    { id: 'mg', label: 'Miligrama (mg)', toBase: 0.000001 },
    { id: 'g', label: 'Grama (g)', toBase: 0.001 },
    { id: 'kg', label: 'Quilograma (kg)', toBase: 1 },
    { id: 'ton', label: 'Tonelada (t)', toBase: 1000 },
    { id: 'lb', label: 'Libra (lb)', toBase: 0.45359237 },
    { id: 'oz', label: 'Onça (oz)', toBase: 0.0283495231 },
    { id: 'ct', label: 'Quilate (ct)', toBase: 0.0002 },
];

const volumeUnits: UnitDef[] = [
    { id: 'ml', label: 'Mililitro (mL)', toBase: 0.001 },
    { id: 'l', label: 'Litro (L)', toBase: 1 },
    { id: 'm3', label: 'Metro cúbico (m³)', toBase: 1000 },
    { id: 'gal', label: 'Galão americano (gal)', toBase: 3.785411784 },
    { id: 'qt', label: 'Quarto (qt)', toBase: 0.946352946 },
    { id: 'cup', label: 'Xícara (cup)', toBase: 0.2365882365 },
    { id: 'floz', label: 'Onça fluida (fl oz)', toBase: 0.0295735295625 },
];

const temperatureUnits: UnitDef[] = [
    { id: 'c', label: 'Celsius (°C)', toBase: 1 },
    { id: 'f', label: 'Fahrenheit (°F)', toBase: 1 },
    { id: 'k', label: 'Kelvin (K)', toBase: 1 },
];

const areaUnits: UnitDef[] = [
    { id: 'mm2', label: 'Milímetro quadrado (mm²)', toBase: 0.000001 },
    { id: 'cm2', label: 'Centímetro quadrado (cm²)', toBase: 0.0001 },
    { id: 'm2', label: 'Metro quadrado (m²)', toBase: 1 },
    { id: 'ha', label: 'Hectare (ha)', toBase: 10000 },
    { id: 'km2', label: 'Quilômetro quadrado (km²)', toBase: 1000000 },
    { id: 'in2', label: 'Polegada quadrada (in²)', toBase: 0.00064516 },
    { id: 'ft2', label: 'Pé quadrado (ft²)', toBase: 0.09290304 },
    { id: 'acre', label: 'Acre', toBase: 4046.8564224 },
];

const speedUnits: UnitDef[] = [
    { id: 'mps', label: 'Metro por segundo (m/s)', toBase: 1 },
    { id: 'kmh', label: 'Quilômetro por hora (km/h)', toBase: 1000 / 3600 },
    { id: 'mph', label: 'Milha por hora (mph)', toBase: 1609.344 / 3600 },
    { id: 'knot', label: 'Nó (kn)', toBase: 1852 / 3600 },
    { id: 'fps', label: 'Pé por segundo (ft/s)', toBase: 0.3048 },
];

const timeUnits: UnitDef[] = [
    { id: 'ms', label: 'Milissegundo (ms)', toBase: 0.001 },
    { id: 's', label: 'Segundo (s)', toBase: 1 },
    { id: 'min', label: 'Minuto (min)', toBase: 60 },
    { id: 'h', label: 'Hora (h)', toBase: 3600 },
    { id: 'day', label: 'Dia', toBase: 86400 },
    { id: 'week', label: 'Semana', toBase: 604800 },
    { id: 'month', label: 'Mês (médio)', toBase: 2629746 },
    { id: 'year', label: 'Ano (médio)', toBase: 31556952 },
];

const digitalStorageUnits: UnitDef[] = [
    { id: 'bit', label: 'Bit', toBase: 0.125 },
    { id: 'byte', label: 'Byte (B)', toBase: 1 },
    { id: 'kb', label: 'Kilobyte decimal (KB = 1000 B)', toBase: 1000 },
    { id: 'kib', label: 'Kibibyte binário (KiB = 1024 B)', toBase: 1024 },
    { id: 'mb', label: 'Megabyte decimal (MB = 1000² B)', toBase: 1000 ** 2 },
    { id: 'mib', label: 'Mebibyte binário (MiB = 1024² B)', toBase: 1024 ** 2 },
    { id: 'gb', label: 'Gigabyte decimal (GB = 1000³ B)', toBase: 1000 ** 3 },
    { id: 'gib', label: 'Gibibyte binário (GiB = 1024³ B)', toBase: 1024 ** 3 },
    { id: 'tb', label: 'Terabyte decimal (TB = 1000⁴ B)', toBase: 1000 ** 4 },
    { id: 'tib', label: 'Tebibyte binário (TiB = 1024⁴ B)', toBase: 1024 ** 4 },
];

const pressureUnits: UnitDef[] = [
    { id: 'pa', label: 'Pascal (Pa)', toBase: 1 },
    { id: 'kpa', label: 'Kilopascal (kPa)', toBase: 1000 },
    { id: 'bar', label: 'Bar', toBase: 100000 },
    { id: 'atm', label: 'Atmosfera (atm)', toBase: 101325 },
    { id: 'psi', label: 'Libra por pol² (psi)', toBase: 6894.757293168 },
    { id: 'mmhg', label: 'Milímetro de mercúrio (mmHg)', toBase: 133.322387415 },
];

const energyUnits: UnitDef[] = [
    { id: 'j', label: 'Joule (J)', toBase: 1 },
    { id: 'kj', label: 'Quilojoule (kJ)', toBase: 1000 },
    { id: 'cal', label: 'Caloria (cal)', toBase: 4.184 },
    { id: 'kcal', label: 'Quilocaloria (kcal)', toBase: 4184 },
    { id: 'wh', label: 'Watt-hora (Wh)', toBase: 3600 },
    { id: 'kwh', label: 'Quilowatt-hora (kWh)', toBase: 3600000 },
];

export const unitCategories: UnitCategory[] = [
    { id: 'length', label: 'Comprimento', type: 'linear', units: lengthUnits },
    { id: 'weight', label: 'Peso/Massa', type: 'linear', units: weightUnits },
    { id: 'volume', label: 'Volume', type: 'linear', units: volumeUnits },
    { id: 'temperature', label: 'Temperatura', type: 'temperature', units: temperatureUnits },
    { id: 'area', label: 'Área', type: 'linear', units: areaUnits },
    { id: 'speed', label: 'Velocidade', type: 'linear', units: speedUnits },
    { id: 'time', label: 'Tempo', type: 'linear', units: timeUnits },
    { id: 'digital', label: 'Dados Digitais', type: 'linear', units: digitalStorageUnits },
    { id: 'pressure', label: 'Pressão', type: 'linear', units: pressureUnits },
    { id: 'energy', label: 'Energia', type: 'linear', units: energyUnits },
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

// Abaixo do zero absoluto (0 K = -273.15 °C = -459.67 °F) é fisicamente impossível.
export const isBelowAbsoluteZero = (value: number, unitId: string): boolean => toCelsius(value, unitId) < -273.15;
