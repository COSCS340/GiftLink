from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
import time


def wait_for_selector(browser, selector, timeout=10, visible=False, single=False):
    """
    Function that will wait for the given HTML element[s] to be found and then return said element[s]

    :param browser: Selenium web driver that we are using
    :param selector: CSS selector
    :param timeout: Timeout value in seconds
    :param visible: Boolean value describing if the intended element needs to be visible on the page
    :param single: Boolean value that defines if the function should return more than one element
    :return: Web element[s] whose css selector[s] match the given selector
    """

    wait = WebDriverWait(browser, timeout)
    if single:
        if visible:
            conditional = ec.visibility_of_element_located
        else:
            conditional = ec.presence_of_element_located
    else:
        if visible:
            conditional = ec.visibility_of_all_elements_located
        else:
            conditional = ec.presence_of_all_elements_located
    return wait.until(conditional((By.CSS_SELECTOR, selector)))


class TestTools:

    def __init__(self, driver):
        self.driver = driver

    def login(self, email="mark_dkxvqkt_wongman@tfbnw.net", password="GiftLink18"):
        """
        This helper function logs into GiftLink using the given email address and password

        :param email: email address for user that is wishing to login
        :param password: corresponding password for given user
        """

        login = wait_for_selector(self.driver, "#loginControl", visible=True, single=True)
        login.click()
        self.driver.find_element_by_css_selector("#loginControl").click()
        self.driver.implicitly_wait(10)
        self.driver.switch_to.window(self.driver.window_handles[1])

        element = wait_for_selector(self.driver, "#email", visible=True, single=True)
        element.clear()
        element.send_keys(email)
        element = self.driver.find_element_by_css_selector("#pass")
        element.clear()
        element.send_keys(password)
        element.send_keys(Keys.ENTER)

        self.driver.switch_to.window(self.driver.window_handles[0])
        self.driver.implicitly_wait(10)

    def logout(self):
        """
        This helper function will logout of GiftLink
        """

        element = wait_for_selector(self.driver, "#logoutControl", visible=True, single=True)
        element.click()

    def is_element_present(self, selector):
        """
        Helper method to confirm the presence of an element on page

        :param selector: CSS Selector
        """

        try:
            self.driver.find_element_by_css_selector(selector)
        except NoSuchElementException:
            return False
        return True

    def get_friends(self):
        """
        Helper method to retrieve a user's friends list from GiftLink

        :return: user's friends list (only visible friends)
        """

        # ensure that page has reloaded and friends are reset
        time.sleep(0.5)
        friend_els = self.driver.find_elements_by_class_name("fb-user")
        friends = []

        for i in range(len(friend_els)):
            if friend_els[i].is_displayed():
                if friend_els[i].is_enabled():
                    friends.append(friend_els[i].get_attribute("data-block-id"))

        return friends

    def get_ints(self):
        """
        Helper method to ensure that Facebook interests are being displayed properly on
        the GiftLink web page

        :return: list of interests
        """

        time.sleep(0.5)
        self.driver.find_element_by_css_selector("div.fb-user:nth-child(1) > a:nth-child(1)").click()
        ints = self.driver.find_elements_by_class_name("interest-panel")

        for i in range(len(ints)):
            if i < 3:
                time.sleep(0.25)
                ints[i] = ints[i].text
            else:
                del ints[-1]

        return ints

    def get_cal(self):
        """
        Helper method to ensure that we can retrieve the calendar element from our application

        :return: calendar WebElement
        """

        if self.is_element_present("#outputBlock > a:nth-child(5)"):
            self.driver.find_element_by_css_selector("#outputBlock > a:nth-child(5)").click()

        cal = wait_for_selector(self.driver, "#myCalendar", single=True, visible=True)

        return cal
