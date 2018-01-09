$(document).ready(function() {
  $('.info-wrapper').hide()
  $('.member').on('mouseover', function() {
    let id = '#' + $(this).data('id')
    $(id).fadeIn(500)
  })

  $('.member').on('mouseleave', function() {
    let id = '#' + $(this).data('id')
    $(id).fadeOut(500)
  })
})
