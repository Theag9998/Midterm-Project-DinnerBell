// public/scripts/checkConfirmation.js

const setIntervalLoop = () => {
  const intervalId = setInterval(()=> {
    const orderId = $('#orderId').text();
    $.get(`/confirmation/${orderId}`)
      .then(data => {
        if (data) {
          const pickUpTime = new Date(data.pickUpTime);
          $('#pickUpTime').text(`${pickUpTime.getHours()}:${pickUpTime.getMinutes()}`);
          clearInterval(intervalId);
        }
      });
  }, 5000);
}

$(document).ready(setIntervalLoop());
