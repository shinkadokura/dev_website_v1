import $ from 'jquery';

// export文を使ってmenu関数を定義する。
export function scrollVisibleHide() {
  // console.log('scrollVisibleHide');

  $(window).on('scroll', function(){
    if($(this).scrollTop() > 200) {
      $("body").addClass('active');
    }else{
      $("body").removeClass('active');
    }
  });

}