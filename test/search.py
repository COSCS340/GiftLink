from .utils import wait_for_selector


def search_test(test, email="mark_dkxvqkt_wongman@tfbnw.net", password="GiftLink18"):
    test.login(email, password)

    search_bar = wait_for_selector(test.driver, "#friendSearch", single=True)
    search_bar.send_keys("stein")

    friends = test.get_friends()

    assert sorted(friends) == sorted(["Dave Albdfcgaaadff Romanstein", "Helen Albdeecbgbgeh Wisemanstein"])
    friends.clear()

    search_bar.clear()
    search_bar.send_keys("Lisa")

    friends = test.get_friends()

    assert sorted(friends) == sorted(["Lisa Albdeeaibjgdg Fallersky"])
    friends.clear()

    search_bar.clear()
    search_bar.send_keys("Alb")

    friends = test.get_friends()

    assert sorted(friends) == sorted(["Dave Albdfcgaaadff Romanstein", "Helen Albdeecbgbgeh Wisemanstein", "Lisa Albdeeaibjgdg Fallersky"])

    search_bar.clear()

    friends = test.get_friends()

    assert sorted(friends) == sorted(["Dave Albdfcgaaadff Romanstein", "Helen Albdeecbgbgeh Wisemanstein", "Lisa Albdeeaibjgdg Fallersky"])

    test.logout()
