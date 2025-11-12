import { GraduationCap, MapPin, User } from 'lucide-react';
import { Card } from './ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();
  
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {t('about')}
        </h2>

        <div className="max-w-4xl mx-auto grid md:grid-cols-4 gap-6">
          <Card className="p-6 hover:shadow-lg transition-shadow animate-fade-in">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{t('education')}</h3>
                <p className="text-muted-foreground">{t('university')}</p>
                <p className="text-sm text-muted-foreground">{t('major')}</p>
                <p className="text-sm text-muted-foreground">{t('year')}</p>
                {/* GPA moved to its own bubble for emphasis */}
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex flex-col items-center text-center gap-4">
              <div className="p-3 bg-accent/10 rounded-full">
                <MapPin className="w-8 h-8 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{t('location')}</h3>
                <p className="text-muted-foreground">{t('istanbul')}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex flex-col items-center text-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">{t('status')}</h3>
                <p className="text-muted-foreground">{t('student')}</p>
                <p className="text-sm text-muted-foreground">{t('openToOpportunities')}</p>
              </div>
            </div>
          </Card>

          {/* GPA bubble - separate card with academic cap icon */}
          <Card className="p-6 hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: '0.25s' }}>
            <div className="flex flex-col items-center text-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">GPA</h3>
                <p className="text-2xl font-bold">3.65</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="max-w-4xl mx-auto mt-8 p-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <p className="text-center text-muted-foreground leading-relaxed">
            {t('aboutDescription')}
          </p>
        </Card>

        <Card className="max-w-4xl mx-auto mt-6 p-6 animate-fade-in" style={{ animationDelay: '0.35s' }}>
          <div>
            <h3 className="text-lg font-semibold mb-4">Certificates</h3>
            {/* Small placeholder: dashed box + disabled Add button */}
            <div className="border-2 border-dashed border-muted-foreground/40 rounded p-6 text-center">
              <p className="text-sm text-muted-foreground mb-4">No certificates added yet.</p>
              <button className="px-4 py-2 rounded bg-muted-foreground/10 text-muted-foreground cursor-not-allowed" disabled>
                Add certificate
              </button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default About;
