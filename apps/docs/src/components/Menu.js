import React, { useState } from 'react';
import { StaticQuery, graphql, navigate } from 'gatsby';
import { startCase, sortBy } from 'lodash';
import { SidebarMenu } from '@ahaui/react3';
import ahaReactConfig from '../../config';

const flatten = arr => arr.map(({ node: { frontmatter, description, parent, subTitle, ...rest } }) => {
  const titleRelative = frontmatter.title;
  const relativePath = parent.relativePath.replace(parent.ext, '');
  return ({
    title: titleRelative,
    path: relativePath,
    ...rest,
  });
});
const Menu = ({ location: { pathname } }) => (
  <StaticQuery
    query={graphql`{
      allMdx(filter: {fileAbsolutePath: {regex: "pages/"}},  sort: {fields: fileAbsolutePath}) {
        edges {
          node {
            objectID: id
            frontmatter {
              title
            }
            parent {
              ... on File {
                relativePath
                ext
              }
            }
          }
        }
      }
    }`}
    render={({ allMdx: { edges: allPage } }) => {
      const menu = flatten(allPage).map((item) => {
        const pathSplit = item.path.split('/');
        const rootPath = pathSplit.length > 1 ? pathSplit[0] : undefined;
        const lastSplit = pathSplit.length - 1;
        const pagePath = pathSplit[lastSplit];
        let indexRoot = 0;
        if (rootPath === 'getting-started') {
          indexRoot = 1;
        }
        if (rootPath === 'foundations') {
          indexRoot = 2;
        }
        if (rootPath === 'layout') {
          indexRoot = 5;
        }
        if (rootPath === 'components') {
          indexRoot = 4;
        }
        if (rootPath === 'css-utilities') {
          indexRoot = 6;
        }
        if (rootPath === 'accessibility') {
          indexRoot = 3;
        }
        if (pathSplit[1] !== pagePath) {
          return ({ indexRoot, title: item.title, rootPath, pagePath, subPath: pathSplit[1], slug: item.path });
        }
        return ({ indexRoot, title: item.title, rootPath, pagePath, slug: item.path });
      });
      const newMenu = [];

      menu.forEach((item) => {
        if (item.rootPath) {
          const root = newMenu.find(root => root.id === item.rootPath);
          if (!root) {
            newMenu.push({
              id: item.rootPath,
              index: item.indexRoot,
              sub: [],
              title: startCase(item.rootPath.toLowerCase()),
            });
          }
        } else {
          newMenu.push({
            index: item.indexRoot,
            id: item.pagePath,
            title: item.title,
            slug: item.slug,
          });
        }
      });

      menu.forEach((item) => {
        if (!item.rootPath) return;
        const root = newMenu.find(root => root.id === item.rootPath);
        if (!item.subPath) {
          root.sub.push({
            id: item.pagePath,
            title: item.title,
            slug: item.slug,
          });
        } else {
          let subRoot = root.sub.find(sub => sub.id === item.subPath);
          if (!subRoot) {
            subRoot = {
              id: item.subPath,
              title: startCase(item.subPath.toLowerCase()),
              sub: [],
            };
            root.sub.push(subRoot);
          }

          subRoot.sub.push({
            id: item.pagePath,
            title: item.title,
            slug: item.slug,
          });
        }
      });
      const newArr = sortBy(newMenu, 'index');
      const useCurrent = pathname
        .split('/')
        .filter((item) => {
          // Check if the path includes the pathPrefix (current version)
          return (!!item && item !== ahaReactConfig.version.split(".")[0]);
        })
        .join('.')
      const [currentPath, setCurrentPath] = useState(useCurrent);
      const handleOnSelect = (e) => {
        const linkTo = e.replace(/\./g, '/');
        navigate(`/${linkTo}/`);
        setCurrentPath(e);
      };
      return (
        <SidebarMenu
          size="small"
          current={currentPath}
          onSelect={handleOnSelect}
        >
          {newArr.map(item => (
            item.sub ? (
              <SidebarMenu.SubMenu key={item.id} eventKey={item.id} title={item.title.replace('Css', 'CSS')}>
                {item.sub.map(level1 => (
                  level1.sub ? (
                    <SidebarMenu.SubMenu className="u-text200" key={level1.id} eventKey={level1.id} title={level1.title}>
                      {level1.sub.map(level2 => (
                        <SidebarMenu.Item href={`/${level2.slug}`} key={level2.id} eventKey={level2.id}>{level2.title}</SidebarMenu.Item>
                      ))}
                    </SidebarMenu.SubMenu>
                  ) : (
                    <SidebarMenu.Item className="u-text200" key={level1.id} href={`/${level1.slug}`} eventKey={level1.id}>{level1.title}</SidebarMenu.Item>
                  )
                ))}
              </SidebarMenu.SubMenu>
            ) : (
              <SidebarMenu.Item key={item.id} href={`/${item.slug}`} eventKey={item.id}>{item.title}</SidebarMenu.Item>
            )
          ))}
        </SidebarMenu>
      );
    }}
  />
);

Menu.propTypes = {

};

Menu.defaultProps = {
};

export default Menu;
