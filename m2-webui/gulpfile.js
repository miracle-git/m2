'use strict'

const { series, src, dest } = require('gulp')
const less = require('gulp-less')
const autoprefixer = require('gulp-autoprefixer')
const cssmin = require('gulp-cssmin')
const theme = './packages/theme-grace'

const compile = () => {
  return src(`${theme}/src/*.less`)
    .pipe(less())
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cssmin())
    .pipe(dest(`${theme}/lib`))
}

const copy = () => {
  return src([
    `${theme}/lib/**/*`,
    `!${theme}/lib/vars.css`,
    `!${theme}/lib/mixins.css`,
    `!${theme}/lib/header.css`,
    `!${theme}/lib/content.css`,
    `!${theme}/lib/sidebar.css`
  ]).pipe(dest('./lib/theme-grace'))
}

exports.build = series(compile, copy)
