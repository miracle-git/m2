import navConfig from '../nav.conf'
import langs from '../i18n/route'
import { trimChar } from '../utils'

const LOAD_MAP = {
  'zh-CN': name => {
    return r => require.ensure([], () => r(require(`../views/zh-CN/${name}.vue`)), 'zh-CN')
  },
  'en-US': name => {
    return r => require.ensure([], () => r(require(`../views/en-US/${name}.vue`)), 'en-US')
  }
}

const load = function(lang, path) {
  return LOAD_MAP[lang](trimChar(path, '/'))
}

const LOAD_DOCS_MAP = {
  'zh-CN': path => {
    return r => require.ensure([], () => r(require(`../docs/zh-CN${path}.md`)), 'zh-CN')
  },
  'en-US': path => {
    return r => require.ensure([], () => r(require(`../docs/en-US${path}.md`)), 'en-US')
  }
}

const loadDocs = function(lang, path) {
  return LOAD_DOCS_MAP[lang](path)
}

const registerRoute = (navConfig) => {
  const route = []
  Object.keys(navConfig).forEach((lang, index) => {
    const navs = navConfig[lang]
    route.push({
      path: `/${lang}/component`,
      redirect: `/${lang}/component/install`,
      component: load(lang, 'component'),
      children: []
    })
    navs.forEach(nav => {
      if (nav.href) return
      if (nav.groups) {
        nav.groups.forEach(group => {
          group.list.forEach(nav => {
            addRoute(nav, lang, index)
          })
        })
      } else if (nav.children) {
        nav.children.forEach(nav => {
          addRoute(nav, lang, index)
        })
      } else {
        addRoute(nav, lang, index)
      }
    })
  })

  function addRoute(page, lang, index) {
    const tplPages = ['/changelog', '/theme-preview']
    const component = tplPages.indexOf(page.path) > -1
      ? load(lang, page.path)
      : loadDocs(lang, page.path)
    const child = {
      path: page.path.slice(1),
      meta: {
        title: page.title || page.name,
        description: page.description,
        lang
      },
      name: 'component-' + lang + (page.title || page.name),
      component: component.default || component
    }
    route[index].children.push(child)
  }
  return route
}

let route = registerRoute(navConfig)

const generateMiscRoutes = function(lang) {
  const indexRoute = {
    path: `/${lang}`,
    redirect: `/${lang}/component`
  }

  return [indexRoute]
}

langs.forEach(lang => {
  route = route.concat(generateMiscRoutes(lang.lang))
})

// route.push({
//   path: '/play',
//   name: 'play',
//   component: () => import('../play/index.vue')
// })

const userLanguage = localStorage.getItem('M2_LANGUAGE') || window.navigator.language || 'en-US'
let defaultPath = '/en-US'
if (userLanguage.indexOf('zh-') !== -1) {
  defaultPath = '/zh-CN'
}

route = route.concat([{
  path: '/',
  redirect: defaultPath
}, {
  path: '*',
  redirect: defaultPath
}])

export default route
