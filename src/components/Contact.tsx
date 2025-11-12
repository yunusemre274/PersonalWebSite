import { Card } from './ui/card';
import { Mail, MapPin, GraduationCap, Github, Linkedin, Instagram, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {t('contact')}
        </h2>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8 animate-fade-in">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold mb-3">{t('contactMe')}</h3>
              <p className="text-muted-foreground">
                {t('contactDesc')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center gap-3 p-6 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{t('email')}</h4>
                  <p className="text-sm text-muted-foreground">{t('emailDesc')}</p>
                  <a href="mailto:yunusemreduman274@gmail.com" className="text-sm text-primary block mt-2">yunusemreduman274@gmail.com</a>
                </div>
              </div>

              <div className="flex flex-col items-center text-center gap-3 p-6 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <div className="p-3 bg-accent/10 rounded-full">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{t('location')}</h4>
                  <p className="text-sm text-muted-foreground">{t('istanbul')}</p>
                </div>
              </div>

              <div className="flex flex-col items-center text-center gap-3 p-6 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                <div className="p-3 bg-primary/10 rounded-full">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{t('education')}</h4>
                  <p className="text-sm text-muted-foreground">{t('university')}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-4">
              <a aria-label="GitHub" title="GitHub" href="https://github.com/yunusemre274" target="_blank" rel="noreferrer" className="p-3 bg-muted/50 rounded-full hover:bg-muted transition-colors">
                <Github className="w-5 h-5" />
              </a>

              <a aria-label="LinkedIn" title="LinkedIn" href="https://www.linkedin.com/in/yunus-emre-duman-b8177b309" target="_blank" rel="noreferrer" className="p-3 bg-muted/50 rounded-full hover:bg-muted transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>

              <a aria-label="Kaggle" title="Kaggle" href="https://www.kaggle.com/yunusemreduman" target="_blank" rel="noreferrer" className="p-3 bg-muted/50 rounded-full hover:bg-muted transition-colors flex items-center justify-center">
                {/* Using a simple globe icon for Kaggle to keep dependencies minimal */}
                <Globe className="w-5 h-5" />
              </a>

              <a aria-label="Instagram" title="Instagram" href="https://www.instagram.com/yunusemre.zp/?next=%2F" target="_blank" rel="noreferrer" className="p-3 bg-muted/50 rounded-full hover:bg-muted transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
