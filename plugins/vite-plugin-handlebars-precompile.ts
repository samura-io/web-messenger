import Handlebars from "handlebars";

export default function handlebars() {
    const fileRegexp = /\.hbs$|\.handlebars$/;

    console.log('qwe')

    return {
        name: 'vite-plugin-handlebars-precompile',
        transform(src, id){
            if (!fileRegexp.test(id)) {
                return;
            }

            const code = `
                import Handlebars from 'handlebars/runtime';

                export default Handlebars.template(${Handlebars.precompile(src)});
            `

            return {
                code
            }
        }
    }
}