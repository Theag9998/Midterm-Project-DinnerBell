$(document).ready(function() {


  $('.my-orders-button').click(function(event) {
    $(this).closest('.order-row').children('.food-row').slideToggle(100)

    console.log(event.target)
  })

  // $('.my-orders-button').click(function(event) {
  //   $(event.target).parent().parent().next().slideToggle(200);
  //   console.log(event.target)
  // })

})

