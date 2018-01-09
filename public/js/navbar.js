$(document).ready(function() {
  $('#navbar-links').addClass('isClosed')
  $('#navbar-button').on("click", function() {
    $('#navbar-links').toggleClass('isOpen').toggleClass('isClosed')
  })
})
