import { Card } from './ui/card';
import { FolderGit2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Projects = () => {
  const { t } = useLanguage();
  
  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {t('myProjects')}
        </h2>

        <Card className="max-w-4xl mx-auto p-12 text-center animate-fade-in">
          <div className="flex flex-col items-center gap-6">
            <div className="p-6 bg-muted rounded-full">
              <FolderGit2 className="w-16 h-16 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-3">{t('comingSoon')}</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                {t('comingSoonDesc')}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Projects;
