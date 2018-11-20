jQuery(document).ready(function ($) {
  $('[value=\'download_csv\']').click(function () {
    window.location.search += '&downloadcsv';
  })
})
