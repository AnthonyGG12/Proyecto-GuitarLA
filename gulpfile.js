const { src, dest, watch, series } = require('gulp');

// Compilar CSS
const sass = require('gulp-sass')(require('sass'));
const purgecss = require('gulp-purgecss');
const rename = require('gulp-rename');

// Imagenes
const imagemin = require('gulp-imagemin');

function css() {
    return  src('src/scss/app.scss') // Identificar el archivo principal
        .pipe( sass() ) // Compilar SASS
        .pipe( dest('build/css') ) // Exportarlo o guardarlo en una ubicación
}

function cssbuild() {
    return  src('build/css/app.css')
        .pipe( rename({
            suffix: '.min'
        }))
        .pipe( purgecss({
            content: ['index.html', 'base.html', 'blog.html', 'nosotros.html', 'producto.html', 'tienda.html']
        }))
        .pipe( dest('build/css'))
}

function compilar() {
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*')
}

function imagenes() {
    return  src('src/img/**/*')
        .pipe( imagemin({ optimizationLevel: 3}) )
        .pipe( dest('build/img') )
}

exports.css = css;
exports.compilar = compilar;
exports.imagenes = imagenes;
exports.build = series( cssbuild );