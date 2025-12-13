// make-cv/src/App.jsx
import React from 'react';
import HeaderInfo from './components/HeaderInfo';
import ResumeContent from './components/ResumeContent';
import Footer from './components/Footer';
import yaml from 'js-yaml';
import { useEffect, useState } from 'react';
import './style.css';


const configPath = '/config/config.yml';
const resumePath = '/config/resume.md';

const App = () => {
  const [config, setConfig] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchConfig = async () => {
      try {
        const response = await fetch(configPath+'?t=' + Date.now());
        const contentType = response.headers.get('content-type');
        
        if (!contentType?.includes('text/yaml') && !contentType?.includes('text/plain')) {
          throw new Error("配置文件不存在或路径错误");
        }

        const text = await response.text();
        const parsedConfig = yaml.load(text);
        console.log("config.yml配置文件解析成功：", parsedConfig);
        setConfig(parsedConfig);
        setError(null);
      } catch (error) {
        setConfig(null);
        setError(error);
      } 
    };

    fetchConfig();
  }, []);

  if (error) {
    console.log("config.yml配置文件加载失败：", error.message);
    return <div className="error-message" >{error.message}</div>;
  }

 if (!config) {
    return <div/>;
  }

  return (
    <main className="container">
      <div className="paper">
        <div className="pin pin-left"></div>
        <div className="pin pin-right"></div>
        <div className="paper-content">
          {config.showHeader && <HeaderInfo headerInfo={config.headerInfo} />}
          <ResumeContent resumePath={resumePath} />
        </div>
      </div>
      <Footer showPrintStick={config.showPrintStick} />
    </main>
  );
};

export default App;