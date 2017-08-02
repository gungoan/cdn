$(document).ready(function(){
	if ($('#back-to-top').length) {
		var scrollTrigger = 100, // px
			backToTop = function () {
				var scrollTop = $(window).scrollTop();
				if (scrollTop > scrollTrigger) {
					$('#back-to-top').addClass('show');
				} else {
					$('#back-to-top').removeClass('show');
				}
			};
		backToTop();
		$(window).on('scroll', function () {
			backToTop();
		});
		$('#back-to-top').on('click', function (e) {
			e.preventDefault();
			$('html,body').animate({
				scrollTop: 0
			}, 700);
		});
	}
	
	
    $('.input-currency').autoNumeric('init');
    /* jQuery Select2 */
    
    /* EOF jQuery Select2 */    
    
    /* jQuery Uniform */
    if($(".uni").length > 0)
        $(".uni").uniform();
    /* EOF jQuery Uniform */
        
    /* jQuery Tags Input */
    if($("input.tags").length > 0)
        $("input.tags").tagsInput({'width':'218px','height':'auto','defaultText':''});
    /* EOF jQuery Tags Input */
    
    /* jQuery MultiSelect */
    if($("#multiselect").length > 0)
        $("#multiselect").multiSelect();
            
    if($("#multiselect_custom").length > 0)
        $("#multiselect_custom").multiSelect({selectableHeader: "<div class='ms-header'>Selectable items</div>",
                                              selectionHeader: "<div class='ms-header'>Selection items</div>",
                                              selectableFooter: "<div class='ms-footer'>Selectable footer</div>",
                                              selectionFooter: "<div class='ms-footer'>Selection footer</div>"
                                             });
    /* EOF jQuery MultiSelect */
    
    /* jQuery ValidationEngine */    
    if($("#validate").length > 0)
        $("#validate, #validate_custom, #validateICN").validationEngine('attach',{promptPosition : "topLeft",showOneMessage:true});    
    /* EOF ValidationEngine */
    /* jQuery Masked Input */
    if($("input[class^='mask_']").length > 0){
        $("input.mask_tin").mask('99-9999999');
        $("input.mask_ssn").mask('999-99-9999');        
        //$("input.mask_date").mask('9999-99-99');
        $("input.mask_product").mask('a*-999-a999');
        $("input.mask_phone").mask('99 (999) 999-99-99');
        $("input.mask_phone_ext").mask('99 (999) 999-9999? x99999');
        $("input.mask_credit").mask('9999-9999-9999-9999');        
        $("input.mask_percent").mask('99%');
        $("input.mask_date").mask('9999-99-99');
    }    
    /* EOF jQuery Masked Input */
    
    /* jQuery UI Datepicker */
    if($(".datepicker").length > 0)
       $(".datepicker").datepicker();
    /* EOF jQuery UI Datepicker */
    
    /* Timepicker */
    if($(".timepicker").length > 0)
        $(".timepicker").timepicker();
    /* EOF Timepicker */
    
    /* Datetimepicker */
    if($(".datetimepicker").length > 0)
        $(".datetimepicker").datetimepicker();
    /* EOF Datetimepicker */
    
    
    /* jQuery Stepy Wizard */
    if($("#wizard").length > 0) 
        $('#wizard').stepy();
    
	if($("#ChargeSMForm").length > 0){
        
        $("#ChargeSMForm").validationEngine('attach',{promptPosition : "topLeft",showOneMessage:true});
        
        $('#ChargeSMForm').stepy({
			backLabel:      '< Quay lại',
			nextLabel:       'Tiếp tục >',
            back: function(index) {                                                                
                //if(!$("#wizard_validate").validationEngine('validate')) return false; //uncomment if u need to validate on back click                
            }, 
            next: function(index) {                
                if(!$("#ChargeSMForm").validationEngine('validate')) {
                    return false; 
                }   else {
					$('#ConfirmService').html($("#paymentType option:selected").text());
					if($("#accList").val() != 'NEW'){
						$('#ConfirmAcclist').html($("#accList option:selected").text());
					} else {
						$('#ConfirmAcclist').html($("#accName").val());
					}
					$('#ConfirmCountry').html($("#country").text());
					$("#ConfirmProduct").html($("#productID option:selected").text());
					$("#ConfirmTotal").html('JPY '+$("#chargeAmount").val());
                    return true;
                }
            },
            finish: function(index) {			
                if(!$("#ChargeSMForm").validationEngine('validate')) return false;
            }            
        });
    }
	
	if($("#WithdrawalForm").length > 0){
        
        $("#WithdrawalForm").validationEngine('attach',{promptPosition : "topLeft",showOneMessage:true});
        
        $('#WithdrawalForm').stepy({
			backLabel:      '< Quay lại',
			nextLabel:       'Tiếp tục >',
            back: function(index) {                                                                
                //if(!$("#wizard_validate").validationEngine('validate')) return false; //uncomment if u need to validate on back click                
            }, 
            next: function(index) {                
                if(!$("#WithdrawalForm").validationEngine('validate')) {
                    return false; 
                }   else {
					$('#ConfirmAmount').html($("#balance").val());
					var total = parseInt($("#balance").autoNumeric("get"))-315;
					$('#totalbalance').autoNumeric('init');
					$('#totalbalance').autoNumeric('set', total);
					$('#ConfirmTotal').html('¥ '+$('#totalbalance').val());
					$('#ConfirmAccNumber').html($("#accNumber").val());
					$('#ConfirmAccount').html($("#accName").val());
					$('#ConfirmAccNumber').html($("#accNumber").val());
					$('#ConfirmBank').html($("#bankName :selected").text());
					$('#ConfirmBranch').html($("#branchName :selected").text());
					if($("#remark").val() != "") {
						$('#panel_remark').show();
						$('#ConfirmRemark').html($("#remark").val());
					} else {
						$('#ConfirmRemark').html($("#remark").val());
						$('#panel_remark').hide();
					}
                    return true;
                }
            },
            finish: function(index) {
				$("#balance").val($("#balance").autoNumeric("get"));				
                if(!$("#WithdrawalForm").validationEngine('validate')) return false;
            }            
        });
    }
	
	if($("#LocalTransferForm").length > 0){
        
        $("#LocalTransferForm").validationEngine('attach',{promptPosition : "topLeft",showOneMessage:true});
        
        $('#LocalTransferForm').stepy({
			backLabel:      '< Quay lại',
			nextLabel:       'Tiếp tục >',
            back: function(index) {                                                                
                //if(!$("#wizard_validate").validationEngine('validate')) return false; //uncomment if u need to validate on back click                
            }, 
            next: function(index) {                
                if(!$("#LocalTransferForm").validationEngine('validate')) {
                    return false; 
                }   else {
					if($('#balance').autoNumeric('get') == '0') {
						$('#balance').val('');
						return false;
					}
					$('#ConfirmAmount').html($("#balance").val());
					$('#ConfirmTotal').html($("#balance").val());
					$('#ConfirmAccNumber').html($("#accNumber").val());
					$('#ConfirmAccount').html($("#accName").val());
					if($("#remark").val() != "") {
						$('#panel_remark').show();
						$('#ConfirmRemark').html($("#remark").val());
					} else {
						$('#ConfirmRemark').html($("#remark").val());
						$('#panel_remark').hide();
					}
					
                    return true;
                }
            },
            finish: function(index) {
				$("#balance").val($("#balance").autoNumeric("get"));				
                if(!$("#LocalTransferForm").validationEngine('validate')) return false;
            }            
        });
    }
    if($("#EditSettingsForm").length > 0){
        
        $("#EditSettingsForm").validationEngine('attach',{promptPosition : "topLeft",showOneMessage:true});
        
        $('#EditSettingsForm').stepy({
			backLabel:      '< Quay lại',
			nextLabel:       'Tiếp tục >',
            back: function(index) {                                                                
                //if(!$("#wizard_validate").validationEngine('validate')) return false; //uncomment if u need to validate on back click                
            }, 
            next: function(index) {                
                if(!$("#EditSettingsForm").validationEngine('validate')) {
                    return false; 
                }   else {
                    var fx    = $('label[for=pre-fx]').text();
                    var news    = $('label[for=pre-news]').text();
                    $('#ConfirmZipcode').html($("#zipcode").val());
                    $('#ConfirmAddressInput').html($("#AddressInput").val()+' '+$("#Address").val());
                    $('#ConfirmAddressLocal').html($("#AddressLocal").val()+' '+$("#AddressLocalInput").val());
                    $('#ConfirmOccupation').html($("#Occupation option:selected").text());
                    $('#ConfirmNotificationMethod').html($("#NotificationMethod option:selected").text());
                    $('#ConfirmEmail').html($("#InputEmail").val());
                    $('#ConfirmPhoneNumber').html($("#phone").val()+' -  '+$("#phonetype option:selected").text());
                    $('#ConfirmRemittanceStatement').html($("#ReceiptSendControl option:selected").text());  
                    if($('#SubFX').prop('checked')) {
                        $('#ConfirmSubscribeFX').html(fx);
                    } else {
                        $('#SubscribeFXPanel').hide();
                    }
                    if($('#SubNews').prop('checked')) {
                        $('#ConfirmSubscribeNews').html(news);
                    } else {
                        $('#SubscribeNewsPanel').hide();
                    }
                    return true;
                }
            },
            finish: function(index) {                
                if(!$("#EditSettingsForm").validationEngine('validate')) return false;
            }            
        });
    }
	
	if($("#NewSenderForm").length > 0){
        
        $("#NewSenderForm").validationEngine('attach',{promptPosition : "topLeft",showOneMessage:true});
        
        $('#NewSenderForm').stepy({
			backLabel:      '< Quay lại',
			nextLabel:       'Tiếp tục >',
            back: function(index) {                                                                
                //if(!$("#wizard_validate").validationEngine('validate')) return false; //uncomment if u need to validate on back click                
            }, 
            next: function(index) {                
                if(!$("#NewSenderForm").validationEngine('validate',{
ajaxFormValidation: true,
})) {
                    return false; 
                }   else {
                    return true;
                }
            },
            finish: function(index) {       
							$.ajax({
							  type: "POST",
							  url: 'module/captcha/check.html',
							  data: $('#NewSenderForm').serialize(),
							  success: function(data) {
								  if(data == 'success') {
									  document.getElementById("NewSenderForm").submit();
									  loading_hide();
									  return true;
								  } else {
									  $('#NewSenderForm').stepy('step', 5);
									  $('#ImgCaptcha').attr('src', $('#ImgCaptcha').attr('src')+'#');
									  $('#captcha').val('');
									  $('#result_captcha').html(data);
									  loading_hide();
									  return false;
								  }
								}
							});
							return false;
            }            
        });
    } 

	
	if($("#AddReceiverForm").length > 0){
        
        $("#AddReceiverForm").validationEngine('attach',{promptPosition : "topLeft",showOneMessage:true});
        
        $('#AddReceiverForm').stepy({
			backLabel:      '< Quay lại',
			nextLabel:       'Tiếp tục >',
            back: function(index) {                                                                
                //if(!$("#wizard_validate").validationEngine('validate')) return false; //uncomment if u need to validate on back click                
            }, 
            next: function(index) {                
                if(!$("#AddReceiverForm").validationEngine('validate')) {
                    return false; 
                }   else {
                    $('#C_National').html($("#ReceiverCountry :selected").text());
                    $('#C_Currency').html($("#ReceiveCurrency :selected").text());
                    $('#C_OrderType').html($("#OrderType :selected").text());
                    $('#C_Bank').html($("#BankCode :selected").text());
                    $('#C_OrderDetail').html($("#OrderTypeDetail :selected").text());
					$('#C_National').html($("#ReceiverCountry :selected").text());
                    $('#C_Currency').html($("#ReceiveCurrency :selected").text());
                    $('#C_OrderType').html($("#OrderType :selected").text());
                    $('#C_Bank').html($("#BankCode :selected").text());
                    $('#C_OrderDetail').html($("#OrderTypeDetail :selected").text());
					if($( "#CardNo" ).length > 0) {
						$('#C_CardNo').html($("#CardNo").val());
						$('#P_CardNo').show();
					} else {
						$('#P_CardNo').hide();
					}
					if($("#locationID").val() != "") {
						$('#C_BranchName').html($("#locationID").val());
						$('#P_BranchName').show();
					} else {
						$('#P_BranchName').hide();
					}
					if($("#BankArea :selected").val() != "") {
						$('#C_BankArea').html($("#BankArea :selected").text());
						$('#P_BankArea').show();
					} else {
						$('#P_BankArea').hide();
					}
					
					if($( "#AccountNo" ).length > 0) {
						$('#C_Account').html($("#AccountNo").val());
						$('#P_CardNo').show();
					} else {
						$('#P_Account').hide();
					}
					if($("#idno").val() != "" && $("#issdate").val() != "" && $("#issplace").val() != "") {
						$('#C_IDInfo').html($("#idno").val()+ ' - '+$("#issdate").val()+' - '+$("#issplace").val());
					} else {
						$('#P_IDInfo').hide();
					}
					if($("#issdate").val() != "") {
						var str = $("#issdate").val();
						var res = str.split("/");
						var currentTime = new Date();
						var year = currentTime.getFullYear()-16;
						if(res[2] <= year) {
							noty({text: 'Năm cấp CMND/Hộ chiếu không được vượt quá 15 năm', layout: 'topCenter'});
							return false;
						}
					}
                    
                    if($("#OrderTypeDetail :selected").val() == '13') {
						$('#C_Location').html($("#locationID :selected").text());
					} else {
						$('#C_Location').hide();
					}
					
                    $('#C_Name').html($("#FamilyName").val()+' '+$("#GivenName").val());
                    $('#C_City').html($("#ReceiverCity :selected").text());
					if($("#ReceiverAdd").val() != "") {
						$('#C_Address').html($("#ReceiverAdd").val());
					} else {
						$('#C_Address').hide();
					}
                    
                    if($("#ReceiverTel1").val() != '' && $("#ReceiverTel2").val() != '') {
                        $('#C_Tel').html($("#ReceiverTel1").val() + ' - ' + $("#ReceiverTel2").val());
                    } else {
                        $('#C_Tel').html($("#ReceiverTel1").val());
                    }
 
                    $('#C_Relationship').html($("#Relationship :selected").text());
                    $('#C_Purpose').html($("#Purpose :selected").text());

                    return true;
                }
            },
            finish: function(index) {                
                if(!$("#AddReceiverForm").validationEngine('validate')) return false;
            }            
        });
    } 
	
    if($("#EditReceiverForm").length > 0){
        
        $("#EditReceiverForm").validationEngine('attach',{promptPosition : "topLeft",showOneMessage:true});
        
        $('#EditReceiverForm').stepy({
			backLabel:      '< Quay lại',
			nextLabel:       'Tiếp tục >',
            back: function(index) {                                                                
                //if(!$("#wizard_validate").validationEngine('validate')) return false; //uncomment if u need to validate on back click                
            }, 
            next: function(index) {                
                if(!$("#EditReceiverForm").validationEngine('validate')) {
                    return false; 
                }   else {
                    $('#C_National').html($("#ReceiverCountry :selected").text());
                    $('#C_Currency').html($("#ReceiveCurrency :selected").text());
                    $('#C_OrderType').html($("#OrderType :selected").text());
                    $('#C_Bank').html($("#BankCode :selected").text());
                    $('#C_OrderDetail').html($("#OrderTypeDetail :selected").text());
					if($( "#CardNo" ).length > 0) {
						$('#C_CardNo').html($("#CardNo").val());
						$('#P_CardNo').show();
					} else {
						$('#P_CardNo').hide();
					}
					
					if($( "#AccountNo" ).length > 0) {
						$('#C_Account').html($("#AccountNo").val());
						$('#P_CardNo').show();
					} else {
						$('#P_Account').hide();
					}
					if($("#idno").val() != "" || $("#issdate").val() != "" || $("#issplace").val() != "") {
						$('#C_IDInfo').html($("#idno").val()+ ' - '+$("#issdate").val()+' - '+$("#issplace").val());
						$('#P_IDInfo').show();
					} else {
						$('#P_IDInfo').hide();
					}

					if($("#OrderTypeDetail :selected").val() == "12" || $("#OrderTypeDetail :selected").val() == "13") {
						if($( "#locationID" ).is( "[type=text]" )) {
							if($( "#locationID" ).val() != "") {
								$('#P_BranchName').show();
								$('#C_BranchName').empty();
								$('#C_BranchName').html($("#locationID").val());
							} else {
								$('#P_BranchName').hide();
							}
							
						} else {
							if($( "#locationID :selected" ).val() != "") {
								$('#P_BranchName').show();
								$('#C_BranchName').empty();
								$('#C_BranchName').html($("#locationID :selected").text());
							} else {
								$('#P_BranchName').hide();
							}
						}
					} else {
						$('#P_BranchName').hide();
					}
					if ($('#BankArea :selected').length>0) {
						if($("#BankArea :selected").val() != "") {
							$('#C_BankArea').html($("#BankArea :selected").text());
							$('#P_BankArea').show();
						} else {
							$('#P_BankArea').hide();
						}
					} else {
						$('#P_BankArea').hide();
					}
					
					
						
					if($("#OrderTypeDetail").val() == '13') {
						$('#C_Location').html($("#locationID :selected").text());
					} else {
						$('#C_Location').html('N/A');
					}
                    
                   if($('#info_branchname_check').is(':visible') || $('#info_branchname_check').css('display') == 'none' ) {
						$('#C_BranchName').html($("#BankArea option:selected").text() + ' - ' + $("#locationID option:selected").text());
					} else {
						$('#C_BranchName').html($("#BranchNameCheck").val());
					}

                    $('#C_Name').html($("#FamilyName").val()+' '+$("#GivenName").val());
                    if( $("#ReceiverCity").prop('type') == 'text' ) {
						$('#C_City').html($("#ReceiverCity").val());
					} else {
						$('#C_City').html($("#ReceiverCity :selected").text());
					}
                    $('#C_Address').html($("#ReceiverAdd").val());
                    if($("#ReceiverTel1").val() != '' && $("#ReceiverTel2").val() != '') {
                        $('#C_Tel').html($("#ReceiverTel1").val() + ' - ' + $("#ReceiverTel2").val());
                    } else {
                        $('#C_Tel').html($("#ReceiverTel1").val());
                    }
 
                    $('#C_Relationship').html($("#Relationship :selected").text());
                    $('#C_Purpose').html($("#Purpose :selected").text());

                    return true;
                }
            },
            finish: function(index) {                
					if($("#issdate").val() != "") {
						var str = $("#issdate").val();
						var res = str.split("/");
						var currentTime = new Date();
						var year = currentTime.getFullYear()-16;
						if(res[2] <= year) {
							noty({text: 'Năm cấp CMND/Hộ chiếu không được vượt quá 15 năm', layout: 'topCenter'});
							$('#EditReceiverForm').stepy('step', 2);
							return false;
						}
					} 
					if(!$("#EditReceiverForm").validationEngine('validate')) return false;
            }            
        });
    }    
    /* EOF jQuery Stepy Wizard */    
    
    /* NicEditor */
    if($("#nicEditor").length > 0)
        nE = new nicEditor({fullPanel : true, iconsPath : 'img/nicedit/nicEditorIcons.gif'}).panelInstance('nicEditor');       
    /* EOF NicEditor */
    
    /* CLEditor */
    if($("#clEditor").length > 0)
        cE = $("#clEditor").cleditor({width:"100%",height: 230});        
    
    if($("#clEditorComments").length > 0)
        cEC = $("#clEditorComments").cleditor({width:"100%",height: 230,controls: "bold italic underline strikethrough link unlink"});
    
        /* Email */
        if($("#mail_wysiwyg").length > 0)
            m_editor = $("#mail_wysiwyg").cleditor({width:"100%", height:"100%",controls:"bold italic underline strikethrough | font size style | color highlight removeformat | bullets numbering | outdent alignleft center alignright justify"})[0].focus();

        $('#sendmail').on('shown.bs.modal', function(e){
            m_editor.refresh();            
        });  
        /* EOF Email */
        
    /* EOF CLEditor */
   
    /* Accordion */
    if($(".accordion").length > 0){
		$('.accordion').accordion({
			active: false,
			collapsible: true            
		});
       $(".accordion .ui-accordion-header:last").css('border-bottom','0px');
    }    
    /* EOF Accordion */

    /* Sortable */
    if($("#sortable").length > 0)
       $("#sortable").sortable();
    /* EOF Sortable */
    
    /* Selectable */
    if($("#selectable").length > 0)
       $("#selectable").selectable();
    /* EOF Sortable */

    /* Tabs */
    if($(".tabs").length > 0)
       $(".tabs").tabs();
    /* EOF Tabs */
    
    /* Tooltips */
    if($(".tip").length > 0)
        $(".tip").tooltip({placement: 'top'});
    if($(".tipb").length > 0)
        $(".tipb").tooltip({placement: 'bottom'});
    if($(".tipl").length > 0)
        $(".tipl").tooltip({placement: 'left'});    
    if($(".tipr").length > 0)
        $(".tipr").tooltip({placement: 'right'});        
    /* EOF Tooltips */
    
    /* Slider */
    if($("#slider").length > 0)
        $("#slider").slider({min: 0,
                             max: 500,
                             value: 250,
                             range: 'min'});    
    if($("#slider_head").length > 0)
        $("#slider_head").slider({min: 0,
                                  max: 20,
                                  value: 10,
                                  range: 'min'});        
    if($("#slider_range").length > 0){        
        $("#slider_range").slider({
            range: true,
            min: 0,
            max: 500,
            values: [ 150, 350 ],
            slide: function( event, ui ) {
                $( "#slider_range_amount" ).html( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
            }
        });        
        $( "#slider_range_amount" ).html( "$" + $( "#slider_range" ).slider( "values", 0 ) +
        " - $" + $( "#slider_range" ).slider( "values", 1 ) );    
    }    
    /* EOF Slider */
    
    /* Popovers */
    if($("#popover_top").length > 0){
        var popover_title = 'Popover title';
        var popover_content = 'Sed non urna. Donec et ante. Phasellus eu ligula. Vestibulum sit amet purus. Vivamus hendrerit, dolor at aliquet laoreet, mauris turpis porttitor velit.';
        
        $("#popover_top").popover({placement: 'top', title: popover_title, content: popover_content});    
        $("#popover_right").popover({placement: 'right', title: popover_title, content: popover_content});
        $("#popover_bottom").popover({placement: 'bottom', title: popover_title, content: popover_content});
        $("#popover_left").popover({placement: 'left', title: popover_title, content: popover_content});
    }
    /* EOF Popovers */
    
    /* jQuery Dialog */

        $("#jDialog_default").dialog({autoOpen: false,draggable: false});       
        $("#jDialog_default_button").click(function(){
            $("#jDialog_default").dialog('open');
        });
        
        $("#jDialog_modal").dialog({autoOpen: false, modal: true, draggable: false});        
        $("#jDialog_modal_button").click(function(){
            $("#jDialog_modal").dialog('open');
        });        
        
        $("#jDialog_form").dialog({autoOpen: false, 
                                   modal: true,
                                   width: 400,
                                   draggable: false,
                                   buttons: {"Submit": function() {
                                                $( this ).dialog( "close" );
                                            },
                                            Cancel: function() {
                                                $( this ).dialog( "close" );
                                            }
                                }});
    
        $("#jDialog_form_button").click(function(){$("#jDialog_form").dialog('open')});    
    
    /* EOF jQuery Dialog */
    
    /* mCustomScrollBar */
    if($(".scroll").length > 0)
       $(".scroll").mCustomScrollbar({scrollButtons:{enable:true}});           
    /* EOF mCustomScrollBar */
    
    /* Syntax Highlight */
    if($("pre[class^=brush]").length > 0){
        SyntaxHighlighter.defaults['toolbar'] = false;
        SyntaxHighlighter.all();   
    }
    /* EOF Syntax Highlight */
    
    /* iButton plugin */
    if($(".ibutton").length > 0)
       $(".ibutton:radio, .ibutton:checkbox").iButton();    
    /* EOF iButton plugin */
    
    /* datepicker */
    if($(".datepicker").length > 0)
       $(".datepicker").datepicker();
    /* EOF datepicker */
        
    /* colorpicker */
    if($(".color").length > 0)
       $(".color").ColorPicker({
                onSubmit: function(hsb, hex, rgb, el) {
                        $(el).val(hex);
                        $(el).ColorPickerHide();
                },
                onBeforeShow: function () {
                        $(this).ColorPickerSetColor(this.value);
                }
        })
        .bind('keyup', function(){
                $(this).ColorPickerSetColor(this.value);
        });
    /* EOF colorpicker */    
    
    /* datatables */
    if($("table.simple_sort").length > 0)
        $("table.simple_sort").dataTable({"iDisplayLength": 20,"bLengthChange": false,"bFilter": false,"bInfo": false,"bPaginate": true});
    
    if($("table.sort").length > 0)
        $("table.sort").dataTable({"iDisplayLength": 5, "sPaginationType": "full_numbers","bLengthChange": false,"bFilter": false,"bInfo": false,"bPaginate": true, "aoColumns": [ { "bSortable": false }, null, null, null, null]});
    
    if($("table.sortc").length > 0)
        $("table.sortc").dataTable({"iDisplayLength": 5, "aLengthMenu": [5,10,25,50,100], "sPaginationType": "full_numbers", "aoColumns": [ { "bSortable": false }, null, null, null, null]});
    /* EOF datatables */    
    
    /* Sparkline */
    if($(".mChartBar").length > 0)
       $(".mChartBar").sparkline('html',{ enableTagOptions: true, disableHiddenCheck: true});
    /* EOF Sparkline */
    
   // new selector case insensivity        
        $.expr[':'].containsi = function(a, i, m) {
            return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
        };        
   //     
   
   /* Fancybox */
   if($(".fancybox").length > 0)
      $(".fancybox").fancybox({padding: 10});
   /* EOF Fancybox */

   // Scroll up plugin
   //$.scrollUp({scrollText: '^'});
   // eof scroll up plugin       
   
   function refreshToken() {
            $.get('token.html').done(function(data){
               $("input[name='_token']").html('<input type="hidden" name="_token" value="'+data+'">');
            });
    };
	//if( $("input[name='_token']").val().length > 0) {
		//setInterval(refreshToken, 600000);
	//}
		
});

$(window).load(function(){ 



});

function toggleNicEdit(){
    if(!nE){
        nE = new nicEditor({fullPanel : true, iconsPath : 'img/nicedit/nicEditorIcons.gif'}).panelInstance('nicEditor');
    }else{
        nE.removeInstance('nicEditor');
        nE = null;
    }
}



