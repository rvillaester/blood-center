var nodemailer = require('nodemailer');
var fs = require('fs');
var smtpTransport = require('nodemailer-smtp-transport');
var ssmMgr = require('./ssm-mgr');
var ddbMgr = require('./ddb-mgr');

var fileLocation = '/tmp/card.txt';

async function getTransporter() {
	let pwd = await ssmMgr.getEmailPassword();
	return nodemailer.createTransport(smtpTransport({
	    service: 'gmail',
	    auth: {
	        user: 'bloodcenterproject@gmail.com',
	        pass: pwd
	    }
  	}));
}

async function createCard(referenceNo) {
	let record = await ddbMgr.findByPK(referenceNo);
	const {name, bloodType, birthday, email} = record;
	console.log(`create card ${name}, ${bloodType}, ${birthday}, ${email}`);
	let content = `
		Name: ${name}
		Birth Date: ${birthday}
		Blood Type: ${bloodType}
		Email: ${email}
	`
	console.log(`content: ${content}`);
	fs.writeFileSync(fileLocation, content);
}

module.exports.sendEmail = async (recepients, referenceNo, type) => {
	console.log(`Sending email to ${recepients}`);
	let transporter = await getTransporter();
    let text = `Thank you for your request. Your reference number is ${referenceNo}.`;
    if(type == 'donation')
      text = `Thank you for donating. Your reference number is ${referenceNo}.`;

	var mailOptions = {
	  from: 'bloodcenterproject@gmail.com',
	  to: recepients,
	  subject: 'Notification from Blood Center',
	  text: text
	};
	try{
		let res = await transporter.sendMail(mailOptions);
		console.log('Email sent: ' + res.response);
	}catch(err) {
		console.log('error ' + err);
	}
}

module.exports.sendEmailNotifForAction = async (recepients, requestType, action, reason, appointmentDate, referenceNo) => {
	let text = '';
	if(action == 'Scheduled') {
		text = `Your appointment is scheduled on ${appointmentDate}.`;
	}
	if(action == 'Cancelled') {
		text = `Your request has been cancelled. Cancellation reason is ${reason}.`;
	}
	if(action == 'Completed') {
		text = `Your request has been completed.`;
	}

	text += ' Thank you.';

	let attachment = {};

	if(requestType == 'donation' && action === 'Completed') {
		console.log('Donation and Compeleted');
		await createCard(referenceNo);
		attachment = {
			filename: 'card.txt',
			path: fileLocation
		};
	}

	var mailOptions = {
	  from: 'bloodcenterproject@gmail.com',
	  to: recepients,
	  subject: 'Notification from Blood Center',
	  text: text,
	  attachments: [attachment]
	};
	
	let transporter = await getTransporter();
	try{
		let res = await transporter.sendMail(mailOptions);
		console.log('Email sent: ' + res.response);
	}catch(err) {
		console.log('error ' + err);
	}
}
