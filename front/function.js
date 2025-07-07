/**
 * SIDEBAR 스크립트
 */
$(document).ready(function () {
  const $leftSide = $('.left-side');
  const currentPage = window.location.pathname.split('/').pop();

  // 사이드바 토글 아이콘을 동적으로 잡아야 fetch 이후에도 정상 동작
  function setSidebarState(isCollapsed) {
    const $icon = $('.btn-sidebar-toggle').find('.icon-sidebar-toggle');
    if ($icon.length === 0) {
      return;
    }

    if (isCollapsed) {
      $leftSide.addClass('collapsed');
      $icon
      .removeClass('icon-sidebar-arrow-left')
      .addClass('icon-sidebar-arrow-right');
    } else {
      $leftSide.removeClass('collapsed');
      $icon
      .removeClass('icon-sidebar-arrow-right')
      .addClass('icon-sidebar-arrow-left');
    }
  }

  // 페이지 진입 시 상태 세팅
  if (currentPage === 'dashBoard.html') {
    setSidebarState(false); // 펼침
  } else {
    setSidebarState(true); // 닫힘
  }

  // 토글 버튼 클릭 이벤트
  $(document).on('click', '.btn-sidebar-toggle', function () {
    const isCollapsed = $leftSide.hasClass('collapsed');
    setSidebarState(!isCollapsed);
  });
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
    $toggle.removeClass('sidebar-center-active'); // 배경 복원
    return;
  }

  $menu.data('opened', true);
  $toggle.addClass('sidebar-center-active'); // 배경색 추가

  // 바깥 클릭 시 닫기
  $(document).one('mousedown.dropdownMenu', function (event) {
    if (!$(event.target).closest(
        '.global-dropdown-menu, .sidebar-center-name').length) {
      $menu.hide();
      $menu.data('opened', false);
      $toggle.removeClass('sidebar-center-active'); // 배경 복원
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

    // 선택된 값 동기화
    const $wrap = $(this).closest('.form-select-wrap');
    const selectedText = $wrap.find('.form-select-selected').text();
    const $listItems = $wrap.find('.form-select-list li');
    $listItems.removeClass('selected');
    $listItems.filter(function () {
      return $(this).text() === selectedText;
    }).addClass('selected');
  });

  // 옵션 선택
  $(document).on('click', '.form-select-list li', function (e) {
    const $wrap = $(this).closest('.form-select-wrap');
    const value = $(this).data('value');
    const text = $(this).text();
    const $selected = $wrap.find('.form-select-selected');
    const $listItems = $wrap.find('.form-select-list li');
    $selected.text(text);
    $wrap.find('input[type="hidden"]').val(value);
    $listItems.removeClass('selected');
    $(this).addClass('selected');
    $wrap.find('.form-select').removeClass('open');
    $wrap.find('.form-select-list-wrap').hide();

    // 첫 번째 li가 선택됐을 때만 .default 클래스 추가
    if ($(this).is($listItems.first())) {
      $selected.addClass('default');
    } else {
      $selected.removeClass('default');
    }
    e.stopPropagation();
  });

  // 외부 클릭 시 닫기
  $(document).on('click', function () {
    $('.form-select').removeClass('open');
    $('.form-select-list-wrap').hide();
  });

  // 페이지 로드 시 초기 상태 적용
  $('.form-select-wrap').each(function () {
    const $selected = $(this).find('.form-select-selected');
    const $listItems = $(this).find('.form-select-list li');
    // 초기 선택된 텍스트가 첫 번째 li와 같으면 .default 클래스 추가
    if ($selected.text() === $listItems.first().text()) {
      $selected.addClass('default');
    } else {
      $selected.removeClass('default');
    }
  });
});

/**
 * SEARCH INPUT ICON 바뀌는 스크립트
 */
$(document).ready(function () {
  // 상태 저장용 플래그
  let isSearched = false;

  $('.form-search').each(function () {
    const $input = $(this);
    const $group = $input.closest('.position-relative');
    const $btn = $group.find('.btn-clear');
    const $icon = $btn.find('i');

    // 초기 상태
    $icon.removeClass('icon-close').addClass('icon-search');

    // 버튼 클릭 이벤트
    $btn.on('click', function () {
      if (!isSearched && $input.val().length > 0) {
        // 검색 상태로 변경
        $icon.removeClass('icon-search').addClass('icon-close');
        isSearched = true;
        // 여기에 검색 실행 함수 호출해도 됨!
      } else {
        // 검색 상태일 때(x버튼 역할)
        $input.val('').focus();
        $icon.removeClass('icon-close').addClass('icon-search');
        isSearched = false;
      }
    });

    // 인풋 값 바뀌면 다시 검색상태 해제
    $input.on('input', function () {
      if (!isSearched) {
        $icon.removeClass('icon-close').addClass('icon-search');
      }
    });

    // 엔터로도 검색 가능하게!
    $input.on('keydown', function (e) {
      if (e.key === 'Enter' && $input.val().length > 0) {
        $icon.removeClass('icon-search').addClass('icon-close');
        isSearched = true;
        // 여기에 검색 실행 함수 호출해도 됨!
      }
    });
  });
});

/**
 * form-control에 내용이 있거나 입력할때 icon-close 노출
 */
$(document).ready(function () {
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
