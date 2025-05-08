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

  if ($icon.hasClass('icon-arrow-left')) {
    $icon.removeClass('icon-arrow-left').addClass('icon-arrow-right');
  } else {
    $icon.removeClass('icon-arrow-right').addClass('icon-arrow-left');
  }
});

/**
 * PAGE 스크립트
 */
