import React, { useState } from 'react';
import Button from '../components/Button';
import { useToast } from '../contexts/ToastContext';
import { ResumeEducation, ResumeExperience, openResumePrintWindow } from '../utils/resumeExport';

const inputClass = 'w-full p-2 rounded-md bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:outline-none transition-colors';
const textareaClass = `${inputClass} min-h-[80px] resize-y`;

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="space-y-4 p-4 border border-light-secondary/20 dark:border-dark-secondary/20 rounded-lg">
        <h3 className="text-lg font-bold text-light-primary dark:text-dark-primary">{title}</h3>
        {children}
    </div>
);

const newExperience = (): ResumeExperience => ({ id: crypto.randomUUID(), cargo: '', empresa: '', periodo: '', descricao: '' });
const newEducation = (): ResumeEducation => ({ id: crypto.randomUUID(), curso: '', instituicao: '', periodo: '' });

const ResumeGenerator: React.FC = () => {
    const { addToast } = useToast();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [objetivo, setObjetivo] = useState('');
    const [habilidades, setHabilidades] = useState('');
    const [adicional, setAdicional] = useState('');
    const [experiencias, setExperiencias] = useState<ResumeExperience[]>([newExperience()]);
    const [formacoes, setFormacoes] = useState<ResumeEducation[]>([newEducation()]);

    const updateExperiencia = (id: string, field: keyof ResumeExperience, value: string) => {
        setExperiencias(prev => prev.map(e => e.id === id ? { ...e, [field]: value } : e));
    };

    const updateFormacao = (id: string, field: keyof ResumeEducation, value: string) => {
        setFormacoes(prev => prev.map(f => f.id === id ? { ...f, [field]: value } : f));
    };

    const canGenerate = nome.trim() !== '' && email.trim() !== '';

    const handleGenerate = () => {
        if (!canGenerate) {
            addToast('Preencha ao menos nome e e-mail.', 'error');
            return;
        }
        const opened = openResumePrintWindow({
            nome, email, telefone, cidade, estado, linkedin, objetivo,
            experiencias, formacoes, habilidades, adicional,
        });
        if (!opened) {
            addToast('Não foi possível abrir a janela de impressão. Verifique o bloqueador de pop-ups.', 'error');
        }
    };

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            <Section title="Dados Pessoais">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome completo *" className={inputClass} />
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail *" className={inputClass} />
                    <input type="text" value={telefone} onChange={e => setTelefone(e.target.value)} placeholder="Telefone/Celular" className={inputClass} />
                    <input type="text" value={linkedin} onChange={e => setLinkedin(e.target.value)} placeholder="LinkedIn/Portfólio (opcional)" className={inputClass} />
                    <input type="text" value={cidade} onChange={e => setCidade(e.target.value)} placeholder="Cidade" className={inputClass} />
                    <input type="text" value={estado} onChange={e => setEstado(e.target.value)} placeholder="Estado (UF)" className={inputClass} />
                </div>
                <textarea value={objetivo} onChange={e => setObjetivo(e.target.value)} placeholder="Resumo/Objetivo profissional" className={textareaClass} />
            </Section>

            <Section title="Experiência Profissional">
                {experiencias.map((exp, i) => (
                    <div key={exp.id} className="space-y-2 pb-4 border-b border-light-secondary/10 dark:border-dark-secondary/10 last:border-0 last:pb-0">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <input type="text" value={exp.cargo} onChange={e => updateExperiencia(exp.id, 'cargo', e.target.value)} placeholder="Cargo" className={inputClass} />
                            <input type="text" value={exp.empresa} onChange={e => updateExperiencia(exp.id, 'empresa', e.target.value)} placeholder="Empresa" className={inputClass} />
                            <input type="text" value={exp.periodo} onChange={e => updateExperiencia(exp.id, 'periodo', e.target.value)} placeholder="Período (ex: 2021 - Atual)" className={inputClass} />
                        </div>
                        <textarea value={exp.descricao} onChange={e => updateExperiencia(exp.id, 'descricao', e.target.value)} placeholder="Descrição das atividades" className={textareaClass} />
                        {experiencias.length > 1 && (
                            <button onClick={() => setExperiencias(prev => prev.filter(e => e.id !== exp.id))} className="text-sm text-red-600 dark:text-red-400 hover:underline">
                                Remover experiência {i + 1}
                            </button>
                        )}
                    </div>
                ))}
                <Button variant="secondary" onClick={() => setExperiencias(prev => [...prev, newExperience()])}>+ Adicionar Experiência</Button>
            </Section>

            <Section title="Formação Acadêmica">
                {formacoes.map((edu, i) => (
                    <div key={edu.id} className="space-y-2 pb-4 border-b border-light-secondary/10 dark:border-dark-secondary/10 last:border-0 last:pb-0">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <input type="text" value={edu.curso} onChange={e => updateFormacao(edu.id, 'curso', e.target.value)} placeholder="Curso" className={inputClass} />
                            <input type="text" value={edu.instituicao} onChange={e => updateFormacao(edu.id, 'instituicao', e.target.value)} placeholder="Instituição" className={inputClass} />
                            <input type="text" value={edu.periodo} onChange={e => updateFormacao(edu.id, 'periodo', e.target.value)} placeholder="Período" className={inputClass} />
                        </div>
                        {formacoes.length > 1 && (
                            <button onClick={() => setFormacoes(prev => prev.filter(f => f.id !== edu.id))} className="text-sm text-red-600 dark:text-red-400 hover:underline">
                                Remover formação {i + 1}
                            </button>
                        )}
                    </div>
                ))}
                <Button variant="secondary" onClick={() => setFormacoes(prev => [...prev, newEducation()])}>+ Adicionar Formação</Button>
            </Section>

            <Section title="Habilidades e Informações Adicionais">
                <input type="text" value={habilidades} onChange={e => setHabilidades(e.target.value)} placeholder="Habilidades, separadas por vírgula (ex: React, Excel, Inglês)" className={inputClass} />
                <textarea value={adicional} onChange={e => setAdicional(e.target.value)} placeholder="Idiomas, cursos, certificações, informações adicionais" className={textareaClass} />
            </Section>

            <div className="flex flex-col items-center gap-2">
                <Button onClick={handleGenerate} disabled={!canGenerate}>Baixar / Imprimir Currículo (PDF)</Button>
                {!canGenerate && (
                    <p className="text-xs text-light-secondary dark:text-dark-secondary">Preencha nome e e-mail para gerar.</p>
                )}
            </div>
        </div>
    );
};

export default ResumeGenerator;
