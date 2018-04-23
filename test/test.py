from . import utils
from .friendslist import friends_test
from .login import login_test
from .interests import int_test
from .search import search_test
from .calendar import cal_test
from selenium import webdriver
import unittest
import platform
import time


class GiftTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        os = platform.system()

        if os == "Windows":
            browser = "test/chromedriver_win"
        else:
            browser = "test/chromedriver"

        cls.driver = webdriver.Chrome(browser)

        cls.driver.set_page_load_timeout(10)
        cls.driver.get("http://volweb.utk.edu/~iige/")
        cls.driver.maximize_window()
        cls.driver.implicitly_wait(10)

        time.sleep(1)

        cls.test = utils.TestTools(cls.driver)

    def test_login(self):
        login_test(self.test)

    def test_friends(self):
        friends_test(self.test)

    def test_cal(self):
        cal_test(self.test)

    def test_ints(self):
        int_test(self.test)

    def test_search(self):
        search_test(self.test)

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()


if __name__ == '__main__':
    unittest.main()
