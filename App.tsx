import * as React from 'react';
import {useState, useEffect} from 'react';
import {HashRouter as Router, Route, NavLink, Redirect, Switch} from 'react-router-dom';
import IconDemo from './lib/icon/icon.demo';
import DialogDemo from './lib/dialog/dialog.demo';
import ButtonDemo from './lib/button/button.demo';
import LayoutDemo from './lib/layout/layout.demo';
import BackTopDemo from './lib/backTop/backTop.demo';
import SelectDemo from './lib/select/select.demo';
import DatepickerDemo from './lib/datepicker/datepicker.demo';
import Layout from './lib/layout/Layout';
import Header from './lib/layout/components/Header';
import Aside from './lib/layout/components/Aside';
import Main from './lib/layout/components/Main';
import Intro from './md/Intro';
import Install from './md/Install';
import Start from './md/Start';
import Icon from './lib/icon/Icon';
import BackTop from './lib/backTop/BackTop';
import './index.scss';
import 'github-markdown-css';

const logo = require('./favicon.png').default;
const xiyo = require('./xiyo.png').default;

const App: React.FC = () => {
  const [asideVisible, setAsideVisible] = useState(false);
  const [listeningElement, setListeningElement] = useState<HTMLElement | null>(null);
  useEffect(() => {
    const links = document.querySelectorAll('.site-aside a');
    const mask = document.querySelector<HTMLDivElement>('.site-mask');
    links.forEach((link: HTMLAnchorElement) => link.onclick = () => {
      document.querySelector('.site')!.scrollTo({top: 0});
      setAsideVisible(false);
    });
    mask!.onclick = () => setAsideVisible(false);
  }, []);
  useEffect(() => {
    document.querySelector('.site-aside')!.addEventListener('wheel', e => e.preventDefault());
    document.querySelector('.site-header')!.addEventListener('wheel', e => e.preventDefault());
    document.querySelector('.site-mask')!.addEventListener('wheel', e => e.preventDefault());
    document.querySelector('.site-aside')!.addEventListener('touchmove', e => e.preventDefault());
    document.querySelector('.site-header')!.addEventListener('touchmove', e => e.preventDefault());
    document.querySelector('.site-mask')!.addEventListener('touchmove', e => e.preventDefault());
  }, []);
  useEffect(() => {
    setListeningElement(document.querySelector('.site') as HTMLElement);
  }, []);
  return (
    <Router>
      <Layout className={`site ${asideVisible ? 'visible' : ''}`.trim()}>
        <Header className="site-header">
          <Icon className={`menu ${asideVisible ? 'visible' : ''}`.trim()} name="menu"
                onClick={() => setAsideVisible(v => !v)}/>
          <Icon name="xiyo" className="logo" data-x={logo}/>
          <img className="xiyo" src={xiyo}/>
        </Header>
        <Layout>
          <Aside className={`site-aside ${asideVisible ? 'visible' : ''}`.trim()}>
            <p className="site-aside-title">文档</p>
            <ul>
              <li>
                <NavLink to="/intro">介绍</NavLink>
              </li>
              <li>
                <NavLink to="/install">安装</NavLink>
              </li>
              <li>
                <NavLink to="/start">开始使用</NavLink>
              </li>
            </ul>
            <p className="site-aside-title">组件列表</p>
            <ul>
              <li>
                <NavLink to="/icon">Icon 图标</NavLink>
              </li>
              <li>
                <NavLink to="/button">Button 按钮</NavLink>
              </li>
              <li>
                <NavLink to="/layout">Layout 布局</NavLink>
              </li>
              <li>
                <NavLink to="/select">Select 选择器</NavLink>
              </li>
              <li>
                <NavLink to="/dialog">Dialog 对话框</NavLink>
              </li>
              <li>
                <NavLink to="/backTop">BackTop 返回顶部</NavLink>
              </li>
              <li>
                <NavLink to="/datepicker">Datepicker 日期选择器</NavLink>
              </li>
            </ul>
          </Aside>
          <Main className={`site-main ${asideVisible ? 'visible' : ''}`.trim()}>
            <Switch>
              <Route path="/intro" component={Intro}/>
              <Route path="/install" component={Install}/>
              <Route path="/start" component={Start}/>
              <Route path="/icon" component={IconDemo}/>
              <Route path="/button" component={ButtonDemo}/>
              <Route path="/layout" component={LayoutDemo}/>
              <Route path="/select" component={SelectDemo}/>
              <Route path="/dialog" component={DialogDemo}/>
              <Route path="/backTop" component={BackTopDemo}/>
              <Route path="/datepicker" component={DatepickerDemo}/>
              <Redirect exact from="" to="/intro"/>
            </Switch>
          </Main>
        </Layout>
        <div className={`site-mask ${asideVisible ? 'visible' : ''}`.trim()}/>
        <BackTop listeningElement={listeningElement} className={asideVisible ? 'inVisible' : ''}/>
      </Layout>
    </Router>
  );
};
export default App;