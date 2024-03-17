import { Layout } from "antd";
import CategoryList from "components/CategoryList/CategoryList";
import Container from "components/Container/Container";
import Header from "components/Header/Header";
import GlobalUiContainer from "Provider/GlobalUiContainer";
import * as React from "react";
interface IMainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FunctionComponent<IMainLayoutProps> = ({
  children,
}) => {
  return (
    <Container>
      <Layout>
        <Layout.Header className="bg-white shadow-md">
          <Header />
        </Layout.Header>
        <CategoryList />
        <Layout.Content>{children}</Layout.Content>
      </Layout>
      <GlobalUiContainer />
    </Container>
  );
};

export default MainLayout;
