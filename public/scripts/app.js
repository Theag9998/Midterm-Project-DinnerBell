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
      $(event.target).next().text(parseInt($(event.target).next().text()) + 1);
    });
  });

  $('.remove-from-cart').click((event) => {
    const reqData = { foodId: event.target.value };
    $.post('/checkout?_method=DELETE', reqData, (res) => {
      $(event.target).next().text(parseInt($(event.target).prev().text()) - 1);
    });
  });
});


//In-Page JQuery to assign food_id to hidden form field: $('add-to-cart').click( (event)=> {
  // $('#something').val(menu_item_id);
  // });
// req.body.something
