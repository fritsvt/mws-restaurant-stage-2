!function i(u,a,s){function c(n,e){if(!a[n]){if(!u[n]){var t="function"==typeof require&&require;if(!e&&t)return t(n,!0);if(l)return l(n,!0);var r=new Error("Cannot find module '"+n+"'");throw r.code="MODULE_NOT_FOUND",r}var o=a[n]={exports:{}};u[n][0].call(o.exports,function(e){var t=u[n][1][e];return c(t||e)},o,o.exports,i,u,a,s)}return a[n].exports}for(var l="function"==typeof require&&require,e=0;e<s.length;e++)c(s[e]);return c}({1:[function(e,t,n){"use strict";var r,o=e("./dbhelper");(r=o)&&r.__esModule;navigator.serviceWorker&&navigator.serviceWorker.register("/sw.js",{scope:"./"}).then(function(){console.log("Service worker has been successfully registered.")}).catch(function(e){console.log("error ",e)})},{"./dbhelper":2}],2:[function(e,t,n){"use strict";var r,o,i=function(){function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}}(),u=e("idb"),a=(r=u)&&r.__esModule?r:{default:r};var s=function(){function n(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n)}return i(n,null,[{key:"openDatabase",value:function(){return a.default.open("restaurants",1,function(e){e.createObjectStore("restaurants",{keyPath:"id"})})}},{key:"getCachedMessages",value:function(){return(o=n.openDatabase()).then(function(e){if(e)return e.transaction("restaurants").objectStore("restaurants").getAll()})}},{key:"fetchRestaurants",value:function(t){n.getCachedMessages().then(function(e){if(0<e.length)return t(null,e);fetch(n.DATABASE_URL,{credentials:"same-origin"}).then(function(e){return console.log("res fetched is: ",e),e.json()}).then(function(n){return o.then(function(e){if(!e)return e;console.log("data fetched is: ",n);var t=e.transaction("restaurants","readwrite").objectStore("restaurants");n.forEach(function(e){return t.put(e)}),t.openCursor(null,"prev").then(function(e){return e.advance(30)}).then(function e(t){if(t)return t.delete(),t.continue().then(e)})}),t(null,n)}).catch(function(e){return t(e,null)})})}},{key:"fetchRestaurantById",value:function(r,o){n.fetchRestaurants(function(e,t){if(e)o(e,null);else{var n=t.find(function(e){return e.id==r});n?o(null,n):o("Restaurant does not exist",null)}})}},{key:"fetchRestaurantByCuisine",value:function(r,o){n.fetchRestaurants(function(e,t){if(e)o(e,null);else{var n=t.filter(function(e){return e.cuisine_type==r});o(null,n)}})}},{key:"fetchRestaurantByNeighborhood",value:function(r,o){n.fetchRestaurants(function(e,t){if(e)o(e,null);else{var n=t.filter(function(e){return e.neighborhood==r});o(null,n)}})}},{key:"fetchRestaurantByCuisineAndNeighborhood",value:function(r,o,i){n.fetchRestaurants(function(e,t){if(e)i(e,null);else{var n=t;"all"!=r&&(n=n.filter(function(e){return e.cuisine_type==r})),"all"!=o&&(n=n.filter(function(e){return e.neighborhood==o})),i(null,n)}})}},{key:"fetchNeighborhoods",value:function(o){n.fetchRestaurants(function(e,n){if(e)o(e,null);else{var r=n.map(function(e,t){return n[t].neighborhood}),t=r.filter(function(e,t){return r.indexOf(e)==t});o(null,t)}})}},{key:"fetchCuisines",value:function(o){n.fetchRestaurants(function(e,n){if(e)o(e,null);else{var r=n.map(function(e,t){return n[t].cuisine_type}),t=r.filter(function(e,t){return r.indexOf(e)==t});o(null,t)}})}},{key:"urlForRestaurant",value:function(e){return"./restaurant.html?id="+e.id}},{key:"imageUrlForRestaurant",value:function(e){return"/img/"+e.photograph+".jpg"}},{key:"mapMarkerForRestaurant",value:function(e,t){return new google.maps.Marker({position:e.latlng,title:e.name,url:n.urlForRestaurant(e),map:t,animation:google.maps.Animation.DROP})}},{key:"DATABASE_URL",get:function(){return"http://localhost:1337/restaurants"}}]),n}();t.exports=s},{idb:4}],3:[function(e,t,n){"use strict";var r,o=e("./dbhelper"),a=(r=o)&&r.__esModule?r:{default:r};var i,s,u=void 0,c=void 0,l=void 0,f=[];document.addEventListener("DOMContentLoaded",function(e){h(),d(),v(),y()});var d=function(){document.getElementById("neighborhoods-select").addEventListener("change",function(){_()}),document.getElementById("cuisines-select").addEventListener("change",function(){_()})},h=function(){var e={root:document.querySelector("#scrollArea"),rootMargin:"0px",threshold:p()};s=new IntersectionObserver(m,e)},p=function(){for(var e=[],t=1;t<=20;t++){var n=t/20;e.push(n)}return e.push(0),e},m=function(e,t){e.forEach(function(e){.25<e.intersectionRatio&&(e.target.classList.remove("hidden"),e.target.classList.add("show"))})},v=function(){a.default.fetchNeighborhoods(function(e,t){null!=e?console.error(e):(c=t,g())})},g=function(){var r=0<arguments.length&&void 0!==arguments[0]?arguments[0]:c,o=document.getElementById("neighborhoods-select");r.forEach(function(e,t){var n=document.createElement("option");n.innerHTML=e,n.value=e,n.setAttribute("role","option"),n.setAttribute("aria-posinset",t+1),n.setAttribute("aria-setsize",r.length),o.append(n)})},y=function(){a.default.fetchCuisines(function(e,t){e?console.error(e):(l=t,b())})},b=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:l,r=document.getElementById("cuisines-select");e.forEach(function(e,t){var n=document.createElement("option");n.innerHTML=e,n.value=e,n.setAttribute("role","option"),n.setAttribute("aria-posinset",t+1),n.setAttribute("aria-setsize",l.length),r.append(n)})};window.initMap=function(){i=new google.maps.Map(document.getElementById("map"),{zoom:12,center:{lat:40.722216,lng:-73.987501},scrollwheel:!1}),_()};var _=function(){var e=document.getElementById("cuisines-select"),t=document.getElementById("neighborhoods-select"),n=e.selectedIndex,r=t.selectedIndex,o=e[n].value,i=t[r].value;a.default.fetchRestaurantByCuisineAndNeighborhood(o,i,function(e,t){e?console.error(e):(E(t),w())})},E=function(e){u=[],document.getElementById("restaurants-list").innerHTML="",f.forEach(function(e){return e.setMap(null)}),f=[],u=e},w=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:u,t=document.getElementById("restaurants-list");e.forEach(function(e){t.append(x(e))}),I()},x=function(e){var t=document.createElement("li");t.className="post",t.setAttribute("role","listitem");var n=document.createElement("img");n.className="restaurant-img",n.src=a.default.imageUrlForRestaurant(e),n.alt=e.name+" restaurant's photo.",t.append(n);var r=document.createElement("h2");r.innerHTML=e.name,r.tabIndex=0,r.setAttribute("aria-label",e.name+" , "+e.neighborhood),t.append(r);var o=document.createElement("p");o.innerHTML=e.neighborhood,t.append(o);var i=document.createElement("p");i.innerHTML=e.address,t.append(i);var u=document.createElement("a");return u.innerHTML="View Details",u.href=a.default.urlForRestaurant(e),u.setAttribute("aria-label","View details of "+e.name+"'s restaurant"),t.append(u),t.classList.add("hidden"),s.observe(t),t},I=function(){(0<arguments.length&&void 0!==arguments[0]?arguments[0]:u).forEach(function(e){var t=a.default.mapMarkerForRestaurant(e,i);google.maps.event.addListener(t,"click",function(){window.location.href=t.url}),f.push(t)})}},{"./dbhelper":2}],4:[function(e,h,t){"use strict";!function(){function u(n){return new Promise(function(e,t){n.onsuccess=function(){e(n.result)},n.onerror=function(){t(n.error)}})}function i(n,r,o){var i,e=new Promise(function(e,t){u(i=n[r].apply(n,o)).then(e,t)});return e.request=i,e}function e(e,n,t){t.forEach(function(t){Object.defineProperty(e.prototype,t,{get:function(){return this[n][t]},set:function(e){this[n][t]=e}})})}function t(t,n,r,e){e.forEach(function(e){e in r.prototype&&(t.prototype[e]=function(){return i(this[n],e,arguments)})})}function n(t,n,r,e){e.forEach(function(e){e in r.prototype&&(t.prototype[e]=function(){return this[n][e].apply(this[n],arguments)})})}function r(e,r,t,n){n.forEach(function(n){n in t.prototype&&(e.prototype[n]=function(){return e=this[r],(t=i(e,n,arguments)).then(function(e){if(e)return new a(e,t.request)});var e,t})})}function o(e){this._index=e}function a(e,t){this._cursor=e,this._request=t}function s(e){this._store=e}function c(n){this._tx=n,this.complete=new Promise(function(e,t){n.oncomplete=function(){e()},n.onerror=function(){t(n.error)},n.onabort=function(){t(n.error)}})}function l(e,t,n){this._db=e,this.oldVersion=t,this.transaction=new c(n)}function f(e){this._db=e}e(o,"_index",["name","keyPath","multiEntry","unique"]),t(o,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),r(o,"_index",IDBIndex,["openCursor","openKeyCursor"]),e(a,"_cursor",["direction","key","primaryKey","value"]),t(a,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach(function(n){n in IDBCursor.prototype&&(a.prototype[n]=function(){var t=this,e=arguments;return Promise.resolve().then(function(){return t._cursor[n].apply(t._cursor,e),u(t._request).then(function(e){if(e)return new a(e,t._request)})})})}),s.prototype.createIndex=function(){return new o(this._store.createIndex.apply(this._store,arguments))},s.prototype.index=function(){return new o(this._store.index.apply(this._store,arguments))},e(s,"_store",["name","keyPath","indexNames","autoIncrement"]),t(s,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),r(s,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),n(s,"_store",IDBObjectStore,["deleteIndex"]),c.prototype.objectStore=function(){return new s(this._tx.objectStore.apply(this._tx,arguments))},e(c,"_tx",["objectStoreNames","mode"]),n(c,"_tx",IDBTransaction,["abort"]),l.prototype.createObjectStore=function(){return new s(this._db.createObjectStore.apply(this._db,arguments))},e(l,"_db",["name","version","objectStoreNames"]),n(l,"_db",IDBDatabase,["deleteObjectStore","close"]),f.prototype.transaction=function(){return new c(this._db.transaction.apply(this._db,arguments))},e(f,"_db",["name","version","objectStoreNames"]),n(f,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach(function(i){[s,o].forEach(function(e){e.prototype[i.replace("open","iterate")]=function(){var e,t=(e=arguments,Array.prototype.slice.call(e)),n=t[t.length-1],r=this._store||this._index,o=r[i].apply(r,t.slice(0,-1));o.onsuccess=function(){n(o.result)}}})}),[o,s].forEach(function(e){e.prototype.getAll||(e.prototype.getAll=function(e,n){var r=this,o=[];return new Promise(function(t){r.iterateCursor(e,function(e){e?(o.push(e.value),void 0===n||o.length!=n?e.continue():t(o)):t(o)})})})});var d={open:function(e,t,n){var r=i(indexedDB,"open",[e,t]),o=r.request;return o.onupgradeneeded=function(e){n&&n(new l(o.result,e.oldVersion,o.transaction))},r.then(function(e){return new f(e)})},delete:function(e){return i(indexedDB,"deleteDatabase",[e])}};void 0!==h?(h.exports=d,h.exports.default=h.exports):self.idb=d}()},{}],5:[function(e,t,n){"use strict";var o="restaurants-static-v3",i="restaurants-content-imgs",r=[o,i];self.addEventListener("install",function(e){e.waitUntil(caches.open(o).then(function(e){return e.addAll(["/","/img/icon.png","bundle_js/main_bundle.js","bundle_js/maps/main_bundle.js.map","bundle_js/maps/restaurant_bundle.js.map","bundle_js/restaurant_bundle.js","css/styles.css","https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css","https://fonts.googleapis.com/css?family=Roboto:300,400,500,700"]).catch(function(e){return console.log("caches open : ",e)})}))}),self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(e){return Promise.all(e.filter(function(e){return e.startsWith("restaurants-")&&!r.includes(e)}).map(function(e){return caches.delete(e)}))}))}),self.addEventListener("fetch",function(n){var r,e=new URL(n.request.url);e.pathname.startsWith("/restaurants/")||(e.pathname.startsWith("/img/")?n.respondWith((r=n.request,caches.open(i).then(function(t){return t.match(r).then(function(e){return e||fetch(r).then(function(e){return t.put(r,e.clone()),e})})}))):n.respondWith(caches.open(o).then(function(t){return t.match(n.request).then(function(e){return e||fetch(n.request).then(function(e){return t.put(n.request,e.clone()),e})})})))})},{}]},{},[3,2,1,5]);
//# sourceMappingURL=maps/main_bundle.js.map