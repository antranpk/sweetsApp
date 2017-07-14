var Validate = {
  init: function(){
    this.validateEmail();
  },
  validateEmail: function(){
    $("#update-info").on("click", function(e){
      e.preventDefault();
      var erro = 0;
      var email = $("input[name='email']").val();
      var numPhone = $('input[name="phone-number"]').val();
      var numCode1 = $('input[class="num-code1"]').val();
      var numCode2 = $('input[class="num-code2"]').val();
      var regexMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      var regexNumric = new RegExp(/^\+?[0-9(),.-]+$/);
      
      if (!regexMail.test(email)) {
        $(".alert-email").text("Email invalid!!").show();
        ++erro;
      }else{
        $(".alert-email").text("Email invalid!!").hide();
      }
      if (!regexNumric.test(numPhone)) {
        $(".alert-phone").show();
        ++erro;
      } else {
         $(".alert-phone").hide();
      }
      if (!regexNumric.test(numCode1) || !regexNumric.test(numCode2)) {
        $(".alert-code").show();
        ++erro;
      } else {
        $(".alert-code").hide();
      }
      if(!erro > 0){
        $('form').submit();
        alert('submit form thanh cong!!!');
      }
    });
  },
};
$(document).ready(function(){
  $('#datepicker').datetimepicker({
    format: 'L',
    icons: {
      next: "fa fa-chevron-right",
      previous: "fa fa-chevron-left"
    }
  });
  $('#page-top').click(function(){
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
  });
});

