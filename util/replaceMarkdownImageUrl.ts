import { formatEnemUrl } from "./formatEnemUrl";

export function replaceMarkdownImageUrls(text: string | null, pathTemplate?: string): string | null {
  if (!text) return null;

  // Regex para capturar a sintaxe: ![alt](url)
  // Grupo 1 ($1): texto alternativo (alt)
  // Grupo 2 ($2): a URL da imagem
  const markdownImageRegex = /!\[([^\]]*)\]\((.*?)\)/g;

  return text.replace(markdownImageRegex, (match, alt, imageUrl) => {
    try {
      const newUrl = formatEnemUrl(imageUrl, pathTemplate);
      return `![${alt}](${newUrl})`;
    } catch (error) {
      console.error(`Erro ao formatar a URL [${imageUrl}]:`, error);
      return match;
    }
  });
}
