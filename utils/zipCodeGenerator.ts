export type CountryCode = 'BR' | 'US' | 'GB' | 'PT';

export interface GeneratedPostalCode {
    code: string;
    countryCode: CountryCode;
    countryLabel: string;
    city: string;
    region: string;
    extra?: string;
    source: 'live' | 'curated';
    sourceLabel: string;
}

export interface BrazilState {
    uf: string;
    name: string;
    capital: string;
}

// Capitais dos 27 estados/DF — usadas como cidade de busca no ViaCEP.
export const BRAZIL_STATES: BrazilState[] = [
    { uf: 'AC', name: 'Acre', capital: 'Rio Branco' },
    { uf: 'AL', name: 'Alagoas', capital: 'Maceió' },
    { uf: 'AP', name: 'Amapá', capital: 'Macapá' },
    { uf: 'AM', name: 'Amazonas', capital: 'Manaus' },
    { uf: 'BA', name: 'Bahia', capital: 'Salvador' },
    { uf: 'CE', name: 'Ceará', capital: 'Fortaleza' },
    { uf: 'DF', name: 'Distrito Federal', capital: 'Brasília' },
    { uf: 'ES', name: 'Espírito Santo', capital: 'Vitória' },
    { uf: 'GO', name: 'Goiás', capital: 'Goiânia' },
    { uf: 'MA', name: 'Maranhão', capital: 'São Luís' },
    { uf: 'MT', name: 'Mato Grosso', capital: 'Cuiabá' },
    { uf: 'MS', name: 'Mato Grosso do Sul', capital: 'Campo Grande' },
    { uf: 'MG', name: 'Minas Gerais', capital: 'Belo Horizonte' },
    { uf: 'PA', name: 'Pará', capital: 'Belém' },
    { uf: 'PB', name: 'Paraíba', capital: 'João Pessoa' },
    { uf: 'PR', name: 'Paraná', capital: 'Curitiba' },
    { uf: 'PE', name: 'Pernambuco', capital: 'Recife' },
    { uf: 'PI', name: 'Piauí', capital: 'Teresina' },
    { uf: 'RJ', name: 'Rio de Janeiro', capital: 'Rio de Janeiro' },
    { uf: 'RN', name: 'Rio Grande do Norte', capital: 'Natal' },
    { uf: 'RS', name: 'Rio Grande do Sul', capital: 'Porto Alegre' },
    { uf: 'RO', name: 'Rondônia', capital: 'Porto Velho' },
    { uf: 'RR', name: 'Roraima', capital: 'Boa Vista' },
    { uf: 'SC', name: 'Santa Catarina', capital: 'Florianópolis' },
    { uf: 'SP', name: 'São Paulo', capital: 'São Paulo' },
    { uf: 'SE', name: 'Sergipe', capital: 'Aracaju' },
    { uf: 'TO', name: 'Tocantins', capital: 'Palmas' },
];

const STREET_FRAGMENTS = ['Rua', 'Avenida', 'Travessa', 'Alameda', 'Praça', 'Estrada'];

const shuffle = <T,>(arr: T[]): T[] => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
};

const randomFrom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

interface ViaCepAddressResult {
    cep: string;
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
}

// Busca um CEP real via ViaCEP (base dos Correios), tentando estado + cidade + prefixos comuns
// de logradouro até encontrar resultados. Não há endpoint de "CEP aleatório" no ViaCEP, então
// simulamos isso buscando por prefixos de rua muito comuns (Rua, Avenida...) em uma cidade real.
export const generateBrazilCep = async (uf?: string): Promise<GeneratedPostalCode> => {
    const candidateStates = uf ? BRAZIL_STATES.filter(s => s.uf === uf) : shuffle(BRAZIL_STATES);
    const statesToTry = candidateStates.length > 0 ? candidateStates : shuffle(BRAZIL_STATES);

    for (const state of statesToTry.slice(0, uf ? 1 : 3)) {
        for (const fragment of shuffle(STREET_FRAGMENTS)) {
            const url = `https://viacep.com.br/ws/${state.uf}/${encodeURIComponent(state.capital)}/${encodeURIComponent(fragment)}/json/`;
            try {
                const response = await fetch(url);
                if (!response.ok) continue;
                const data = await response.json();
                if (!Array.isArray(data) || data.length === 0) continue;

                const pick = randomFrom(data) as ViaCepAddressResult;
                return {
                    code: pick.cep,
                    countryCode: 'BR',
                    countryLabel: 'Brasil',
                    city: pick.localidade,
                    region: pick.uf,
                    extra: [pick.logradouro, pick.bairro].filter(Boolean).join(' - '),
                    source: 'live',
                    sourceLabel: 'Consultado ao vivo via ViaCEP (base dos Correios)',
                };
            } catch {
                // tenta o próximo prefixo/estado
            }
        }
    }

    throw new Error('Não foi possível gerar um CEP real agora. Tente novamente.');
};

interface UkPostcodeResult {
    status: number;
    result: {
        postcode: string;
        admin_district: string | null;
        region: string | null;
        country: string;
    };
}

// Busca um postcode real do Reino Unido via postcodes.io (dados oficiais do Ordnance Survey).
export const generateUkPostcode = async (): Promise<GeneratedPostalCode> => {
    const response = await fetch('https://api.postcodes.io/random/postcodes');
    if (!response.ok) {
        throw new Error('Não foi possível gerar um postcode real agora. Tente novamente.');
    }
    const data: UkPostcodeResult = await response.json();
    const { result } = data;
    return {
        code: result.postcode,
        countryCode: 'GB',
        countryLabel: 'Reino Unido',
        city: result.admin_district ?? result.region ?? result.country,
        region: result.region ?? result.country,
        source: 'live',
        sourceLabel: 'Consultado ao vivo via postcodes.io (Ordnance Survey)',
    };
};

interface CuratedEntry {
    code: string;
    city: string;
    region: string;
}

// EUA e Portugal não têm uma API pública gratuita de "código postal aleatório" com CORS
// confiável, então usamos uma lista curada de CEPs/ZIPs reais de grandes cidades.
const US_ZIP_CODES: CuratedEntry[] = [
    { code: '10001', city: 'New York', region: 'NY' },
    { code: '90001', city: 'Los Angeles', region: 'CA' },
    { code: '60601', city: 'Chicago', region: 'IL' },
    { code: '77002', city: 'Houston', region: 'TX' },
    { code: '33101', city: 'Miami', region: 'FL' },
    { code: '94102', city: 'San Francisco', region: 'CA' },
    { code: '02108', city: 'Boston', region: 'MA' },
    { code: '20001', city: 'Washington', region: 'DC' },
    { code: '98101', city: 'Seattle', region: 'WA' },
    { code: '80202', city: 'Denver', region: 'CO' },
    { code: '30303', city: 'Atlanta', region: 'GA' },
    { code: '75201', city: 'Dallas', region: 'TX' },
    { code: '85001', city: 'Phoenix', region: 'AZ' },
    { code: '19103', city: 'Philadelphia', region: 'PA' },
    { code: '89101', city: 'Las Vegas', region: 'NV' },
    { code: '97201', city: 'Portland', region: 'OR' },
    { code: '48201', city: 'Detroit', region: 'MI' },
    { code: '55401', city: 'Minneapolis', region: 'MN' },
    { code: '70112', city: 'New Orleans', region: 'LA' },
    { code: '78701', city: 'Austin', region: 'TX' },
];

const PT_POSTAL_CODES: CuratedEntry[] = [
    { code: '1000-001', city: 'Lisboa', region: 'Lisboa' },
    { code: '4000-001', city: 'Porto', region: 'Porto' },
    { code: '3000-001', city: 'Coimbra', region: 'Coimbra' },
    { code: '4700-001', city: 'Braga', region: 'Braga' },
    { code: '8000-001', city: 'Faro', region: 'Faro' },
    { code: '3800-001', city: 'Aveiro', region: 'Aveiro' },
    { code: '2900-001', city: 'Setúbal', region: 'Setúbal' },
    { code: '7000-001', city: 'Évora', region: 'Évora' },
    { code: '3500-001', city: 'Viseu', region: 'Viseu' },
    { code: '2400-001', city: 'Leiria', region: 'Leiria' },
    { code: '4800-001', city: 'Guimarães', region: 'Braga' },
    { code: '9000-001', city: 'Funchal', region: 'Madeira' },
    { code: '9500-001', city: 'Ponta Delgada', region: 'Açores' },
    { code: '2750-001', city: 'Cascais', region: 'Lisboa' },
    { code: '2710-001', city: 'Sintra', region: 'Lisboa' },
];

const generateFromCuratedList = (list: CuratedEntry[], countryCode: CountryCode, countryLabel: string): GeneratedPostalCode => {
    const pick = randomFrom(list);
    return {
        code: pick.code,
        countryCode,
        countryLabel,
        city: pick.city,
        region: pick.region,
        source: 'curated',
        sourceLabel: 'Lista curada de códigos postais reais de grandes cidades',
    };
};

export const generateUsZip = (): GeneratedPostalCode => generateFromCuratedList(US_ZIP_CODES, 'US', 'Estados Unidos');

export const generatePortugalPostalCode = (): GeneratedPostalCode => generateFromCuratedList(PT_POSTAL_CODES, 'PT', 'Portugal');
