export const dynamicLoader = async (name: string) => {
  const module = await import(/* webpackChunkName: 'connector' */ `./${name}`)

  return module.default
}
