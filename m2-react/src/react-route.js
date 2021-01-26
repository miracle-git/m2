import React from 'react';
import { createHashHistory, createBrowserHistory, createMemoryHistory } from 'history';
import { HashRouter, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { DataType, UrlUtil } from 'm2-core';

export const loadRoutesConfig = (rootApp, childRoutes, context = '/') => {
  if (!rootApp) {
    console.error('React根组件参数rootApp尚未配置, 应用无法启动！');
    return;
  }

  const routes = [{
    path: context,
    component: rootApp,
    children: childRoutes
  }].filter(item => item.children && item.children.length > 0);

  const handleDefaultRoute = (route) => {
    const childRoutes = route.children;
    if (!route.extra && childRoutes && childRoutes.length > 0) {
      const defaultRoute = childRoutes.find(child => child.default || child.isDefault);
      if (defaultRoute) {
        const first = { ...defaultRoute };
        first.path = route.path;
        first.exact = true;
        first.autoDefaultRoute = true; // mark it so that the simple nav won't show it.
        route.children.unshift(first);
      }
      route.children.forEach(handleDefaultRoute);
    }
  };

  routes.forEach(handleDefaultRoute);

  return routes;
};

export const loadLayoutRoutesConfig = (layouts, childRoutes) => {
  if (DataType.isEmptyArray(layouts)) {
    console.error('React布局参数layouts尚未配置, 应用无法启动！');
    return;
  }
  // 根据布局对路由配置进行分类
  let routes = [];
  const _filterRoutes = (routes, layout) => {
    const result = [];
    routes.forEach(route => {
      const _routes = DataType.isArray(route) ? route : [route];
      const _item = _routes.find(item => item.layout === layout.name || (layout.default && !item.layout));
      if (_item) {
        result.push(_item);
      }
    });
    return result;
  };
  const _getRoutePrefix = (layout) => {
    if (layout.prefix) return layout.prefix;
    return layout.default ? '/' : '/' + layout.name;
  };
  layouts.forEach(item => {
    routes = [...routes, ...loadRoutesConfig(item.layout, _filterRoutes(childRoutes, item), _getRoutePrefix(item))]
  });
  return routes;
};

export const renderRoutes = (routesConfig, contextPath, configOptions = {}) => {
  const {
    routeType = 'hash', // 路由类型(hash|browser)
    authenticated = false, // 检查是否已通过认证
    redirectUrl = '', // 未通过认证重定向到页面
    redirect404 = '' // 路由未匹配到达的页面
  } = configOptions;

  // Resolve route config object
  const children = [];
  const renderRouteItem = (item, routeContextPath, main = false) => {
    if (redirectUrl && !main) {
      if (!item.public && !authenticated) {
        item = {
          ...item,
          component: () => <Redirect to={redirectUrl}/>,
          children: null
        };
      }
    }
    let newContextPath;
    if (/^\//.test(item.path)) {
      newContextPath = item.path;
    } else {
      newContextPath = `${routeContextPath}/${item.path || ''}`;
    }
    newContextPath = newContextPath.replace(/\/+/g, '/');
    if (item.component && item.children) {
      const childRoutes = renderRoutes(item.children, newContextPath, configOptions);
      children.push(
        <Route
          key={newContextPath}
          render={props => <item.component {...props}>{childRoutes}</item.component>}
          path={newContextPath}
        />
      );
    } else if (item.component) {
      children.push(<Route key={newContextPath} component={item.component} path={newContextPath} exact />);
    } else if (item.children) {
      item.children.forEach(child => renderRouteItem(child, newContextPath));
    }
  };
  routesConfig.forEach(item => renderRouteItem(item, contextPath, true));
  // Add not matched page (404)
  if (redirect404) {
    if (authenticated) {
      children.push(<Route key='/not-match' component={()=><Redirect to={redirect404}/>} />);
    }
  }
  // Use Switch so that only the first matched route is rendered.
  return routeType === 'hash' ? (
    <HashRouter>
      <Switch>{children}</Switch>
    </HashRouter>
  ) : (
    <BrowserRouter>
      <Switch>{children}</Switch>
    </BrowserRouter>
  );
};

export const createHistory = (routeType = 'hash') => {
  routeType = routeType.toLowerCase();
  if (routeType === 'browser') {
    return createBrowserHistory();
  } else if (routeType === 'memory'){
    return createMemoryHistory();
  } else {
    return createHashHistory();
  }
};

export const getRouteParam = (name, props) => {
  if (name && props && props.match) {
    return props.match.params[name];
  }
  return '';
};

export const getRouteQueryParam = (name, props) => {
  if (name && props && props.location) {
    return UrlUtil.getQueryValue(name, props.location.search);
  }
  return '';
};

export const getParam = (name, props, query = false) => {
  return query ? getRouteQueryParam(name, props) : getRouteParam(name, props);
};
