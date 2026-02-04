
import React, { useState, useMemo } from 'react';

const WordCounter: React.FC = () => {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const trimmedText = text.trim();
    const words = trimmedText ? trimmedText.split(/\s+/) : [];
    const characters = text.length;
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    const paragraphs = trimmedText.split(/\n+/).filter(p => p.length > 0);

    return {
      words: words.length,
      characters,
      sentences: sentences.length,
      paragraphs: paragraphs.length
    };
  }, [text]);

  const StatCard = ({ label, value }: { label: string; value: number }) => (
    <div className="p-4 bg-light-bg dark:bg-dark-bg rounded-lg text-center">
      <p className="text-2xl font-bold text-light-primary dark:text-dark-primary">{value}</p>
      <p className="text-sm text-light-secondary dark:text-dark-secondary">{label}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Comece a digitar ou cole seu texto aqui..."
        className="w-full h-64 p-4 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-secondary/20 dark:border-dark-secondary/20 focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:outline-none transition-colors"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Palavras" value={stats.words} />
        <StatCard label="Caracteres" value={stats.characters} />
        <StatCard label="Sentenças" value={stats.sentences} />
        <StatCard label="Parágrafos" value={stats.paragraphs} />
      </div>
    </div>
  );
};

export default WordCounter;
