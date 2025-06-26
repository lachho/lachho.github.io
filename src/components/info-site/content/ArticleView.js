import React from 'react';

const ArticleView = ({ article }) => {
  return (
    <article className="prose lg:prose-xl max-w-none bg-white p-8 md:p-12 rounded-lg shadow-lg">
      <h1>{article.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </article>
  );
};

export default ArticleView; 