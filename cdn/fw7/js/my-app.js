var myApp = new Framework7({
    animateNavBackIcon: true,
    smartSelectSearchbar: true,
});
var $$ = Dom7;
var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true,
});
var calendarDateFormat = myApp.calendar({
    input: '#Dob',
    dateFormat: 'yyyy-mm-dd'
});

$('#FullName').attr('readonly', true);
$("#FamilyName, #GivenName").bind("change paste keyup", function() {
    var FamilyName = $("#FamilyName").val();
    var GivenName = $("#GivenName").val();
    $("#FullName").val(FamilyName + " " + GivenName);
});
$("#zipcode").keyup(function() {
    $('#searchzipcode').val($('#zipcode').val());
});

$("#searchzipcode").keyup(function() {
    $("#btnUsingZipcode").removeClass("color-green");
    $('#SearchZipCodePanel').empty();
});

$("#btnUsingZipcode").click(function() {
    var GetZipCode = $('#searchzipcode').val();
    var RomanZipCode = $('#RomanZipCode').val();
    var LocalZipCode = $('#LocalZipCode').val();

    if (typeof(RomanZipCode) == 'undefined' || typeof(LocalZipCode) == 'undefined' || RomanZipCode == '' || LocalZipCode == '') {
        $('#SearchZipCodePanel').html('<div class="formError inline" style="opacity: 0.87; position: relative; top: 0px; left: 0px; right: initial; margin-top: 0px; display: block;"><div class="formErrorContent">{{trans('
            lang.msg_0104 ')}}</div></div>');
        $('#SearchZipCodePanel').show();
        $('#Address_Input1').hide();
        $('#Address_Input2').hide();
        $('#zipcode').hide();
    } else {
        $('#Address_Input1').show();
        $('#Address_Input2').show();
        $('#zipcode').show();
        $('#zipcode').val(GetZipCode);
        $('#Address').val(RomanZipCode);
        $('#AddressLocal').val(LocalZipCode);
        $('#zipcode').prop('readonly', true);
        myApp.closeModal('.picker-1');
    }
});

$('#btnLogin').click(function() {
    var login = $('#login_login').val();
    var password = $('#password_login').val();
    var captcha = $('#captcha_login').val();
    var token = $('#_token_login').val();
    if (login != "" && password != "" && captcha != "") {
        var formData = 'login=' + login + '&password=' + password + '&captcha=' + captcha + '&_token=' + token;
        myApp.showPreloader();
        $$.ajax({
            url: "{{asset('login.html')}}",
            type: "post",
            data: formData,
            success: function(data) {
                if (data == 'success') {
                    location.reload();
                } else {
                    $$('#ImgCaptcha_login').attr('src', $$('#ImgCaptcha').attr('src') + '#');
                    $$('#captcha_login').val('');
                    myApp.hidePreloader();
                    myApp.alert(data, 'DCOM MONEY EXPRESS');
                }

            }
        });
    } else {
        myApp.alert('{{trans('
            lang.msg_0266 ')}}', 'DCOM MONEY EXPRESS');
    }

});
$('#btnReset').click(function() {
    var loginreset = $$('#loginreset').val();
    var emailsms = $$('#emailsms').val();
    var captchareset = $$('#captchareset').val();
    var tokenreset = $$('#_tokenreset').val();
    var formData = 'login=' + loginreset + '&emailsms=' + emailsms + '&captchareset=' + captchareset + '&_token=' + tokenreset + '&find_type=1';
    myApp.showPreloader();
    $$.ajax({
        url: "{{asset('reset-password.html')}}",
        type: "post",
        data: formData,
        success: function(data) {
            if (data) {
                $$('#ImgCaptchaReset').attr('src', $$('#ImgCaptchaReset').attr('src') + '#');
                $$('#captchareset').val('');
                myApp.hidePreloader();
                myApp.alert(data, 'DCOM MONEY EXPRESS');
            }

        }
    });
});

$('#btnStep1').on('click', function() {
    if (!$$('#terms').prop('checked')) {
        myApp.alert('{{trans('
            lang.msg_0266 ')}}', 'DCOM MONEY EXPRESS');
    } else {
        $$('#P_terms').hide();
        $$('#P_step1').show();
        $$('.page-content').scrollTop(0, 600);
    }
});

$('#btnRegister').on('click', function() {
    $('#signupForm').validationEngine('attach', {
        promptPosition: "inline",
        scroll: false,
        showOneMessage: true,
        onValidationComplete: function(form, status) {
            if (status == true) {
                myApp.showPreloader();
                $('#signupForm').validationEngine('detach');
                myApp.showPreloader();
                var formData = $("#signupForm").serialize();
                $.ajax({
                    url: "{{asset('AddNewSenderApp')}}",
                    type: "post",
                    data: formData,
                    success: function(data) {
                        if (data) {
                            myApp.hidePreloader();
                            myApp.alert(data, 'DCOM MONEY EXPRESS');
                        } else {
                            myApp.alert('{{trans('
                                lang.msg_0224 ')}}', 'DCOM MONEY EXPRESS');
                            myApp.hidePreloader();
                        }

                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        myApp.hidePreloader();
                        myApp.alert(data, 'DCOM MONEY EXPRESS');
                    }
                });

            }
        }
    });
});

$("#NotificationMethod").change(function() {
    if ($('#NotificationMethod').val() != "") {
        if ($('#NotificationMethod').val() == 'EMAIL') {
            $('#Email').removeClass('validate[required,custom[email]]').removeClass('validate[custom[email]]').addClass('validate[required,custom[email]]');
            $('#emailconfirm').removeClass('validate[required,custom[email],equals[Email]]').removeClass('validate[custom[email],equals[Email]]').addClass('validate[required,custom[email],equals[Email]]');
            $('#phonenumber').removeClass('validate[required,custom[phone]]').removeClass('validate[custom[phone]]').addClass('validate[custom[phone]]');
            $("#phonetype").empty();
            $('#phonetype').append('<option value="">-- {{trans('
                lang.msg_0629 ')}} --</option><option value="01">SoftBank Mobile</option><option value="02">KDDI AU Mobile</option><option value="03">NTT Docomo Mobile</option><option val="04">NTT Landline</option><option val="05">IP Landline</option><option val="06">PHS WILLCOM</option>');

        } else {
            $('#Email').removeClass('validate[required,custom[email]]').addClass('validate[custom[email]]');
            $('#emailconfirm').removeClass('validate[required,custom[email],equals[Email]]').removeClass('validate[custom[email],equals[Email]]').addClass('validate[custom[email],equals[Email]]');
            $('#phonenumber').removeClass('validate[required,custom[phone]]').removeClass('validate[custom[phone]]').addClass('validate[required,custom[phone]]');
            $("#phonetype").empty();
            $('#phonetype').append('<option value="">-- {{trans('
                lang.msg_0629 ')}} --</option><option value="01">SoftBank Mobile</option><option value="02">KDDI AU Mobile</option><option value="03">NTT Docomo Mobile</option>');
        }
    }
});


$().ready(function() {
    $("#signupForm").validationEngine('attach', {
        promptPosition: "inline",
        scroll: false,
        showOneMessage: true
    });
    $("#LoginForm").validationEngine('attach', {
        promptPosition: "inline",
        scroll: false,
        showOneMessage: true
    });
    $("#ResetPassForm").validationEngine('attach', {
        promptPosition: "inline",
        scroll: false,
        showOneMessage: true
    });
    $('#formSearchZipCode').validationEngine('attach', {
        promptPosition: "inline",
        scroll: false,
        showOneMessage: true,
        onValidationComplete: function(form, status) {
            if (status == true) {
                $.ajax({
                    url: "{{asset('/module/zipcode/search-mobile.html')}}",
                    data: $('#formSearchZipCode').serialize(),
                    type: "post",
                    success: function(data) {
                        $("#btnUsingZipcode").addClass("color-green");
                        $('#SearchZipCodePanel').html(data);
                        $('#SearchZipCodePanel').show();
                    }
                });

            }
        }
    });
    $("#knowzipcodeid").change(function() {
        if ($(this).val() == '1') {
            $('#KnowAdd').show();
            $('#UnknowAdd').hide();
        } else {
            $('#KnowAdd').hide();
            $('#UnknowAdd').show();
        }
    });
    $('#reload_captcha').click(function() {
        $('#ImgCaptcha').attr('src', $('#ImgCaptcha').attr('src') + '#');
    });
});

$$('form.ajax-submit').on('submitted', function(e) {
    var xhr = e.detail.xhr; // actual XHR object

    var data = e.detail.data; // Ajax response from action file
    // do something with response data
    $$('#ImgCaptchaReset').attr('src', $$('#ImgCaptcha').attr('src') + '#');
    $$('#captchareset').val('');
    myApp.alert(data, 'DCOM MONEY EXPRESS');
});