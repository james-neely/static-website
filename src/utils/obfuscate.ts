const KEY = "jn-site-k8x2m";

export function encode(text: string): string {
  const xored = text
    .split("")
    .map((char, i) =>
      String.fromCharCode(char.charCodeAt(0) ^ KEY.charCodeAt(i % KEY.length)),
    )
    .join("");
  return btoa(xored);
}

export function decode(encoded: string): string {
  const xored = atob(encoded);
  return xored
    .split("")
    .map((char, i) =>
      String.fromCharCode(char.charCodeAt(0) ^ KEY.charCodeAt(i % KEY.length)),
    )
    .join("");
}
