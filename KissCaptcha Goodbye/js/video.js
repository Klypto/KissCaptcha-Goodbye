
var next_link;
var pool = new Pool(4);
pool.init();
var countSelect = 0;
var choosenIndex = "";
var vid;

var KeepAliveCaptcha = false;

function videoTimeUpdate()
{


    if ((vid.currentTime / vid.duration) > .92)
    {
        if (!KeepAliveCaptcha)
        {
            // we're near the end of the video
            KeepAliveCaptcha = true;
            preloadCaptcha("http://kissanime.ru/Special/AreYouHuman2?reUrl=" + next_link);
        }
    }
    else
    {
        KeepAliveCaptcha = false;
    }
}

function CheckCaptcha()
{

}

function preloadCaptcha(url)
{
    console.log("preloaded Captcha");
    console.log("KeepAliveCaptcha: " + KeepAliveCaptcha);

    $.ajax({
        url: url,
        type: 'GET',
        timeout: 10000,
        success: function (data)
        {
            ProcessData(data);
        }
    });
    if (KeepAliveCaptcha)
    {
        //Keep refreshing captcha every 2 minutes
        setTimeout(preloadCaptcha, 120000, url);
    }
}


$(document).ready(function ()
{
    vidcheck();
    var element = document.getElementById("btnNext");
    if (typeof (element) != "undefined")
    {
        next_link = encodeURIComponent(document.getElementById("btnNext").parentElement.href);
        preloadCaptcha("http://kissanime.ru/Special/AreYouHuman2?reUrl=" + next_link);
    }
});


function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function vidcheck()
{


    while (typeof (vid) === "undefined")
    {
        vid = $('#my_video_1_html5_api')[0];
        await sleep(1000);
    }
    vid.ontimeupdate = videoTimeUpdate;

}




var answer1;
var answer2;

function ProcessData(data)
{
    var spans = $(data).find('#formVerify span');
    answer1 = spans.eq(0).text().trim();
    answer2 = spans.eq(1).text().trim();
    var images = $(data).find('#formVerify img');
    for (var i = 0; i < images.length; i++)
    {
        var wp = new WorkPackage();
        wp.url = images[i].src;
        wp.index = i;
        workerTask = new WorkerTask('js/ImageHashJob.js', callbackfunc, wp);
        pool.addWorkerTask(workerTask);
    }
}

function callbackfunc(event)
{
    processhash(event.data.index, event.data.hash);
}




function processhash(index, md5)
{
    //this is just in case we need to see the hash to add a new one to the list - Dev only atm
    console.log("Index " + index + ": " + md5);
    var check1 = false;
    var check2 = false;

    if (TheAnswers.hasOwnProperty(answer1) && TheAnswers.hasOwnProperty(answer2))
    {

        for (i = 0; i < TheAnswers[answer1].length; i++)
        {
            if (TheAnswers[answer1][i] === md5)
            {
                check1 = true;
                break;
            }
        }
        for (i = 0; i < TheAnswers[answer2].length; i++)
        {
            if (TheAnswers[answer2][i] === md5)
            {
                check2 = true;
                break;
            }
        }
        if (check1 || check2)
        {
            countSelect++;
            choosenIndex += index + ',';
            if (countSelect == 2)
            {
                $.ajax({
                    url: '/Special/AreYouHuman2',
                    type: 'POST',
                    contentType: 'application/x-www-form-urlencoded',
                    data: { reUrl: next_link, answerCap: choosenIndex },
                    timeout: 10000,
                    success: function (response)
                    {
                    }
                });
                return;
            }
        } else
        {

        }
    } else
    {
        console.log("failed checks");
    }
}