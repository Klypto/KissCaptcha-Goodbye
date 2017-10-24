

chrome.runtime.onMessage.addListener(function (request, sender)
{
    chrome.tabs.update(sender.tab.id, { url: request.redirect });
});

chrome.runtime.onInstalled.addListener(function (details)
{
    var opt = {
        type: 'list',
        title: "KissCaptcha Goodbye - Updated",
        message: "New Features:",
        contextMessage: "Please report issues, I will fix them if found",
        items: [
            { title: "Adjusted video pre-captcha from 92->90 %:", message: "" },
            { title: "Added Some Missing Answers", message: "" },
        ],
        iconUrl: "icon.png",
        isClickable: true,
        requireInteraction: true
    }
    chrome.notifications.create("KCG-update", opt, function (id)
    {
        timer = setTimeout(function () { chrome.notifications.clear(id); }, 8000);
    });
});

chrome.notifications.onClicked.addListener(function (id)
{
    switch (id)
    {
        case "KCG-update":
            {
                chrome.tabs.create({ url: "https://chrome.google.com/webstore/detail/kisscaptcha-goodbye/bpkjdeodfifnppihjjmimadnhnoiokkk" });
            }
        default:
    }
});