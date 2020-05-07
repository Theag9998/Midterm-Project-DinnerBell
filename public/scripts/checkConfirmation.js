// public/scripts/checkConfirmation.js

const setIntervalLoop = () => {
  const intervalId = setInterval(()=> {
    const orderId = $('#orderId').text();
    $.get(`/confirmation/${orderId}`)
      .then(data => {
        if (data.pickUpTime) {
          const pickUpTime = new Date(data.pickUpTime);
          const minutes = Math.round((pickUpTime.getTime() - Date.now()) / 1000 / 60);
          $('#pending-block').hide();
          $('#confirmed-block').show();
          $('#pickUpTime').text(`${minutes}`);
          $('#pending-bell').hide();
          $('#confirmed-bell').show();

          clearInterval(intervalId);
        }
      });
  }, 5000);
}

$(document).ready(setIntervalLoop());
