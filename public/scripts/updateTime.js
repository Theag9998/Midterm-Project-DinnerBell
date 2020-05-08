//Pass the time into the confirmation page

$(document).ready(function() {
  $('.my-orders-button').on('click', (event) => {
   const timeBox =  $('.time-box').val();
   const orderId =  $('.orderId').val();
   const reqData = {'estimatedTime': timeBox, 'orderId': orderId}
   $.post(`/restaurant/${orderId}/confirm`, reqData);
   $(event.target).closest('.move-tr').detach().prependTo('.move-to-tbody');
  })
})
