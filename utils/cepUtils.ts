export interface CepResult {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ddd: string;
}

export const cleanCep = (cep: string): string => cep.replace(/\D/g, '');

export const fetchCep = async (cep: string): Promise<CepResult> => {
    const clean = cleanCep(cep);
    if (clean.length !== 8) {
        throw new Error('CEP deve ter 8 dígitos.');
    }

    const response = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
    if (!response.ok) {
        throw new Error('Não foi possível consultar o CEP.');
    }

    const data = await response.json();
    if (data.erro) {
        throw new Error('CEP não encontrado.');
    }

    return data as CepResult;
};
