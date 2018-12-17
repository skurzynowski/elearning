jQuery(document).ready(function ($) {
  $('[value=\'download_csv\']').click(function () {
    window.location.search += '&downloadcsv';
  })
  $('[value=\'download_users\']').click(function () {
    window.location.search += '&downloadusers';
  })
})
