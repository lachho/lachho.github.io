// Content structure for the informational website
export const contentStructure = {
  'resume-and-cover-letter': {
    title: 'Resume & Cover Letter',
    description: 'How to craft a top-tier resume and cover letter to stand out from the crowd.',
    icon: '📝',
    articles: [
      { id: 'resume-crash-course' },
      { id: 'resume-masterclass-content' },
      { id: 'resume-masterclass-consolidation' },
      { id: 'resume-masterclass-formatting' },
      { id: 'cover-letters' },
    ]
  },
  'job-application-process': {
    title: 'The Job Application Process',
    description: 'Navigate the job application process with confidence.',
    icon: '💻',
    articles: [
      { id: 'job-application-process' },
      { id: 'helpful-resources-and-links' },
    ]
  },
  'interview-preparation': {
    title: 'Interview Preparation',
    description: 'Learn how to prepare thoroughly for your interviews to make a memorable impression.',
    icon: '🎙️',
    articles: [
      { id: 'online-assessments' },
      { id: 'group-assessments' },
      { id: 'interviews' },
    ]
  },
  'setting-up-for-success': {
    title: 'Setting up for Success',
    description: 'How to lay the groundwork to set yourself up for a successful career.',
    icon: '🚀',
    articles: [
      { id: 'general-advice' },
      { id: 'extracurricular-activities' },
      { id: 'networking' },
      { id: 'linkedin' },
    ]
  },
  'university': {
    title: 'University',
    description: 'What you need to know about your time at university.',
    icon: '🎓',
    articles: [
      { id: 'industrial-training' },
      { id: 'academics' },
    ]
  },
  'career-guidance': {
    title: 'Career Guidance',
    description: 'Get guidance on making informed decisions about where you want to go.',
    icon: '🧭',
    articles: [
      { id: 'career-progression' },
      { id: 'career-options-and-disciplines' },
      { id: 'thinking-about-the-future' },
      { id: 'salary-expectations' },
    ]
  }
};

// Featured Articles - manually curated list
// Add/remove articles here to control which ones appear in the featured section
export const featuredArticles = [
  { categoryKey: 'setting-up-for-success', articleId: 'general-advice' },
  { categoryKey: 'resume-and-cover-letter', articleId: 'resume-masterclass-content' },
  { categoryKey: 'job-application-process', articleId: 'helpful-resources-and-links' },
];

const parseFrontmatter = (text) => {
  const meta = {};
  const match = text.match(/---\n([\s\S]+?)\n---/);
  if (match) {
    const frontMatter = match[1];
    frontMatter.split('\n').forEach(line => {
      const parts = line.split(':');
      if (parts.length > 1) {
        const key = parts[0].trim();
        const value = parts.slice(1).join(':').trim();
        // Handle tags specially as they are an array
        if (key === 'tags') {
            // Assuming tags are in the format: ["tag1", "tag2"]
            try {
                meta[key] = JSON.parse(value);
            } catch (e) {
                console.error('Error parsing tags:', e);
                meta[key] = [];
            }
        } else {
            // Remove quotes from other string values
            meta[key] = value.replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
        }
      }
    });
  }
  return meta;
};


export const getArticleMetaData = async (categoryKey, articleId, includeContent = false) => {
    try {
        const url = `/content/${categoryKey}/${articleId}.md`;
        console.log('Fetching metadata from:', url);
        
        const response = await fetch(url);
        console.log('Response status:', response.status, 'OK:', response.ok);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        const text = await response.text();
        console.log('Fetched text length:', text.length);
        const metadata = parseFrontmatter(text);
        console.log('Parsed metadata:', metadata);
        
        if (includeContent) {
            // Strip YAML frontmatter using regex to get clean content
            const content = text.replace(/^---[\s\S]*?---/, '').trim();
            return { ...metadata, content };
        }
        
        return metadata;
    } catch (error) {
        console.error(`Error fetching article content for ${categoryKey}/${articleId}:`, error);
        const fallback = {
            title: articleId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            summary: 'Content temporarily unavailable',
            tags: []
        };
        
        if (includeContent) {
            fallback.content = 'Content temporarily unavailable.';
        }
        
        return fallback;
    }
};


// Flatten all articles for search functionality
export const getAllArticles = async () => {
  const articles = [];
  
  for (const [categoryKey, category] of Object.entries(contentStructure)) {
    if (category.articles) {
      for (const articleStub of category.articles) {
        const metadata = await getArticleMetaData(categoryKey, articleStub.id);
        articles.push({
          id: articleStub.id,
          ...metadata,
          category: categoryKey,
          categoryTitle: category.title,
          path: `/articles/${categoryKey}/${articleStub.id}`
        });
      }
    }
  }
  
  return articles;
};

// Get breadcrumb navigation for a content path
export const getBreadcrumbs = (categoryKey, articleId, articleTitle) => {
  const breadcrumbs = [
    { title: 'Home', path: '/' },
    { title: 'Articles', path: '/articles' }
  ];
  
  if (categoryKey && contentStructure[categoryKey]) {
    const category = contentStructure[categoryKey];
    breadcrumbs.push({
      title: category.title,
      path: `/articles/${categoryKey}`
    });
    
    if (articleId && articleTitle) {
      breadcrumbs.push({
        title: articleTitle,
        path: `/articles/${categoryKey}/${articleId}`
      });
    }
  }
  
  return breadcrumbs;
};

// Add featured articles functionality
export const getFeaturedArticles = async () => {
  const articles = [];
  
  for (const featured of featuredArticles) {
    try {
      const { categoryKey, articleId } = featured;
      const category = contentStructure[categoryKey];
      
      if (category && category.articles.some(article => article.id === articleId)) {
        const metadata = await getArticleMetaData(categoryKey, articleId);
        articles.push({
          id: articleId,
          ...metadata,
          category: categoryKey,
          categoryTitle: category.title,
          path: `/articles/${categoryKey}/${articleId}`
        });
      }
    } catch (error) {
      console.error(`Error loading featured article ${featured.categoryKey}/${featured.articleId}:`, error);
    }
  }
  
  return articles;
};