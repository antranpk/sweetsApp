$(document).ready(function(){
  $('#datepicker').datetimepicker({
    format: 'L',
    icons: {
      next: "fa fa-chevron-right",
      previous: "fa fa-chevron-left"
    }
  });
  $('#to-top').click(function(){
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
  });
});