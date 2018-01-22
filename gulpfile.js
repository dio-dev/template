var gulp           = require('gulp'),
gutil          = require('gulp-util' ),
sass           = require('gulp-sass'),
browserSync    = require('browser-sync'),
concat         = require('gulp-concat'),
uglify         = require('gulp-uglify'),
cleanCSS       = require('gulp-clean-css'),
rename         = require('gulp-rename'),
del            = require('del'),
imagemin       = require('gulp-imagemin'),
cache          = require('gulp-cache'),
autoprefixer   = require('gulp-autoprefixer'),
ftp            = require('vinyl-ftp'),
sourcemaps     = require('gulp-sourcemaps'),
sourcemap     = require('gulp-sourcemap'),
notify         = require("gulp-notify");

// Скрипты проекта

gulp.task('common-js', function() {
	return gulp.src([
		'app/js/common.js',
		])
	.pipe(concat('common.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});

gulp.task('js', ['common-js'], function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/jquery.maskedinput.min.js',
		'app/libs/jquery.fancybox.min.js',
		'app/libs/jquery.animateNumber.min.js',
		'app/libs/jquery.easypiechart.js',
		'app/libs/jquery.viewportchecker.min.js',
		'app/libs/slick.min.js',  
		'app/js/common.min.js', // Всегда в конце
		])
	.pipe(sourcemaps.init({loadMaps: true}))
	.pipe(concat('scripts.min.js'))
	.pipe(uglify()) 
	.pipe(sourcemaps.write('../maps'))
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	});
});

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
	.pipe(sourcemaps.init({loadMaps: true}))
	.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
	// .pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(sourcemaps.write('../maps'))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});
gulp.task('watch', ['sass', 'js', 'browser-sync'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
	gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('imagemin', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin()))
	.pipe(gulp.dest('dist/img')); 
});

gulp.task('build', ['removedist', 'imagemin', 'sass', 'js'], function() {

	var buildFiles = gulp.src([
		'app/*.html',
		'app/.htaccess',
		]).pipe(gulp.dest('dist'));

	var buildCss  = gulp.src([
		'app/libs/jquery.fancybox.min.css',
		'app/libs/slick.css',
		'app/css/main.css'
		])
	.pipe(concat('main.min.css'))
	.pipe(cleanCSS({debug: true}, (details) => {
		console.log(`${details.name}: ${details.stats.originalSize}`);
		console.log(`${details.name}: ${details.stats.minifiedSize}`);
	}))
	.pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src([
		'app/js/scripts.min.js',
		'app/js/common.min.js'
		]).pipe(gulp.dest('dist/js'));

	var buildFonts = gulp.src([
		'app/fonts/**/*',
		]).pipe(gulp.dest('dist/fonts'));

});

gulp.task('deploy', function() {

	var conn = ftp.create({
		host:      'hostname.com',
		user:      'username',
		password:  'userpassword',
		parallel:  10,
		log: gutil.log
	});

	var globs = [
	'dist/**',
	'dist/.htaccess',
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.dest('/path/to/folder/on/server'));

});

gulp.task('removedist', function() { return del.sync('dist'); });
gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);
