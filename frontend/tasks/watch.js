var gulp = require('gulp');

gulp.task('watch', function () {
  gulp.watch([
    './frontend/**/*',
    '!./frontend/.tmp/**/*',
    '!./frontend/tasks/**/*',
  ], ['css:debug', 'js:debug']);
});

gulp.task('build', ['css:debug', 'js:debug']);
gulp.task('deploy', ['css:deploy', 'js:deploy']);