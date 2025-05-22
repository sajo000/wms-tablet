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
 * SIDEBAR 센터 드롭다운 메뉴
 */
$(document).on('click', '.sidebar-center-name', function (e) {
  e.preventDefault();

  const $toggle = $(this);
  const $menu = $('.global-dropdown-menu');

  // 현재 토글 위치와 크기 계산
  const offset = $toggle.offset();
  const height = $toggle.outerHeight();

  // 드롭다운 메뉴 위치 조정 및 표시
  $menu.css({
    left: offset.left,
    top: offset.top + height, // 바로 아래에 위치
    display: 'block'
  });

  // 이미 열려있으면 닫기
  if ($menu.data('opened')) {
    $menu.hide();
    $menu.data('opened', false);
    return;
  }

  $menu.data('opened', true);

  // 바깥 클릭 시 닫기
  $(document).one('mousedown.dropdownMenu', function (event) {
    if (!$(event.target).closest(
        '.global-dropdown-menu, .sidebar-center-name').length) {
      $menu.hide();
      $menu.data('opened', false);
    }
  });
});

/**
 * SELECT FORM 스크립트
 */
$(function () {
  // 셀렉트 열기/닫기
  $(document).on('click', '.form-select', function (e) {
    $('.form-select').not(this).removeClass('open');
    $('.form-select-list-wrap').not($(this).next()).hide();
    $(this).next('.form-select-list-wrap').toggle();
    $(this).toggleClass('open');
    e.stopPropagation();
  });

  // 옵션 선택
  $(document).on('click', '.form-select-list li', function (e) {
    const $wrap = $(this).closest('.form-select-wrap');
    const value = $(this).data('value');
    const text = $(this).text();
    $wrap.find('.form-select-selected').text(text);
    $wrap.find('input[type="hidden"]').val(value);
    $wrap.find('.form-select-list li').removeClass('selected');
    $(this).addClass('selected');
    $wrap.find('.form-select').removeClass('open');
    $wrap.find('.form-select-list-wrap').hide();
    e.stopPropagation();
  });

  // 외부 클릭 시 닫기
  $(document).on('click', function () {
    $('.form-select').removeClass('open');
    $('.form-select-list-wrap').hide();
  });
});

/**
 * SEARCH INPUT ICON 바뀌는 스크립트
 */
$(document).ready(function () {
  // (1) form-control + form-select (검색 input)
  $('.form-search').each(function () {
    const $input = $(this);
    const $group = $input.closest('.position-relative');
    const $icon = $group.find('.form-group-append i');
    const $btn = $group.find('.btn-clear');

    // --- [추가] 페이지 로드시 value가 있으면 icon-close, 없으면 icon-search ---
    if ($input.val().length > 0) {
      $icon.removeClass('icon-search').addClass('icon-close').show();
    } else {
      $icon.removeClass('icon-close').addClass('icon-search').show();
    }

    $input.on('input', function () {
      if ($input.val().length > 0) {
        $icon.removeClass('icon-search').addClass('icon-close').show();
      } else {
        // 입력 내용 없을 때 포커스 여부에 따라 아이콘 변경
        if ($input.is(':focus')) {
          $icon.removeClass('icon-search').addClass('icon-close').show();
        } else {
          $icon.removeClass('icon-close').addClass('icon-search').show();
        }
      }
    });

    $input.on('focus', function () {
      // 포커스 시 무조건 icon-close
      $icon.removeClass('icon-search').addClass('icon-close').show();
    });

    $input.on('blur', function () {
      // 포커스 해제 시 내용이 없으면 icon-search, 있으면 icon-close 유지
      if ($input.val().length === 0) {
        $icon.removeClass('icon-close').addClass('icon-search').show();
      }
    });

    $btn.on('click', function () {
      $input.val('').trigger('input').focus();
      $icon.removeClass('icon-close').addClass('icon-search').show();
    });
  });

  // (2) form-control만 있는 경우
  $('.form-input-only').each(function () {
    const $input = $(this);
    const $group = $input.closest('.position-relative');
    const $icon = $group.find('.form-group-append i');
    const $btn = $group.find('.btn-clear');
    const $append = $group.find('.form-group-append');

    // --- [추가] 페이지 로드시 value가 있으면 x버튼 보이기, 없으면 숨김 ---
    if ($input.val().length > 0) {
      $icon.removeClass('icon-search').addClass('icon-close');
      $append.show();
    } else {
      $append.hide();
    }

    $input.on('input', function () {
      if ($input.val().length > 0) {
        $icon.removeClass('icon-search').addClass('icon-close');
        $append.show();
      } else {
        if ($input.is(':focus')) {
          $icon.removeClass('icon-search').addClass('icon-close');
          $append.show();
        } else {
          $append.hide();
        }
      }
    });

    $input.on('focus', function () {
      $icon.removeClass('icon-search').addClass('icon-close');
      $append.show();
    });

    $btn.on('click', function () {
      $input.val('').trigger('input').focus();
      $append.hide();
    });
  });
});

/**
 * 기본 TOAST 팝업
 */
$(document).ready(function () {
  // 각 버튼에 클릭 이벤트를 바인딩
  $('.showToastButton').on('click', function () {
    // 버튼의 data-toast-target 속성에서 대상 토스트의 ID를 가져옴
    const toastId = $(this).data('toast-target');
    const $toast = $('#' + toastId);

    // 토스트 팝업이 존재하는지 확인
    if ($toast.length) {
      $toast.fadeIn(200).addClass('show'); // 토스트 팝업을 페이드인으로 표시
      setTimeout(function () {
        $toast.fadeOut(200).removeClass('show'); // 2초 후 페이드아웃으로 숨김
      }, 3000); // 3초 동안 보여줌
    }
  });
});

/**
 * 상태별 토스트 팝업
 */
$(document).ready(function () {
  // 각 버튼에 클릭 이벤트를 바인딩
  $('.showToastButtonState').on('click', function () {
    const toastId = $(this).data('toast-target');
    const $toast = $('#' + toastId);

    // 토스트 팝업이 존재하는지 확인
    if ($toast.length) {
      // "toast-state-btn" 클래스가 있으면 자동 닫힘 X
      if ($toast.hasClass('toast-state-btn')) {
        $toast.fadeIn(200).addClass('show');
        // 닫기는 버튼(data-bs-dismiss="toast")을 누를 때만
        $toast.find('[data-bs-dismiss="toast"]').on('click', function () {
          $toast.fadeOut(200).removeClass('show');
        });
      } else {
        // 버튼 없는 토스트는 1.5초 후 자동 닫힘
        $toast.fadeIn(200).addClass('show');
        setTimeout(function () {
          $toast.fadeOut(200).removeClass('show');
        }, 1500);
      }
    }
  });
});
