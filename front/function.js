/**
 * SIDEBAR 스크립트
 */
$(document).ready(function () {
  const $btnToggle = $('.btn-sidebar-toggle');
  if ($btnToggle.length === 0) {
    console.warn('버튼 요소를 찾을 수 없습니다.');
    return;
  }

  $btnToggle.on('click', function () {
    const $leftSide = $('.left-side');
    const $icon = $(this).find('.icon-sidebar-toggle'); // . 추가

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

    // 메뉴 텍스트 숨기기/보이기 처리는 CSS에서 transition과 opacity로 처리
  });
});

/**
 * PAGE 스크립트
 */
