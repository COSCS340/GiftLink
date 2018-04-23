### Testing GiftLink

The GiftLink test suite utilizes python's Selenium Webdriver as well as the unittest library to create automated application tests for a number of GiftLink's major features.

These tests use the Google Chrome web browser and require a corresponding web driver which can be found [here](https://chromedriver.storage.googleapis.com/index.html?path=2.38/).

**In order for these tests to work on Windows, the correct web driver must be added to the /test directory with the name "chromedriver_win"**

These tests can be run from the command line while in the main GiftLink directory using:

`python3 -m unittest`
