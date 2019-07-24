# node-start
Starter files for websites based on Node.js with custom administrator area
## Setup Development Environment
Clone starter files from Github
```
mkdir __newProjectName__
cd __newProjectName__
git clone https://github.com/tylerewillis/node-start.git .
```
Set up new repository
```
rm -rf .git/
git init
git status
git add -A
git commit -m "initial commit"
git remote add origin __githubRepoNameHttpsVersion__
git push -u origin master
```
### Update Values in config/config.json and set up new accounts
#### MySQL
1. Create new database and user in cPanel account
2. Paste database name, user and user's password intro **config/config.json** file
```
"database": "__name__",
"dbUser": "__user__",
"dbUserPassword": "__userpassword__",
```
3. Setup local MySQL\
3.1 Login to MySQL as root (password is 'password')
```
mysql -u root -p
```
3.2 Create new local MySQL connection (using new dbUser and dbUserPassword values)
```
CREATE USER '__user__'@'localhost' IDENTIFIED BY '__password__'
```
3.3 Grant all access to the new user (using new database value)
```
GRANT ALL ON __database__.* TO '__user__'@'localhost'
```
3.4 Import database.sql file from repository clone into MySQL Workbench
3.4.a Create new schema with name of database
3.4.b Choose 'self-contained file'
3.4.c Select default target schema
3.4.d Restart Workbench
#### Google Analytics
1. Setup new Google Analytics account for website or receive full access to existing GA account
2. Add **report-analytics@pro-zone-156217.iam.gserviceaccount.com** as read/analyze user in Google Analytics account.
3. Copy **View ID** from **Admin > View > View Settings**.
4. Paste id into **config/config.json** file
```
"gaViewId": "__yourid__"
```
#### Nodemailer
1. Gather the email **host URL**, the **admin email** and **password** from cPanel
2. OR receive from client if email server managed elsewhere
3. Paste 3 values into **config/config.json** file
```
"emailHost": "__mail.example.com__",
"emailHostUser": "__user@example.com__",
"emailHostPassword": "__password__",
"adminEmail": "__user@example.com__",
```
### Test
1. Install all dependencies locally
```
npm install
```
2. Run application
```
nodemon
```
3. Open in browser
```
localhost:3002
```
## Setup Production Environment
### Update database in cPanel
1. Export from MySQL Workbench
2. Remove all information related to **collate**
```
COLLATE=utf8_unicode_ci
```
3. Import file into phpmyadmin in cPanel
### Clone repository from Github
1. Login to server via terminal
```
ssh __username__@__website__
```
2. Setup SSH access to cPanel in terminal using cpanel username and website URL (example.com)
2.1 Make sure shell access enabled in WHM
```
ssh-keygen -t rsa -b 4096 -C "__username__@__website__"
```
2.2 Authorize in cPanel and copy code
```
ssh –p 22 __username__@__website__
```
3. Create new SSH key in Github
3.1 Create/Authorize SSH in cPanel
3.2 Title: URL of website
3.3 Key: (paste from cPanel - begins with ssh-rsa)
4. Setup repository directory as sibling directory to **/public_html**
```
mkdir repositories/__repositoryName__
git clone __ .
```
### Configure Node.js App
1. Create a new path for global installations
```
mkdir ~/.npm-global
npm config set previx '~/.npm-global'
nano ~/.profile // add this -> export PATH=~/.npm-global/bin:$PATH
source ~/.profile
```
2. Install dependencies
```
npm install
```
3. Install **pm2**
```
npm install pm2 -g
pm2 start app.js
```
### Register package in cPanel (**Software > Application Manager**)
1. URL: where the app will display
2. Path: where the repository is located
3. Production
## Make Updates to Production Environment
1. Log in to server via ssh
```
ssh __username__@__website__
```
2. Navigate to repository folder and pull
```
git pull
```
3. Restart pm2
```
pm2 start app.js
```
4. May need to restart the application in cPanel's Application Manager
