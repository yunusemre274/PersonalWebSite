import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';
import { useLanguage, type Language } from '@/contexts/LanguageContext';
// language selection is handled by clicking the logo (cycles languages)

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Code-shaped logo that returns to the top / main menu */}
            <button
              aria-label="Return to main"
              title="Return to main"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsMobileMenuOpen(false);
              }}
              className="p-2 rounded hover:bg-muted/10 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {/* simple code-shaped SVG icon (</>) */}
              <svg className="w-7 h-7 text-foreground" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M9.5 7L4 12l5.5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14.5 7L20 12l-5.5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="0.6" className="opacity-50" />
              </svg>
            </button>

            <h1
              role="button"
              title="Change language (click logo)"
              onClick={() => {
                const order: Language[] = ['tr', 'en', 'de', 'es'];
                const idx = order.indexOf(language);
                const next = order[(idx + 1) % order.length];
                setLanguage(next);
              }}
              className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent cursor-pointer select-none"
            >
              YED
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection('about')} className="text-foreground hover:text-primary transition-colors">
              {t('about')}
            </button>
            <button onClick={() => scrollToSection('skills')} className="text-foreground hover:text-primary transition-colors">
              {t('skills')}
            </button>
            <button onClick={() => scrollToSection('projects')} className="text-foreground hover:text-primary transition-colors">
              {t('projects')}
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-foreground hover:text-primary transition-colors">
              {t('contact')}
            </button>

            {/* Language Switcher (restored) */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('tr')}>🇹🇷 Türkçe</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('en')}>🇬🇧 English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('de')}>🇩🇪 Deutsch</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('es')}>🇪🇸 Español</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Dark/Light bar switch with sun/moon icons */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  aria-label="Toggle theme"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="w-14 h-8 bg-muted rounded-full relative flex items-center px-1 transition-colors"
                >
                  <Sun className={`w-4 h-4 text-yellow-400 transition-opacity ${theme === 'light' ? 'opacity-100' : 'opacity-30'}`} />
                  <div className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transform transition-transform ${theme === 'dark' ? 'translate-x-6' : ''}`} />
                  <Moon className={`w-4 h-4 text-gray-700 ml-auto transition-opacity ${theme === 'dark' ? 'opacity-100' : 'opacity-30'}`} />
                </button>
              </div>
            </div>

            {/* old icon toggle removed in favor of switch */}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4 animate-fade-in">
            <button onClick={() => scrollToSection('about')} className="text-foreground hover:text-primary transition-colors text-left">
              {t('about')}
            </button>
            <button onClick={() => scrollToSection('skills')} className="text-foreground hover:text-primary transition-colors text-left">
              {t('skills')}
            </button>
            <button onClick={() => scrollToSection('projects')} className="text-foreground hover:text-primary transition-colors text-left">
              {t('projects')}
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-foreground hover:text-primary transition-colors text-left">
              {t('contact')}
            </button>
            
            <div className="flex items-center gap-2 pt-2 border-t border-border">
              <p className="text-sm text-muted-foreground">Tip: Click the logo to change language</p>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
