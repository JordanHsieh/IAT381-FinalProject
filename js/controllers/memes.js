APP.controller('memes', function($scope){

$.getJSON("http://www.reddit.com/r/memes/.json?jsonp=?", function(data) { 
    $.each(data.data.children, function(i,item){
        $("<img/>").attr("src", item.data.url).appendTo("#images");
    });
});
});

// var baseURL = 'http://www.reddit.com/r/';
// var myRoute = new Route();
// var reddit = myRoute.mount('/reddit');
// var after = '';

// reddit.param( 'sub', function( next , sub ) {
//   var self = this;
//   getURL( 'GET', baseURL + escape(sub) + '/about.json', function( result ) {
//     $('#rtitle').html(result.data.title);
//     next();
//   });
// });

// reddit.add( '/r/:sub', function( next, sub ) {
//   displaySub( next, sub );
// });

// var isoBlock = _.template('<a title="<%= title %>" href="<%= original %>" class="element-item"><img data-source="<%= original %>" src="<%= url %>"></a>');

// function displaySub( next, sub ) {
//   console.debug('display sub ' + sub + after);
//   getURL('GET', baseURL + escape(sub) + '/.json' + after, 
//     function( result ) {
//       after = '?count=25&after=' + result.data.after;
//       var posts = result.data.children,
//           post, newURL, originalURL, file;
//       for (var i = 0, il = posts.length; i < il; i++) {  
//         post = posts[i].data;
//         if (post.domain == 'i.imgur.com' || post.domain == 'imgur.com') { 
//           originalURL = post.url;
//           file = originalURL.split('/').pop();
//           if (file.split('.').length == 1) {
//             originalURL = originalURL + '.png'; 
//           }
//           newURL = originalURL.split('.');
//           newURL[newURL.length-2] = newURL[newURL.length-2] + "m";           
//           var block = $(isoBlock( {
//             title : post.title.replace(/"/g, "&quot;"),
//             url : newURL.join('.'), 
//             original  : originalURL 
//           }));
//           $(block[0].firstChild).load( _.once(affix, 350) );
//         }
//       }
//       // look ahead to next
//       getURL('GET', baseURL + escape(sub) + '/.json' + after);
//       next();
//     });
// }

// function affix() {
 
//   var o = $(this),
//       isotope = $('.isotope'), 
//       container = $(this.parentNode),
//       parent = isotope.append(container),
//       iInfo = { w : o.width(), h : o.height(), o : o, src : o.attr('data-source')},
//       ratio = iInfo.w / iInfo.h;
  
//   if (ratio > 1.50) { container.addClass('width2') } else
//     if (ratio < .70) { container.addClass('height2') } else
//       if (iInfo.w > 160 || iInfo.h > 160) {    
//         var url = iInfo.src.split('.');
//         url[url.length-2] = url[url.length-2] + "b"; 
//         iInfo.o.attr('src', url.join('.'));
//         iInfo.w = iInfo.h = 160;
//         iInfo.o.hide();
//         iInfo.o.load( _.once(function(){ $(this).show() }, 350) );
//       }

//   var cInfo = { w : container.width(), h : container.height() }

//   if (iInfo.w < cInfo.w) iInfo.o.width((iInfo.w = cInfo.w));
//   if (iInfo.h < cInfo.h) iInfo.o.height((iInfo.h = cInfo.h));

//   iInfo.o.css('margin-top', (cInfo.h - iInfo.h) / 2);
//   iInfo.o.css('margin-left', (cInfo.w - iInfo.w) / 2);
  
//   container.magnificPopup({
//     type:'image',
//     mainClass: 'mfp-zoom-in',
//     tLoading: '',
//     removalDelay: 300,
//     closeMarkup: '',
//     callbacks: {
//       imageLoadComplete: function() {
//         var self = this;
//         setTimeout(function() {
//           self.wrap.addClass('mfp-image-loaded');
//         }, 16);
//       },
//       close: function() {
//         this.wrap.removeClass('mfp-image-loaded');
//       }      
//     }, 
//     closeOnContentClick: true,
//     midClick: true 
//   });
  
//   parent.isotope('appended', this.parentNode);
// }

// var urlCache = {};

// function getURL(method, url, cb) {
//   var xhr = new XMLHttpRequest();
  
//   if (!urlCache[method]) urlCache[method] = {};
//   if (urlCache[method][url]) {
//     console.debug('cache hit : ' + url);
//     if (cb) cb.call(this, urlCache[method][url]); 
//     return;
//   }
  
//   if ("withCredentials" in xhr) {
//     xhr.open(method, url, true);
//   } else if (typeof XDomainRequest != "undefined") {
//     xhr = new XDomainRequest();
//     xhr.open(method, url);
//   } else {
//     xhr = null;
//   }  
  
//   if (xhr) {
//     xhr.onload = function() {
//       var text = xhr.responseText;
//       var result = JSON.parse(text);
//       urlCache[method][url] = result;
//       if (cb) cb.call(this, result); 
//       return;
//     }  
//     xhr.onerror = function() {
//       alert('Woops, there was an error making the request.');
//     }
//     xhr.send(); 
//   }
//   return xhr;
// }

// function initIsotope() {
  
//   var container = $('#isotope-demo')
  
//   if (container.isotope) {
//     //container.isotope('destroy');
//     container.empty();
//     //console.debug('destroyed!');
//   }
  
//   container.isotope({
//     itemSelector: '.element-item',
//     layoutMode: 'masonry',
//     masonry: {
//       columnWidth: 162,
//       isFitWidth: true
//     }
//   }); 
// }

// function testroute(route, reset) {
//   var routeExec = myRoute.get(route);
//   if (reset) {
//     after = '';
//     initIsotope();
//     // run route 3 times
//     routeExec.run( function (err) { 
//       routeExec.run( function (err) {
//         routeExec.run( function (err) {
//         });
//       });
//     });   
//   } else {
//     routeExec.run();
//   }
  

// }

// var go = _.throttle( 
//    function() {
//      testroute($('#testinput').val());
//    }, 500, {leading : true} );

// var current = '';

// // check to see if scroll is close to bottom
// $(window).scroll(function() {
//    if($(window).scrollTop() + $(window).height() > $(document).height() - 150) {
//      if (after !== '' && current != after) {
//        current = after;  
//        go();
//      }
//    }
// });
 
// testroute($('#testinput').val(), true);
// });





