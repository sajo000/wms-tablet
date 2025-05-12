/**
 * SIDEBAR 스크립트
 */
$(document).on('click', '.btn-sidebar-toggle', function () {
  const $leftSide = $('.left-side');
  const $icon = $(this).find('.icon-sidebar-toggle');

  if ($leftSide.length === 0 || $icon.length === 0) {
    console.warn('필요한 요소를 찾을 수 없습니다.');
    return;
  }

  $leftSide.toggleClass('collapsed');

  if ($icon.hasClass('icon-sidebar-arrow-left')) {
    $icon.removeClass('icon-sidebar-arrow-left').addClass(
        'icon-sidebar-arrow-right');
  } else {
    $icon.removeClass('icon-sidebar-arrow-right').addClass(
        'icon-sidebar-arrow-left');
  }
});

/**
 * PAGE 스크립트
 */
$(function(){
  // 셀렉트 열기/닫기
  $(document).on('click', '.custom-select', function(e){
    $('.custom-select').not(this).removeClass('open');
    $('.custom-select-list').not($(this).next()).hide();
    $(this).toggleClass('open');
    $(this).next('.custom-select-list').toggle();
    e.stopPropagation();
  });

  // 옵션 선택
  $(document).on('click', '.custom-select-list li', function(e){
    var $wrap = $(this).closest('.custom-select-wrap');
    var value = $(this).data('value');
    var text = $(this).text();
    $wrap.find('.custom-select-selected').text(text);
    $wrap.find('input[type="hidden"]').val(value);
    $wrap.find('.custom-select-list li').removeClass('selected');
    $(this).addClass('selected');
    $wrap.find('.custom-select').removeClass('open');
    $wrap.find('.custom-select-list').hide();
    e.stopPropagation();
  });

  // 외부 클릭 시 닫기
  $(document).on('click', function(){
    $('.custom-select').removeClass('open');
    $('.custom-select-list').hide();
  });
});
