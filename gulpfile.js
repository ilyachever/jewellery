// Gulp
import gulp from 'gulp';
// Paths
const srcFolder = './src';
const buildFolder = './dist'
const paths = {
  //Styles
  srcStyles: `${srcFolder}/scss/**/*.scss`,
  buildStyles: `${buildFolder}/css`,
  // HTML
  srcPartials: `${srcFolder}/partials/`,
  // Styles
  srcAllJsFiles: `${srcFolder}/scripts/**/*.js`,
  srcIndexJs: `${srcFolder}/scripts/index.js`,
  buildALlJs: `${buildFolder}/scripts/`,
  // Images
  srcSprite: `${srcFolder}/images/sprite/*.svg`,
  buildSprite: `${buildFolder}/images/sprite/`,
  srcAllImages: `${srcFolder}/images/`,
  buildAllImages: `${buildFolder}/images/`,
  // Assets
  srcAssets: `${srcFolder}/assets`,
  buildAssets: `${buildFolder}/assets`,
  // Vendors
  srcVendors: `${srcFolder}/scss/vendor/*.css`,
  buildVendors: `${buildFolder}/css/`,
  // Fonts
  srcFonts: `${srcFolder}/fonts`,
  buildFonts: `${buildFolder}/fonts`,
}

let isBuildVersion = false; // Development Version by Default

const onProduction = (done) => {
  isBuildVersion = true;
  done();
}

// Error messages
import notify from 'gulp-notify';
// Gulp If
import gulpIf from 'gulp-if';
// Clean
import { deleteAsync } from 'del';

const clean = () => {
  return deleteAsync([buildFolder]);
}

// Styles
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import plumber from 'gulp-plumber';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';

const styles = () => {
  return gulp.src(paths.srcStyles, { sourcemaps: !isBuildVersion })
    .pipe(plumber(
      notify.onError({
        title: "SCSS",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(sass())
    .pipe(autoprefixer({
      cascade: false,
      grid: true,
      overrideBrowserslist: ["last 5 versions"]
    }))
    .pipe(gulpIf(isBuildVersion, cleanCSS({
      level: 2,
    })))
    .pipe(gulp.dest(paths.buildStyles, { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// HTML
import fileInclude from 'gulp-file-include';
import htmlmin from 'gulp-htmlmin';
import typograf from 'gulp-typograf';

const htmlInclude = () => {
  return gulp.src([`${srcFolder}/*.html`])
    .pipe(fileInclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(typograf({
      locale: ['ru', 'en-US']
    }))
    .pipe(gulp.dest(buildFolder))
    .pipe(browser.stream());
}

const htmlMinify = () => {
  return gulp.src(`${buildFolder}/**/*.html`)
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest(buildFolder));
}

// Scripts
import webpackStream from 'webpack-stream';
import terser from 'gulp-terser';

const scripts = () => {
  return gulp.src(paths.srcIndexJs)
    .pipe(plumber(
      notify.onError({
        title: "JS",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(webpackStream({
      mode: isBuildVersion ? 'production' : 'development',
      output: {
        filename: 'index.js'
      },
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: "defaults" }]
                ]
              }
            }
          }
        ]
      },
      devtool: !isBuildVersion ? 'source-map' : false
    }))
    .on('error', function (err) {
      console.error('WEBPACK ERROR', err);
      this.emit('end');
    })
    .pipe(gulpIf(isBuildVersion, terser()))
    .pipe(gulp.dest(paths.buildALlJs))
    .pipe(browser.stream())
}

// Images
import imagemin from 'gulp-imagemin';
import gifsicle from 'imagemin-gifsicle'
import mozjpeg from 'imagemin-mozjpeg'
import optipng from 'imagemin-optipng'
import webp from 'gulp-webp'
import svgMin from 'gulp-svgmin'
import svgCheerio from 'gulp-cheerio';
import svgSprite from 'gulp-svg-sprite';
import replace from 'gulp-replace';

const images = () => {
  return gulp.src([`${paths.srcAllImages}/**/*.{img,jpg,jpeg,png,svg}`])
    .pipe(gulpIf(isBuildVersion, imagemin(
      [
        gifsicle({ interlaced: true, optimizationLevel: 2 }),
        mozjpeg({ quality: 75, progressive: true }),
        optipng({ optimizationLevel: 5 }),
      ],
      {
        verbose: true,
      }
    )))
    .pipe(gulp.dest(paths.buildAllImages))
};

const createWebp = () => {
  return gulp.src([`${paths.srcAllImages}/**/*.{img,jpg,jpeg,png}`])
    .pipe(webp())
    .pipe(gulp.dest(paths.buildAllImages))
};

const createSprite = () => {
  return gulp.src(paths.srcSprite)
    .pipe(
      svgMin({
        js2svg: {
          pretty: true,
        },
      })
    )
    // .pipe(
    //   svgCheerio({
    //     run: function ($) {
    //       $('[fill]').removeAttr('fill');
    //       $('[stroke]').removeAttr('stroke');
    //       $('[style]').removeAttr('style');
    //     },
    //     parserOptions: {
    //       xmlMode: true
    //     },
    //   })
    // )
    .pipe(replace('&gt;', '>'))
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: "../sprite.svg"
        }
      },
    }))
    .pipe(gulp.dest(paths.buildSprite))
}

// Fonts
import ttf2woff from 'gulp-ttf2woff';
import ttf2woff2 from 'gulp-ttf2woff2';

export const fonts = () => {
  gulp.src([`${paths.srcFonts}/*.ttf`])
    .pipe(ttf2woff())
    .pipe(gulp.dest(paths.srcFonts))
  return gulp.src([`${paths.srcFonts}/*.ttf`])
    .pipe(ttf2woff2())
    .pipe(gulp.dest(paths.srcFonts))
}

// Copy Files

const copyAssets = () => {
  return gulp.src(`${paths.srcAssets}/**/*`)
    .pipe(gulp.dest(paths.buildAssets))
}

const copyVendors = () => {
  return gulp.src(paths.srcVendors)
    .pipe(gulp.dest(paths.buildVendors))
}

const copyFonts = () => {
  return gulp.src('./src/fonts/*.{woff,woff2}')
    .pipe(gulp.dest('./dist/fonts'))
}

const copyIcons = () => {
  return gulp.src([`${srcFolder}/*.ico`, `${srcFolder}/*.webmanifest`])
    .pipe(gulp.dest(buildFolder))
}

const copy = (done) => {
  copyAssets();
  copyVendors();
  copyFonts();
  copyIcons();
  done();
}

// Watch for files
import browser from 'browser-sync';

const watchFiles = () => {
  browser.init({
    server: {
      baseDir: "./dist"
    }
  });

  gulp.watch(paths.srcStyles, styles);
  gulp.watch(`${paths.srcPartials}*.html`, htmlInclude);
  gulp.watch(`${srcFolder}/*.html`, htmlInclude);
  gulp.watch(paths.srcAllJsFiles, scripts);
  gulp.watch(paths.srcAllImages, images);
  gulp.watch(paths.srcFonts, fonts);
  gulp.watch(paths.srcFonts, copyFonts);
  gulp.watch(paths.srcSprite, createSprite);
  gulp.watch(`${paths.srcAssets}/**/*`, copyAssets);
  gulp.watch(paths.srcVendors, copyVendors);
  gulp.watch([`${srcFolder}/*.ico`, `${srcFolder}/*.webmanifest`], copyIcons);
}

// Actions
export default gulp.series(
  clean,
  htmlInclude,
  styles,
  scripts,
  copy,
  images,
  createWebp,
  createSprite,
  watchFiles
)

export const build = gulp.series(
  onProduction,
  clean,
  htmlInclude,
  styles,
  scripts,
  copy,
  images,
  createWebp,
  createSprite,
  htmlMinify,
  watchFiles
)
