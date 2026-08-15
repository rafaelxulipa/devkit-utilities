export interface RegexPatternDef {
    id: string;
    label: string;
    description: string;
    pattern: string;
    flags: string;
    example: string;
}

export const regexPatterns: RegexPatternDef[] = [
    {
        id: 'email',
        label: 'E-mail',
        description: 'Endereço de e-mail básico (usuário@domínio.tld, incluindo domínios com mais de um ponto).',
        pattern: '^[\\w.+-]+@[\\w-]+(\\.[\\w-]+)*\\.[a-zA-Z]{2,}$',
        flags: '',
        example: 'usuario@exemplo.com.br',
    },
    {
        id: 'url',
        label: 'URL',
        description: 'Endereço web começando com http:// ou https://.',
        pattern: '^https?:\\/\\/[\\w.-]+\\.[a-zA-Z]{2,}(\\/\\S*)?$',
        flags: '',
        example: 'https://www.exemplo.com.br/pagina',
    },
    {
        id: 'cpf',
        label: 'CPF',
        description: 'CPF com ou sem pontuação (não valida os dígitos verificadores, só o formato).',
        pattern: '^\\d{3}\\.?\\d{3}\\.?\\d{3}-?\\d{2}$',
        flags: '',
        example: '123.456.789-09',
    },
    {
        id: 'cnpj',
        label: 'CNPJ',
        description: 'CNPJ numérico com ou sem pontuação (formato antigo, só dígitos).',
        pattern: '^\\d{2}\\.?\\d{3}\\.?\\d{3}\\/?\\d{4}-?\\d{2}$',
        flags: '',
        example: '12.345.678/0001-95',
    },
    {
        id: 'telefone',
        label: 'Telefone (BR)',
        description: 'Telefone fixo ou celular brasileiro, com DDD, com ou sem parênteses/hífen.',
        pattern: '^\\(?\\d{2}\\)?\\s?9?\\d{4}-?\\d{4}$',
        flags: '',
        example: '(11) 91234-5678',
    },
    {
        id: 'cep',
        label: 'CEP',
        description: 'CEP brasileiro, com ou sem hífen.',
        pattern: '^\\d{5}-?\\d{3}$',
        flags: '',
        example: '01001-000',
    },
    {
        id: 'data-iso',
        label: 'Data ISO (AAAA-MM-DD)',
        description: 'Data no formato ISO 8601, com validação básica de mês e dia.',
        pattern: '^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$',
        flags: '',
        example: '2024-02-29',
    },
    {
        id: 'data-br',
        label: 'Data (DD/MM/AAAA)',
        description: 'Data no formato brasileiro, com validação básica de mês e dia.',
        pattern: '^(0[1-9]|[12]\\d|3[01])\\/(0[1-9]|1[0-2])\\/\\d{4}$',
        flags: '',
        example: '29/02/2024',
    },
    {
        id: 'hora',
        label: 'Hora (HH:MM[:SS])',
        description: 'Horário em formato 24h, com segundos opcionais.',
        pattern: '^([01]\\d|2[0-3]):([0-5]\\d)(:([0-5]\\d))?$',
        flags: '',
        example: '23:59:59',
    },
    {
        id: 'ipv4',
        label: 'Endereço IPv4',
        description: 'Endereço IP versão 4, validando cada octeto (0-255).',
        pattern: '^(25[0-5]|2[0-4]\\d|1?\\d?\\d)(\\.(25[0-5]|2[0-4]\\d|1?\\d?\\d)){3}$',
        flags: '',
        example: '192.168.0.1',
    },
    {
        id: 'hex-color',
        label: 'Cor Hexadecimal',
        description: 'Cor em hexadecimal, formato curto (#fff) ou longo (#ffffff).',
        pattern: '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$',
        flags: '',
        example: '#1a2b3c',
    },
    {
        id: 'senha-forte',
        label: 'Senha Forte',
        description: 'Mínimo 8 caracteres, com maiúscula, minúscula, número e símbolo.',
        pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\w\\s]).{8,}$',
        flags: '',
        example: 'Senha@123',
    },
    {
        id: 'somente-numeros',
        label: 'Somente Números',
        description: 'A string inteira deve conter apenas dígitos.',
        pattern: '^\\d+$',
        flags: '',
        example: '123456',
    },
    {
        id: 'somente-letras',
        label: 'Somente Letras',
        description: 'A string inteira deve conter apenas letras (incluindo acentuadas).',
        pattern: '^[A-Za-zÀ-ÖØ-öø-ÿ]+$',
        flags: '',
        example: 'ExemploComAcentuação',
    },
    {
        id: 'slug',
        label: 'Slug (URL amigável)',
        description: 'Letras minúsculas, números e hífens, sem espaços ou hífens duplicados.',
        pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
        flags: '',
        example: 'meu-post-legal-2024',
    },
    {
        id: 'usuario',
        label: 'Nome de Usuário',
        description: 'Letras, números e underscore, entre 3 e 20 caracteres.',
        pattern: '^[A-Za-z0-9_]{3,20}$',
        flags: '',
        example: 'usuario_123',
    },
];
