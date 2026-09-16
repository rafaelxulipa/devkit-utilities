export interface ResumeExperience {
    id: string;
    cargo: string;
    empresa: string;
    periodo: string;
    descricao: string;
}

export interface ResumeEducation {
    id: string;
    curso: string;
    instituicao: string;
    periodo: string;
}

export interface ResumeData {
    nome: string;
    email: string;
    telefone: string;
    cidade: string;
    estado: string;
    linkedin: string;
    objetivo: string;
    experiencias: ResumeExperience[];
    formacoes: ResumeEducation[];
    habilidades: string;
    adicional: string;
}

const escapeHtml = (value: string): string =>
    value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

const nl2br = (value: string): string => escapeHtml(value).replace(/\n/g, '<br>');

const buildContactLine = (data: ResumeData): string => {
    const parts = [
        data.email,
        data.telefone,
        [data.cidade, data.estado].filter(Boolean).join('/'),
        data.linkedin,
    ].filter(Boolean);
    return parts.map(escapeHtml).join(' &nbsp;·&nbsp; ');
};

const buildExperienceSection = (experiencias: ResumeExperience[]): string => {
    const items = experiencias.filter(e => e.cargo || e.empresa);
    if (items.length === 0) return '';
    const rows = items.map(e => `
        <div class="entry">
            <div class="entry-header">
                <span class="entry-title">${escapeHtml(e.cargo)}${e.empresa ? ` — ${escapeHtml(e.empresa)}` : ''}</span>
                <span class="entry-period">${escapeHtml(e.periodo)}</span>
            </div>
            ${e.descricao ? `<p class="entry-desc">${nl2br(e.descricao)}</p>` : ''}
        </div>
    `).join('');
    return `<section><h2>Experiência Profissional</h2>${rows}</section>`;
};

const buildEducationSection = (formacoes: ResumeEducation[]): string => {
    const items = formacoes.filter(f => f.curso || f.instituicao);
    if (items.length === 0) return '';
    const rows = items.map(f => `
        <div class="entry">
            <div class="entry-header">
                <span class="entry-title">${escapeHtml(f.curso)}${f.instituicao ? ` — ${escapeHtml(f.instituicao)}` : ''}</span>
                <span class="entry-period">${escapeHtml(f.periodo)}</span>
            </div>
        </div>
    `).join('');
    return `<section><h2>Formação Acadêmica</h2>${rows}</section>`;
};

export const buildResumeHtml = (data: ResumeData): string => {
    const skillChips = data.habilidades
        .split(',')
        .map(s => s.trim())
        .filter(Boolean)
        .map(s => `<span class="chip">${escapeHtml(s)}</span>`)
        .join('');

    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Currículo - ${escapeHtml(data.nome || 'Sem nome')}</title>
<style>
    * { box-sizing: border-box; }
    body { font-family: Arial, Helvetica, sans-serif; color: #1a1a1a; max-width: 800px; margin: 40px auto; padding: 0 24px; }
    h1 { font-size: 28px; margin: 0 0 4px; }
    .contact { color: #444; font-size: 14px; margin-bottom: 24px; }
    h2 { font-size: 16px; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 2px solid #1a1a1a; padding-bottom: 4px; margin: 24px 0 12px; }
    p.objetivo { font-size: 14px; line-height: 1.5; }
    .entry { margin-bottom: 14px; }
    .entry-header { display: flex; justify-content: space-between; font-size: 14px; font-weight: bold; gap: 12px; }
    .entry-period { font-weight: normal; color: #555; white-space: nowrap; }
    .entry-desc { font-size: 13px; color: #333; margin: 4px 0 0; line-height: 1.4; }
    .chip { display: inline-block; background: #eee; border-radius: 4px; padding: 3px 10px; margin: 0 6px 6px 0; font-size: 13px; }
    .adicional { font-size: 13px; line-height: 1.5; white-space: pre-wrap; }
    @media print { body { margin: 0; } }
</style>
</head>
<body>
    <h1>${escapeHtml(data.nome || 'Seu Nome')}</h1>
    <div class="contact">${buildContactLine(data)}</div>
    ${data.objetivo ? `<p class="objetivo">${nl2br(data.objetivo)}</p>` : ''}
    ${buildExperienceSection(data.experiencias)}
    ${buildEducationSection(data.formacoes)}
    ${skillChips ? `<section><h2>Habilidades</h2><div>${skillChips}</div></section>` : ''}
    ${data.adicional ? `<section><h2>Informações Adicionais</h2><p class="adicional">${nl2br(data.adicional)}</p></section>` : ''}
</body>
</html>`;
};

export const openResumePrintWindow = (data: ResumeData): boolean => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return false;

    printWindow.document.write(buildResumeHtml(data));
    printWindow.document.close();
    printWindow.focus();
    printWindow.onload = () => printWindow.print();
    return true;
};
