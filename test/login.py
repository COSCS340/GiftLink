def login_test(test, email="mark_dkxvqkt_wongman@tfbnw.net", password="GiftLink18"):
    test.login(email, password)

    # If login was successful, the logout panel will be shown.
    # If the logout panel was unable to be located, a NoSuchElementException will be raised.
    if test.is_element_present("#logoutPanel"):
        # If login was successful, logout and check if logout was successful.
        test.logout()

        # logout was successful if we can find the login panel again
        test.is_element_present("#loginPanel")

    else:
        print("Login Test Failed!")
