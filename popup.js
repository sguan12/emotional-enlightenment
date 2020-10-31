


var request = new XMLHttpRequest();


function message(val) {
    $(".message").text(val);
}
function message2(val) {
    $(".message2").text(val);
}

function autoURL(val) {
    $(".autoURL").text(val);
}


function everything(num) {
    message2(num);

}

var _gaq = _gaq || [];
//first variable: url-link
//   _gaq.push(['_setAccount', 'UA-84918034-1']);
//   _gaq.push(['_trackPageview']);
//second variable: textinput
_gaq.push(['second._setAccount', 'UA-84918034-2']);
_gaq.push(['second._trackPageview']);


(function () {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

$(document).ready(function () {
    //set input to previously saved value
    // chrome.storage.local.get("definedURL", function(result){
    //   if(result.definedURL!=undefined){
    //     $(".urlinput").attr("placeholder",result.definedURL);

    //   }else{
    //     $(".urlinput").attr("placeholder","type url here...");
    //   }
    // });



    //set word input to previous value
    chrome.storage.local.get("definedURL2", function (result) {
        if (result.definedURL2 != undefined) {
            $(".urltyping").attr("placeholder", "Input words here ...");

        } else {
            $(".urltyping").attr("placeholder", "Input words here ...");
        }
    });



    //handle update
    $(".urlbutton").click(function () {
        //   $(".message").text($(".urlinput").val());
        $(".message2").text($(".urltyping").val());


        //   chrome.storage.local.set({'definedURL': $(".urlinput").val()}, function() {
        //         // Notify user is saved
        //         message('Settings saved');
        //         _gaq.push(['_trackEvent', 'url_updated', $(".urlinput").val()]);
        //       });
        message("Settings saved");
        chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
            var url = tabs[0].url;
            autoURL("URL (auto): " + url);
        });


        //textarea box
        chrome.storage.local.set({ 'definedURL2': $(".urltyping").val() }, function () {

            // The text to analyze
            const text = $(".urltyping").val();
            //the url of the request plus the key:
            var url = "https://language.googleapis.com/v1/documents:analyzeSentiment?key=AIzaSyAJ6TYYbaHlKuHnft84zHlh0xlNaY8mNWk";

            // Open a new connection, using the GET request on the url endpoint
            request.open('POST', url, true);

            //setting headers
            request.setRequestHeader('Content-type', 'application/json');

            //json file
            var docDetails = {
                language: 'en-us',
                type: 'PLAIN_TEXT',
                content: text
            };
            var nlData = {
                document: docDetails,
                encodingType: 'UTF8'
            };

            //object that you're sending
            var nlOptions = {
                method: 'post',
                contentType: 'application/json',
                body: JSON.stringify(nlData)
            };
            const response = fetch(url, nlOptions).then((res) => res.json())
                .then((data) =>
                    message2('The emotional assessment value of this article is ' + data.documentSentiment.score))
                .catch((err) => console.log(err));

            // _gaq.push(['second._trackEvent', 'url_updated', str]);
        });

    });

    //not needed, but this function would allow update when enter is pressed
    $('input').keypress(function (e) {
        if (e.which == 13) {
            $(".urlbutton").click();
            return false;
        }
    });
});