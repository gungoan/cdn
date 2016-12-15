

function drawRow(rowData) {
    var row = $("<tr />")
    $("#result-table").append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
	if(typeof rowData.From === 'undefined') {
		var From = '';
	} else {
		var From = rowData.From;
	}
	if(typeof rowData.To === 'undefined') {
		var To = '';
	} else {
		var To = rowData.To;
	}
	if(typeof rowData.Time === 'undefined') {
		var Time = '';
	} else {
		var Time = rowData.Time;
	}
	if(typeof rowData.FXRate === 'undefined') {
		var FXRate = '';
	} else {
		var FXRate = rowData.FXRate;
	}
    row.append($("<td>" + From + "</td>"));
	row.append($("<td>" + To + "</td>"));
    row.append($("<td>" + FXRate + "</td>"));
    row.append($("<td>" + Time + "</td>"));
}
function drawTable(data) {
    for (var i = 0; i < data.length; i++) {
        drawRow(data[i]);
    }
}
function change_input_color() {
	var arrNumber = new Array();
	$('input').each(function(){
		var input_id = $(this).attr('id');
		var input_class  = $(this).attr('class');
		if (/required/i.test(input_class)) {
			$('#'+input_id).addClass('pink-input');
		}
		if($('#'+input_id).val() != "") {
			if (/required/i.test(input_class)) {
				$('#'+input_id).removeClass('pink-input');
			}
		} else {
			if (/required/i.test(input_class)) {
				$('#'+input_id).addClass('pink-input');
			}
		}
		$('#'+input_id).keyup(function(){
            if($('#'+input_id).val() != "") {
				if (/required/i.test(input_class)) {
					$('#'+input_id).removeClass('pink-input');
				}
			} else {
				if (/required/i.test(input_class)) {
					$('#'+input_id).addClass('pink-input');
				}
			}
        });
	});
}
function loading_show() {
    var over = '<div style="position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 9999; opacity: 0.2; display: block; background-color: rgb(0, 0, 0);"></div><div style="padding: 4px;position: fixed;z-index: 10000;opacity: 0.5;display: block;background-color: rgb(0, 0, 0);border-radius: 3px;box-shadow: 0 3px 6px rgba(0,0,0,0.9);top: 50%;left: 50%;-webkit-transform: translate(-50%, -50%);-moz-transform: translate(-50%, -50%);-ms-transform: translate(-50%, -50%);-o-transform: translate(-50%, -50%);transform: translate(-50%, -50%);"><div class="bloading"></div></div>';
    $('#bloadify').html(over);
}
function loading_hide() {
    $('#bloadify').empty();
}
function loading_show_mobile() {
    var over = '<div style="position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 9999; opacity: 0.2; display: block; background-color: rgb(0, 0, 0);"></div><div style="padding: 4px;position: fixed;z-index: 10000;opacity: 0.5;display: block;background-color: rgb(0, 0, 0);border-radius: 3px;box-shadow: 0 3px 6px rgba(0,0,0,0.9);top: 50%;left: 50%;-webkit-transform: translate(-50%, -50%);-moz-transform: translate(-50%, -50%);-ms-transform: translate(-50%, -50%);-o-transform: translate(-50%, -50%);transform: translate(-50%, -50%);"><div class="bloading"></div></div>';
    $('#bloadify_mobile').html(over);
}
function loading_hide_mobile() {
    $('#bloadify_mobile').empty();
}
$(document).ready(function(){
	$("#social-share").jsSocials({
		url: "https://www.sendmoney.co.jp",
		text: "DCOM MONEY EXPRESS",
		showLabel: false,
		showCount: "inside",
		shares: [
		{ share: "facebook", via: "DCOM Money Express", hashtags: "chuyentien,dcom" },
		{ share: "googleplus", via: "DCOM Money Express", hashtags: "chuyentien,dcom" },
		{ share: "youtube"},
    ]
	});
	$('.single-item').slick({
		dots: true,
		infinite: true,
		speed: 300,
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: false,
		nextArrow: false,
		autoplay: true,
		autoplaySpeed: 2000,
	 });
   // $('#switcher-language1').change(function() {
    //    $('#language-choosen').val(data.selectedData.value);
    //    this.form.submit();
   // });
    $('#switcher-language').change(function(){
       $('#form-switcher-language').submit();
    });
    $('#switcher-language').msDropDown();

  
    /* head popup */
    $("#header .buttons .item > a").click(function(){        
        var popup = $(this).parent('.item').find('.popup');                
        if(popup.length > 0){            
            popup.is(':visible')?popup.fadeOut(200):popup.fadeIn(300);                        
            return false;
        }        
    });
    $(".popup-close").click(function(){
        $(this).parents('.popup').fadeOut(200);
    });
    
        /* load messages in head */
        //$("#messages").load('ajax_messages.html');
    
    /* eof head popup */
    
    /* combobox */

    $(".combobox input").focus(function(){           
        var cl = $(this).parent('.combobox').find('ul');                
            cl.show();
        
        $(this).focusout(function(){        
            setTimeout(function(){                 
                cl.hide().find('li').show();
            }, 200);        
        });
    });

    $(".combobox input").keyup(function(){            
        var cb = $(this).parent(".combobox");
        
        if(cb.hasClass('ws')){
            if($(this).val().length > 0){
                cb.find('li').hide();
                cb.find("li:containsi('"+$(this).val()+"')").show();        
            }else
                cb.find('li').show();
        }               
    });        

    $(".combobox ul > li").click(function(){
        var cb = $(this).parents(".combobox");
        var cl = cb.find("ul");
        var ci = cb.find("input");
        
        if($(this).attr('data-val') != null)
            ci.val($(this).attr('data-val'));
        else{
            ci.val($(this).html());            
        }

        cl.hide();//.find('li').show();                                    
    });    
    
    /* EOF combobox */
    
    /* table checkall */
    $("table .checkall").click(function(){           
        var iC = $(this).parents('th').index(); //index of checkall checkbox
        var tB = $(this).parents('table').find('tbody'); // tbody of table        
        
        if($(this).is(':checked'))
            tB.find('tr').each(function(){                
                var cb = $(this).find('td:eq('+iC+') input:checkbox');                
                if(cb.hasClass('uni')) cb.parent('span').addClass('checked');                                
                cb.attr('checked',true);                
            });
        else
            tB.find('tr').each(function(){
                var cb = $(this).find('td:eq('+iC+') input:checkbox');
                if(cb.hasClass('uni'))cb.parent('span').removeClass('checked')
                cb.attr('checked',false);
            });                    
    });
    /* eof table checkall */    
    
    /* icomoon button get code */
    $("#icon_icomoon_list li").click(function(){
       $("#icon_icomoon").html('&lt;i class="'+$(this).find('i').attr('class')+'"&gt;&lt;/i&gt;');
    });
    /* eof icomoon button get code */
    /* glyphs button get code */
    $("#icon_glyphs_list li").click(function(){
       $("#icon_glyphs").html('&lt;i class="'+$(this).find('i').attr('class')+'"&gt;&lt;/i&gt;');
    });
    /* eof glyphs button get code */    
    
    /* Block loading start button  USING FOR EXAMPLE, CAN BE REMOVED*/
    $(".block_loading").click(function(){
        var bC = $(this).parents('.block').find('.content');
        block_loading(bC);
        
        // Timer
        setTimeout(function(){
            block_loading(bC);
        },2000);
        
        return false;
    });
    /* EOF Block loading start button */
    
    /* Remove block button */
    $(".block_remove").click(function(){
        $(this).parents('.block').fadeOut(300,function(){
            $(this).remove();
        });
        return false;
    });
    /* EOF Remove block button */
    
    /* Toggle block button */
    $(".block_toggle").click(function(){
        var bC = $(this).parents('.block').find('.content');
        if(bC.is(':visible')){
            bC.slideUp();
            $(this).find('span').removeClass('i-arrow-down-3').addClass('i-arrow-up-3');
        }else{
            bC.slideDown();
            $(this).find('span').removeClass('i-arrow-up-3').addClass('i-arrow-down-3');
        }
        return false;
    });
    /* EOF Toggle block button */
    
    /* Navigation open submenu button */
    $("#sidebar .navigation li.openable > a").click(function(){        
        if($(this).parent('li').hasClass('open')){
            $(this).parent('li').removeClass('open');
        }else{
            $(this).parent('li').addClass('open');            
        }
        return false;
    });
    /* EOF Navigation open submenu button */
    
    /* Toggle navigation button */
    if($("body").width() < 769){        
        $("#wrapper").addClass("sidebar_off");
        $(".c_layout").addClass('active').find("span").attr("class","i-layout-9");         
    }
    
    $(".c_layout").click(function(){
        
        if($("#wrapper").hasClass("sidebar_off")){
            $("#wrapper").removeClass("sidebar_off");
            $(this).removeClass('active').find("span").attr("class","i-layout-8");
        }else{
            $("#wrapper").addClass("sidebar_off");
            $(this).addClass('active').find("span").attr("class","i-layout-9");
        }
        
        actions();
        return false;
    });
    /* EOF Toggle navigation button */
    
    /* Toggle layout */
    $(".c_screen").click(function(){                
        
        if($("#wrapper").hasClass("screen_wide")){
            $.cookies.set('c_screen','0');
            $("#wrapper").removeClass("screen_wide");
            $(this).removeClass('active').find("span").attr("class","i-stretch");
        }else{
            $.cookies.set('c_screen','1');
            $("#wrapper").addClass("screen_wide");
            $(this).addClass('active').find("span").attr("class","i-narrow");
        }                        

        actions();
        return false;        
    });
    /* EOF Toggle layout */
    
    /* input file */
    $(".file .btn, .file input:text").click(function(){        
        var block = $(this).parent('.file');
        block.find('input:file').click();
        block.find('input:file').change(function(){
            block.find('input:text').val(block.find('input:file').val());
        });
    });
    /* eof input file */     
        
    /* Draggable blocks */        
    if($(".sortableContent").length > 0){

        var scid = 'sC_'+$(".sortableContent").attr('id');
                
        var sCdata = $.cookies.get( scid );          
        
        if(null != sCdata){            
            for(row=0;row<Object.size(sCdata); row++){                
                for(column=0;column<Object.size(sCdata[row]);column++){                    
                    for(block=0;block<Object.size(sCdata[row][column]);block++){                        
                        $("#"+sCdata[row][column][block]).appendTo(".sortableContent .scRow:eq("+row+") .scCol:eq("+column+")");                        
                    }
                }               
            }            
        }                    
       
        //$.cookies.del( scid );
       
        $(".sortableContent .scCol").sortable({
            connectWith: ".sortableContent .scCol",
            items: "> .block",
            handle: ".head",
            placeholder: "scPlaceholder",
            start: function(event,ui){
                $(".scPlaceholder").height(ui.item.height());
            },
            stop: function(event, ui){                                

                var sorted = {};
                var row = 0;
                $(".sortableContent .scRow").each(function(){                    
                    sorted[row] = {};
                    $(this).find(".scCol").each(function(){
                        var column = $(this).index();                        
                        sorted[row][column] = {};

                        $(this).find('.block').each(function(){
                            sorted[row][column][$(this).index()] = $(this).attr('id');
                        });
                    });
                    row++;
                });
                                                
                $.cookies.set( scid, JSON.stringify(sorted));                
            }
        }).disableSelection();
    }
    
    /* EOF Draggable blocks */            
    
    /* pricing table */
    $("#pricing_action").on('change',function(){
        if($(this).val() == 1)
            $("#pricing_domain").hide();
        else
            $("#pricing_domain").show();
    });
    /* EOF pricing table*/
    
    /* Settings */
        var sTheme = $.cookies.get('sTheme');
        if(null != sTheme){
            $(".themes a[data-theme="+sTheme+"]").addClass('active');
            $("body").addClass(sTheme);
        }else            
            $(".themes a.default").addClass('active');
        
        $(".themes a").click(function(){
            $(".themes a").removeClass('active');
            $(this).addClass('active');
            $('body').removeClass('themeSimple themeDark').addClass($(this).attr('data-theme'));
            $.cookies.set('sTheme',$(this).attr('data-theme'));
            return false;
        });
        
        var sBack = $.cookies.get('sBack');
        if(null != sBack){
            $(".backgrounds a[data-back="+sBack+"]").addClass('active');
            $("body").addClass(sBack);
        }else            
            $(".backgrounds a.default").addClass('active');
        
        $(".backgrounds a").click(function(){
            $(".backgrounds a").removeClass('active');
            $(this).addClass('active');
            $('body').removeClass('b_bcrosshatch b_crosshatch b_cube b_dots b_grid b_hline b_simple b_vline').addClass($(this).attr('data-back'));
            $.cookies.set('sBack',$(this).attr('data-back'));
            return false;
        });    
    /* EOF Settings */
    
});
$(window).load(function(){      
    $(window).resize();
});
$(window).resize(function(){    
    resizing();
    actions();    
    thumbs();            
});

function resizing(){
    
    if($("body").width() < 1025){
        $(".c_screen").hide();                    
        $("#wrapper").addClass("screen_wide");
        
    }else{
        $(".c_screen").show();
        if(!$(".c_screen").hasClass('active'))           
           $("#wrapper").removeClass("screen_wide");
       
       if($.cookies.get('c_screen') == '1')
           $("#wrapper").addClass("screen_wide");              
    }    
        
}

function actions(){
    block_items_width('.wide_elements',['.add-on','button'],'input');    
    if($(".gallery").length > 0) gallery();    
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function block_loading(content){
    if(content.find('.block_loading').length > 0)
        content.find('.block_loading').remove();
    else{
        var ptc = content.hasClass('np') ? 0 : 20;
        content.append('<div class="block_loading" style="width: '+(content.width()+ptc)+'px; height: '+(content.height()+ptc)+'px;"><img src="img/loader.gif"/></div>');
    }
    return false;
}

function block_items_width(block,what,to){    
    
    $(block).each(function(){        
        var iWidth = $(this).width();        
        if(what.length > 0){            
            for(var i=0; i < what.length; i++){
                $(this).find(what[i]).each(function(){                    
                    iWidth -= $(this).width()+(parseInt($(this).css('padding-left')) * 2)+2;
                });
            }            
            $(this).find(to).width(iWidth-12);
        }
    });    
    
}

function gallery(){   
    
    var w_block = $(".gallery").width()-20;
    var w_item  = $(".gallery a").width();        
    var c_items = Math.floor( w_block/w_item );    
    var m_items = Math.round( (w_block-w_item*c_items)/(c_items*2) );        
    $(".gallery a").css('margin',m_items+2);
}

function thumbs(){
    
    $(".thumbs").each(function(){        
        
        var maxImgHeight = 0;
        var maxTextHeight = 0;    
        
        $(this).find(".thumbnail").each(function(){
            var imgHeight = $(this).find('a > img').height();
            var textHeight = $(this).find('.caption').height();
            
            maxImgHeight = maxImgHeight < imgHeight ? imgHeight : maxImgHeight;
            maxTextHeight = maxTextHeight < textHeight ? textHeight : maxTextHeight;
        });
        
        $(this).find('.thumbnail > a').height(maxImgHeight);
        $(this).find('.thumbnail .caption').height(maxTextHeight);
    });
    

    
    var w_block = $(".thumbs").width()-20;
    var w_item  = $(".thumbs .thumbnail").width()+10;
    
    var c_items = Math.floor(w_block/w_item);
    
    var m_items = Math.floor( (w_block-w_item*c_items)/(c_items*2) );
    
    $(".thumbs .thumbnail").css('margin',m_items+2);

}

function clear_form(form) {
    $(form).find(':input').each(function(){        
        switch(this.type) {            
            case 'password':
            case 'select-multiple':
            case 'select-one':
            case 'text':
            case 'textarea':
                if(!$(this).is(':disabled'))
                    $(this).val('');            
            break;
            case 'checkbox':
            case 'radio':
                if(!$(this).is(':disabled')){                    
                    $(this).attr('checked', false);
                    if($(this).hasClass('uni'))
                        $(this).parent('span').removeClass('checked');                    
                }
            break;
        }        
    });
    return false;
}

/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 *
 * jQuery.browser.mobile will be true if the browser is a mobile device
 *
 **/
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);