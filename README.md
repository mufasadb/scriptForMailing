This node script is intended to read a csv file with a particular format, to collect a list of users to send emails to. 

This version has a Text already in place for the email which can be found at the bottom of this readme: 


The format of the file is expecting a header line and the column header for the user's name to be Exactly: "Display Name"
The format of the column containing email address' should be eactly: "Logon Name"
Finally it requires a column with a true / false for if the user already has mfa which should be exactly "hasMFA"

The email's will only be sent to users who have "hasMFA" set to exactly "false"

For the few cases of strings above, the string is case sensative and cares about space characters

There is a file in this download labeled testmfa.csv which should give an example



How To Run:

Install NPM and Node https://nodejs.org/en/download/

In Terminal / Cmd Prompt navigate to the folder containing package.json

now install the required modules to run the script: 
type: "npm i" 
hit enter

Go to the script.js and edit the following three fields:


const fromEmail = ""; //enter your microsoft email address
const yourPassword = ""; //enter your microsoft password
const csvName = "";   //enter in the name of your readable csv file here.


It should look something like this when you're done

const fromEmail = "daniel.beach@navitas.com"; //enter your microsoft email address
const yourPassword = "hopefullyverysecureandparticularlylongpassword"; //enter your microsoft password
const csvName = "yourcsvname.csv";   //enter in the name of your readable csv file here. format requirements in Readme

now run the script itself

type: "npm run start" 
hit enter

the script will run, and should notify when executes each email. 
When it's done hit ctrl + c to stop the process.

Please be aware every time you run this it will attempt to send emails, be cautios of it running multiple times. 
In order to log accuretly it also won't stop itself.

Logs of actions will be placed ina file in the same folder labeled logs.log





email example:

Dear Daniel Beach,


As you would have seen in Scott’s recent all employee webinar, ‘Creating a safe environment for all’ is a strategic priority for Navitas. Information Security is an important element of this. I would like to remind you of the upcoming change which the Information Security Team will be implementing.

Multi-Factor Authentication (MFA)
As a result of only a small number of UPA staff enrolling in MFA, we will be triggering MFA enrollment on the 30th of October. This means that staff who have not already enrolled in MFA will be required to enroll in MFA prior to being able to access Microsoft applications.

To avoid any potential inconvenience on the 30th of October, I encourage you again to immediately enroll yourself in MFA, please refer to the attached MFA Setup Guide. Thank you to all staff who have already enrolled in MFA, your support in improving our Information Security posture is most appreciated.

If you do not have an active Navitas email account - or have forgotten your login details – please contact service.desk@navitas.com before enrolling in MFA.

If you have any questions relating to this announcement, or experience difficulties with the MFA enrollment process, please contact the  Navitas Information Security Team.