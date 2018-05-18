## Getting Started

### Prerequisites

# clone the repo 

git clone git@github.com:hmcts/jui-webapp.git

# change directory to our repo
cd jui_webapp

checkout cucumberjs (checkout branch)



# install the repo with yarn
yarn

# run the e2e tests (cucumberjs folder)
1.yarn wd:start 

2.yarn cucumberjs

change tags name in config file (it helps to run different features)



#saucelabs

### Prerequisites

Get sauce labs credentials

connect to sauce labs tunnel using your sauce credentials
(check manually )

bin/sc -p proxyout.reform.hmcts.net:8080 -u username -k access_key --dns 172.16.0.10 -i 'tunnel-identifier' -v.


#run crossbrowser-e2e tests (cucumberjs folder)

1.yarn wd:start

2.SAUCE_USERNAME=username SAUCE_ACCESS_KEY=key yarn crossbrowser-e2e

````


