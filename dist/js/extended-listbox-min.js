/*!
 * Extended ListBox
 * Maintainer  Christian Kotzbauer <christian.kotzbauer@gmail.com>
 * Website     https://code-chris.github.io/extended-listbox/documentation/latest/
 * Version     4.0.1
 * Released    2017-12-10T13:22:07.685Z
 * License     MIT
 * Copyright   (c) 2017
 */
var extendedlistbox=function(t){function e(s){if(i[s])return i[s].exports;var r=i[s]={i:s,l:!1,exports:{}};return t[s].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var i={};return e.m=t,e.c=i,e.d=function(t,i,s){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:s})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=1)}([function(t,e,i){var s,r;s=[i,e],void 0!==(r=function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e,i){this.dataItems=[],this.selectedDataItems=[],e=e||{},e.searchBar=e.searchBar||!1,e.searchBarWatermark=e.searchBarWatermark||"Search...",e.searchBarButton=e.searchBarButton||{visible:!1},this._target=t,this._settings=e,this.multiple=i}return t.prototype._createListbox=function(){this._target.classList.add(t.MAIN_CLASS),this._settings.searchBar&&this._createSearchbar(),this._createList()},t.prototype._createSearchbar=function(){var e=this,i=document.createElement("div");i.classList.add(t.SEARCHBAR_CLASS+"-wrapper"),this._target.appendChild(i);var s=document.createElement("input");if(s.classList.add(t.SEARCHBAR_CLASS),s.setAttribute("placeholder",this._settings.searchBarWatermark),i.appendChild(s),s.onkeyup=function(){var i=s.value.toLowerCase();if(""!==i){for(var r=e._list.querySelectorAll("."+t.LIST_ITEM_CLASS),n=0;n<r.length;n++){var a=r.item(n);a.classList.contains(t.LIST_ITEM_CLASS_GROUP)||(-1!==a.innerText.toLowerCase().search(i)?(a.style.display="block",a.parentElement.style.display="block"):a.style.display="none")}for(var o=e._list.querySelectorAll("."+t.LIST_ITEM_CLASS_GROUP),n=0;n<o.length;n++){for(var a=o.item(n),l=a.querySelectorAll("."+t.LIST_ITEM_CLASS),_=-1,c=0;c<l.length;c++)if("none"!==l.item(c).style.display){_=c;break}a.style.display=-1===_?"none":"block"}}else for(var r=e._list.querySelectorAll("."+t.LIST_ITEM_CLASS),n=0;n<r.length;n++){var a=r.item(n);a.style.display="block"}e._filterChanged()},this._settings.searchBarButton.visible){var r=document.createElement("button");if(r.id="searchBarButton",r.setAttribute("tabindex","-1"),r.classList.add(t.SEARCHBAR_BUTTON_CLASS),i.appendChild(r),this._settings.searchBarButton.onClick&&(r.onclick=this._settings.searchBarButton.onClick),this._settings.searchBarButton.icon){var n=document.createElement("i");this._settings.searchBarButton.icon.split(" ").forEach(function(t){return n.classList.add(t)}),r.appendChild(n)}}this._searchbarWrapper=i,this._searchbar=s},t.prototype._createList=function(){if(this._list=document.createElement("div"),this._list.classList.add(t.LIST_CLASS),this._target.appendChild(this._list),this._resizeListToListBox(),this._settings.getItems){var e=this._settings.getItems();if(e)for(var i in e)this.addItem(this._prepareDataItem(e[i]),!0)}},t.prototype._generateItemId=function(){return"listBoxItem"+parseInt(""+1e7*Math.random(),10)},t.prototype._prepareDataItem=function(t){var e={childItems:[],disabled:!1,groupHeader:null,id:this._generateItemId(),parentGroupId:null,selected:!1,text:null,index:null};if("string"==typeof t||"number"==typeof t)return e.text=t,e;for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);var s=[];for(var r in e.childItems)s.push(this._prepareDataItem(e.childItems[r]));return e.childItems=s,e},t.prototype._addItem=function(e,i,s){var r=this;this.dataItems.push(e);var n=document.createElement("div");if(n.classList.add(t.LIST_ITEM_CLASS),n.innerText=e.text,n.id=e.id,n.tabIndex=1,n.title=e.text,n.onkeydown=function(e){e.target.classList.contains(t.LIST_ITEM_CLASS_GROUP)||2!==e.eventPhase||(13===e.which?r._fireEvent(t.EVENT_ITEM_ENTER_PRESSED,r._getDataItem(e.target.id)):38===e.which?(e.preventDefault(),r._itemArrowUp(e.target)):40===e.which&&(e.preventDefault(),r._itemArrowDown(e.target)))},n.onclick=function(t){2===t.eventPhase&&r._itemClicked(t.target,t.ctrlKey)},n.ondblclick=function(e){e.target.classList.contains(t.LIST_ITEM_CLASS_GROUP)||r._fireEvent(t.EVENT_ITEM_DOUBLE_CLICKED,r._getDataItem(e.target.id))},e.disabled&&n.classList.add(t.LIST_ITEM_CLASS_DISABLED),e.groupHeader&&n.classList.add(t.LIST_ITEM_CLASS_GROUP),e.selected&&this._itemClicked(n,!0),e.parentGroupId){var a=this._locateItem(e.parentGroupId);a&&(s=a)}s&&n.classList.add(t.LIST_ITEM_CLASS_CHILD);var o=s||this._list;if(void 0===e.index||null===e.index||i?o.appendChild(n):(o=o.children.item(e.index),o.parentElement.insertBefore(n,o)),e.childItems&&e.childItems.length>0){n.classList.contains(t.LIST_ITEM_CLASS_GROUP)||n.classList.add(t.LIST_ITEM_CLASS_GROUP);for(var l=0;l<e.childItems.length;l++)this._addItem(this._prepareDataItem(e.childItems[l]),i,n)}return e.id},t.prototype._resizeListToListBox=function(){var t=window.getComputedStyle(this._target,null),e=parseInt(t.getPropertyValue("padding-top"),10)+parseInt(t.getPropertyValue("padding-bottom"),10),i=parseInt(t.getPropertyValue("height"),10)-e;this._settings.searchBar&&(i-=this._searchbarWrapper.offsetHeight),this._list.style.height=i+"px"},t.prototype._clearItemSelection=function(e){if(e.classList.remove(t.LIST_ITEM_CLASS_SELECTED),this._getDataItem(e.id).selected=!1,this.multiple){var i=this._getDataItem(e.id),s=this.selectedDataItems.indexOf(i);this.selectedDataItems.splice(s,1)}else this.selectedDataItems.splice(0,this.selectedDataItems.length)},t.prototype._locateItem=function(t){for(var e=null,i=0;i<this.dataItems.length;i++)if(this.dataItems[i].id===t||this.dataItems[i].text===t){e=this.dataItems[i].id;break}var s=this._target.querySelector("#"+e);if(!s){var r=this._target.querySelectorAll('div[title="'+e+'"]');if(r.length>0)return r[0]}return s},t.prototype._findNextItem=function(e,i){for(var s=e;;){if(!(s=s[i+"ElementSibling"])){var r=e.parentElement;if(!r)return null;var n=r[i+"ElementSibling"];if(!n)return null;var a=n.children;s=a.length>0?"next"===i?a[0].firstElementChild:a[0].lastElementChild:r}if(!s||!s.classList.contains(t.LIST_ITEM_CLASS_DISABLED))return s}},t.prototype._fireEvent=function(t,e){var i=this._settings["on"+t[0].toUpperCase()+t.substr(1)];i&&i({eventName:t,target:this._target,args:e})},t.prototype._elementIndex=function(t){return Array.prototype.slice.call(t.parentElement.children).indexOf(t)},t.prototype._getDataItem=function(t){for(var e=0;e<this.dataItems.length;e++)if(this.dataItems[e].id===t)return this.dataItems[e];return null},t.prototype._itemArrowUp=function(t){var e=this._findNextItem(t,"previous");e&&(this._clearItemSelection(t),this._itemClicked(e))},t.prototype._itemArrowDown=function(t){var e=this._findNextItem(t,"next");e&&(this._clearItemSelection(t),this._itemClicked(e))},t.prototype.addItem=function(e,i){void 0===i&&(i=!1),i||this.multiple||!e.selected||this.clearSelection();var s=this._addItem(this._prepareDataItem(e),i,null);return i||this._fireEvent(t.EVENT_ITEMS_CHANGED,this.getItems()),s},t.prototype.addItems=function(t){var e=this;return t.map(function(t){return e.addItem(t)})},t.prototype.removeItem=function(e){var i=this._locateItem(e);if(i){this._clearItemSelection(i),i.parentElement.removeChild(i);var s=this._getDataItem(i.id);this.dataItems.splice(this.dataItems.indexOf(s),1);var r=this.selectedDataItems.indexOf(s);-1!==r&&this.selectedDataItems.splice(r,1),this._fireEvent(t.EVENT_ITEMS_CHANGED,this.getItems())}},t.prototype.removeItems=function(t){var e=this;t.forEach(function(t){return e.removeItem(t)})},t.prototype.destroy=function(){for(;this._target.firstChild;)this._target.removeChild(this._target.firstChild);this._target.classList.remove(t.MAIN_CLASS)},t.prototype.clearSelection=function(){for(var e=this._list.querySelectorAll("."+t.LIST_ITEM_CLASS),i=0;i<e.length;i++)e[i].classList.remove(t.LIST_ITEM_CLASS_SELECTED),this._getDataItem(e[i].id).selected=!1;this.selectedDataItems=[]},t.prototype.getItem=function(t){var e=null,i=this._locateItem(t);return i&&(e=this._getDataItem(i.id)),e},t.prototype.getItems=function(){for(var t=[],e=this._list.children,i=0;i<e.length;i++)t.push(this._getDataItem(e[i].id));return t},t.prototype.moveItemUp=function(e){var i=null,s=this._locateItem(e);return s&&s.previousElementSibling?(s.parentElement.insertBefore(s,s.previousElementSibling),i=this._elementIndex(s),this._getDataItem(s.id).index=i,this._fireEvent(t.EVENT_ITEMS_CHANGED,this.getItems())):s&&(i=this._elementIndex(s)),i},t.prototype.moveItemDown=function(e){var i=null,s=this._locateItem(e);return s&&s.nextElementSibling?(s.parentNode.insertBefore(s.nextElementSibling,s),i=this._elementIndex(s),this._getDataItem(s.id).index=i,this._fireEvent(t.EVENT_ITEMS_CHANGED,this.getItems())):s&&(i=this._elementIndex(s)),i},t.prototype.moveItemToTop=function(e){var i=null,s=this._locateItem(e);return s&&(s.parentElement.insertBefore(s,s.parentElement.firstElementChild),i=this._elementIndex(s),this._getDataItem(s.id).index=i,this._fireEvent(t.EVENT_ITEMS_CHANGED,this.getItems())),i},t.prototype.moveItemToBottom=function(e){var i=null,s=this._locateItem(e);return s&&(s.parentElement.appendChild(s),i=this._elementIndex(s),this._getDataItem(s.id).index=i),this._fireEvent(t.EVENT_ITEMS_CHANGED,this.getItems()),i},t.prototype.enable=function(e){e?this._target.classList.remove(t.MAIN_DISABLED_CLASS):this._target.classList.contains(t.MAIN_DISABLED_CLASS)||this._target.classList.add(t.MAIN_DISABLED_CLASS)},t.prototype.getSelection=function(){return this.selectedDataItems},t.MAIN_CLASS="listbox-root",t.MAIN_DISABLED_CLASS="listbox-disabled",t.LIST_CLASS="listbox",t.LIST_ITEM_CLASS="listbox-item",t.LIST_ITEM_CLASS_DISABLED="listbox-item-disabled",t.LIST_ITEM_CLASS_SELECTED="listbox-item-selected",t.LIST_ITEM_CLASS_GROUP="listbox-item-group",t.LIST_ITEM_CLASS_CHILD="listbox-item-child",t.SEARCHBAR_CLASS="listbox-searchbar",t.SEARCHBAR_BUTTON_CLASS="listbox-searchbar-button",t.EVENT_VALUE_CHANGED="valueChanged",t.EVENT_FILTER_CHANGED="filterChanged",t.EVENT_ITEMS_CHANGED="itemsChanged",t.EVENT_ITEM_ENTER_PRESSED="itemEnterPressed",t.EVENT_ITEM_DOUBLE_CLICKED="itemDoubleClicked",t}();e.BaseListBox=i}.apply(e,s))&&(t.exports=r)},function(t,e,i){i(2),t.exports=i(5)},function(t,e,i){var s,r;s=[i,e,i(3),i(4)],void 0!==(r=function(t,e,i,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),window.SingleSelectListBox=i.SingleSelectListBox,window.MultiSelectListBox=s.MultiSelectListBox}.apply(e,s))&&(t.exports=r)},function(t,e,i){var s,r,n=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])};return function(e,i){function s(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(s.prototype=i.prototype,new s)}}();s=[i,e,i(0)],void 0!==(r=function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=function(t){function e(e,i){var s=t.call(this,e,i,!1)||this;return s._selectedDomItem=null,s._createListbox(),s}return n(e,t),e.prototype._itemClicked=function(t,e){if(void 0===e&&(e=!1),!t.classList.contains(i.BaseListBox.LIST_ITEM_CLASS_DISABLED)&&!t.classList.contains(i.BaseListBox.LIST_ITEM_CLASS_GROUP)){this._selectedDomItem&&(this.clearSelection(),this._selectedDomItem=null),t.classList.toggle(i.BaseListBox.LIST_ITEM_CLASS_SELECTED),t.focus(),this._selectedDomItem=t;var s=this._getDataItem(t.id);s.selected=!0,this.selectedDataItems.push(s),this._fireEvent(i.BaseListBox.EVENT_VALUE_CHANGED,this._getDataItem(t.id))}},e.prototype._filterChanged=function(){if(!this._selectedDomItem||"none"===this._selectedDomItem.style.display)for(var t=this._list.querySelectorAll("."+i.BaseListBox.LIST_ITEM_CLASS),e=0;e<t.length;e++){var s=t.item(e);if(!s.classList.contains(i.BaseListBox.LIST_ITEM_CLASS_GROUP)&&!s.classList.contains(i.BaseListBox.LIST_ITEM_CLASS_DISABLED)&&"none"!==s.style.display){this._itemClicked(s);break}}this._fireEvent(i.BaseListBox.EVENT_FILTER_CHANGED,this._searchbar.value)},e}(i.BaseListBox);e.SingleSelectListBox=s}.apply(e,s))&&(t.exports=r)},function(t,e,i){var s,r,n=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])};return function(e,i){function s(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(s.prototype=i.prototype,new s)}}();s=[i,e,i(0)],void 0!==(r=function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=function(t){function e(e,i){var s=t.call(this,e,i,!0)||this;return s._createListbox(),s}return n(e,t),e.prototype._itemClicked=function(t,e){if(void 0===e&&(e=!1),!t.classList.contains(i.BaseListBox.LIST_ITEM_CLASS_DISABLED)&&!t.classList.contains(i.BaseListBox.LIST_ITEM_CLASS_GROUP)){var s=this._getDataItem(t.id);if(t.classList.contains(i.BaseListBox.LIST_ITEM_CLASS_SELECTED))if(e){t.classList.remove(i.BaseListBox.LIST_ITEM_CLASS_SELECTED),s.selected=!1;var r=this.selectedDataItems.indexOf(this._getDataItem(t.id));this.selectedDataItems.splice(r,1)}else this.clearSelection(),t.classList.add(i.BaseListBox.LIST_ITEM_CLASS_SELECTED),s.selected=!0,this.selectedDataItems.push(s);else e||this.clearSelection(),t.focus(),t.classList.add(i.BaseListBox.LIST_ITEM_CLASS_SELECTED),s.selected=!0,this.selectedDataItems.push(s);this._fireEvent(i.BaseListBox.EVENT_VALUE_CHANGED,this.selectedDataItems)}},e.prototype._filterChanged=function(){this._fireEvent(i.BaseListBox.EVENT_FILTER_CHANGED,this._searchbar.value)},e}(i.BaseListBox);e.MultiSelectListBox=s}.apply(e,s))&&(t.exports=r)},function(t,e){}]);
//# sourceMappingURL=extended-listbox-min.js.map