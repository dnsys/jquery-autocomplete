$(function(){
    let availableTags = [
        "ActionScript",
        "AppleScript",
        "Asp",
        "BASIC",
        "C",
        "C++",
        "Clojure",
        "COBOL",
        "ColdFusion",
        "Erlang",
        "Fortran",
        "Groovy",
        "Haskell",
        "Java",
        "JavaScript",
        "Lisp",
        "Perl",
        "PHP",
        "Python",
        "Ruby",
        "Scala",
        "Scheme"
    ];

    function autocomplete(inp, arr) {
        let currentFocus;
        inp.on('input', function(e) {
            let $this = $(this);
            let val = $this.val();
            closeAllLists();
            if (!val) { return false;}
            currentFocus = -1;
            let $autocompleteBox = $(`<div id="${$this.attr('id')}-autocomplete-list" class="search__autocomplete"></div>`)
            $this.parent().append($autocompleteBox);
            $(arr).each(function (index, item) {
                if (item.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                    let $autoCompleteItem = $(`<div class="search__autocomplete-item"></div>`)
                    $autoCompleteItem.append($(`<strong>${item.substr(0, val.length)}</strong>`))
                    $autoCompleteItem.append(item.substr(val.length));
                    $autoCompleteItem.append(`<input type='hidden' value="${item}">`)

                    $autoCompleteItem.on('click', function () {
                        inp.val($(this).find('input').val());
                        closeAllLists();
                    })
                    $autocompleteBox.append($autoCompleteItem);
                }
            })
        });
        inp.on('keydown', function(e) {
            let $this = $(this);
            let $list = $(`#${$this.attr('id')}-autocomplete-list`);
            if ($list) $list = $list.find(".search__autocomplete-item");

            console.log($list)
            if (e.keyCode == 40) { //key down press
                currentFocus++;
                addActive($list);
            } else if (e.keyCode == 38) { //key up press
                currentFocus--;
                addActive($list);
            } else if (e.keyCode == 13) { //key enter press
                e.preventDefault();
                if (currentFocus > -1) {
                    if ($list) $($list[currentFocus]).click(); //simulate click to item
                }
            }
        });
        function addActive(x) {
            if (!x) return false;
            removeActive(x);
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (x.length - 1);
            $(x[currentFocus]).addClass("is-active");
        }
        function removeActive(x) {
            $(x).removeClass('is-active')
        }
        function closeAllLists(elmnt) {
            let $list = $('.search__autocomplete');
            $list.each(function (index, item) {
                if( elmnt != item && elmnt != inp[0] ){
                    item.remove();
                }
            })
        }
        $(document).on('click', function (e) {
            closeAllLists(e.target);
        });
    }

    autocomplete($('#searchField'), availableTags);
})