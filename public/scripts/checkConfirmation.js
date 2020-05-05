const checkConfirmation = () => {
  $.get('/confirmation/1')
  .then(data => {
    const pickUpTime = new Date(data.orders.pick_up_date_time);
    console.log('data :>> ', data);
    $('#pickUpTime').text(`${pickUpTime.getHours()}:${pickUpTime.getMinutes()}pm`);
  }) 
} 

$(document).ready(checkConfirmation());