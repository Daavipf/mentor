function formatEnemUrl(urlString: string, path: string = "/assets"): string {
  try {
    const url = new URL(urlString);

    const cleanPath = path.endsWith("/") ? path.slice(0, -1) : path;

    return `${cleanPath}${url.pathname}`;
  } catch (error) {
    throw new Error("A string fornecida não é uma URL válida.");
  }
}

export { formatEnemUrl };
