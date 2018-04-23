import datetime
import calendar


def get_month(test):
    month = test.driver.find_element_by_css_selector(".calendar-month-header > td:nth-child(2) > span:nth-child(1)")
    return month.text


def cal_test(test, email="mark_dkxvqkt_wongman@tfbnw.net", password="GiftLink18"):
    test.login(email, password)

    now = datetime.datetime.now()
    cal = test.get_cal()

    assert cal is not None

    mon = get_month(test)
    mon_str = calendar.month_name[now.month] + " " + str(now.year)

    # Ensure that the current month on the calendar is correct
    assert mon_str == mon

    # Test month navigation on calendar
    test.driver.find_element_by_css_selector(".calendar-month-header > td:nth-child(1)").click()

    mon = get_month(test)
    if now.month != 1:
        mon_str = calendar.month_name[now.month - 1] + " " + str(now.year)
    else:
        mon_str = calendar.month_name[12] + " " + str(now.year - 1)

    # Ensure that the calendar has switched to the previous month
    assert mon_str == mon

    test.driver.find_element_by_css_selector(".calendar-month-header > td:nth-child(3)").click()

    """
    # Test holiday pop-ups
    if test.is_element_present("#zabuto_calendar_59e_2018-04-01_day"):
        test.driver.find_element_by_css_selector("#zabuto_calendar_59e_2018-04-01_day").click()

        event_el = test.driver.find_element_by_css_selector(".bootbox-body > center:nth-child(1) > h1:nth-child(1)")
        print(event_el.text)

        test.driver.find_element_by_css_selector(".btn").click()

    if len(events) > 0:
        for x in events:
            events[x].click()

            event_el = test.driver.find_element_by_css_selector(".bootbox-body > center:nth-child(1) > h1:nth-child(1)")
            print(event_el.text)

            test.driver.find_element_by_css_selector(".btn").click()
    """

    test.driver.find_element_by_css_selector("#outputBlock > a:nth-child(5)").click()

    test.logout()
