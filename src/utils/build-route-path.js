export function buildRoutePath(path) {
  const RouteParametersRegex = /:([a-zA-Z]+)/g
  const pathWithParams = path.replaceAll(RouteParametersRegex, '(?<$1>[a-z0-9\-_]+)')

  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

  return pathRegex
}
