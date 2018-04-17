//editor
;(function(){
    "use strict";
    var currentBlock = {};
    currentBlock.element = null;
    currentBlock.id = 0;

    var gomjzDraw = $('#gomjz-draw');

    const animationsLib = {
        'enter': {
            'group_name':'进入',
            'anims':[
                {
                    'ID':1001,
                    'title':'淡入',
                    'name':'fadeIn',
                    'has_direction':false,
                    'duration':1,
                    'delay':0,
                    'times':1
                },
                {
                    'ID':1002,
                    'title':'淡出',
                    'name':'fadeOut',
                    'has_direction':false,
                    'duration':1,
                    'delay':0,
                    'times':1
                }
            ]
        },
        'emphasis': {
            'group_name':'强调',
            'anims':[

            ]
        },
        'out': {
            'group_name':'退出',
            'anims':[

            ]
        }
    }

    var findAnimationByID = function(animations,ID){
        for(let g in animations){
            for(let a in animationsLib[g].anims){
                if(ID == animationsLib[g].anims[a].ID){
                    return animationsLib[g].anims[a];
                }
            }
        }
        return null;
    }



    var animateTapSetting =  function(animations){
        $('.animation-container').html('');
        if(animations) {
            animations = JSON.parse(animations);
            addAnimation(animations);
        }
    }

    var addAnimation = function(animations){
        if($('.animation-container').find('.animation-group').length>0){
            alert('只能添加一个动画');
            return true;
        }
        var tpl = '';
        for(let anm in animations){
            tpl = '';
            tpl += '<div data-name = "'+animations[anm].name+'" data-title = "'+animations[anm].title+'" class="animation-group">\n' +
                '  <label class="animation-group-label"><span class="del-animation"><img src="img/del.png" width="20" height="20" /></span>' + animations[anm].title + '动画' +'</label>';
            if(animations[anm].has_direction){
                tpl += '<section class="clearfix properties-section">\n' +
                    '    <label class="properties-label">方向</label>\n' +
                    '    <div class="animation-select">\n' +
                    '    <select class="direction-anselect sm-select">\n' +
                    '        <option value="ttb">从上向下</option>\n'+
                    '        <option value="btt">从下向上</option>\n'+
                    '        <option value="ltr">从左向右</option>\n'+
                    '        <option value="rtl">从右向左</option>\n'+
                    '    </select>\n'+
                    '    </div>\n' +
                    '    </section>';
            }
            tpl += '<section class="clearfix properties-section">\n' +
                '    <label class="properties-label">动画时间</label>\n' +
                '    <div class="animation-slider">\n' +
                '    <input class="duration-anslir slider" type="range" min="0" max="20" value="'+ animations[anm].duration +'" step="0.1">\n' +
                '    </div>\n' +
                '    <div class="animation-input">\n' +
                '    <input class="duration-aninput sm-input" type="number" value="'+ animations[anm].duration +'" min="0" max="20" step="0.1" />\n' +
                '    </div>\n' +
                '    </section>';
            tpl += '<section class="clearfix properties-section">\n' +
                '    <label class="properties-label">延迟时间</label>\n' +
                '    <div class="animation-slider">\n' +
                '    <input class="delay-anslir slider" type="range" min="0" max="20" value="'+ animations[anm].delay +'" step="0.1">\n' +
                '    </div>\n' +
                '    <div class="animation-input">\n' +
                '    <input class="delay-aninput sm-input" type="number" value="'+ animations[anm].delay +'" min="0" max="20" step="0.1" />\n' +
                '    </div>\n' +
                '    </section>';
            tpl += '<section class="clearfix properties-section">\n' +
                '    <label class="properties-label">播放次数</label>\n' +
                '    <div class="animation-slider">\n' +
                '    <input class="times-anslir slider" type="range" min="1" max="10" value="'+ animations[anm].times +'" step="1">\n' +
                '    </div>\n' +
                '    <div class="animation-input">\n' +
                '    <input class="times-aninput sm-input" type="number" value="'+ animations[anm].times +'" min="1" max="10" step="1" />\n' +
                '    </div>\n' +
                '    </section>';
            tpl += '</div>';

            //
            var dom = $(tpl);
            dom.find('.duration-anslir').bind('input',durationAnslirEvent);
            dom.find('.duration-aninput').bind('change keypress paste input',durationInputEvent);
            dom.find('.delay-anslir').bind('input',delayAnslirEvent);
            dom.find('.delay-aninput').bind('change keypress paste input',delayInputEvent);
            dom.find('.times-anslir').bind('input',timesAnslirEvent);
            dom.find('.times-aninput').bind('change keypress paste input',timesInputEvent);
            dom.find('.direction-anselect').bind('change keypress',directionAnselectEvent);
            dom.find('.del-animation').bind('click',delAnimation);

            $('.animation-container').append(dom);

            //console.log(tpl);
        }
    }

    var delAnimation = function(e){
        var value = $(e.target).parent().parent().parent().remove();
    }
    var durationAnslirEvent = function(e){
        var value = e.target.value;
        if(value<0 ||value>20){value=1;e.target.value =value}
        $(e.target).parent().parent().find('.duration-aninput').val(value);
        setCurrentBlockAnimation();
    }
    var durationInputEvent = function(e){
        var value = e.target.value;
        if(value<0 ||value>20){value=1;e.target.value =value}
        $(e.target).parent().parent().find('.duration-anslir').val(value);
        setCurrentBlockAnimation();
    }
    var delayAnslirEvent = function(e){
        var value = e.target.value;
        if(value<0 ||value>20){value=0;e.target.value =value}
        $(e.target).parent().parent().find('.delay-aninput').val(value);
        setCurrentBlockAnimation();
    }
    var delayInputEvent = function(e){
        var value = e.target.value;
        if(value<0 ||value>20){value=0;e.target.value =value}
        $(e.target).parent().parent().find('.delay-anslir').val(value);
        setCurrentBlockAnimation();
    }
    var timesAnslirEvent = function(e){
        var value = e.target.value;
        if(value<0 ||value>10){value=1;e.target.value =value}
        $(e.target).parent().parent().find('.times-aninput').val(value);
        setCurrentBlockAnimation();
    }
    var timesInputEvent = function(e){
        var value = e.target.value;
        if(value<0 ||value>10){value=1;e.target.value =value}
        $(e.target).parent().parent().find('.times-anslir').val(value);
        setCurrentBlockAnimation();
    }
    var directionAnselectEvent = function(){
        setCurrentBlockAnimation();
    }

    var setCurrentBlockAnimation = function(){
        var aniJSON = [];
        var oneName = '';
        var oneDuration = '';
        var oneDelay = '';
        var oneTimes = '';
        $('.animation-container').find('.animation-group').each(function(){
            var title = this.dataset.title;
            var name = this.dataset.name;
            var hasDirection = false;
            var duration = this.querySelector('.duration-aninput').value;
            var delay = this.querySelector('.delay-aninput').value;
            var times = this.querySelector('.times-aninput').value;
            if(this.querySelector('.animation-select')){hasDirection=true;}
            oneName = name;
            oneDuration = duration;
            oneDelay = delay;
            oneTimes = times;
            aniJSON.push(
                {
                    title:title,
                    name:name,
                    has_direction:hasDirection,
                    duration:duration,
                    delay:delay,
                    times:times
                }
            );
        })

        if(currentBlock.element){
            currentBlock.element.dataset.animations = JSON.stringify(aniJSON);
            //console.log(oneName+' '+ oneDuration +'s ease '+oneDelay+'s '+oneTimes+' normal');
            $(currentBlock.element).css('animation','');
            $(currentBlock.element).css('animation',oneName+' '+ oneDuration +'s ease '+oneDelay+'s '+oneTimes+' normal');
        }
    }

    //


    $(function(){
        $('.image-content-editor').on('change',function(){
            var files = this.files;
            var file = files[0];

            // You can get the mime type like this.
            var thumbMIME = files[0]['name'].split('.').pop();
            if (files && file) {
                var reader = new FileReader();

                reader.onload = function(readerEvt) {
                    var binaryString = readerEvt.target.result.split(',')[1];//图片源数据
                    console.log(binaryString);

                    console.log(readerEvt.target.result);

                    $('.img-preview').prop('src', readerEvt.target.result);//浏览器缓存dataurl数据，非图片源数据

                    if(currentBlock.element){

                        $(currentBlock.element).find('.block-content-img').prop('src',readerEvt.target.result);
                    }

                }.bind(this);
                reader.readAsDataURL(file);
            }
        })

        var animListHtml = '';
        for(let g in animationsLib){
            animListHtml += '<optgroup label="'+animationsLib[g].group_name+'">';
            for(let a in animationsLib[g].anims){
                animListHtml += '<option value="'+animationsLib[g].anims[a].ID+'">';
                animListHtml += animationsLib[g].anims[a].title;
                animListHtml += '</option>';
            }
            animListHtml += '</optgroup>';
        }
        var animListDom = $(animListHtml);
        $('.animation-list').html(animListDom);

        $('.add-animation').on('click',function(){
            var id = $('.animation-list').val();
            if(id){
                var anim = findAnimationByID(animationsLib,id);
                if(anim){
                    addAnimation([anim]);
                    setCurrentBlockAnimation();
                }
            }
        })

        $('.properties-tab').on('click',function(){
            if(currentBlock.element) {
                $('.properties-tab').removeClass('active');
                $(this).addClass('active');
                $('.properties-content').hide();
                $('.properties-content'+$(this).val()).show();
            }
        })


        interact('.gomjz-block-text').on('tap',function(event){
            const defaultTextColor = '#000000';
            const defaultTextBgColor = '#FFFFFF';
            const defaultTextFontSize = 24;
            const defaultTextLineHeight = 1;
            const defaultTextPaddingTop = 0;
            const defaultTextPaddingBottom = 0;
            const defaultTextPaddingLeft = 0;
            const defaultTextPaddingRight = 0;
            const defaultTextTextAlign = 'left';
            const defaultTextFontWeight = 'normal';
            const defaultTextFontStyle = 'normal';
            const defaultTextTextDecoration = 'none';
            const defaultTextContent = '';

            $('.properties-section').hide();
            $('.text-section').show();


            var block = currentBlock.element = event.currentTarget?event.currentTarget:null;
            var blockEle= event.currentTarget;
            var propertyEle = $('#gomjz-properties');

            var textColor = blockEle.dataset.textColor;
            var textColorPickerEle = propertyEle.find('.text-color-picker');
            textColor = textColor==undefined?defaultTextColor:textColor;
            setColorPicker(textColorPickerEle,textColor);

            var textBgColor = blockEle.dataset.textColor;
            var textBgColorPickerEle = propertyEle.find('.text-bg-color-picker');
            textBgColor = textBgColor==undefined?defaultTextBgColor:textBgColor;
            setColorPicker(textBgColorPickerEle,textBgColor);

            var textFontSize = blockEle.dataset.fontSize;
            textFontSize = textFontSize==undefined?defaultTextFontSize:textFontSize;
            $('.text-font-size-input').val(textFontSize);
            $('.text-font-size-slider').val(textFontSize);

            var textLineHeight = blockEle.dataset.lineHeight;
            textLineHeight = textLineHeight==undefined?defaultTextLineHeight:textLineHeight;
            $('.text-line-height-input').val(textLineHeight);
            $('.text-line-height-slider').val(textLineHeight);

            var textPaddingTop = blockEle.dataset.paddingTop;
            textPaddingTop = textPaddingTop==undefined?defaultTextPaddingTop:textPaddingTop;
            $('.text-padding-top-input').val(textPaddingTop);
            $('.text-padding-top-slider').val(textPaddingTop);

            var textPaddingBottom = blockEle.dataset.paddingBottom;
            textPaddingBottom = textPaddingBottom==undefined?defaultTextPaddingBottom:textPaddingBottom;
            $('.text-padding-bottom-input').val(textPaddingBottom);
            $('.text-padding-bottom-slider').val(textPaddingBottom);

            var textPaddingLeft = blockEle.dataset.paddingLeft;
            textPaddingLeft = textPaddingLeft==undefined?defaultTextPaddingLeft:textPaddingLeft;
            $('.text-padding-left-input').val(textPaddingLeft);
            $('.text-padding-left-slider').val(textPaddingLeft);

            var textPaddingRight = blockEle.dataset.paddingRight;
            textPaddingRight = textPaddingRight==undefined?defaultTextPaddingRight:textPaddingRight;
            $('.text-padding-right-input').val(textPaddingRight);
            $('.text-padding-right-slider').val(textPaddingRight);

            var textTextAlign = blockEle.dataset.textAlign;
            textTextAlign = textTextAlign==undefined?defaultTextTextAlign:textTextAlign;
            $('.text-text-align-button').removeClass('active');
            $('.text-text-align-button[value='+textTextAlign+']').addClass('active');

            var textFontStyle = blockEle.dataset.fontStyle;
            textFontStyle = textFontStyle==undefined?defaultTextFontStyle:textFontStyle;
            if(textFontStyle == 'italic'){
                $('.text-text-decoration-button[value=italic]').addClass('active');
            }else{
                $('.text-text-decoration-button[value=italic]').removeClass('active');
            }

            var textTextDecoration = blockEle.dataset.textDecoration;
            textTextDecoration = textTextDecoration==undefined?defaultTextTextDecoration:textTextDecoration;
            if(textTextDecoration == 'bold'){
                $('.text-text-decoration-button[value=underline]').addClass('active');
            }else{
                $('.text-text-decoration-button[value=underline]').removeClass('active');
            }

            var textFontWeight = blockEle.dataset.fontWeight;
            textFontWeight = textFontWeight==undefined?defaultTextFontWeight:textFontWeight;
            if(textFontWeight == 'bold'){
                $('.text-text-decoration-button[value=bold]').addClass('active');
            }else{
                $('.text-text-decoration-button[value=bold]').removeClass('active');
            }

            var textContent = blockEle.querySelector('.block-content').innerHTML;
            textContent = textContent==undefined?defaultTextContent:textContent;

            textContent = textContent.replace(/<br *\/?>/gi, '\n');
            textContent = textContent.replace(/&nbsp;/gi, ' ');
            $('.text-content-editor').val(textContent);


            var animations = blockEle.dataset.animations;
            animateTapSetting(animations);

            $('.properties-tab').removeClass('active');
            $('.properties-tab[value=1]').addClass('active');
            $('.properties-content').hide();
            $('.properties-content1').show();

        });

        interact('.gomjz-block-image').on('tap',function(event){
            const defaultTextBgColor = '#FFFFFF';
            const defaultTextPaddingTop = 0;
            const defaultTextPaddingBottom = 0;
            const defaultTextPaddingLeft = 0;
            const defaultTextPaddingRight = 0;
            const defaultTextContent = '';

            $('.properties-section').hide();
            $('.image-section').show();

            var block = currentBlock.element = event.currentTarget?event.currentTarget:null;
            var blockEle= event.currentTarget;
            var propertyEle = $('#gomjz-properties');

            var textBgColor = blockEle.dataset.textColor;
            var textBgColorPickerEle = propertyEle.find('.text-bg-color-picker');
            textBgColor = textBgColor==undefined?defaultTextBgColor:textBgColor;
            setColorPicker(textBgColorPickerEle,textBgColor);

            var textPaddingTop = blockEle.dataset.paddingTop;
            textPaddingTop = textPaddingTop==undefined?defaultTextPaddingTop:textPaddingTop;
            $('.text-padding-top-input').val(textPaddingTop);
            $('.text-padding-top-slider').val(textPaddingTop);

            var textPaddingBottom = blockEle.dataset.paddingBottom;
            textPaddingBottom = textPaddingBottom==undefined?defaultTextPaddingBottom:textPaddingBottom;
            $('.text-padding-bottom-input').val(textPaddingBottom);
            $('.text-padding-bottom-slider').val(textPaddingBottom);

            var textPaddingLeft = blockEle.dataset.paddingLeft;
            textPaddingLeft = textPaddingLeft==undefined?defaultTextPaddingLeft:textPaddingLeft;
            $('.text-padding-left-input').val(textPaddingLeft);
            $('.text-padding-left-slider').val(textPaddingLeft);

            var textPaddingRight = blockEle.dataset.paddingRight;
            textPaddingRight = textPaddingRight==undefined?defaultTextPaddingRight:textPaddingRight;
            $('.text-padding-right-input').val(textPaddingRight);
            $('.text-padding-right-slider').val(textPaddingRight);

            var textContent = blockEle.querySelector('.block-content-img').src;
            textContent = textContent==undefined?defaultTextContent:textContent;

            $('.img-preview').prop('src',textContent);


            var animations = blockEle.dataset.animations;
            animateTapSetting(animations);

            $('.properties-tab').removeClass('active');
            $('.properties-tab[value=1]').addClass('active');
            $('.properties-content').hide();
            $('.properties-content1').show();

        });

        interact('.gomjz-block-video').on('tap',function(event){
            const defaultTextPaddingTop = 0;
            const defaultTextPaddingBottom = 0;
            const defaultTextPaddingLeft = 0;
            const defaultTextPaddingRight = 0;
            const defaultTextContent = '';

            $('.properties-section').hide();
            $('.video-section').show();

            var block = currentBlock.element = event.currentTarget?event.currentTarget:null;
            var blockEle= event.currentTarget;
            var propertyEle = $('#gomjz-properties');

            var textPaddingTop = blockEle.dataset.paddingTop;
            textPaddingTop = textPaddingTop==undefined?defaultTextPaddingTop:textPaddingTop;
            $('.text-padding-top-input').val(textPaddingTop);
            $('.text-padding-top-slider').val(textPaddingTop);

            var textPaddingBottom = blockEle.dataset.paddingBottom;
            textPaddingBottom = textPaddingBottom==undefined?defaultTextPaddingBottom:textPaddingBottom;
            $('.text-padding-bottom-input').val(textPaddingBottom);
            $('.text-padding-bottom-slider').val(textPaddingBottom);

            var textPaddingLeft = blockEle.dataset.paddingLeft;
            textPaddingLeft = textPaddingLeft==undefined?defaultTextPaddingLeft:textPaddingLeft;
            $('.text-padding-left-input').val(textPaddingLeft);
            $('.text-padding-left-slider').val(textPaddingLeft);

            var textPaddingRight = blockEle.dataset.paddingRight;
            textPaddingRight = textPaddingRight==undefined?defaultTextPaddingRight:textPaddingRight;
            $('.text-padding-right-input').val(textPaddingRight);
            $('.text-padding-right-slider').val(textPaddingRight);

            var textContent = blockEle.dataset.videoUrl;
            textContent = textContent==undefined?defaultTextContent:textContent;

            $('.video-content-editor').val(textContent);


            var animations = blockEle.dataset.animations;
            animateTapSetting(animations);

            $('.properties-tab').removeClass('active');
            $('.properties-tab[value=1]').addClass('active');
            $('.properties-content').hide();
            $('.properties-content1').show();

        });

        $('.text-content-editor').on('change keypress paste input',function(){
            var contentValue = $(this).val();

            contentValue = contentValue.replace(/\r\n|\r|\n/g,"<br/>");
            contentValue = contentValue.replace(/\s/g,"&nbsp;");

            if(currentBlock.element){
                $(currentBlock.element.querySelector('.block-content')).html(contentValue);
            }
        })

        $('.text-text-decoration-button').on('click',function(){
            var buttonValue = $(this).val();
            if(currentBlock.element){
                if(buttonValue == 'bold'){
                    $(this).toggleClass('active');
                    var blockContent = $(currentBlock.element).find('.block-content');

                    if($(this).hasClass('active')){
                        currentBlock.element.dataset.fontWeight = 'bold';
                        blockContent.css('font-weight','bold');
                    }else{
                        currentBlock.element.dataset.fontWeight = 'normal';
                        blockContent.css('font-weight','normal');
                    }
                }

                if(buttonValue == 'italic'){
                    $(this).toggleClass('active');
                    var blockContent = $(currentBlock.element).find('.block-content');

                    if($(this).hasClass('active')){
                        currentBlock.element.dataset.fontStyle = 'italic';
                        blockContent.css('font-style','italic');
                    }else{
                        currentBlock.element.dataset.fontStyle = 'normal';
                        blockContent.css('font-style','normal');
                    }
                }

                if(buttonValue == 'underline'){
                    $(this).toggleClass('active');
                    var blockContent = $(currentBlock.element).find('.block-content');

                    if($(this).hasClass('active')){
                        currentBlock.element.dataset.textDecoration = 'bold';
                        blockContent.css('text-decoration','underline');
                    }else{
                        currentBlock.element.dataset.textDecoration = 'none';
                        blockContent.css('text-decoration','none');
                    }
                }
            }
        })

        $('.text-text-align-button').on('click',function(){
            var align = $(this).val();
            if(currentBlock.element){
                $('.text-text-align-button').removeClass('active');
                $('.text-text-align-button[value='+align+']').addClass('active');
                currentBlock.element.dataset.textAlign = align;
                var blockContent = $(currentBlock.element).find('.block-content');
                if(align == 'justify'){
                    blockContent.css('text-align',align);
                    //blockContent.css('text-justify','inter-word');
                    //blockContent.css('-ms-text-justify','inter-word');
                }else{
                    blockContent.css('text-align',align);
                    //blockContent.css('text-justify','auto');
                    //blockContent.css('-ms-text-justify','auto');

                }
            }
        })

        $('.text-padding-right-input').on('change keypress paste input',function(){
            var padding = $(this).val();
            if(padding<0 ||padding>50){padding=0;$(this).val(padding);}
            $('.text-padding-right-slider').val(padding);

            if(currentBlock.element){
                currentBlock.element.dataset.paddingRight = padding;
                currentBlock.element.querySelector('.block-content').style.paddingRight = padding+ 'px';
            }
        })


        $('.text-padding-right-slider').on('input',function(){
            var padding = $(this).val();
            if(padding<0 ||padding>50){padding=0;$(this).val(padding);}
            $('.text-padding-right-input').val(padding);

            if(currentBlock.element){
                currentBlock.element.dataset.paddingRight = padding;
                currentBlock.element.querySelector('.block-content').style.paddingRight = padding+ 'px';
            }
        })

        $('.text-padding-left-input').on('change keypress paste input',function(){
            var padding = $(this).val();
            if(padding<0 ||padding>50){padding=0;$(this).val(padding);}
            $('.text-padding-left-slider').val(padding);

            if(currentBlock.element){
                currentBlock.element.dataset.paddingLeft = padding;
                currentBlock.element.querySelector('.block-content').style.paddingLeft = padding+ 'px';
            }
        })


        $('.text-padding-left-slider').on('input',function(){
            var padding = $(this).val();
            if(padding<0 ||padding>50){padding=0;$(this).val(padding);}
            $('.text-padding-left-input').val(padding);

            if(currentBlock.element){
                currentBlock.element.dataset.paddingLeft = padding;
                currentBlock.element.querySelector('.block-content').style.paddingLeft = padding+ 'px';
            }
        })

        $('.text-padding-bottom-input').on('change keypress paste input',function(){
            var padding = $(this).val();
            if(padding<0 ||padding>50){padding=0;$(this).val(padding);}
            $('.text-padding-bottom-slider').val(padding);

            if(currentBlock.element){
                currentBlock.element.dataset.paddingBottom = padding;
                currentBlock.element.querySelector('.block-content').style.paddingBottom = padding+ 'px';
            }
        })


        $('.text-padding-bottom-slider').on('input',function(){
            var padding = $(this).val();
            if(padding<0 ||padding>50){padding=0;$(this).val(padding);}
            $('.text-padding-bottom-input').val(padding);

            if(currentBlock.element){
                currentBlock.element.dataset.paddingBottom = padding;
                currentBlock.element.querySelector('.block-content').style.paddingBottom = padding+ 'px';
            }
        })


        $('.text-padding-top-input').on('change keypress paste input',function(){
            var padding = $(this).val();
            if(padding<0 ||padding>50){padding=0;$(this).val(padding);}
            $('.text-padding-top-slider').val(padding);

            if(currentBlock.element){
                currentBlock.element.dataset.paddingTop = padding;
                currentBlock.element.querySelector('.block-content').style.paddingTop = padding+ 'px';
            }
        })


        $('.text-padding-top-slider').on('input',function(){
            var padding = $(this).val();

            if(padding<0 ||padding>50){padding=0;$(this).val(padding);}

            $('.text-padding-top-input').val(padding);

            if(currentBlock.element){
                currentBlock.element.dataset.paddingTop = padding;
                currentBlock.element.querySelector('.block-content').style.paddingTop = padding + 'px';
            }
        })


        $('.text-line-height-input').on('change keypress paste input',function(){
            var lineHeight = $(this).val();
            if(lineHeight<0 ||lineHeight>5){lineHeight=1;$(this).val(lineHeight);}
            $('.text-font-size-slider').val(lineHeight);

            if(currentBlock.element){
                currentBlock.element.dataset.lineHeight = lineHeight;
                currentBlock.element.querySelector('.block-content').style.lineHeight = lineHeight;
            }
        })


        $('.text-line-height-slider').on('input',function(){
            var lineHeight = $(this).val();
            if(lineHeight<0 ||lineHeight>5){lineHeight=1;$(this).val(lineHeight);}
            $('.text-line-height-input').val(lineHeight);

            if(currentBlock.element){
                currentBlock.element.dataset.lineHeight = lineHeight;
                currentBlock.element.querySelector('.block-content').style.lineHeight = lineHeight;
            }
        })

        $('.text-font-size-input').on('change keypress paste input',function(){
            var fontSize = $(this).val();
            if(fontSize<12 ||fontSize>50){fontSize=24;$(this).val(fontSize);}
            $('.text-font-size-slider').val(fontSize);

            if(currentBlock.element){
                currentBlock.element.dataset.fontSize = fontSize;
                currentBlock.element.querySelector('.block-content').style.fontSize = fontSize+'px';
            }
        })


        $('.text-font-size-slider').on('input',function(){
            var fontSize = $(this).val();
            if(fontSize<12 ||fontSize>50){fontSize=24;$(this).val(fontSize);}
            $('.text-font-size-input').val(fontSize);

            if(currentBlock.element){
                currentBlock.element.dataset.fontSize = fontSize;
                currentBlock.element.querySelector('.block-content').style.fontSize = fontSize+'px';
            }
        })

        $('.text-color-picker').colpick({
            onSubmit:function(hsb,hex,rgb,el,bySetColor) {
                var color = '';
                if(hsb.b>50){
                    color = '#000';
                }else{
                    color = '#fff';
                }
                setColorPicker($(el), '#'+hex, color);
                $(el).colpickHide();

                if(currentBlock.element){
                    currentBlock.element.dataset.textColor = '#'+hex;
                    currentBlock.element.querySelector('.block-content').style.color = '#'+hex;
                }

            }
        });

        $('.text-color-picker-pre li').on('click',function(){
            setColorPicker($('.text-color-picker'), $(this).attr('data-bgcolor') ,$(this).attr('data-color'));

            if(currentBlock.element){
                currentBlock.element.dataset.textColor = $(this).attr('data-bgcolor');
                currentBlock.element.querySelector('.block-content').style.color = $(this).attr('data-bgcolor');
            }
        })

        $('.text-bg-color-picker').colpick({
            onSubmit:function(hsb,hex,rgb,el,bySetColor) {
                var color = '';
                if(hsb.b>50){
                    color = '#000';
                }else{
                    color = '#fff';
                }
                setColorPicker($(el), '#'+hex, color);
                $(el).colpickHide();

                if(currentBlock.element){
                    currentBlock.element.dataset.textColor = '#'+hex;
                    currentBlock.element.querySelector('.block-content').style.backgroundColor = '#'+hex;
                }

            }
        });

        $('.text-bg-color-picker-pre li').on('click',function(){
            setColorPicker($('.text-bg-color-picker'), $(this).attr('data-bgcolor') ,$(this).attr('data-color'));

            if(currentBlock.element){
                currentBlock.element.dataset.textBgColor = $(this).attr('data-bgcolor');
                currentBlock.element.querySelector('.block-content').style.backgroundColor = $(this).attr('data-bgcolor');
            }
        })

        $('.video-content-editor').on('change keypress paste input',function(){
            var contentValue = $(this).val();

            if(currentBlock.element){
                currentBlock.element.dataset.videoUrl = contentValue;
            }
        })

        interact('.text-resizable').resizable({
            // resize from all edges and corners
            edges: { left: true, right: true, bottom: true, top: true },

            // keep the edges inside the parent
            restrictEdges: {
                outer: '#gomjz-draw-restrict',
                endOnly: true,
                elementRect: { top: 0, left: 0, right: 1,bottom:Infinity }
            },

            // minimum size
            restrictSize: {
                min: { width: 100, height: 54 },
            },

            inertia: true,
        }).on('resizemove', function (event) {
            var target = event.target,
                x = (parseFloat(target.getAttribute('data-x')) || 0),
                y = (parseFloat(target.getAttribute('data-y')) || 0);

            // update the element's style
            target.style.width  = event.rect.width + 'px';
            target.style.height = event.rect.height + 'px';

            // translate when resizing from top or left edges
            x += event.deltaRect.left;
            y += event.deltaRect.top;

            target.style.webkitTransform = target.style.transform =
                'translate(' + x + 'px,' + y + 'px)';

            target.setAttribute('data-width', x);
            target.setAttribute('data-height', y);
        }).on('tap',function(event){
            $(".resize-rec").css('visibility','hidden');
            event.currentTarget.querySelector('.resize-rec').style.visibility = 'visible';
        });



        $('.tool-text').on('click',function(){
            var block = document.createElement("block");
            var blockContainer = document.createElement("div");
            var blockID = randomBlockID();
            if(blockID > 0){
                currentBlock.id = blockID
            }else{
                return false;
            }

            block.className = 'gomjz-block gomjz-block-text left-top-temp  draggable text-resizable';
            blockContainer.className = 'block-container';
            block.dataset.blockid = blockID;

            var content = document.createElement("div");
            content.className = 'block-content';
            content.innerHTML= '点击此处编辑文字';

            blockContainer.appendChild(content);

            var resizeRec = document.createElement("div");
            resizeRec.className = 'resize-rec';

            var recTpl = '<div class="line-n"></div><div class="line-e"></div><div class="line-s"></div><div class="line-w"></div><div class="circle-nw"></div><div class="circle-ne"></div><div class="circle-se"></div><div class="circle-sw"></div><div class="circle-n-c"><div class="cicle"></div></div><div class="circle-e-c"><div class="cicle"></div></div><div class="circle-s-c"><div class="cicle"></div></div> <div class="circle-w-c"><div class="cicle"></div></div>';
            resizeRec.innerHTML = recTpl;

            blockContainer.appendChild(resizeRec);
            block.appendChild(blockContainer);

            document.getElementById('gomjz-draw').appendChild(block);


        });

        $('.tool-image').on('click',function(){
            var block = document.createElement("block");
            block.dataset.imageUrl = '';
            var blockContainer = document.createElement("div");
            var blockID = randomBlockID();
            if(blockID > 0){
                currentBlock.id = blockID
            }else{
                return false;
            }

            block.className = 'gomjz-block gomjz-block-image left-top-temp  draggable text-resizable';
            blockContainer.className = 'block-container';
            block.dataset.blockid = blockID;

            var content = document.createElement("div");
            content.className = 'block-content';
            content.innerHTML= '<img class="block-content-img" width="100%" height="100%" src="img/image.png" />';

            blockContainer.appendChild(content);

            var resizeRec = document.createElement("div");
            resizeRec.className = 'resize-rec';

            var recTpl = '<div class="line-n"></div><div class="line-e"></div><div class="line-s"></div><div class="line-w"></div><div class="circle-nw"></div><div class="circle-ne"></div><div class="circle-se"></div><div class="circle-sw"></div><div class="circle-n-c"><div class="cicle"></div></div><div class="circle-e-c"><div class="cicle"></div></div><div class="circle-s-c"><div class="cicle"></div></div> <div class="circle-w-c"><div class="cicle"></div></div>';
            resizeRec.innerHTML = recTpl;

            blockContainer.appendChild(resizeRec);
            block.appendChild(blockContainer);

            document.getElementById('gomjz-draw').appendChild(block);


        });

        $('.tool-video').on('click',function(){
            var block = document.createElement("block");
            block.dataset.videoUrl = '';
            var blockContainer = document.createElement("div");
            var blockID = randomBlockID();
            if(blockID > 0){
                currentBlock.id = blockID
            }else{
                return false;
            }

            block.className = 'gomjz-block gomjz-block-video left-top-temp  draggable text-resizable';
            blockContainer.className = 'block-container';
            block.dataset.blockid = blockID;

            var content = document.createElement("div");
            content.className = 'block-content';
            content.innerHTML= '<img width="100%" height="100%" src="img/video.png" />';

            blockContainer.appendChild(content);

            var resizeRec = document.createElement("div");
            resizeRec.className = 'resize-rec';

            var recTpl = '<div class="line-n"></div><div class="line-e"></div><div class="line-s"></div><div class="line-w"></div><div class="circle-nw"></div><div class="circle-ne"></div><div class="circle-se"></div><div class="circle-sw"></div><div class="circle-n-c"><div class="cicle"></div></div><div class="circle-e-c"><div class="cicle"></div></div><div class="circle-s-c"><div class="cicle"></div></div> <div class="circle-w-c"><div class="cicle"></div></div>';
            resizeRec.innerHTML = recTpl;

            blockContainer.appendChild(resizeRec);
            block.appendChild(blockContainer);

            document.getElementById('gomjz-draw').appendChild(block);


        });



        interact('.draggable')
            .draggable({
                // enable inertial throwing
                inertia: true,
                // keep the element within the area of it's parent
                restrict: {
                    restriction: "#gomjz-draw-restrict",
                    endOnly: true,
                    elementRect: { top: 0, left: 0, right: 1,bottom:0 }
                },
                // enable autoScroll
                autoScroll: true,

                // call this function on every dragmove event
                onmove: dragMoveListener,
                // call this function on every dragend event
            });

        function dragMoveListener (event) {
            var target = event.target,
                // keep the dragged position in the data-x/data-y attributes
                x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            // translate the element
            target.style.webkitTransform =
                target.style.transform =
                    'translate(' + x + 'px, ' + y + 'px)';

            // update the posiion attributes
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        }

        // this is used later in the resizing and gesture demos
        window.dragMoveListener = dragMoveListener;
    })

    var setColorPicker = function(Selector,bgColor,color){
        if(color===undefined)color = '#000000';

        Selector.text(bgColor);
        Selector.css('background-color',bgColor);
        Selector.css('color',color);
    }

    var randomBlockID = function(){
        var id = parseInt(Math.random()*(1000000)+1,10);
        for(let i = 0;i++;i<100){
            if($("block[data-blockid="+id+"]").length<=0){
                break;
            }
            id = parseInt(Math.random()*(1000000)+1,10);
        }
        return id;
    }

    //context menu

    var clickInsideElement = function( e, className ) {
        var el = e.srcElement || e.target;

        if ( el.classList.contains(className) ) {
            return el;
        } else {
            while ( el = el.parentNode ) {
                if ( el.classList && el.classList.contains(className) ) {
                    return el;
                }
            }
        }

        return false;
    }

    var getPosition = function(e) {
        var posx = 0;
        var posy = 0;

        if (!e) var e = window.event;

        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        } else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }

        return {
            x: posx,
            y: posy
        }
    }

    var contextMenuLinkClassName = "context-menu__link";
    var contextMenuActive = "context-menu--active";

    var ContextItemClassName = "gomjz-block";
    var ContextItemInContext;

    var clickCoords;
    var clickCoordsX;
    var clickCoordsY;

    var menu = document.querySelector("#context-menu");
    var menuState = 0;
    var menuWidth;
    var menuHeight;

    var windowWidth;
    var windowHeight;

    var contextListener = function(){
        $(document).on('contextmenu',$('.gomjz-block'),function(e){

            ContextItemInContext = clickInsideElement( e, ContextItemClassName );


            if ( ContextItemInContext ) {
                e.preventDefault();
                toggleMenuOn();
                positionMenu(e);
            } else {
                ContextItemInContext = null;
                toggleMenuOff();
            }
        })
    }

    var clickListener = function() {
        document.addEventListener( "click", function(e) {
            var clickeElIsLink = clickInsideElement( e, contextMenuLinkClassName );

            if ( clickeElIsLink ) {
                e.preventDefault();
                menuItemListener( clickeElIsLink );
            } else {
                var button = e.which || e.button;
                if ( button === 1 ) {
                    toggleMenuOff();
                }
            }
        });
    }


    var toggleMenuOn = function () {
        if ( menuState !== 1 ) {
            menuState = 1;
            menu.classList.add( contextMenuActive );
        }
    }

    var toggleMenuOff = function () {
        if ( menuState !== 0 ) {
            menuState = 0;
            menu.classList.remove( contextMenuActive );
        }
    }

    var positionMenu = function (e) {
        clickCoords = getPosition(e);
        clickCoordsX = clickCoords.x;
        clickCoordsY = clickCoords.y;

        menuWidth = menu.offsetWidth + 4;
        menuHeight = menu.offsetHeight + 4;

        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;

        if ( (windowWidth - clickCoordsX) < menuWidth ) {
            menu.style.left = windowWidth - menuWidth + "px";
        } else {
            menu.style.left = clickCoordsX + "px";
        }

        if ( (windowHeight - clickCoordsY) < menuHeight ) {
            menu.style.top = windowHeight - menuHeight + "px";
        } else {
            menu.style.top = clickCoordsY + "px";
        }
    }

    var menuItemListener = function ( link ) {
        $(ContextItemInContext).remove();
        toggleMenuOff();
    }

    contextListener();
    clickListener();




}());


