

let projectFolder = 'dist';
let sourceFolder = '#src';

let fs = require('fs');



let path = { //пути к файлам
	build: { //готовая выгрузка
		html: projectFolder + '/',
		// pug: projectFolder + '/',
		css: projectFolder + '/css/',
		js: projectFolder + '/js/',
		img: projectFolder + '/images/',
		fonts: projectFolder + '/fonts/',

	},
	src: { //исходники
		html: [sourceFolder + '/*.html', '!' + sourceFolder + '/_*.html',], //для того, чтоб не переносились файлы в папку дист которые начинаются с "_"
		// pug: sourceFolder + '/pug/*.pug',
		scss: sourceFolder + '/scss/main.scss',
		js: sourceFolder + '/js/*.js',
		// img: sourceFolder + '/images/**/*.{jpg, png, svg, gif, ico, webp}',
		img: sourceFolder + '/images/raster/**/*.*',
		svg: sourceFolder + '/images/svg/*.svg',
		fonts: sourceFolder + '/fonts/**/*.*',
	},
	watch: { //файлы за которыми следим
		html: sourceFolder + '/**/*.html',
		// pug: "src/pug/**/*.pug",
		css: sourceFolder + '/scss/**/*.scss',
		js: sourceFolder + '/js/**/*.js',
		// img: sourceFolder + '/images/**/*.{jpg, png, svg, gif, ico, webp}',
		img: sourceFolder + '/images/raster/**/*.*',
	},
	clean: './' + projectFolder + '/' //чистим папку дист
}

let { src, dest } = require('gulp'),
	gulp = require('gulp'),
	browsersync = require('browser-sync').create(),
	fileinclude = require('gulp-file-include'),
	del = require('del'),
	scss = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	groupmedia = require('gulp-group-css-media-queries'),
	cleancss = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	imagemin = require('gulp-imagemin'),
	webp = require('gulp-webp'),
	webphtml = require('gulp-webp-html'),
	webpcss = require('gulp-webpcss'),
	svgsprite = require('gulp-svg-sprite'),
	ttf2woff = require('gulp-ttf2woff'),
	ttf2woff2 = require('gulp-ttf2woff2'),
	fonter = require('gulp-fonter'),
	// pug = require('gulp-pug'),
	cheerio = require("gulp-cheerio"),
	svgstore = require("gulp-svgstore"),
	replace = require('gulp-replace'),
	svgmin = require("gulp-svgmin"),
	uglify = require('gulp-uglify-es').default;


function browserSync() {
	browsersync.init({
		server: {
			baseDir: './' + projectFolder + '/'
		},
		port: 3000,
		notify: false //посмотреть что за табличка там у браузера при обновлении
	})
}

function html() {
	return src(path.src.html)
		.pipe(fileinclude())
		.pipe(webphtml())
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream())
}

// function pugStream() {
//    return gulp.src(path.src.pug)
//      // .pipe(gulpPosthtml([include()]))
//       .pipe(pug({
//          pretty: true
//       }))
//       .pipe(gulp.dest(path.build.pug))
//       .pipe(browsersync.stream());
// }

function css() {
	return src(path.src.scss)
		.pipe(
			scss({
				outputStyle: 'expanded'
			})
		)
		.pipe(groupmedia())
		.pipe(
			autoprefixer({
				overrideBrowserslist: ['last 5 version'],
				cascade: true
			})
		)
		.pipe(webpcss({
			webpClass: '.webp',
			noWebpClass: '.no-webp'
		}))
		.pipe(dest(path.build.css))
		.pipe(cleancss())
		.pipe(rename({
			extname: '.min.css'
		}))
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream())
}

function js() {
	return src(path.src.js)
		.pipe(fileinclude())
		.pipe(dest(path.build.js))
		.pipe(
			uglify()
		)
		.pipe(rename({
			extname: '.min.css'
		}))
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream())
}

function images() {
	return src(path.src.img + '/aster/')
		.pipe(
			webp({
				quality: 70
			})
		)
		.pipe(dest(path.build.img + 'raster/'))
		.pipe(src(path.src.img))
		.pipe(
			imagemin({
				prgressive: true,
				svgoPlugins: [{ removeViewBox: false }],
				interlaced: true,
				optimizationLevel: 3
			})
		)
		.pipe(dest(path.build.img + 'raster/'))
		.pipe(browsersync.stream())
}

gulp.task('svgSprite', function () {
	return gulp.src(path.src.svg)
		// minify svg
		.pipe(svgmin({
			js2svg: {
				pretty: true
			}
		}))
		// remove all fill, style and stroke declarations in out shapes
		.pipe(cheerio({
			run: function ($) {
				$('[fill]').removeAttr('fill');
				$('[stroke]').removeAttr('stroke');
				$('[style]').removeAttr('style');
			},
			parserOptions: { xmlMode: true }
		}))
		// cheerio plugin create unnecessary string '&gt;', so replace it.
		.pipe(replace('&gt;', '>'))
		// build svg sprite
		.pipe(svgsprite({
			mode: {
				symbol: true
			},
			stack: {
				example: true
			}
		}))
		.pipe(rename('sprite.svg'))
		// .pipe(gulp.dest(projectFolder + '/images/'))
		.pipe(gulp.dest(path.build.img))
});

gulp.task('otf2ttf', function () {
	return src([sourceFolder + '/fonts/**/*.otf'])
		.pipe(fonter({
			formats: ['ttf']
		}))
		.pipe(dest(sourceFolder + '/fonts/'));
})

// function fonts() {
//    src(path.src.fonts)
//       .pipe(ttf2woff())
//       .pipe(dest(path.build.fonts));
//    return src(path.src.fonts)
//       .pipe(ttf2woff2())
//       .pipe(dest(path.build.fonts));
// }



gulp.task('copyFonts', () => {
	return gulp
		.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts));
})


function fontsStyle() {

	let file_content = fs.readFileSync(sourceFolder + '/scss/components/fonts.scss');


	if (file_content == '') {
		fs.writeFile(sourceFolder + '/scss/components/fonts.scss', '', cb);
		return fs.readdir(path.build.fonts, function (err, items) {
			if (items) {
				let c_fontname;
				for (var i = 0; i < items.length; i++) {
					let fontname = items[i].split('.');
					fontname = fontname[0];
					if (c_fontname != fontname) {
						fs.appendFile(sourceFolder + '/scss/components/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
					}
					c_fontname = fontname;
				}
			}
		})
	}
}
function fontsStyleSASS() {

	let file_content = fs.readFileSync(sourceFolder + '/sass/components/fonts.sass');


	if (file_content == '') {
		fs.writeFile(sourceFolder + '/sass/components/fonts.sass', '', cb);
		return fs.readdir(path.build.fonts, function (err, items) {
			if (items) {
				let c_fontname;
				for (var i = 0; i < items.length; i++) {
					let fontname = items[i].split('.');
					fontname = fontname[0];
					if (c_fontname != fontname) {
						fs.appendFile(sourceFolder + '/sass/components/fonts.sass', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
					}
					c_fontname = fontname;
				}
			}
		})
	}
}

function cb() {

}

function watchFiles() {
	gulp.watch([path.watch.html], html);
	// gulp.watch([path.watch.pug], pugStream);
	gulp.watch([path.watch.css], css);
	gulp.watch([path.watch.js], js);
	gulp.watch([path.watch.img], images);
}

gulp.task('clean', () => {
	return del(path.clean);
});


let build = gulp.series('clean', gulp.parallel(html, css, js, images, 'svgSprite', 'copyFonts'));
let watch = gulp.parallel(watchFiles, browserSync, build);



exports.watch = watch; //почитать про exports
exports.default = watch;
exports.build = build;
exports.hmtl = html;
// exports.pugStream = pugStream;
exports.css = css;
exports.js = js;
exports.images = images;
// exports.fonts = fonts;
// exports.svgSprite = svgSprite;
// exports.pugStream = pugStream;
exports.fontsStyle = fontsStyle;
exports.fontsStyleSASS = fontsStyleSASS;
