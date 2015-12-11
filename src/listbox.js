/**
 * Listbox.js is a simple jQuery plugin that provides a more powerful
 * alternative to the standard `<select>` tag.
 *
 * The main problem of <select> tag is that last one isn't flexible for
 * customization with CSS. Listbox.js solves this problem. This component
 * runs on top of <select> tag and creates an alternative to the last one
 * based on <div> tags. It opens up great possibilities for customization.
 *
 * @copyright   (c) 2015, Christian Kotzbauer <christian.kotzbauer@gmail.com>
 * @version     1.0.0-beta.1
 * @license     BSD
 */

(function ($) {
    'use strict';


    // CSS classes used by Listbox.js
    var MAIN_CLASS = 'listbox-root';
    var LIST_CLASS = 'listbox';
    var LIST_ITEM_CLASS = 'listbox-item';
    var LIST_ITEM_CLASS_DISABLED = 'listbox-item-disabled';
    var LIST_ITEM_CLASS_SELECTED = 'listbox-item-selected';
    var LIST_ITEM_CLASS_GROUP = 'listbox-item-group';
    var SEARCHBAR_CLASS = 'listbox-searchbar';



    /**
     * Inherit the prototype methods from one constructor into another.
     * The prototype of `constructor` will be set to a new object created
     * from `superConstructor`.
     *
     * As an additional convenience, `superConstructor` will be accessible
     * through the `constructor.super_` property.
     */
    function inherits(constructor, superConstructor) {
        constructor.prototype = Object.create(superConstructor.prototype);
        constructor.prototype.constructor = constructor;
        constructor.prototype.super_ = superConstructor;
    }



    /**
     * Create an instance of Listbox. The constructor makes div-based
     * listbox alternative for the sandard's `<select>` tag, hide parent
     * element and place the alternative on the parent place.
     *
     * @constructor
     * @this {Listbox}
     * @param {object} domelement DOM element to be converted to the Listbox
     * @param {object} options an object with Listbox settings
     */
    function Listbox(domelement, options) {
        this._parent   = domelement;
        this._settings = options;

        this._createListbox();                // create a fake listbox
        //this._parent.css('display', 'none');  // hide a parent element
    }



    /**
     * Creates a `div`-based listbox, which includes such things as
     * container, listbox itself and searchbar as an optional element.
     *
     * @private
     * @this {Listbox}
     */
    Listbox.prototype._createListbox = function () {
        this._parent.addClass(MAIN_CLASS);

        if (this._settings.searchBar) {
            this._createSearchbar();
        }

        this._createList();
    };

    /**
     * Creates a Listbox's searchbar.
     *
     * @private
     * @this {Listbox}
     * @TODO: critical to rewrite this piece of shit
     */
    Listbox.prototype._createSearchbar = function () {
        // searchbar wrapper is needed for properly stretch
        // the seacrhbar over the listbox width
        var searchbarWrapper = $('<div>')
            .addClass(SEARCHBAR_CLASS + '-wrapper')
            .appendTo(this._parent);

        var searchbar = $('<input>')
            .addClass(SEARCHBAR_CLASS)
            .appendTo(searchbarWrapper)
            .attr('placeholder', this._settings.searchBarWatermark);

        // set filter handler
        var self = this;
        searchbar.keyup(function () {
            var searchQuery = $(this).val().toLowerCase();

            if (searchQuery !== '') {
                // hide list items which are not matched search query
                self._list.children().each(function (index) {
                    var text = $(this).text().toLowerCase();

                    if (text.search('^' + searchQuery) != -1) {
                        $(this).css('display', 'block');
                    } else {
                        $(this).css('display', 'none');
                    }
                });
            } else {
                // make visible all list items
                self._list.children().each(function () {
                    $(this).css('display', 'block');
                });
            }

            // @hack: call special handler which is used only for SingleSelectListbox
            //        to prevent situation when none of items are selected
            if (self.onFilterChange) {
                self.onFilterChange();
            }
        });

        if (this._settings.searchBarIconClass) {
            $('<i>')
                .addClass(this._settings.searchBarIconClass)
                .appendTo(searchbar);
        }

        // save for using in _resizeListToListbox()
        this._searchbarWrapper = searchbarWrapper;
    };


    /**
     * Creates a listbox itself.
     *
     * @private
     * @this {Listbox}
     */
    Listbox.prototype._createList = function () {
        // create container
        this._list = $('<div>')
            .addClass(LIST_CLASS)
            .appendTo(this._parent);

        this._resizeListToListbox();

        // create items
        if (this._settings.getItems) {
            var items = this._settings.getItems();
            if (items) {
                var index;
                for (index in items) {
                    this.addItem(this.prepareDataItem(items[index]));
                }
            }
        }
    };

    Listbox.prototype.prepareDataItem = function (dataItem) {
        var prepared = {
            text: null,
            id: null,
            disabled: false,
            selected: false,
            groupHeader: false
        };

        if (typeof dataItem === "string" || typeof dataItem === "number") {
            prepared.text = dataItem;
            return prepared;
        } else {
            return $.extend(prepared, dataItem);
        }
    };


    /**
     * Add item to the listbox.
     *
     * @this {Listbox}
     * @param {object} dataItem display data for item
     */
    Listbox.prototype.addItem = function (dataItem) {
        var self = this;
        var item = $('<div>')
            .addClass(LIST_ITEM_CLASS)
            .appendTo(this._list)
            .text(dataItem.text)
            .attr("id", dataItem.id)
            .click(function () {
                self.onItemClick($(this));
            });

        if (dataItem.disabled) {
            item.addClass(LIST_ITEM_CLASS_DISABLED);
        }

        if (dataItem.groupHeader) {
            item.addClass(LIST_ITEM_CLASS_GROUP);
        }

        if (dataItem.selected) {
            this.onItemClick(item);
        }
    };




    /**
     * Remove item from the listbox.
     *
     * @this {Listbox}
     * @param {object} parentItem DOM element of the parent options
     */
    Listbox.prototype.removeItem = function (parentItem) {
        // @todo: implement
    };




    /**
     * Resize list to listbox. It's a small hack since I can't
     * do it with CSS.
     *
     * @private
     */
    Listbox.prototype._resizeListToListbox = function () {
        var listHeight = this._parent.height();

        if (this._settings.searchBar) {
            listHeight -= this._searchbarWrapper.outerHeight(true);
        }

        this._list.height(listHeight);
    };




    /**
     * Create an instance of SingleSelectListbox.
     *
     * Inherit a {Listbox} class.
     *
     * @constructor
     * @this {SingleSelectListbox}
     * @param {object} domelement DOM element to be converted to the Listbox
     * @param {object} options an object with Listbox settings
     */
    function SingleSelectListbox(domelement, options) {
        this.super_.call(this, domelement, options);
        this._selectedDomItem = null;
    }

    inherits(SingleSelectListbox, Listbox);


    /**
     * Reset all items and select a given one.
     *
     * @this {SingleSelectListbox}
     * @param {object} domItem a DOM object
     */
    SingleSelectListbox.prototype.onItemClick = function (domItem) {
        if (domItem.hasClass(LIST_ITEM_CLASS_DISABLED) || domItem.hasClass(LIST_ITEM_CLASS_GROUP)) {
            return;
        }

        // Remove selected class from all other items
        this._list.children().removeClass(LIST_ITEM_CLASS_SELECTED);
        this._selectedDomItem = null;

        domItem.toggleClass(LIST_ITEM_CLASS_SELECTED);
        this._selectedDomItem = domItem;
        this._parent.val(domItem.val());
        this._parent.trigger('change');
    };


    /**
     * Select first visible item if none selected.
     *
     * @this {SingleSelectListbox}
     */
    SingleSelectListbox.prototype.onFilterChange = function () {
        if (!this._selectedDomItem || !this._selectedDomItem.is(':visible')) {
            this.onItemClick(this._list.children(':visible').first());
        }
    };




    /**
     * Create an instance of MultiSelectListbox.
     *
     * Inherit a {Listbox} class.
     *
     * @constructor
     * @this {MultiSelectListbox}
     * @param {object} domelement DOM element to be converted to the Listbox
     * @param {object} options an object with Listbox settings
     */
    function MultiSelectListbox(domelement, options) {
        this.super_.call(this, domelement, options);
    }

    inherits(MultiSelectListbox, Listbox);




    /**
     * Toggle item status.
     *
     * @this {MultiSelectListbox}
     * @param {object} domItem a DOM object
     */
    MultiSelectListbox.prototype.onItemClick = function (domItem) {
        if (domItem.hasClass(LIST_ITEM_CLASS_DISABLED) || domItem.hasClass(LIST_ITEM_CLASS_GROUP)) {
            return;
        }

        var parentValues = this._parent.val();

        if (domItem.hasClass(LIST_ITEM_CLASS_SELECTED)) {
            domItem.removeClass(LIST_ITEM_CLASS_SELECTED);

            var removeIndex = parentValues.indexOf(domItem.val());
            parentValues.splice(removeIndex, 1);
        } else {
            domItem.addClass(LIST_ITEM_CLASS_SELECTED);

            if (!parentValues) {
                parentValues = [];
            }

            parentValues.push(domItem.val());
        }

        this._parent.val(parentValues);
        this._parent.trigger('change');
    };




    /**
     * jQuery plugin definition. Please note, that jQuery's `each()` method
     * returns `false` to stop iteration; otherwise it should return `true`.
     *
     * @param {object} options an object with Listbox settings
     */
    $.fn.listbox = function (options) {
        var settings = $.extend({
            cssClass: null,
            searchBar: false,
            searchBarIconClass: null,
            searchBarWatermark: 'Search...',
            multiple: false,
            getItems: null
        }, options);

        return this.each(function () {
            if (settings.multiple) {
                return !!new MultiSelectListbox($(this), settings);
            }

            return !!new SingleSelectListbox($(this), settings);
        });
    };
})(jQuery);
