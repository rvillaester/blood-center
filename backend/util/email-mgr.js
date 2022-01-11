var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var ssmMgr = require('./ssm-mgr');

module.exports.sendEmail = async (recepients, referenceNo, type) => {
	console.log(`Sending email to ${recepients}`);
	let pwd = await ssmMgr.getEmailPassword();
	var transporter = nodemailer.createTransport(smtpTransport({
	    service: 'gmail',
	    auth: {
	        user: 'bloodcenterproject@gmail.com',
	        pass: pwd
	    }
  	}));

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
