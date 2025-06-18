# Career Hub - Informational Website Integration

This project has been enhanced with a comprehensive informational website that integrates seamlessly with the existing resume analyser functionality. The site provides a content-heavy, hierarchically organised platform for career development resources.

## 🚀 Features

### Navigation & Structure
- **Hierarchical Navigation**: Multi-level content organisation (Home > Category > Subcategory > Article)
- **Breadcrumb Navigation**: Shows current location and enables easy backtracking
- **Responsive Navigation**: Mobile-friendly menu with dropdown categories
- **Smart Active States**: Current page highlighting in navigation

### Content Management
- **Markdown Support**: Full markdown rendering with custom styling
- **Structured Content**: Organised categories and subcategories
- **Article Metadata**: Tags, summaries, and categorisation
- **Related Content**: Automatic related article suggestions

### Search Functionality
- **Client-side Search**: Fast, responsive search across all content
- **Smart Filtering**: Search by title, summary, category, and tags
- **Relevance Sorting**: Title matches prioritised over content matches
- **Search Highlighting**: Visual highlighting of search terms in results
- **Suggested Searches**: Popular search terms when no results found

### User Experience
- **Hero Section**: Engaging landing page with clear call-to-actions
- **Featured Content**: Highlighted articles on the homepage
- **Statistics Dashboard**: Content metrics and site overview
- **Loading States**: Smooth loading animations throughout
- **Error Handling**: Graceful error states and fallbacks

## 📁 Project Structure

```
src/
├── components/
│   ├── resume-analyser/          # Original resume analyser components
│   │   ├── AnalysisDashboard.js
│   │   ├── FileUpload.js
│   │   ├── Footer.js
│   │   └── ...
│   └── info-site/                # New informational website components
│       ├── Navigation.js         # Main navigation with search
│       ├── InfoHomePage.js       # Landing page with hero section
│       ├── ContentPage.js        # Hierarchical content display
│       ├── SearchResults.js      # Search functionality
│       └── Breadcrumb.js         # Breadcrumb navigation
├── data/
│   └── contentStructure.js       # Content hierarchy and metadata
├── content/                      # Markdown content files
│   ├── career-guidance/
│   │   ├── resume-writing/
│   │   └── interview-preparation/
│   ├── industry-insights/
│   │   ├── technology/
│   │   └── finance/
│   └── professional-development/
│       └── skills-development/
└── utils/                        # Existing utility functions
```

## 🛣️ Routing Structure

- `/` - Homepage with hero, featured content, and categories
- `/resume-analyser` - Original resume analyser functionality
- `/content/{category}` - Category overview page
- `/content/{category}/{subcategory}` - Subcategory with article listings
- `/content/{category}/{subcategory}/{article}` - Individual article page
- `/search` - Search results page with query support
- `/search?q={query}` - Search results for specific query

## 🎨 Design System

### Colour Palette
- **Primary Blue**: `#3B82F6` (blue-600)
- **Dark Blue**: `#1E40AF` (blue-800)
- **Light Blue**: `#DBEAFE` (blue-100)
- **Gray Scale**: Various shades from gray-50 to gray-900
- **Accent Yellow**: `#FEF08A` (yellow-200) for search highlighting

### Typography
- **Headers**: Font weights from semibold (600) to extrabold (800)
- **Body Text**: Regular weight with relaxed line height
- **Code**: Monospace font with gray background
- **Links**: Blue with hover states and underlines

### Components
- **Cards**: White background with subtle shadows and hover effects
- **Buttons**: Consistent padding, rounded corners, and hover states
- **Forms**: Clean inputs with focus states and validation
- **Navigation**: Dropdown menus with smooth transitions

## 📱 Responsive Design

The site is fully responsive across all device sizes:

- **Desktop**: Full navigation with dropdown menus and multi-column layouts
- **Tablet**: Responsive grid layouts with stacked content
- **Mobile**: Collapsible navigation menu and single-column layouts

## 🔍 Search Implementation

### Search Algorithm
1. **Term Extraction**: Splits search query into individual terms
2. **Content Matching**: Searches across titles, summaries, categories, and tags
3. **Relevance Scoring**: Prioritises title matches over content matches
4. **Result Highlighting**: Visually highlights matching terms in results

### Search Features
- **Real-time Search**: Instant results as you type
- **Cross-category Search**: Searches across all content categories
- **Tag-based Filtering**: Include article tags in search results
- **No Results Handling**: Helpful suggestions when no content matches

## 📝 Content Structure

### Article Metadata
```javascript
{
  id: 'unique-article-id',
  title: 'Article Title',
  summary: 'Brief description for listings',
  file: 'path/to/markdown/file.md',
  tags: ['tag1', 'tag2', 'tag3']
}
```

### Category Structure
```javascript
{
  title: 'Category Name',
  description: 'Category description',
  icon: '🎯',
  subcategories: {
    'subcategory-key': {
      title: 'Subcategory Name',
      description: 'Subcategory description',
      articles: [/* array of articles */]
    }
  }
}
```

## 🛠️ Technical Implementation

### Dependencies Added
- `marked`: Markdown parsing and rendering
- `react-router-dom`: Enhanced for hierarchical routing

### Key Features
- **Static Generation**: All content is statically defined
- **Client-side Rendering**: Fast navigation without page reloads
- **Markdown Processing**: Custom styled markdown rendering
- **Search Indexing**: Client-side search across all content
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm start
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## 📈 Performance Considerations

- **Code Splitting**: Components are efficiently bundled
- **Image Optimisation**: All images are optimised for web
- **CSS Purging**: Tailwind CSS removes unused styles in production
- **Search Optimisation**: Client-side search is optimised for performance
- **Loading States**: Smooth user experience during content loading

## 🔮 Future Enhancements

### Potential Additions
- **Content CMS**: Admin interface for content management
- **User Accounts**: Personalised content recommendations
- **Comments**: Article discussion functionality
- **Social Sharing**: Share articles on social platforms
- **Analytics**: Track content engagement and search patterns
- **RSS Feed**: Subscribe to new content updates
- **Print Styles**: Optimised printing for articles

### Technical Improvements
- **Service Worker**: Offline content caching
- **Progressive Web App**: Mobile app-like experience
- **Content CDN**: Faster content delivery
- **Search Analytics**: Track search patterns and improve results
- **A/B Testing**: Optimise content presentation

## 🎯 Integration Points

The informational website seamlessly integrates with the existing resume analyser:

1. **Shared Navigation**: Unified header across both functionalities
2. **Cross-linking**: Articles link to resume analyser for practical application
3. **Consistent Styling**: Shared design system and components
4. **Footer Integration**: Unified footer across the entire site

## 📞 Support

For questions or issues related to the informational website functionality, please refer to the main project documentation or create an issue in the project repository.

---

*Built with React, Tailwind CSS, and modern web development practices following Australian English conventions.* 