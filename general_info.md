## Nodes on the Facebook Graph API

We will be querying nodes from the Facebook Graph API in order to retrieve data from our users. 
There are two types of nodes: root nodes and non-root nodes. The main difference is that root nodes
can be directly queried, while non-root nodes must be accessed via root nodes or edges. You can find
an extensive list of root nodes [here](https://developers.facebook.com/docs/graph-api/reference). A few root nodes that may come in handy for
our application will be [Friend List](https://developers.facebook.com/docs/graph-api/reference/friend-list), [Object Likes](https://developers.facebook.com/docs/graph-api/reference/v2.12/object/likes), and [Profile](https://developers.facebook.com/docs/graph-api/reference/v2.12/profile).


## Permissions

In order to access data from Facebook, we will have to familiarize ourselves with the necessary permissions that are 
required to access different nodes. Each permission has its own set of requirements and suggested use cases. All these
permissions, except the default, public_profile, require that we have Client OAuth Login enabled for our app on the Facebook
Login tab of our app dashboard. Basic permissions like user_friends, public_profile, and email do not require review, but all 
other permissions will. This essentially means that our users will have to allow our app to access certain information. Since
our app will mainly focus on user data, we will only need read permissions for user attributes (friends, birthday, etc.) and
user activity (likes). You can find more information on permissions [here](https://developers.facebook.com/docs/facebook-login/permissions/).