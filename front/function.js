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
 */$(document).on('click', '.sidebar-center-name', function (e) {
  e.preventDefault();

  var $toggle = $(this);
  var $menu = $('.global-dropdown-menu');

  // 현재 토글 위치와 크기 계산
  var offset = $toggle.offset();
  var height = $toggle.outerHeight();

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
    var $wrap = $(this).closest('.form-select-wrap');
    var value = $(this).data('value');
    var text = $(this).text();
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
  // 입력값에 따라 아이콘 변경
  $('.form-search').on('input', function () {
    var $group = $(this).closest('.position-relative');
    var $icon = $group.find('.form-group-append i');
    if ($(this).val().length > 0) {
      $icon.removeClass('icon-search').addClass('icon-close');
    } else {
      $icon.removeClass('icon-close').addClass('icon-search');
    }
  });

  // 닫기 버튼 클릭 시 input 비우고 아이콘 복원
  $('.btn-clear.togglePassword').on('click', function () {
    var $group = $(this).closest('.position-relative');
    var $input = $group.find('.form-search');
    var $icon = $(this).find('i');
    $input.val('').trigger('input');
    // 아이콘은 input 이벤트에서 자동으로 처리됨
    $input.focus();
  });
});

/**
 * 기본 TOAST 팝업
 */
$(document).ready(function () {
  // 각 버튼에 클릭 이벤트를 바인딩
  $(".showToastButton").on("click", function () {
    // 버튼의 data-toast-target 속성에서 대상 토스트의 ID를 가져옴
    var toastId = $(this).data("toast-target");
    var $toast = $("#" + toastId);

    // 토스트 팝업이 존재하는지 확인
    if ($toast.length) {
      $toast.fadeIn(200).addClass("show"); // 토스트 팝업을 페이드인으로 표시
      setTimeout(function () {
        $toast.fadeOut(200).removeClass("show"); // 2초 후 페이드아웃으로 숨김
      }, 3000); // 3초 동안 보여줌
    }
  });
});

/**
 * 상태별 토스트 팝업
 */
$(document).ready(function () {
  // 각 버튼에 클릭 이벤트를 바인딩
  $(".showToastButtonState").on("click", function () {
    // 버튼의 data-toast-target 속성에서 대상 토스트의 ID를 가져옴
    var toastId = $(this).data("toast-target");
    var $toast = $("#" + toastId);

    // 토스트 팝업이 존재하는지 확인
    if ($toast.length) {
      $toast.fadeIn(200).addClass("show"); // 토스트 팝업을 페이드인으로 표시
      setTimeout(function () {
        $toast.fadeOut(200).removeClass("show"); // 2초 후 페이드아웃으로 숨김
      }, 1500); // 1.5초 동안 보여줌
    }
  });
});

/**
 * 상태별 버튼 있는 토스트 팝업
 */
$(document).ready(function () {
  // 모든 토스트 트리거 버튼에 이벤트 바인딩
  $('.showToastBtn').on('click', function () {
    var toastId = $(this).data('toast-target');
    var $toastEl = $('#' + toastId);

    if ($toastEl.length) {
      var toast = bootstrap.Toast.getOrCreateInstance($toastEl[0],
          {autohide: false});
      toast.show();
    }
  });
});



