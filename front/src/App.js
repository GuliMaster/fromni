import s from './App.module.css';
import Settings from './Components/Settings/Settings';
import { Layout, theme } from 'antd';

const { Header, Content, Footer } = Layout;

const App = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout className={s.mainLayout}>
            <Header className={s.header} style={{ background: colorBgContainer }} />
              <Content className={s.content} style={{ background: colorBgContainer }}>
                  <Settings />
              </Content>
            <Footer className={s.footer}></Footer>
        </Layout>
    );
}

export default App;
