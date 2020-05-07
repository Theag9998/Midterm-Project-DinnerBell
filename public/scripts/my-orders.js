




// $('.tweet-form').submit(function(event) {
//   event.preventDefault();
//   const formData = $(this).serialize();

//   const $counter = Number($('.counter')[0].innerText);
//   const $tweetAlert = $('.tweet-alert');
//   const $alertMsg = $('.alert-msg');

//   if ($counter === 140) {
//     const noText = 'Oops, you forgot to write a message!';
//     $alertMsg.text(`${noText}`);
//     $tweetAlert.slideDown('slow').delay(3000).slideUp('slow');
//     return;

//   } else if ($counter < 0) {
//     const overLmt = 'Oops, you went over the character limit!';
//     $alertMsg.text(`${overLmt}`);
//     $tweetAlert.slideDown('slow').delay(3000).slideUp('slow');
//     return;

//   }
