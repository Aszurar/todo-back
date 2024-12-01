/**
 * Constrói uma expressão regular para correspondência de rotas dinâmicas, com o objetivo
 * de extrair valores dos Route Params.
 *
 * Esta função converte uma rota que contém parâmetros dinâmicos (indicados por `:`)
 * em uma expressão regular que pode ser usada para identificar e extrair valores dos parâmetros da rota.
 *
 * @param {string} path - A rota que pode conter parâmetros dinâmicos no formato `:param`.
 * @returns {RegExp} Retorna uma expressão regular que corresponde à rota e captura os parâmetros nomeados.
 *
 * @example
 * const regex = buildRoutePath('/users/:id');
 * console.log(regex); // /^\/users\/(?<id>[a-z0-9\-_]+)/
 *
 * const match = '/users/123'.match(regex);
 * console.log(match.groups.id); // '123'
 *
 * @example
 * const regex = buildRoutePath('/products/:category/:productId');
 * console.log(regex); // /^\/products\/(?<category>[a-z0-9\-_]+)\/(?<productId>[a-z0-9\-_]+)/
 *
 * const match = '/products/electronics/456'.match(regex);
 * console.log(match.groups.category); // 'electronics'
 * console.log(match.groups.productId); // '456'
 */
export function buildRoutePath(path: string) {
  const routeParametersRegex = /:([a-zA-Z]+)/g
  const pathWithoutParameters = path.replaceAll(
    routeParametersRegex,
    '(?<$1>[a-z0-9\\-_]+)',
  )

  const pathRegex = new RegExp(`^${pathWithoutParameters}(?<query>\\?(.*))?$`)

  return pathRegex
}
