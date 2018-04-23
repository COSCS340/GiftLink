import time


def int_test(test, email="mark_dkxvqkt_wongman@tfbnw.net", password="GiftLink18"):
    test.login(email, password)

    expected = ["Music", "Movies", "Television"]

    # allow page to load
    time.sleep(0.5)
    ints = test.get_ints()

    assert sorted(ints) == sorted(expected)

    test.logout()
