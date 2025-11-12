import { useTypewriter } from '@/hooks/useTypewriter';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();
  const { displayedText: greeting } = useTypewriter(t('greeting'), 80);
  const { displayedText: name, isComplete: nameComplete } = useTypewriter(' Yunus Emre Duman', 80, 800);
  const { displayedText: title } = useTypewriter(t('title'), 50, 2000);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-foreground">{greeting}</span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {name}
            </span>
            {nameComplete && <span className="animate-pulse">|</span>}
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 min-h-[2rem]">
            {title}
            {title && <span className="animate-pulse">|</span>}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 animate-fade-in" style={{ animationDelay: '3s', animationFillMode: 'both' }}>
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all"
            >
              {t('viewProjects')}
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
            >
              {t('getInTouch')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
