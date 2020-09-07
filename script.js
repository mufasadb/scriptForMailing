const nodemailer = require('nodemailer');
const userList = [];
const csv = require('csv-parser');
const fs = require('fs');
var logStream = fs.createWriteStream("logs.log", {flags:'a'});


const fromEmail = ""; //enter your microsoft email address
const yourPassword = ""; //enter your microsoft password
const csvName = "mfa.csv";   //enter in the name of your readable csv file here. format requirements in Readme
const completeEmails = [];


//because async is ahard I ungracefully close the write stream on the log file. it should still work though.

readCSV()

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
        user: fromEmail,
        pass: yourPassword
    }
});


const recipients = ""
var mailOptions = {
    from: fromEmail,
    to: recipients,
    subject: 'Sending Email using Node.js',
    text: 'Good news gentleman, i can email individuals like this'
};



async function createMails(input) {
    console.log(input.length)
    console.log('Building Emails')
    for (item in input) {

        let text = `Dear ${input[item]["Display Name"]},

        As you would have seen in Scott’s recent all employee webinar, ‘Creating a safe environment for all’ is a strategic priority for Navitas. Information Security is an important element of this. I would like to remind you of the upcoming change which the Information Security Team will be implementing.
        
        Multi-Factor Authentication (MFA)
        As a result of only a small number of UPA staff enrolling in MFA, we will be triggering MFA enrollment on the 30th of October. This means that staff who have not already enrolled in MFA will be required to enroll in MFA prior to being able to access Microsoft applications.
        
        To avoid any potential inconvenience on the 30th of October, I encourage you again to immediately enroll yourself in MFA, please refer to the attached MFA Setup Guide. Thank you to all staff who have already enrolled in MFA, your support in improving our Information Security posture is most appreciated.
        
        If you do not have an active Navitas email account - or have forgotten your login details – please contact service.desk@navitas.com before enrolling in MFA.
        
        If you have any questions relating to this announcement, or experience difficulties with the MFA enrollment process, please contact the  Navitas Information Security Team.`
        let htmlV = `Dear ${input[item]["Display Name"]},<br><br>

        As you would have seen in Scott’s recent all employee webinar, ‘Creating a safe environment for all’ is a strategic priority for Navitas. Information Security is an important element of this. I would like to remind you of the upcoming change which the Information Security Team will be implementing.<br><br>
        
        <strong>Multi-Factor Authentication (MFA)</strong><br>
        As a result of only a small number of UPA staff enrolling in MFA, we will be triggering MFA enrollment on the 30th of October. This means that staff who have not already enrolled in MFA will be required to enroll in MFA prior to being able to access Microsoft applications.
        <br><br>
        To avoid any potential inconvenience on the 30th of October, I encourage you again to immediately enroll yourself in MFA, please refer to the <a href="https://public-file-hosting-bucket.s3.ap-southeast-2.amazonaws.com/Multi-Factor%20Authentication%20-%20User%20Guide%20-%20Final%20August%202020.pptx"> MFA Setup Guide</a>. Thank you to all staff who have already enrolled in MFA, your support in improving our Information Security posture is most appreciated.
        <br><br>
        If you do not have an active Navitas email account - or have forgotten your login details – please contact service.desk@navitas.com before enrolling in MFA.
        <br><br>
        If you have any questions relating to this announcement, or experience difficulties with the MFA enrollment process, please contact the  <a href="mailto: it.security@navitas.com"> Navitas Information Security Team</a>.`
        const mailOptions = {
            from: fromEmail,
            to: input[item]['Logon Name'],
            subject: "Action Required - Multi-Factor Authentication Enrolment",
            text: text,
            html: htmlV
        };
        await setTimeout(()=> {sendMail(mailOptions)},item * 2000)

    }
};

async function sendMail(mailObject){
    console.log(`Sending Email to ${mailObject.to}`)
    await transporter.sendMail(mailObject, function (error, info) {
        if (error) {
            console.log('Sending an email failed')
            console.log(error)
            logStream.write(error + '\n')
        } else {
            console.log('email successfully sent, check logs for details')
            logStream.write(info.response + '\n')
            logStream.write(`Sent an email to ${mailObject.to} \n`)
        }
    });
}


function readCSV() {
    fs.createReadStream(csvName)
        .pipe(csv())
        .on('data', (row) => {
            console.log(row)
            if (row.MFA == 'FALSE') {
                userList.push(row);
            }
        })
        .on('end', () => {
            console.log(userList)
            createMails(userList)
        });
}

