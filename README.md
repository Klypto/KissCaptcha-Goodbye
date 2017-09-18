# KissCaptcha-Goodbye
This little script will automatically answer and submit most of the CAPTCHA question pairs on KissAnime for you quickly.


Nearly all answer pairs are included, but there's a chance that I missed one since I did it manually. In the event that it cannot correctly answer for you, it will try to eliminate what it thinks is the wrong answer by darkening them.  Any missing matches will be added in future updates.

Recent Changes:
- Added web workers to squeeze out a few more ms of processing speed | less time on page = better for user
 - Re-worked how image loading was detected to allow for variable number of captcha images
 - Added more Answers to reach 98%+ solved (possibly all?)
 - Minor formatting style change applied on the code.  Blows up git change log but whatever


Planned Features:

 - Automatically complete captchas for the next video page in the background.
 - Learn new images automatically

The captchas on KissAnime will stop random bots but would have less success than a wet paper towel to to get in the way of anyone who is making a targeted attack on the site.  However, it is  HIGHLY successful at annoying it's users.
