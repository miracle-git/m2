import QueryResult from './src/main'

QueryResult.install = (Vue) => {
  Vue.component(QueryResult.name, QueryResult)
}

export default QueryResult
