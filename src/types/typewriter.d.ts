// src/types/typewriter.d.ts
declare module 'typewriter-effect/dist/core.js' {
  const TypewriterCore: new (
    container: HTMLElement | string,
    options?: any
  ) => any;
  export default TypewriterCore;
}