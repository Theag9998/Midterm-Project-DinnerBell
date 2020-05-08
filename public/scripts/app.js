// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });

$(document).ready(function() {
  $('.add-to-cart').click((event) => {
    const reqData = { foodId: event.target.value };
    $.post('/checkout', reqData, (res) => {
      const currentNum = parseInt($(event.target).next().text());
      $(event.target).next().text(currentNum ? currentNum + 1 : 1);
    });
  });

  $('.remove-from-cart').click((event) => {
    const reqData = { foodId: event.target.value };
    $.post('/checkout?_method=DELETE', reqData, (res) => {
      const currentNum = parseInt($(event.target).prev().text() || 0);
      $(event.target).prev().text(currentNum <= 0 ? 0 : currentNum - 1);
    });
  });
});


//In-Page JQuery to assign food_id to hidden form field: $('add-to-cart').click( (event)=> {
  // $('#something').val(menu_item_id);
  // });
// req.body.something
