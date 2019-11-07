!function(e){"use strict";!function(e,t,s,i){var o=".tocify-header",n=".tocify-subheader";e.widget("toc.tocify",{version:"1.8.0",options:{context:"body",ignoreSelector:null,selectors:"h1, h2, h3",showAndHide:!0,showEffect:"slideDown",showEffectSpeed:"medium",hideEffect:"slideUp",hideEffectSpeed:"medium",smoothScroll:!0,smoothScrollSpeed:"medium",scrollTo:0,showAndHideOnScroll:!0,highlightOnScroll:!0,highlightOffset:40,theme:"bootstrap",extendPage:!0,extendPageOffset:100,history:!0,scrollHistory:!1,hashGenerator:"compact",highlightDefault:!0},_create:function(){var s=this;s.tocifyWrapper=e(".tocify-wrapper"),s.extendPageScroll=!0,s.items=[],s._generateToc(),s.cachedHeights=[],s.cachedAnchors=[],s._addCSSClasses(),s.webkit=function(){for(var e in t)if(e&&-1!==e.toLowerCase().indexOf("webkit"))return!0;return!1}(),s._setEventHandlers(),e(t).load(function(){s._setActiveElement(!0),e("html, body").promise().done(function(){setTimeout(function(){s.extendPageScroll=!1},0)})})},_generateToc:function(){var t,s,i=this,o=i.options.ignoreSelector;(t=-1!==this.options.selectors.indexOf(",")?e(this.options.context).find(this.options.selectors.replace(/ /g,"").substr(0,this.options.selectors.indexOf(","))):e(this.options.context).find(this.options.selectors.replace(/ /g,""))).length?(i.element.addClass("tocify"),t.each(function(t){e(this).is(o)||(s=e("<ul/>",{id:"tocify-header"+t,class:"tocify-header"}).append(i._nestElements(e(this),t)),i.element.append(s),e(this).nextUntil(this.nodeName.toLowerCase()).each(function(){0===e(this).find(i.options.selectors).length?e(this).filter(i.options.selectors).each(function(){e(this).is(o)||i._appendSubheaders.call(this,i,s)}):e(this).find(i.options.selectors).each(function(){e(this).is(o)||i._appendSubheaders.call(this,i,s)})}))})):i.element.addClass("tocify-hide")},_setActiveElement:function(e){var s=t.location.hash.substring(1),i=this.element.find("li[data-unique='"+s+"']");return s.length?(this.element.find("."+this.focusClass).removeClass(this.focusClass),i.addClass(this.focusClass),this.options.showAndHide&&i.click()):(this.element.find("."+this.focusClass).removeClass(this.focusClass),!s.length&&e&&this.options.highlightDefault&&this.element.find(".tocify-item").first().addClass(this.focusClass)),this},_nestElements:function(t,s){var i,o,n;(i=e.grep(this.items,function(e){return e===t.text()})).length?this.items.push(t.text()+s):this.items.push(t.text()),n=this._generateHashValue(i,t,s);var a="tocify-item";if(t.is(".api-property--property")&&(a+=" tocify-item--api-property"),t.is(".api-property--method")&&(a+=" tocify-item--api-method"),t.is(".api-property--inherited")&&(a+=" tocify-item--api-inherited"),t.is(".api-property--deprecated")&&(a+=" tocify-item--api-deprecated"),o=e("<li/>",{class:a,"data-unique":n}),t.is(".divider"))o.addClass("divider"),o.append(t.text());else{var h=t.clone();h.find(".api-property__inherited, .api-property__args, .api-property__type").remove();var r=h.text();if(t.is("h2")){var l=t.prevAll("h1").eq(0).text();r=r.replace(l+".","")}o.append(e("<a/>",{text:r}).attr("href","#"+n))}return t.before(e("<div/>",{name:n,"data-unique":n})),t.attr("id",n),o},_generateHashValue:function(e,t,s){var i="",o=this.options.hashGenerator;if("pretty"===o){for(i=(i=t.text().toLowerCase().replace(/\s/g,"-")).replace(/[^\x00-\x7F]/g,"");i.indexOf("--")>-1;)i=i.replace(/--/g,"-");for(;i.indexOf(":-")>-1;)i=i.replace(/:-/g,"-")}else i="function"==typeof o?o(t.text(),t):t.text().replace(/\s/g,"");if(t.is("h2")){var n=t.prevAll("h1").eq(0).text();i=(i=(i=(i=n+"."+i).replace(/Game([^\.]*)-([^\.-]+)$/,"$2")).replace(/RawMemory-/,"")).replace(/PathFinder-/,"")}else e.length&&(i+=""+s);return i},_appendSubheaders:function(t,s){var i=e(this).index(t.options.selectors),o=e(t.options.selectors).eq(i-1),a=+e(this).prop("tagName").charAt(1),h=+o.prop("tagName").charAt(1);a<h?t.element.find(n+"[data-tag="+a+"]").last().append(t._nestElements(e(this),i)):a===h?s.find(".tocify-item").last().after(t._nestElements(e(this),i)):s.find(".tocify-item").last().after(e("<ul/>",{class:"tocify-subheader","data-tag":a})).next(n).append(t._nestElements(e(this),i))},_setEventHandlers:function(){var o=this;this.element.on("click.tocify","li",function(s){if(!e(this).is(".divider")){if(o.options.history&&(t.location.hash=e(this).attr("data-unique")),o.element.find("."+o.focusClass).removeClass(o.focusClass),e(this).addClass(o.focusClass),o.options.showAndHide){var i=e('li[data-unique="'+e(this).attr("data-unique")+'"]');o._triggerShow(i)}o._scrollTo(e(this))}}),this.element.find("li").on({"mouseenter.tocify":function(){e(this).addClass(o.hoverClass),e(this).css("cursor","pointer")},"mouseleave.tocify":function(){"bootstrap"!==o.options.theme&&e(this).removeClass(o.hoverClass)}}),e(t).on("resize",function(){o.calculateHeights()}),e(t).on("scroll.tocify",function(){e("html, body").promise().done(function(){var n,a,h,r,l=e(t).scrollTop(),c=e(t).height(),d=e(s).height(),f=e("body")[0].scrollHeight;if(o.options.extendPage&&(o.webkit&&l>=f-c-o.options.extendPageOffset||!o.webkit&&c+l>d-o.options.extendPageOffset)&&!e(".tocify-extend-page").length){if(!(a=e('div[data-unique="'+e(".tocify-item").last().attr("data-unique")+'"]')).length)return;h=a.offset().top,e(o.options.context).append(e("<div />",{class:"tocify-extend-page",height:Math.abs(h-l)+"px","data-unique":"tocify-extend-page"})),o.extendPageScroll&&(r=o.element.find("li.active"),o._scrollTo(e("div[data-unique="+r.attr("data-unique")+"]")))}setTimeout(function(){var a,h=null;0==o.cachedHeights.length&&o.calculateHeights();var r=e(t).scrollTop();if(o.cachedAnchors.each(function(e){if(!(o.cachedHeights[e]-r<0))return!1;h=e}),a=e(o.cachedAnchors[h]).attr("data-unique"),n=e('li[data-unique="'+a+'"]'),o.options.highlightOnScroll&&n.length&&!n.hasClass(o.focusClass)){o.element.find("."+o.focusClass).removeClass(o.focusClass),n.addClass(o.focusClass);var l=o.tocifyWrapper,c=e(n).closest(".tocify-header"),d=c.offset().top,f=l.offset().top,p=d-f;if(p>=e(t).height()){var u=p+l.scrollTop();l.scrollTop(u)}else p<0&&l.scrollTop(0)}if(o.options.scrollHistory&&t.location.hash!=="#"+a&&a!==i)if(history.replaceState)history.replaceState({},"","#"+a);else{var g=s.body.scrollTop,m=s.body.scrollLeft;location.hash="#"+a,s.body.scrollTop=g,s.body.scrollLeft=m}o.options.showAndHideOnScroll&&o.options.showAndHide&&o._triggerShow(n,!0)},0)})})},calculateHeights:function(){var t=this;t.cachedHeights=[],t.cachedAnchors=[];var s=e(t.options.context).find("div[data-unique]");s.each(function(s){var i=(e(this).next().length?e(this).next():e(this)).offset().top-t.options.highlightOffset;t.cachedHeights[s]=i}),t.cachedAnchors=s},show:function(t,s){if(!t.is(":visible"))switch(t.find(n).length||t.parent().is(o)||t.parent().is(":visible")?t.children(n).length||t.parent().is(o)||(t=t.closest(n)):t=t.parents(n).add(t),this.options.showEffect){case"none":t.show();break;case"show":t.show(this.options.showEffectSpeed);break;case"slideDown":t.slideDown(this.options.showEffectSpeed);break;case"fadeIn":t.fadeIn(this.options.showEffectSpeed);break;default:t.show()}return t.parent().is(o)?this.hide(e(n).not(t)):this.hide(e(n).not(t.closest(o).find(n).not(t.siblings()))),this},hide:function(e){switch(this.options.hideEffect){case"none":e.hide();break;case"hide":e.hide(this.options.hideEffectSpeed);break;case"slideUp":e.slideUp(this.options.hideEffectSpeed);break;case"fadeOut":e.fadeOut(this.options.hideEffectSpeed);break;default:e.hide()}return this},_triggerShow:function(e,t){return e.parent().is(o)||e.next().is(n)?this.show(e.next(n),t):e.parent().is(n)&&this.show(e.parent(),t),this},_addCSSClasses:function(){return"jqueryui"===this.options.theme?(this.focusClass="ui-state-default",this.hoverClass="ui-state-hover",this.element.addClass("ui-widget").find(".toc-title").addClass("ui-widget-header").end().find("li").addClass("ui-widget-content")):"bootstrap"===this.options.theme?(this.element.find(o+","+n).addClass("nav nav-list"),this.focusClass="active"):(this.focusClass="tocify-focus",this.hoverClass="tocify-hover"),this},setOption:function(){e.Widget.prototype._setOption.apply(this,arguments)},setOptions:function(){e.Widget.prototype._setOptions.apply(this,arguments)},_scrollTo:function(t){var s=this.options.smoothScroll||0,i=this.options.scrollTo;return e("html, body").promise().done(function(){e("html, body").animate({scrollTop:e('div[data-unique="'+t.attr("data-unique")+'"]').next().offset().top-(e.isFunction(i)?i.call():i)+"px"},{duration:s})}),this}})}(window.jQuery,window,document)}();