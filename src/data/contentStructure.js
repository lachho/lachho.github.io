// Content structure for the informational website
export const contentStructure = {
  'career-guidance': {
    title: 'Career Guidance',
    description: 'Professional advice for career development and job searching',
    icon: '🎯',
    subcategories: {
      'resume-writing': {
        title: 'Resume Writing',
        description: 'Learn how to create compelling resumes',
        articles: [
          {
            id: 'effective-resume-formats',
            title: 'Effective Resume Formats',
            summary: 'Discover the best resume formats for different industries and career levels',
            file: 'career-guidance/resume-writing/effective-resume-formats.md',
            tags: ['format', 'structure', 'beginner']
          },
          {
            id: 'action-verbs-guide',
            title: 'Power Action Verbs for Resumes',
            summary: 'Transform your resume with impactful action verbs that grab attention',
            file: 'career-guidance/resume-writing/action-verbs-guide.md',
            tags: ['writing', 'language', 'impact']
          },
          {
            id: 'quantifying-achievements',
            title: 'Quantifying Your Achievements',
            summary: 'Learn how to measure and present your accomplishments effectively',
            file: 'career-guidance/resume-writing/quantifying-achievements.md',
            tags: ['metrics', 'achievements', 'data']
          }
        ]
      },
      'interview-preparation': {
        title: 'Interview Preparation',
        description: 'Master the art of job interviews',
        articles: [
          {
            id: 'common-interview-questions',
            title: 'Common Interview Questions & Answers',
            summary: 'Prepare for the most frequently asked interview questions',
            file: 'career-guidance/interview-preparation/common-interview-questions.md',
            tags: ['questions', 'preparation', 'answers']
          },
          {
            id: 'behavioural-interviews',
            title: 'Mastering Behavioural Interviews',
            summary: 'Use the STAR method to excel in behavioural interviews',
            file: 'career-guidance/interview-preparation/behavioural-interviews.md',
            tags: ['behavioural', 'STAR', 'storytelling']
          }
        ]
      }
    }
  },
  'industry-insights': {
    title: 'Industry Insights',
    description: 'Deep dives into various industry trends and requirements',
    icon: '🏢',
    subcategories: {
      'technology': {
        title: 'Technology',
        description: 'Tech industry trends and career advice',
        articles: [
          {
            id: 'tech-skills-2024',
            title: 'Essential Tech Skills for 2024',
            summary: 'Stay ahead with the most in-demand technical skills',
            file: 'industry-insights/technology/tech-skills-2024.md',
            tags: ['skills', 'technology', 'trends']
          },
          {
            id: 'remote-work-best-practices',
            title: 'Remote Work Best Practices',
            summary: 'Master the art of working effectively from home',
            file: 'industry-insights/technology/remote-work-best-practices.md',
            tags: ['remote', 'productivity', 'communication']
          }
        ]
      },
      'finance': {
        title: 'Finance',
        description: 'Financial sector career guidance',
        articles: [
          {
            id: 'finance-career-paths',
            title: 'Finance Career Paths Explained',
            summary: 'Explore different career opportunities in the finance industry',
            file: 'industry-insights/finance/finance-career-paths.md',
            tags: ['careers', 'finance', 'pathways']
          }
        ]
      }
    }
  },
  'professional-development': {
    title: 'Professional Development',
    description: 'Continuous learning and skill enhancement strategies',
    icon: '📈',
    subcategories: {
      'skills-development': {
        title: 'Skills Development',
        description: 'Build and enhance your professional skills',
        articles: [
          {
            id: 'soft-skills-importance',
            title: 'The Importance of Soft Skills',
            summary: 'Why emotional intelligence and communication matter in your career',
            file: 'professional-development/skills-development/soft-skills-importance.md',
            tags: ['soft-skills', 'communication', 'leadership']
          },
          {
            id: 'continuous-learning',
            title: 'Continuous Learning Strategies',
            summary: 'Stay relevant in your field through lifelong learning',
            file: 'professional-development/skills-development/continuous-learning.md',
            tags: ['learning', 'development', 'growth']
          }
        ]
      }
    }
  }
};

// Flatten all articles for search functionality
export const getAllArticles = () => {
  const articles = [];
  
  Object.entries(contentStructure).forEach(([categoryKey, category]) => {
    Object.entries(category.subcategories).forEach(([subcategoryKey, subcategory]) => {
      subcategory.articles.forEach(article => {
        articles.push({
          ...article,
          category: categoryKey,
          categoryTitle: category.title,
          subcategory: subcategoryKey,
          subcategoryTitle: subcategory.title,
          path: `/content/${categoryKey}/${subcategoryKey}/${article.id}`
        });
      });
    });
  });
  
  return articles;
};

// Get breadcrumb navigation for a content path
export const getBreadcrumbs = (categoryKey, subcategoryKey, articleId) => {
  const breadcrumbs = [
    { title: 'Home', path: '/' }
  ];
  
  if (categoryKey && contentStructure[categoryKey]) {
    breadcrumbs.push({
      title: contentStructure[categoryKey].title,
      path: `/content/${categoryKey}`
    });
    
    if (subcategoryKey && contentStructure[categoryKey].subcategories[subcategoryKey]) {
      breadcrumbs.push({
        title: contentStructure[categoryKey].subcategories[subcategoryKey].title,
        path: `/content/${categoryKey}/${subcategoryKey}`
      });
      
      if (articleId) {
        const article = contentStructure[categoryKey].subcategories[subcategoryKey].articles
          .find(a => a.id === articleId);
        if (article) {
          breadcrumbs.push({
            title: article.title,
            path: `/content/${categoryKey}/${subcategoryKey}/${articleId}`
          });
        }
      }
    }
  }
  
  return breadcrumbs;
}; 