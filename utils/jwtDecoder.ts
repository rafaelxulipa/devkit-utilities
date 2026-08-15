export interface DecodedJwt {
    header: Record<string, unknown>;
    payload: Record<string, unknown>;
    signature: string;
}

const base64UrlDecode = (input: string): string => {
    let base64 = input.replace(/-/g, '+').replace(/_/g, '/');
    const padding = base64.length % 4;
    if (padding) base64 += '='.repeat(4 - padding);

    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder().decode(bytes);
};

// Apenas decodifica — NÃO valida a assinatura do token.
export const decodeJwt = (token: string): DecodedJwt => {
    const parts = token.trim().split('.');
    if (parts.length !== 3) {
        throw new Error('Token JWT inválido: deve ter 3 partes separadas por ponto (header.payload.signature).');
    }

    let header: Record<string, unknown>;
    let payload: Record<string, unknown>;
    try {
        header = JSON.parse(base64UrlDecode(parts[0]));
        payload = JSON.parse(base64UrlDecode(parts[1]));
    } catch {
        throw new Error('Não foi possível decodificar o token: header ou payload inválidos.');
    }

    return { header, payload, signature: parts[2] };
};

// Claims de data comuns em segundos desde a epoch Unix (exp, iat, nbf).
export const knownTimestampClaims = ['exp', 'iat', 'nbf'];

export const formatClaimTimestamp = (value: unknown): string | null => {
    if (typeof value !== 'number') return null;
    return new Date(value * 1000).toLocaleString('pt-BR');
};
