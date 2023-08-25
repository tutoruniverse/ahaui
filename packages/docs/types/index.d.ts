declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module 'holderjs' {
  function addTheme (theme: string): void;

  export default {
    addTheme,
  };
}
