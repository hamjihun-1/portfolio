$(document).ready(function(){
	const myFullpage = new fullpage('#fullpage', {

		navigation: false,
		navigationPosition: 'right',
		navigationTooltips: ['첫번째', '두번째', '세번째', '네번째'],
		showActiveTooltip: true,

        lockAnchors: true,
		anchors: [ 'home', 'about', 'index', 'ipmg', 'sop', 'cbnu', 'end'],

		autoScrolling:true,
		scrollHorizontally: true,

		verticalCentered: true,
		scrollOverflow: false,

		afterLoad: function(origin, destination, direction, trigger){

        let idx = destination.index;

        if(idx === 0){
            $('header .gnb .gnb_wrap ul li').removeClass('on');
            return;
        }

        let menuIndex = idx - 1;

        let $menu = $('header .gnb .gnb_wrap ul li');
        $menu.removeClass('on');
        $menu.eq(menuIndex).addClass('on');
    },
	});

	/* header gnb 클릭시 페이지 이동 */
	$('header .gnb .gnb_wrap ul li a').on('click', function(e){
		e.preventDefault();

		let target = $(this).data('target');
		fullpage_api.moveTo(target);

		$(this).closest('li').addClass('on').siblings().removeClass('on');
	});

	/* index 리스트 클릭시 페이지 이동 */
	$('.index .list ul li a').on('click', function(e){
		e.preventDefault();
		fullpage_api.moveTo($(this).data('target'));
	});

	/*포토 마우스 오버 시 커서 포인트 변경*/
	$(window).on('pointermove mousemove touchmove', function(e){
		$('.cursor').css('left', e.pageX + 'px');
		$('.cursor').css('top', e.pageY + 'px');
	});
	$('.photo_wrap').hover(function(){
		$('.cursor').toggleClass('on');
	});
});
