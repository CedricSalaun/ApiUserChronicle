export function findRouteHandler(method, url, ...domains) {
  const routes = domains.map(routes => routes[method]).filter(Boolean);
  const matchedRoutes = routes.map(routes =>
    Object.entries(routes).find(([route]) => {
      const regex = new RegExp(`^${route.replace(/:[^\s/]+/g, '([\\w-]+)')}$`);
      return url.match(regex);
    })
  )
  .filter(Boolean);

  return matchedRoutes.map(([, controller]) => controller).shift();
}
