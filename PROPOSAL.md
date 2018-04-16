# A Software Project Proposal for an Intelligent Gift Planning Program
  
  **Program Name**: GiftLink 
  
  **Team Name**: Socially Gifted
  
  **Members**:  
    
  Frankie Betancourt  
  Isaac Ige  
  Landen McDonald  
  Zack Strickland  
  
  ## Introduction
  It is difficult enough to simply remember the multitudes of gift-giving holidays and birthdays of our closest friends and family members, but deciding on the perfect gift to buy them has proven to be an overwhelming challenge over the years. We want our gifts to mean something. Gifts are designed to show our appreciation for one another; they should be more significant than a gift card or cash. A great present requires thought and acute attention to one another’s interests, but even the most intentional listeners can struggle with this daunting decision. “While 59 percent (of consumers) report finding a gift for their significant other as extremely important, one in four consumers report they have zero confidence when it comes to selecting the right gift [1].” Coupling this with the fact that “the vast majority of consumers (84 percent) state that gift giving causes stress [1],” there is an incredible opportunity to step in and alter the way consumers approach this issue. 
  
  We believe that we can develop a tool to solve this headache-inducing quandary. While there are a number of present generators online, most of them are based on generic personality tests that do not provide the in-depth analysis and insight that our software will. Not only do these applications require an awkward exchange of personal information, but also they have proven to be wildly inaccurate when it comes to selecting the proper gift. Surely there are more intuitive means of accessing our loved ones’ passions and fascinations. 
    
  With the meteoric rise of social media, consumers have increasingly begun to openly display their interests and desires as public information. “Nearly eight-in-ten online Americans (79%) now use Facebook, more than double the share that uses Twitter (24%), Pinterest (31%), Instagram (32%) or LinkedIn (29%) [2].” 
    
  For these reasons, our software will utilize Facebook as the ultimate database for discovering our loved ones’ true interests. By accessing our closest friends’ Facebook likes, our software aims to intelligently generate a list of potential gift ideas of various prices and areas of interest. This will drastically narrow the nearly endless list of potential present options and will ensure that we will never have to stress about the perfect gift selection again.
  
  
  
  ## Customer Value
  This product has the potential to be a powerful tool for an impressive percentage of the American population. Nearly all consumers are tasked with purchasing a gift for someone close to them at least a few times each year. However, this responsibility never gets easier. Especially in today’s consumer market of boundless options and customization, people value simplification and ease of use in every facet of their lives. Inherently, the average consumer is looking for products that can cut down on the amount of effort necessary to accomplish everyday tasks. This has lead to the increasingly automated nature of the world in which we live, and we have chosen to extend this trend to the gift-giving sector.
  
  **GiftLink** is the name of this team’s proposed software solution. Socially Gifted hopes to make **GiftLink** an elegant and simple application that will essentially remove all of the tough decision making and searching that is associated with gift-giving. Our application will provide users with timely reminders and notifications for incoming holidays, anniversaries, birthdays, etc., so they will never endure the embarrassment of forgetting the most important days of the year. Accompanying these notifications will be an automatically generated list of suggested products that the given recipient may be looking for in a gift. This list will have links to the corresponding products and eventually can be expanded to find the cheapest prices of said products across the web. Not only will this software condense the process of choosing a present down to a few clicks, but it also has the potential to help our users’ save money.
  
  Customer retention is of the utmost importance to our team. We will know that our application is performing optimally if consumers continually return to our product for all of their gift buying needs throughout the year. Just as most online services, we will provide consumers with an optional survey after our suggested gifts have been received that will give us valuable feedback on the success of our product. Not only will these surveys reveal the benefits that our software presents, but also they will help train our algorithms to more accurately suggest products in the future. The incredible thing about our application is that it will only improve as more users latch onto its favorable capabilities.
  
  Ultimately, **GiftLink** will alleviate consumers of the looming burden that is associated with gift-giving. With this incredible simplification of the gift-buying process, our product will allow consumers to focus their efforts and attention more on the actual significance of the holidays at hand. This will transform consumers’ outlook on holidays from a time of increased stress and anxiety to a time for bonding and togetherness as they are intended to be.
  
  
  
  
  
  
  ## Technology
  In the broadest sense, this team aims to create a piece of software that helps people find and decide on gifts for their friends and family. There are many features that could be implemented into such a program, but there are a few that are essential for this software to be of any value to our customers. At the very least, **GiftLink** should be able to compile and consolidate a list of a user’s friends from Facebook. In addition, **GiftLink** should be able to quickly and easily display the interests of any given user on the aforementioned list. 
  
  If the team is able to create something that meets these minimum requirements before the deadline, then we will attempt to implement more ideas to create something that is more cohesive and feature-rich.
  
  **GiftLink** will likely be heavily dependent on Facebook’s Graph API. Information is retrieved by making HTTP requests to various endpoints of the API. If successful, those requests return JSON objects with the desired data. Python will be the primary programming language for this project due to its ease of use and familiarity within the team. The “Requests” and “JSON” modules within Python will allow the team to utilize the API almost effortlessly.
  
  The essential features of **GiftLink** could be provided via a console application, but that is probably the least desirable platform for our customers. Since the team wants to create something that is very accessible, the creation of a simple graphical user interface will be prioritized after implementing the essential features. 
  
  As of now, we plan to utilize the Qt framework for creating the GUI. The Qt framework is cross-platform, which would remove limitations on what hardware **GiftLink** will be able to run on. Qt also provides accompaying design software to even further simplify this process. Qt Designer is a standalone application that allows anyone to create a GUI in a visual, drag-and-drop environment. Developers can then import that GUI design into a program of choice. Due to the popularity of Qt, there are a lot of resources and examples available in addition to it being well documented. This will hopefully allow the team to quickly move through this part of the project.
  
  If there is time available after the essential features and GUI are implemented, we will pursue the implementation of more challenging features such as a system of generating gift ideas. The team hopes to be able to incorporate machine learning into this feature. If we reach this point, the TensorFlow library will be used once again due to its readily available documentation and familiarity within the team.  
  
  In terms of the development environment, GitHub will be the platform used for version control. The team intends to explore the use of Doxygen, a tool for generating source code documentation, to help keep track of program flow. 
      
  
  
  
  
  
  ## Team
  Every member of the team will contribute to the programming of **GiftLink**, but will also have a role pertaining to the logistics of the project as a whole.
  
  While the team has not necessarily had experience creating something like this before, **Isaac Ige** does have previous experience using RESTful APIs with Python. This will help tremendously because there will be a lower barrier to entry as the team attempts to utilize the Facebook Graph API. Isaac also has experience with C and C++. Isaac also has familiarity with Qt and Tensorflow and will serve as the lead developer/manager on this project. 
  
  **Frankie Betancourt** has extensive experience with C and C++, and some experience with Python. Frankie will also focus on quality assurance to ensure that GiftPlanner is being developed in a proper, sustainable manner.
  
  **Landen McDonald** also has extensive experience with C and C++ and has recently begun programming in Python. Although he has not had a lot of hands-on experience with machine learning and Tensorflow, he has shown extreme interest in these topics and has conducted a significant amount of independent research on the subjects. Landen will primarily serve as our task supervisor and will ensure that the team doesn’t stray from the original goals outlined in this proposal. 
  
  **Zack Strickland** has had a year’s experience with Python and some of its more popular libraries, most notably RegEx. Beyond this, he has had extensive experience with C and C++ programming, as well as some experience with HTML5, CSS3, PHP, and Javascript. Because of his experience with Doxygen Github, he will be responsible for maintaining and coordinating the documentation of the project.
  
  
  
  ## Project Management
  The team shall work from January 26th to March 5th in five, two-week development sprints. The goals for each of these sprints shall be based on a hierarchy of five feature sets, listed here in order of descending priority:
  
  Retrieval of user’s friends list data via the Facebook API (At this stage, the project will have reached its minimum utility form.)
  Retrieval and display of user’s friends’ interests (At this stage, the project will meet minimum product requirements.)
  Cross-platform GUI using the Qt framework
  Polish and general user experience improvements (This low-intensity sprint was designed as a buffer for descoping, which would allow the team to catch up on or improve the implementations of previous sprints, and to allow for downtime during spring break.)
  Generation of gift suggestions from Amazon (Stretch goal)
  
  Each sprint will begin with a face-to-face meeting on the first day, allotting time for high-level analysis of the present feature goals and for deciding upon the tools and resources to be used in achieving those goals. When a choice must be made between different frameworks or other development tools, the team shall use a decision matrix to proceed, factoring in cost, estimated speed, viability (including learning curves for unfamiliar technologies), and quality of results. During these meetings (except for the first), the team will ensure that all high-priority branches are merged, all code conflicts are resolved, all project files within the master branch have complete and up-to-date documentation, and that up-to-date Doxygen files have been generated for the master branch.
  
  The development goals for each sprint will be achieved in two tasks, one of higher priority, which should be allotted a week or more, and one or more of lower priority, which can be finished in less than a week. The high-priority tasks of each sprint will have finish-to-start dependency upon one another, whilst each low-priority task will be finish-to-start with the high-priority task in its sprint and finish-to-finish with the high-priority task in the following sprint. In this way, as time constraints demand, tasks of lower priority can be shuffled down into following sprints. 
  
  The team will use a cloud-based Gantt chart to keep track of the schedule and the dependencies of tasks in each sprint, to be changed only by the project manager and confirmed at the face-to-face meetings. As the product deadline approaches, the project may be descoped, starting with the lowest priority feature sets listed above and with the lowest-priority tasks within each, if the project manager finds tasks to be taking more time than expected.
  
  Using the Facebook API means that all privacy and legality concerns will be handled by Facebook itself, which will require each user involved to give consent to the application before it can access their personal data.
  
  
  ## Reflection
  **GiftLink** will be an easy to use, powerful, and useful application for its end user to utilize in their search for gifts. Users will be able to easily connect their social media accounts and immediately begin searching through lists of gift recommendations with a better understanding of the interests of the recipient. As a result, **GiftLink** will exponentially reduce the stress of the gift-giving process.
  
  Ease of use will be of utmost importance when designing the application. The ability to quickly understand the features, how to use them, and requiring minimal input from the user will be essential in order to appeal to the largest possible audience. At the same time, users should be able to easily tweak various settings, and control how much and what data is used by the application both for increased functionality and protection of privacy. 
  
  Socially Gifted should have little difficulty in delivering a deployable application in less than 10 weeks. The usage of existing Python libraries, the Facebook Graph API, and TensorFlow should make implementation of core features highly achievable. The development cycle is planned out in such a way as to accommodate for the learning of tools that may potentially be new for team members, while at the same time accomplishing appreciable amounts of work in the same time frame. 
  
  
  ## Sources
  
  1. Vines, B. (2018). Three Out of Four Consumers Plagued with Holiday Gift Giving Stress - Needle. [online] Needle. Available at: https://www.needle.com/blog/three-four-consumers-plagued-holiday-gift-giving-stress/  [Accessed 24 Jan. 2018].
  
  2. Greenwood, S., Perrin, A. and Duggan, M. (2018). Social Media Update 2016. [online] Pew Research Center: Internet, Science & Tech. Available at: http://www.pewinternet.org/2016/11/11/social-media-update-2016/  [Accessed 24 Jan. 2018].
  
 
