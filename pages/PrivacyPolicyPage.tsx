
import React from 'react';
import { Link } from 'react-router-dom';
import { useAdConsent } from '../contexts/AdConsentContext';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-8">
    <h2 className="text-xl font-bold text-light-text dark:text-dark-text mb-3 pb-2 border-b border-light-secondary/20 dark:border-dark-secondary/20">
      {title}
    </h2>
    <div className="text-sm text-light-secondary dark:text-dark-text/80 space-y-3 leading-relaxed">
      {children}
    </div>
  </section>
);

const PrivacyPolicyPage: React.FC = () => {
  const { hasConsent, grantConsent } = useAdConsent();
  const updatedDate = '30 de maio de 2025';

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-light-primary dark:text-dark-primary hover:opacity-80 transition-opacity mb-4"
        >
          ← Voltar para o início
        </Link>
        <h1 className="text-3xl font-bold text-light-text dark:text-dark-text">
          Política de Privacidade
        </h1>
        <p className="text-sm text-light-secondary dark:text-dark-text/60 mt-2">
          Última atualização: {updatedDate}
        </p>
      </div>

      <Section title="1. Sobre o DevKit Utilidades">
        <p>
          O <strong className="text-light-text dark:text-dark-text">DevKit Utilidades</strong> é um
          conjunto de ferramentas web gratuitas voltadas para desenvolvedores e profissionais,
          oferecendo geradores, validadores e conversores de forma prática e acessível.
        </p>
        <p>
          Este projeto é mantido de forma independente. Para cobrir os custos de hospedagem e
          garantir a continuidade do serviço, utilizamos anúncios veiculados pelo Google AdSense.
          <strong className="text-light-text dark:text-dark-text"> Os anúncios são nossa única
          fonte de receita</strong> e são essenciais para manter o site funcionando gratuitamente.
        </p>
      </Section>

      <Section title="2. Dados Coletados e Finalidades">
        <p>
          O DevKit Utilidades <strong className="text-light-text dark:text-dark-text">não coleta,
          armazena nem compartilha dados pessoais</strong> dos usuários em nossos servidores.
          Todas as ferramentas funcionam localmente no seu navegador.
        </p>
        <p>
          As informações que permanecem apenas no seu dispositivo:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Preferência de tema (claro/escuro)</li>
          <li>Ferramentas favoritas</li>
          <li>Consentimento para exibição de anúncios</li>
        </ul>
        <p>
          Esses dados são armazenados no <code className="bg-light-bg dark:bg-dark-bg px-1 rounded text-xs">localStorage</code> do
          seu navegador e podem ser apagados a qualquer momento limpando os dados de navegação.
        </p>
      </Section>

      <Section title="3. Google AdSense e Cookies de Terceiros">
        <p>
          Com o seu consentimento, utilizamos o{' '}
          <strong className="text-light-text dark:text-dark-text">Google AdSense</strong> para
          exibir anúncios. O Google AdSense pode utilizar cookies e tecnologias similares para:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Exibir anúncios relevantes com base no seu perfil de navegação</li>
          <li>Medir a eficácia dos anúncios</li>
          <li>Prevenir fraudes publicitárias</li>
        </ul>
        <p>
          O Google é responsável pelo processamento dos dados relacionados aos anúncios. Para
          mais informações sobre como o Google utiliza esses dados, consulte a{' '}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-light-primary dark:text-dark-primary hover:opacity-80"
          >
            Política de Privacidade do Google
          </a>
          {' '}e a{' '}
          <a
            href="https://policies.google.com/technologies/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-light-primary dark:text-dark-primary hover:opacity-80"
          >
            Política de anúncios do Google
          </a>
          .
        </p>
        <p>
          O script do Google AdSense é carregado{' '}
          <strong className="text-light-text dark:text-dark-text">somente após o seu
          consentimento explícito</strong>. Antes disso, nenhum cookie publicitário é criado.
        </p>
      </Section>

      <Section title="4. Gerenciar seu Consentimento">
        <p>
          Você tem total controle sobre o consentimento para exibição de anúncios:
        </p>
        {hasConsent ? (
          <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
            <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
            <div>
              <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                Você aceitou os anúncios
              </p>
              <p className="text-xs text-green-600/80 dark:text-green-500/80 mt-0.5">
                Os anúncios estão ativos. Obrigado por apoiar o projeto!
              </p>
            </div>
          </div>
        ) : (
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
            <p className="text-sm font-semibold text-yellow-700 dark:text-yellow-400 mb-2">
              Anúncios não autorizados
            </p>
            <p className="text-xs text-yellow-600/80 dark:text-yellow-500/80 mb-3">
              Os anúncios estão desativados. Aceite para nos ajudar a manter o projeto.
            </p>
            <button
              onClick={grantConsent}
              className="px-4 py-2 bg-light-primary dark:bg-dark-primary text-white text-xs font-bold rounded-lg hover:opacity-90 transition-opacity"
            >
              ✓ Aceitar anúncios agora
            </button>
          </div>
        )}
        <p className="mt-3">
          Para revogar o consentimento, limpe os dados do site nas configurações do seu
          navegador (Configurações → Privacidade → Limpar dados de navegação → Dados de sites).
        </p>
      </Section>

      <Section title="5. Seus Direitos (LGPD)">
        <p>
          Em conformidade com a{' '}
          <strong className="text-light-text dark:text-dark-text">
            Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD)
          </strong>
          , você tem os seguintes direitos:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Confirmar a existência de tratamento de dados</li>
          <li>Acessar seus dados</li>
          <li>Solicitar a correção de dados incompletos ou desatualizados</li>
          <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários</li>
          <li>Revogar o consentimento a qualquer momento</li>
        </ul>
        <p>
          Como não coletamos dados pessoais diretamente, a maioria dos direitos se aplica ao
          tratamento realizado pelo Google, conforme a política deles.
        </p>
      </Section>

      <Section title="6. Segurança">
        <p>
          Como todas as ferramentas funcionam localmente no navegador e não transmitimos dados
          para servidores próprios, não há risco de vazamento de informações de uso. As
          ferramentas de geração de dados (CPF, CNPJ, etc.) criam apenas dados fictícios para
          fins de teste — nenhum dado real é processado ou armazenado.
        </p>
      </Section>

      <Section title="7. Links Externos">
        <p>
          Esta política se aplica exclusivamente ao DevKit Utilidades. Links para sites
          externos (como a documentação do Google) possuem suas próprias políticas de
          privacidade, pelas quais não nos responsabilizamos.
        </p>
      </Section>

      <Section title="8. Alterações nesta Política">
        <p>
          Podemos atualizar esta Política de Privacidade periodicamente. Alterações
          significativas serão comunicadas por meio do site. Recomendamos revisá-la
          ocasionalmente.
        </p>
      </Section>

      <Section title="9. Contato">
        <p>
          Em caso de dúvidas sobre esta política, entre em contato pelo e-mail:{' '}
          <a
            href="mailto:rafael2104@gmail.com"
            className="underline text-light-primary dark:text-dark-primary hover:opacity-80"
          >
            rafael2104@gmail.com
          </a>
        </p>
      </Section>

      <div className="mt-8 pt-6 border-t border-light-secondary/20 dark:border-dark-secondary/20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-light-primary dark:text-dark-primary hover:opacity-80 transition-opacity"
        >
          ← Voltar para as ferramentas
        </Link>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
