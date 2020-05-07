const setIntervalLoop = () => {
    $.get('/restaurant')
      .then(data => {
        if (data.pickUpTime) {
          const pickUpTime = new Date(data.pickUpTime);
          $('#pickUpTime').text(`${pickUpTime.getHours()}:${pickUpTime.getMinutes()}`);
          clearInterval(intervalId);
        }
  }, 5000);
}

$(document).ready(setIntervalLoop());