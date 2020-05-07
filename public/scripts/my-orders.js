$(document).ready(function() {

  $('.my-orders-button').click(function(event) {
    $(this).closest('.order-row').children('.food-row').slideToggle(100)

    console.log(event.target)
  })

})

