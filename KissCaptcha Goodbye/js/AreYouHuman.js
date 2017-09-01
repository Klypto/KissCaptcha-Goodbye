var countSelect = 0;
var choosenIndex = '';

// future versions will pre-load the next video captcha or guess what the user may want to play 
// next and solve it in the background so the user doesn't have to be slowed down by this garbage
// It seems like the site gives a 30? minute free pass window for that specific video page if you solve the captcha correctly
// The guessing part if ever implemented might increase hits on the site and will be throttled way down of course.

document.addEventListener('DOMContentLoaded', function () {
    $('img').unbind('click');
    $('#formVerify img').click(function (e) {

        if ($(this).attr('class') != 'imgCapSelect') {
            countSelect--;
            choosenIndex = choosenIndex.replace($(this).attr('indexValue') + ',', '');
        }
        else {
            countSelect++;
            $(this).eq(0).css('opacity', '0.75');
            choosenIndex += $(this).attr('indexValue') + ',';
        }
        $('#answerCap').val(choosenIndex);
        if (countSelect === 2) {
            $('#formVerify').submit();
        }
    });
    if ($('body')[0].firstChild.wholeText === "Wrong answer. Click ") {

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

//Fantastically awful
var TheAnswers = {};
TheAnswers["bear, green hat"] = ["5c8d5194290af9d3e204e637d1bdd239"];
TheAnswers["green, base ball"] = ["9fffe613006dbc32ea9bd7bac4ce79d1"];
TheAnswers["emoticon, coffee"] = ["e99cfc963db8e5cc9d2d3058a770971f"];
TheAnswers["cat, zzz"] = ["d63fd8b7c3c6e6ffbc33cec6aeda9d47"];
TheAnswers["cup, black mask"] = ["2a31901fd7309ceec14e219ef1d0ed9d"];
TheAnswers["couple, yawn"] = ["6330b1a41ba62fc99c66cdec668dd441"];
TheAnswers["girl, pink hair"] = ["4b9ce35623e9fed67a55d6ed8a5c5c5d"];
TheAnswers["emoticon, red tail"] = ["f1a1f42be3f50194fc8e4a167fdc4040"];
TheAnswers["girl, black hair"] = ["8c30c182078e0017c0bac242c948fff8", "ecb91ddc44a3432ec4c9d368e1682f79"];
TheAnswers["lion, pink"] = ["8090de6dbf79ad918dce2cf151031bbd"];
TheAnswers["hand, up"] = ["11e78332fe9300a0c62485a7c65617eb", "4ed14916ea805853565bafc96097d9d2"];
TheAnswers["bird, yellow"] = ["f2a6cd8224d69b0caf537b470892d175"];
TheAnswers["emoticon, red hat"] = ["98fbeeaf5c6635d8a1e8119b7c4e11cc"];
TheAnswers["boy, yellow hair"] = ["446211a96f9fffaf96e70108c2e73c9a", "28a6e66c5a5c4280d74acdc6f9dd023d"];
TheAnswers["boy, red cloak"] = ["a8de2ae75277825550bee917898ddade"];
TheAnswers["boy, orange clothes"] = ["51e819820fc9608416eaa5bdea59ba50"];
TheAnswers["hand, right"] = ["2363c33ac9119301e07ae4bee0bc778d"];
TheAnswers["hand, fist"] = ["77c9c5f53fc6c4c776d87b28bcf5ff89", "e85a4ab7383c178c41c8235eb7af0656"];
TheAnswers["bear, armor"] = ["1b767250fd45452b638b169bf6285f71"];
TheAnswers["girl, white clothes"] = ["6bf97ffaef6462f256ab3cc5cf4982c5"];
TheAnswers["lion, no color"] = ["36a9d79f8f12c3e06ab978a4ad578afb"];
TheAnswers["turtle, brown shell"] = ["06e07a3afa7b8be536b7274f39781fc1"];
TheAnswers["cloud, rain"] = ["a1eeeece7cc111436544d347a5fc692c"];
TheAnswers["girl, yellow slug"] = ["f19b2cf9fda4605acce6a362fb0a78e5"];
TheAnswers["tiger, above hand"] = ["377d9aa62da51f021daee47f80314454"];
TheAnswers["hand, down"] = ["9c0aae286fd689f5194b75cbfede38a3"];
TheAnswers["boy, scythe"] = ["a4bdcea030581ad39454bfeae89850ef"];
TheAnswers["hand, clap"] = ["f74724688aa700edef61889be282d141", "2aa23ea3bd83d91feeaa3354b696e750"];
TheAnswers["tiger, rawr"] = ["ea89366befb34d1c432186b1a7c4ed2e"];
TheAnswers["cat, not fat"] = ["4ad30fba20cab873a2cdab0a75b6ca3f"];
TheAnswers["couple, girl gray clothes"] = ["984c24974d47c5bbd8a4a8dca98846a9"];
TheAnswers["cloud, sun"] = ["75aa6e5d530bbe24d45b8827bf025a2c"];
TheAnswers["couple, girl black skirt"] = ["984c24974d47c5bbd8a4a8dca98846a9"];
TheAnswers["cat, birthday"] = ["201a60b90b6cecf29f7ddc2987dc4497"];
TheAnswers["turtle, doll"] = ["2524a429399be4ae388ed5d129797d16"];
TheAnswers["boy, no eyebrow"] = ["eba07cf00d77fe29dc5b53c2cea527ed"];
TheAnswers["medal, gold"] = ["e379425ae3b680788d873f584bfe3c6e", "98aa3274e1a3ec3ab6c3914acc471977"];
TheAnswers["couple, yellow pikachu"] = ["6330b1a41ba62fc99c66cdec668dd441"];
TheAnswers["boy, horse"] = ["e689dbbde293a981b3b51b0712e0db01"];
TheAnswers["girl, glasses"] = ["ba6a0bd3546adb529399961100fa7321"];
TheAnswers["hand, write"] = ["2f08c2862b675866b9bb3d06c3ecbe39"];
TheAnswers["dice, red"] = ["d05a10825fd71d609d55b022ad07be17"];
TheAnswers["girl, green clothes"] = ["ecb91ddc44a3432ec4c9d368e1682f79", "d2a88f9872f022a08be3c3d3d7aa4ab4"];
TheAnswers["hand, brown"] = ["e85a4ab7383c178c41c8235eb7af0656", "9fd4088fd587647944b55998a013463a", "2aa23ea3bd83d91feeaa3354b696e750"];
TheAnswers["girl, yellow skirt"] = ["e48c96695ce3b4120e6a3c97dfa06dfc"];
TheAnswers["burger, green flag"] = ["e5e2cccd268817976c556621373bea08"];
TheAnswers["cat, eat"] = ["89f95bd98e9b9b050e420d9fa077b731"];
TheAnswers["hand, yellow"] = ["9c0aae286fd689f5194b75cbfede38a3", "530d883263f6e7c61ead4836d7840270", "77c9c5f53fc6c4c776d87b28bcf5ff89", "2f08c2862b675866b9bb3d06c3ecbe39", "f74724688aa700edef61889be282d141"];
TheAnswers["bird, blue feather"] = ["996101be97d61d76339fe42b45591d36"];
TheAnswers["sheep, white fur"] = ["3b77fe77c84c7ba8889440c1c3c35f08"];
TheAnswers["dice, brown"] = ["46d66d99f9b8616ea85f3f27e893ef25"];
TheAnswers["boy, injured"] = ["4db3b33adb722cf2e1458d45f83e0502"];
TheAnswers["boy, black clothes"] = ["4d5ac9c3a61d0080c43ddbc028390763", "7a9278b025a091e56d48778516d33413"];
TheAnswers["boy, fight me"] = ["d5a48b06f9cabf037ce305511e187ea8"];
TheAnswers["dice, green"] = ["8077f889fd05ee4b02bd567432844d2e"];
TheAnswers["boy, black hat"] = ["b6872a8285d19241e8b921e165fac492"];
TheAnswers["bird, white belly"] = ["996101be97d61d76339fe42b45591d36"];
TheAnswers["cat, easily"] = ["b78ae8af1088e78864dbcda157e2ae9f"];
TheAnswers["emoticon, fork"] = ["d62cb0f2c0196506786eabbf7f8d2536"];
TheAnswers["girl, lion"] = ["042d356755f0829daa6740956f5c5743"];
TheAnswers["rabbit, yellow"] = ["ad832cbaa47c16fa806968808f02bccd"];
TheAnswers["boy, black hair"] = ["a8de2ae75277825550bee917898ddade", "ed828a58fc5512ae291ad60f4aa316e2", "3c09e7d32aa9ec610959d17a006604de"];
TheAnswers["boy, tail"] = ["28a6e66c5a5c4280d74acdc6f9dd023d"];
TheAnswers["cat, meowy"] = ["68511c3788983a8c0f5e8b4261a935d4"];
TheAnswers["emoticon, ice cream "] = ["8f8250cdeb1df26f1860e71e599516bc"];
TheAnswers["medal, silver"] = ["31c89ba6f24ec50c230f666cb99ce555"];
TheAnswers["dog, brown fur"] = ["4b04e677ceda57e54414331ee476e899"];
TheAnswers["bird, sing"] = ["4c7374fff94cb04759a0c700e2549f4a"];
TheAnswers["cat, lazy"] = ["73a1a034d9f4ca961c2ea31a70f200d6"];
TheAnswers["bird, coffee"] = ["501fd68a0597e07f6009dc62f8b70113"];
TheAnswers["penguin, fishing"] = ["14eced4b1b063ab3eb947a4bf6ae1855"];
TheAnswers["hand, left"] = ["77c9c5f53fc6c4c776d87b28bcf5ff89"];
TheAnswers["emoticon, apple"] = ["e09ff3b5f2dedd2737887b3779584ff8"];
TheAnswers["bird, white cloud"] = ["a22071dc8d42b26bf313cb4e21ee961f"];
TheAnswers["boy, basketball"] = ["4f7646dfe78b3ff07d2c869d010a5d8c"];
TheAnswers["bear, black and white"] = ["db7e4a9d2d11302ae21e7b2647055785"];
TheAnswers["dog, flower"] = ["775a7c6dc6d5f56cc13b9dd66c237160"];
TheAnswers["yellow, pikachu"] = ["76c0e43f3da88cc4a7ca54e3a373fe0c"];
TheAnswers["dog, bone"] = ["c6be50fd67064194d20a670968d47632"];
TheAnswers["hand, left"] = ["ec2707e5f0d6f4b26eff435bb2a99a24"];
TheAnswers["boy, sword"] = ["7a9278b025a091e56d48778516d33413", "ed828a58fc5512ae291ad60f4aa316e2"];
TheAnswers["boy, swim"] = ["a591b7f3e7e3ea17821b5303508e074b"];
TheAnswers["boy, bicycle"] = ["6b8ca45569f1192589a02f802804d69f"];
TheAnswers["penguin, king"] = ["6712c9e4c1ddf0cf1a41637dab657873"];
TheAnswers["couple, boy black clothes"] = ["68b30f2d271900e015225e272bbcf4a6"];
TheAnswers["emoticon, pizza"] = ["858d4d62568f85846c00850b5c70da7c"];
TheAnswers["arm, muscle"] = ["31f06fafe94cf3dbdb63ef05faba2ba7"];
TheAnswers["arm, phone"] = ["5898f98d599c683bd32d0eb7a6d396e2"];
TheAnswers["emoticon, blue pillow"] = ["a44c6374874036d8d7e6fcb7207cbd13"];
TheAnswers["burger, red background"] = ["a4a8e244414a96b6ecbfc5c4e99fcfcd"];
TheAnswers["turtle, green shell"] = ["0063ff9cdf783cde00c0e1ab9c81ce5d"];
TheAnswers["rabbit, eating"] = ["17c2d308f26907e8e1421f6c31d50b4a"];
TheAnswers["lion, smile"] = ["ff1539430de0a368eff415d6d2a7d6f1"];
TheAnswers["boy, golf"] = ["a2003eb8b9274ae0ee6038557b47a8f3"];
TheAnswers["emoticon, red scalf"] = ["363fa2eff6f2672799e52952584ad94c"];
TheAnswers["girl, blue hair"] = ["84de5471ee12a657399b1da0111b468d"];
TheAnswers["cat, iphone"] = ["24ec26be44671637e9d35a72bbacfbf4"];
TheAnswers["girl, pink cloak"] = ["99a99bb0e12b01ec7d1caa36ee72e5aa"];
TheAnswers["girl, red clothes"] = ["e3b4f1dfb487796f5f6b4ffc4211c59d"];
TheAnswers["penguin, doll"] = ["714abe57b8e76143d29732c5bd5b61ee"];
TheAnswers["yellow, candy"] = ["1daa16927d8d62577c950dbb23a05040"];
TheAnswers["boy, running"] = ["3cea07865dca27ebc73e9a82c6d7f654"];
TheAnswers["medal, copper"] = ["9a04510e67aac710d0b782ec9d9d40b0"];
TheAnswers["turtle, no color"] = ["c52d12462d1bf2c4a5fdb7f6e5f470f5"];
TheAnswers["cat, turkey"] = ["89f95bd98e9b9b050e420d9fa077b731"];
TheAnswers["cat, glasses"] = ["11ea1d6929366081ee7ff2ca8c5d0461"];
TheAnswers["emoticon, drink"] = ["9437443748c2c23f65823e0cbb56c687"];
TheAnswers["rabbit, hold a carrot"] = ["ad832cbaa47c16fa806968808f02bccd"];
TheAnswers["boy, brown hair"] = ["b6872a8285d19241e8b921e165fac492"];
TheAnswers["emoticon, brown hat"] = ["363fa2eff6f2672799e52952584ad94c"];
TheAnswers["tiger, girl"] = ["ea89366befb34d1c432186b1a7c4ed2e"];
TheAnswers["dog, sit"] = ["18822ae6c0bc7e7741be2572f5ac44d6"];
TheAnswers["emoticon, beer"] = ["9437443748c2c23f65823e0cbb56c687"];
TheAnswers["couple, cat"] = ["5b14d91d3db3fe7dd0a9373ce41a034e"];
TheAnswers["cat, food"] = ["327f5d6005010afecd4727a8fb02fe25"];
TheAnswers["xxxxxxxxxxxxxx"] = ["11111111111111111111"];


// The purpose of this system is to start executing code AS SOON AS POSSIBLE
// We don't want to wait for the page to load, just submit the form as soon as we have enough images to move closer to the right answer
// Yaha-kui zaShunina would be proud
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
var Started = false;

async function CheckStart() {

    while (Started === false) {

        //spam checks every 1/100th a second while the page is loading to see if all the images we need have been assembled by the browser yet
        await sleep(10);
        if ($("#formVerify img").length === 5) {
            TheRightAnswer();
            //To speed this up, each image should begin processing it's hash async as soon as we get the data for it's url.
            // We'll implement this later in another version
        }
    }
}
CheckStart();

function TheRightAnswer() {

    Started = true;
    var answer1 = $("#formVerify span").eq(0).text().trim();
    var answer2 = $("#formVerify span").eq(1).text().trim();
    //console.log(answer1);
    //console.log(answer2);

    function GetHash(url) {
        return new Promise(function (resolve, reject) {
            try {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", url);
                xhr.responseType = "blob";
                xhr.onerror = function () { reject("Network error.") };
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        var reader = new FileReader();
                        reader.readAsBinaryString(xhr.response);
                        reader.onload = function (e) {
                            var contents = e.target.result;
                            var hash = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(contents)).toString();
                            resolve(hash);
                        };
                    }
                    else { reject("Loading error:" + xhr.statusText) }
                };
                xhr.send();
            }
            catch (err) { reject(err.message) }
        });
    }

    function processhash(index, md5) {
        //this is just in case we need to see the hash to add a new one to the list - Dev only atm
        //console.log("Index " + index + ": " + md5);
        var check1 = false;
        var check2 = false;
        if (TheAnswers.hasOwnProperty(answer1)) {
            for (i = 0; i < TheAnswers[answer1].length; i++) {
                if (TheAnswers[answer1][i] === md5) {
                    check1 = true;
                    $("#formVerify span").eq(0).css('color', 'grey');
                    $("#formVerify img").eq(index).css('opacity', '0.75');
                    break;
                }

            }
        }
        if (TheAnswers.hasOwnProperty(answer2)) {

            for (i = 0; i < TheAnswers[answer2].length; i++) {
                if (TheAnswers[answer2][i] === md5) {
                    check2 = true;
                    $("#formVerify span").eq(1).css('color', 'grey');
                    $("#formVerify img").eq(index).css('opacity', '0.75');
                    break;
                }
            }
        }

        if (check1 || check2) {
            console.log("Automatically detected the answer at Index " + index + " for hash: " + md5);
            countSelect++;
            $("#formVerify img").eq(index).attr('class', 'imgCapSelect');
            choosenIndex += index + ',';
            $('#answerCap').val(choosenIndex);
            if (countSelect == 2) {
                $('#formVerify').submit();

                return;
            }
        } else {
            var tempObj = {};
            for (var key in TheAnswers) {
                if (TheAnswers.hasOwnProperty(key)) {
                    for (i = 0; i < TheAnswers[key].length; i++) {
                        if (TheAnswers[key][i] === md5) {
                            if (tempObj.hasOwnProperty(TheAnswers[key][i])) {
                                $("#formVerify img").eq(index).css('opacity', '0.6');
                            }
                            else {
                                $("#formVerify img").eq(index).css('opacity', '0.2');
                                tempObj[TheAnswers[key][i]] = 1;
                            }
                        }
                    }
                }
            }
        }
    }
    //Looping this blew it up because of the promises - Later move this up to an individual image detection loop and process them async if possible
    GetHash($("#formVerify img")[0].src).then(function (md5) {
        processhash(0, md5);
    });
    GetHash($("#formVerify img")[1].src).then(function (md5) {
        processhash(1, md5);
    });
    GetHash($("#formVerify img")[2].src).then(function (md5) {
        processhash(2, md5);
    });
    GetHash($("#formVerify img")[3].src).then(function (md5) {
        processhash(3, md5);
    });
    GetHash($("#formVerify img")[4].src).then(function (md5) {
        processhash(4, md5);
    });

}







