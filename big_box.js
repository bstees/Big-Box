function big_box($html,options) {
 var self = this;
 var $height, $add, $content;
 var onRender = function(){},
     onClose  = function(){},
     bbClass = '',
     bbHeadContent = '';

 if(typeof options == 'function') {
   onRender = options();
 }
 else if (options) {
   onRender = options.onRender;
   onClose = options.onClose;
   bbClass = options.bbClass || '';
   bbHeadContent = options.bbHeadContent || '';
 }

 if ($.type($html) === 'string') {
   $content = $($html);
 }
 else {
   $content = $html;
 }

 var $bb = $('body').find('#big_box');
 var $bbContent = $bb.find('.content');

 if ($bb.length === 0) {

   $bb = $('body').append('<div id="big_box" style="display:none" class="'+ bbClass +'">'+
                                          '<div class="overlay md" />'+
                                          '<div class="content" style="display:none" />'+
                                          '<div class="close"/>'+
                                        '</div>');
   $bbContent = $bb.find('#big_box .content');
 }
 if (bbHeadContent !== '') {
  $head = $('<h2 class="bb-top">'+ bbHeadContent +'</h2>');
  $content = $content.wrap('div class="bb-main" />').wrap('<div class="bb-scroll" />');
  $content.prepend($head);
 }
 $bbContent.empty().append($content);

 $bb.find('div#big_box').fadeIn(300,function(){
  if ($content.find('table').length){
    $(this).find('table').addClass('grid');
  }
  $(this).find('div.content').fadeIn(300,onRender);
 }).find('div.overlay, div.close').each(function(){
   $(this).click(function(){
     self.big_box_close({onClose: onClose});
   });
 });
}

function big_box_close(options) {
 var onClose  = function(){};

 if (options) {
   onClose = options.onClose;
 }

 $('#big_box div.content').fadeOut(300,function(){
   $(this).parent().fadeOut(300,function(){
     $(this).remove();
     onClose();
   });
 });
}
