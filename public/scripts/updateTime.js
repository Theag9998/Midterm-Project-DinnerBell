$(document).ready(function() {
  $('.my-orders-button').on('click', (event) => {
   const timeBox =  $('.time-box').val();
   const orderId =  $('.orderId').val();
   const reqData = {'estimatedTime': timeBox, 'orderId': orderId}
   $.post('/restaurant/updateTime',reqData);
  })
})
