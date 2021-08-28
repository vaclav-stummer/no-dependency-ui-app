/* Allows ts to compile *.html imports */
declare module '*.html' {
  const content: string
  export default content
}
