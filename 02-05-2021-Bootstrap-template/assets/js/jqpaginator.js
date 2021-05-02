/**
 * Simple pagination, nice and easy.
 */
(function($) {
    var defaults = {
        parentcls: 'jqpaginator',
        wrapcls: 'jqp-wrap',
        pageListcls: 'jqp-pages',
        pageItemcls: 'jqp-page',
        inputcls: 'jqp-input',
        prevcls: 'jqp-prev',
        nextcls: 'jqp-next',
        activecls: 'jqp-active',
        disabledcls: 'jqp-disable',

        afterPagingEvent: 'after-paging',
        beforePagingEvent: 'before-paging',
        destroyEvent: 'destroy-paging',
    };
    var opt = {  // Default options
        itemsPerPage: 10,
        buttonText: ["<<", ">>"],
        showNumbers: true,
        showButtons: true,
        showInput: true,
        numberMargin: 2,
    };


    function Paginator($parent, options) {
        // Object so as to keep track of important data.
        this.options = options;
        if (!this.options.itemsPerPage) this.options.itemsPerPage = opt.itemsPerPage;
        if (!this.options.numberMargin) this.options.numberMargin = opt.numberMargin;
        if (!this.options.buttonText) this.options.buttonText = opt.buttonText;
        if (!this.options.render) 
            throw Error('jqpaginator: Missing render function!');

        if (!('showNumbers' in this.options)) this.options.showNumbers = opt.showNumbers;
        if (!('showButtons' in this.options)) this.options.showButtons = opt.showButtons;
        if (!('showInput' in this.options)) this.options.showInput = opt.showInput;
        // Parent element
        this.$parent = $parent;

        this.data = options.data;
        if (!(Array.isArray(this.data) || typeof this.data === "function"))
            throw Error('jqpaginator: Given data should be a function or Array!');

        // Initialise
        this.init();
    }
    Object.defineProperty(Paginator, 'constructor', {value: Paginator, enumerable: false, writable: true});
    Object.assign(Paginator.prototype, {
        // util
        bind: function(event, $element, func) {
            // Binding events
            if (!func) return;  // Ignore
            $element.on(event, func);
        },
        calcListNums: function(margin, perPage, total, active) {
            var l = [1,];  // Always show first
            // maximum
            var maxPages = Math.ceil(total / perPage);
            if (maxPages < 1) maxPages = 1;

            if (maxPages > 1) {
                var range = [(active - margin), (active + margin)];
                if (range[0] < 2) range[0] = 2;  // remove < 2, because 1 exists
                if (range[1] > (maxPages - 1)) range[1] = (maxPages - 1);  // remove > max - 1
                if (range[0] > 2) l.push("...");  // if first range item is not 2, ellipsis
                // intermediary numbers
                var n = range[0];
                while (n <= range[1]) {
                    l.push(n);
                    n++;
                }
                if (range[1] < (maxPages - 1)) l.push("...");
                l.push(maxPages);
            }

            return l;
        },
        getSlice: function(data, page) {
            // get slice of data array
            var perPage = this.options.itemsPerPage;
            var start = ((page - 1) * perPage);
            var end = (page * perPage);
            return data.slice(start, end);
        },
        // result of data
        done: function(data, total, page) {
            /**
             * If `data` is a function, this is passed to it
             * to trigger the `render` function and `after-paging`
             * event.
             * Accepts data passed to `render`, and a total value
             * to determine pager range, along with the current
             * page number.
             */
            // update elements
            if (this.options.showNumbers) this.updateNumbers(total, page);
            if (this.options.showButtons) this.updateButtons(total, page);
            if (this.options.showInput) 
                this.$parent.find('.'+defaults.inputcls).val('');
            // run render
            this.options.render(data);
            // trigger after-paging
            this.$parent.trigger(defaults.afterPagingEvent);
        },
        // construction
        buildPaginator: function() {
            // return paginator object - initial setup
            var $parent = this.$parent;
            var options = this.options;
            var buttons, buttonTxt;
            var numbers, numMargin;
            var input, perPage;
            // wrapper
            var $paginator = $("<div><div>");
            $paginator.addClass(defaults.wrapcls);
            $paginator.empty();  // Somehow prevents ghostly spooky div appearing
            // buttons
            if (options.showButtons) {
                buttonTxt = options.buttonText;
                buttons = this.createButtons(buttonTxt);
            }
            // numbers
            if (options.showNumbers) {
                numMargin = options.numberMargin;
                perPage = options.itemsPerPage;
                numbers = this.createNumbers(numMargin, perPage, 1);
            }
            // input 
            if (options.showInput) {
                input = this.createInput();
            }
            // add items to paginator
            if (buttons) $paginator.append(buttons[0]);
            if (numbers) $paginator.append(numbers);
            if (buttons) $paginator.append(buttons[1]);
            if (input) $paginator.append(input);

            $parent.append($paginator);
        },
        createButtons: function(texts) {
            // return two button elements in array
            var self = this;
            var $prev, $next;
            // build
            $prev = $("<div></div>");
            $prev.addClass(defaults.prevcls);
            $prev.append("<button>" + texts[0].toString() + "</button>");

            $next = $("<div></div>");
            $next.addClass(defaults.nextcls);
            $next.append("<button>" + texts[1].toString() + "</button>");

            // event
            this.bind('click', $prev.find("button"), function() { 
                var $btn = $(this);
                self.prev($btn); 
            });
            this.bind('click', $next.find("button"), function() { 
                var $btn = $(this);
                self.next($btn); 
            });

            // return
            return [$prev, $next];
        },
        createNumbers: function(margin, perPage, total, active) {
            // return the list of numbers
            if (!active) active = 1;
            var self = this;
            var $numbers = $("<ul></ul>");
            var numList;
            $numbers.addClass(defaults.pageListcls);

            numList = this.calcListNums(margin, perPage, total, active);

            for (var i=0; i<numList.length; i++) {
                $numbers.append(
                    this.createNumber(numList[i], active)
                );
            }

            // event
            function handler() {
                var page = Number($(this).text());
                self.goto(page);
            }
            this.bind('click', $numbers.find('.'+defaults.pageItemcls), handler);

            return $numbers;
        },
        createNumber: function(num, activeNum) {
            var $el = $("<li>" + num + "</li>");
            if (!isNaN(Number(num))) $el.addClass(defaults.pageItemcls);
            if (num == activeNum) $el.addClass(defaults.activecls);
            return $el;
        },
        createInput: function() {
            // return input for paging
            var self = this;
            var $input = $("<input type=\"text\">");
            $input.addClass(defaults.inputcls);

            var handler = function() {
                // var
                var active = $(this).parent().find('.'+defaults.activecls).text();
                var value = $(this).val();
                var valid = (!isNaN(Number(value)));
                // must be a number, must not be current number
                if (valid && active !== value) {
                    self.goto(Number(value));
                }
            };

            this.bind('change', $input, handler);

            return $input;
        },
        updateNumbers: function(total, page) {
            // Update the current page numbers.
            var $parent = this.$parent;
            var margin = this.options.numberMargin;
            var perPage = this.options.itemsPerPage;
            // Create and replace
            var $nums = this.createNumbers(margin, perPage, total, page);
            $parent.find('.'+defaults.pageListcls).replaceWith($nums);
        },
        updateButtons: function(total, page) {
            var max = Math.ceil(total / this.options.itemsPerPage);
            var $parent = this.$parent;
            // prev
            if (page == 1) {
                $parent.find('.'+defaults.prevcls+' button').addClass(defaults.disabledcls);
            } else {
                $parent.find('.'+defaults.prevcls+' button').removeClass(defaults.disabledcls);
            }
            // next
            if (page == max) {
                $parent.find('.'+defaults.nextcls+' button').addClass(defaults.disabledcls);
            } else {
                $parent.find('.'+defaults.nextcls+' button').removeClass(defaults.disabledcls);
            }
        },
        // init
        init: function() {
            // Check & throw/warn
            var $parent = this.$parent;
            var options = this.options;

            if ($parent.hasClass(defaults.parentcls)) {
                console.warn("jq-paginator: This element has already been instanced, or contains a reserved class, aborting.");
                return;
            }
            $parent.addClass(defaults.parentcls);

            if (!options.data) 
                throw Error("jq-paginator: Cannot operate without data array or function!");
            if (!options.render)
                throw Error("jq-paginator: A render function is required to display data selection!");
            if (!options.showButtons && !options.showNumbers && !options.showInput)
                throw Error("jq-paginator: At least 1 display should be allowed for pagination! Use 1 or more of 'showNumbers', 'showInput' or 'showButtons' as true.");

            // Build
            this.buildPaginator();

            // Get first page
            this.goto(1);
        },
        // interaction
        goto: function(page) {
            var self = this;
            var $parent = this.$parent;
            if (!page) page = 1;
            if (!isNaN(page)) page = Number(page);
            else throw Error("jqpaginator: Page number to go to is not a number!");
            // var
            var max = Number($parent.find('.'+defaults.pageItemcls+':last-of-type').text());
            if (isNaN(max)) max = 1;

            if (page > 0 && page <= max) {
                // This is before we page.
                $parent.trigger(defaults.beforePagingEvent);
                // data
                if (Array.isArray(this.data)) {
                    // Get slice and send to `done()`
                    var slice = this.getSlice(this.data, page);
                    this.done(slice, this.data.length, page);
                } else if (typeof this.data === "function") {
                    // call function - can be ajax or w/e, 
                    // should accept done func as arg.
                    this.data(function(data, total) {
                        self.done(data, total, page);
                    }, page);
                } else {
                    // error, but send the after-paging
                    $parent.trigger(defaults.afterPagingEvent);
                    throw Error('jqpaginator: Given data should be a function or Array!');
                }
            } else {
                console.warn('jqpaginator: Bad page number given, ignoring...');
            }
        },
        next: function($btn) {
            // `this` is the next button
            var $parent = this.$parent;
            if (!$btn.hasClass(defaults.disabledcls)) {
                // var
                var $active = $parent.find('.'+defaults.activecls);
                var $next = $active.next();
                
                // Account for "..." items just in case
                if ($next.length > 0 && $next.text() === "...") 
                    $next = $next.next();

                if ($next.length && $next.text() !== "...") {
                    this.goto($next.text());
                }
            }
        },
        prev: function($btn) {
            // `this` is the prev button
            var $parent = this.$parent;
            if (!$btn.hasClass(defaults.disabledcls)) {
                // var
                var $active = $parent.find('.'+defaults.activecls);
                var $prev = $active.prev();
                
                // Account for "..." items just in case
                if ($prev.length > 0 && $prev.text() === "...") 
                    $prev = $prev.next();

                if ($prev.length && $prev.text() !== "...") {
                    this.goto($prev.text());
                }
            }
        },
        reload: function($parent) {
            // destroy and reinit
            this.destroy($parent);
            this.init();
        },
        destroy: function($parent) {
            // remove all elements, return to pre-init state
            $parent.empty().removeClass(defaults.parentcls);
        },
    });

    var instances = {};

    $.fn.jqpaginator = function(options, val) {
        if (typeof options === "object") {
            // creation
            return this.each(function() {
                var eid = 'jqp' + (new Date()).getTime();
                $(this).data('pagination', eid);
                instances[eid] = new Paginator($(this), options);
            });
        } else {  // WIP
            // interaction
            switch(options) {
                case "destroy":
                    return this.each(function() {
                        var eid = $(this).data('pagination');
                        instances[eid].destroy($(this));
                        // Remove refs after
                        delete instances[eid];
                        $(this).removeData('pagination')
                        .trigger(defaults.destroyEvent);
                    });
                case "reload":
                    return this.each(function() {
                        var eid = $(this).data('pagination');
                        instances[eid].reload($(this));
                    });
                case "goto":
                    return this.each(function() {
                        var eid = $(this).data('pagination');
                        instances[eid].goto(val);
                    });
                case "getPage":
                    var $chosen;
                    if (this.length > 1) $chosen = $(this.get(0));
                    else if (this.length === 1) $chosen = this;
                    else return null;

                    return $chosen.find('.'+defaults.activecls).text();
                case "instance":
                    var $chosen;
                    if (this.length > 1) $chosen = $(this.get(0));
                    else if (this.length === 1) $chosen = this;
                    else return null; 

                    var eid = $(this).data('pagination');
                    return instances[eid];
                default:
                    console.warn("jq-paginator: Unrecognised action, ignoring.");
            }
        }
    };

})(jQuery);
