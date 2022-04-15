
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import core from './controller/core';
import { Provider } from 'react-redux';
// import ErrorBoundaries from './views/container/ErrorBoundaries'
// 傻了吧唧的v6
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import Routes, { history } from './router'
import './asset/style/appCustom.less'
import '@arco-design/web-react/dist/css/arco.css';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <ConfigProvider locale={zhCN}>

      <Provider store={core}>

        <HistoryRouter history={history}>

          <Routes />

        </HistoryRouter>

      </Provider>

    </ConfigProvider>
  );
