// wan-resume/src/components/ResumeContent.jsx
import React, { useEffect, useState } from 'react';
import markdownIt from 'markdown-it';

const md = markdownIt();

const ResumeContent = ({ resumePath }) => {
  const [resumeHtml, setResumeHtml] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // ResumeContent.jsx（优化 fetch 逻辑）
    const fetchResume = async () => {
      try {
        const response = await fetch(resumePath+'?t=' + Date.now());
        const contentType = response.headers.get('content-type');

        if (!contentType?.includes('text/markdown') && !contentType?.includes('text/plain')) {
         throw new Error("Markdown文件不存在或路径配置错误");
        }
  
        const text = await response.text();

        console.log("markdown文档加载成功...");

        setResumeHtml(md.render(text));
      } catch (error) {
        setError(error); 
      } 
    };

    fetchResume();
  }, [resumePath]);

  if (error) {
    console.log("markdown文档加载异常: ", error.message);
    return <div className="error-message" >{error.message}</div>;
  }

 if (!resumeHtml) {
    return <div/>;
  }

  return (
    <div id="markdown-body" dangerouslySetInnerHTML={{ __html: resumeHtml }} />
  );
};

export default ResumeContent;