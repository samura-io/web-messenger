/// <reference types="vite/client" />

declare module '*.hbs' {
    const template: Handlebars.TemplateDelegate;
    export default template;
  }
  