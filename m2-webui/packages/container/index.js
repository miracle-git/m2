import Container from './src/main'

Container.install = (Vue) => {
  Vue.component(Container.name, Container)
}

export default Container
