import { Card } from './ui/card';
import { Code2, Database, Wrench, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Skills = () => {
  const { t } = useLanguage();
  
  const skillCategories = [
    {
      title: t('programmingLanguages'),
      icon: Code2,
      color: 'text-primary',
      skills: ['C++', 'C', 'Java', 'Python', 'HTML', 'CSS', 'JavaScript']
    },
    {
      title: t('dataAnalysis'),
      icon: Database,
      color: 'text-accent',
      skills: ['Data Visualization', 'Data Analysis', 'Data Winsorization', 'Data Manipulation', 'Machine Learning']
    },
    {
      title: t('toolsTech'),
      icon: Wrench,
      color: 'text-primary',
      skills: ['Docker', 'Node.js', 'Git', 'GitHub', 'Tailwind CSS']
    },
    {
      title: t('methodologies'),
      icon: TrendingUp,
      color: 'text-accent',
      skills: ['Agile', 'Scrum', 'MS Office']
    }
  ];

  const getDescription = (skill: string) => {
    const map: Record<string, string> = {
      'C++': 'Experienced in writing performant system-level code with C++.',
      C: 'Familiar with low-level programming concepts in C.',
      Java: 'Built object-oriented projects and small applications in Java.',
      Python: 'Used for scripting, data analysis and machine learning experiments.',
      HTML: 'Structured markup for web pages and accessibility-minded layouts.',
      CSS: 'Styling with responsive layouts using modern CSS techniques.',
      JavaScript: 'Frontend interactivity and basic tooling knowledge.',
      'Data Visualization': 'Creating charts and dashboards to surface insights.',
      'Data Analysis': 'Cleaning and exploring datasets to answer questions.',
      'Data Winsorization': 'Applying winsorization to mitigate outliers.',
      'Data Manipulation': 'Transforming data using pandas and similar tools.',
      'Machine Learning': 'Experimented with basic ML models and evaluation.',
      Docker: 'Containerized apps for consistent development environments.',
      'Node.js': 'Built small APIs and scripts with Node.js.',
      Git: 'Version control and collaborative workflows with Git.',
      GitHub: 'Hosted repositories and collaborative project management.',
      'Tailwind CSS': 'Utility-first styling for rapid UI development.',
      Agile: 'Iterative development using Agile practices.',
      Scrum: 'Worked with Scrum ceremonies and sprints.',
      'MS Office': 'Basic productivity tools for documentation and reports.',
    };

    return map[skill] || 'No description available.';
  };

  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {t('mySkills')}
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <Card 
              key={category.title}
              className="p-6 hover:shadow-lg transition-all hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 bg-muted rounded-lg ${category.color}`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <div key={skill} className="relative group">
                    <span
                      className="px-3 py-1 bg-muted text-foreground rounded-full text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-default inline-block"
                    >
                      {skill}
                    </span>
                    <div className="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-64 md:w-48 text-center">
                      <div className="bg-muted/95 text-sm p-2 rounded shadow-lg">
                        {getDescription(skill)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
