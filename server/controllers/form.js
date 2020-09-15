const sgMail =require('@sendgrid/mail') //SENDGRID_API_KEY
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


exports.contactForm = (req, res) => {
    const { email, name, message } = req.body;

    console.log(process.env.EMAIL_TO)

    const emailData = {
        from: process.env.EMAIL_TO,
        to: email,
        subject: `Contact form - ${process.env.APP_NAME}`,
        text: `Email received from contact from \n Sender name: ${name} \n Sender email: ${email} \n Sender message: ${message}`,
        html: `
            <h4>Email received from contact form:</h4>
            <p>Sender name: ${name}</p>
            <p>Sender email: ${email}</p>
            <p>Sender message: ${message}</p>
            <hr />
            <p>This email may contain sensetive information</p>
            <p>https://seoblog.com</p>
        `
    };

    sgMail.send(emailData, (err, result)=>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        res.json({
            success: result
        })
    })
};

exports.contactBlogAuthorForm= (req, res) => {
    const { authorEmail,email, name, message } = req.body;
    // console.log(req.body);

    console.log(process.env.EMAIL_TO)
    let mailList =[authorEmail, process.env.EMAIL_TO]

    const emailData = {
        to: mailList,
        from: process.env.EMAIL_TO,
        subject: `Contact form - ${process.env.APP_NAME}`,
        text: `Email received from contact from \n Sender name: ${name} \n Sender email: ${email} \n Sender message: ${message}`,
        html: `
            <h4>Email received from contact form:</h4>
            <p>Sender name: ${name}</p>
            <p>Sender email: ${email}</p>
            <p>Sender message: ${message}</p>
            <hr />
            <p>This email may contain sensitive information</p>
            <p>https://seoblog.com</p>
        `
    };

    sgMail.send(emailData, (err, result)=>{
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        res.json({
            success: result
            
        })
    })
};