from .utils import wait_for_selector
import time


def friends_test(test, password="GiftLink18"):
    # Create dictionary keyed on user password with a list of user friends as the value
    users = {"mark_dkxvqkt_wongman@tfbnw.net": ["Dave Albdfcgaaadff Romanstein", "Helen Albdeecbgbgeh Wisemanstein", "Lisa Albdeeaibjgdg Fallersky"],
             "stiejjktgj_1519235163@tfbnw.net": ["Mark Wongman", "Helen Albdeecbgbgeh Wisemanstein", "Lisa Albdeeaibjgdg Fallersky", "Charlie Albdfaieccdff Listein"],
             "adcxekkywf_1519150661@tfbnw.net": ["Mark Wongman", "Dave Albdfcgaaadff Romanstein"]}

    for key, value in users.items():
        # set expected to the test user's friends list
        expected = value

        # login as this test user
        test.login(email=key, password=password)

        # allow page to reload
        time.sleep(0.5)
        wait_for_selector(test.driver, "#friendBlock", visible=True, single=True)

        # retrieve this user's friends from GiftLink
        friends = test.get_friends()

        # assert that these lists contain the exact same friends
        assert sorted(friends) == sorted(expected)

        # clear friends list and logout of this user's account
        friends.clear()
        test.logout()
