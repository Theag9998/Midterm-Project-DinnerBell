$(document).ready(function() {


  $('.my-orders-button').click(function(event) {
    $(event.target).parent().parent().next().slideToggle('slow');
    console.log(event.target)
  })

})

