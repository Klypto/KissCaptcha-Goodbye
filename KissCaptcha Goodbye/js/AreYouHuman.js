var countSelect = 0;
var choosenIndex = '';

// future versions will pre-load the next video captcha or guess what the user may want to play 
// next and solve it in the background so the user doesn't have to be slowed down by this garbage
// It seems like the site gives a (15?) minute free pass window for that specific video page if you solve the captcha correctly
// The guessing part if ever implemented might increase hits on the site and will be throttled way down of course.




function callbackfunc(event)
{
    processhash(event.data.index, event.data.hash);
}


document.addEventListener('DOMContentLoaded', function ()
{
    $('img').unbind('click');
    $('#formVerify img').click(function (e)
    {

        if ($(this).attr('class') != 'imgCapSelect')
        {
            countSelect--;
            choosenIndex = choosenIndex.replace($(this).attr('indexValue') + ',', '');
        }
        else
        {
            countSelect++;
            $(this).eq(0).css('opacity', '0.75');
            choosenIndex += $(this).attr('indexValue') + ',';
        }
        $('#answerCap').val(choosenIndex);
        if (countSelect === 2)
        {
            $('#formVerify').submit();
        }
    });
    if ($('body')[0].firstChild.wholeText === "Wrong answer. Click ")
    {

        //console.log("WRONG ANSWER");
        chrome.runtime.sendMessage({ redirect: document.referrer });

        //This will later be used for automatically "teaching" it the right / wrong answers based on user input should the captchas change in the future

        //chrome.storage.local.get('last_captcha_url', function (items) {
        //    if (document.referrer === items.last_captcha_url) {
        //        console.log("URL MATCH");
        //    } else {
        //        console.log("URL FAIL");
        //        console.log(document.referrer);
        //        console.log(items.last_captcha_url);
        //    }
        //});
        // } else {
        // chrome.storage.local.set({ last_captcha_url: window.location.href });
    }

});

function processhash(index, md5)
{
    //this is just in case we need to see the hash to add a new one to the list - Dev only atm
    console.log("Index " + index + ": " + md5);
    var check1 = false;
    var check2 = false;
    if (TheAnswers.hasOwnProperty(answer1))
    {
        for (i = 0; i < TheAnswers[answer1].length; i++)
        {
            if (TheAnswers[answer1][i] === md5)
            {
                check1 = true;
                $("#formVerify span").eq(0).css('color', 'grey');
                $("#formVerify img").eq(index).css('opacity', '0.75');
                break;
            }

        }
    }
    if (TheAnswers.hasOwnProperty(answer2))
    {

        for (i = 0; i < TheAnswers[answer2].length; i++)
        {
            if (TheAnswers[answer2][i] === md5)
            {
                check2 = true;
                $("#formVerify span").eq(1).css('color', 'grey');
                $("#formVerify img").eq(index).css('opacity', '0.75');
                break;
            }
        }
    }

    if (check1 || check2)
    {
        //console.log("Automatically detected the answer at Index " + index + " for hash: " + md5);
        countSelect++;
        $("#formVerify img").eq(index).attr('class', 'imgCapSelect');
        choosenIndex += index + ',';
        $('#answerCap').val(choosenIndex);
        if (countSelect == 2)
        {
            // Lazy Dev cycle
            //location.reload();
            $('#formVerify').submit();

            return;
        }
    } else
    {
        var tempObj = {};
        for (var key in TheAnswers)
        {
            if (TheAnswers.hasOwnProperty(key))
            {
                for (i = 0; i < TheAnswers[key].length; i++)
                {
                    if (TheAnswers[key][i] === md5)
                    {
                        if (tempObj.hasOwnProperty(TheAnswers[key][i]))
                        {
                            $("#formVerify img").eq(index).css('opacity', '0.6');
                        }
                        else
                        {
                            $("#formVerify img").eq(index).css('opacity', '0.2');
                            tempObj[TheAnswers[key][i]] = 1;
                        }
                    }
                }
            }
        }
    }
}



var pool = new Pool(4);
pool.init();


var answer1;
var answer2;


// The purpose of this system is to start executing code AS SOON AS POSSIBLE
// We don't want to wait for the page to load, just submit the form as soon as we have enough images to move closer to the right answer
// Yaha-kui zaShunina level of impatience
function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}
var Started = false;

async function CheckStart()
{
    var length = 0;
    while (length === 0)
    {
        length = $("#formVerify img").length;
        //spam checks every 1/1000th a second while the page is loading to see if all the images we need have been assembled by the browser yet
        await sleep(1);
        if (length)
        {
            answer1 = $("#formVerify span").eq(0).text().trim();
            answer2 = $("#formVerify span").eq(1).text().trim();
            for (var i = 0; i < length; i++)
            {
                var wp = new WorkPackage();
                wp.url = $("#formVerify img")[i].src;
                wp.index = i;
                workerTask = new WorkerTask('js/ImageHashJob.js', callbackfunc, wp);
                pool.addWorkerTask(workerTask);
            }
            break;
        }
    }
}
CheckStart();


