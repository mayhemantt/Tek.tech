import {useState} from 'react'
import Link from 'next/link'
import {emailContactForm} from '../../actions/form'

export default function ContactForm({authorEmail}){


    const [values, setValues]= useState({
        message: '',
        name:'',
        email:'',
        sent: false,
        buttonText: 'Send Message',
        success: false,
        error: false
    })

    const {message, name, email, sent, buttonText, success, error}= values

    const handleChange= name=>e=>{
        setValues({...values, [name]: e.target.value, error:false, success: false, buttonText:'Send Message'})
    }

    const clickSubmit=(e)=>{
        e.preventDefault()
        setValues({...values, buttonText: 'Sending...'})
        emailContactForm({authorEmail, name, email, message})
            .then(data=>{
                if(data.error){
                    setValues({...values,error:data.error})
                }else{
                    setValues({...values, sent: true, name: '', email:'', message:'', buttonText: 'Sent', success:true})
                }
        })
    }

    const showSuccessMessage=()=> success && (<div className="alert alert-info"> Thank You For Contacting</div>)
    const showErrorMessage=()=> (
        <div className="alert alert-danger" style={{display: error? '': 'none'}}> {error} </div>
    )

    const contactForm =()=>{
        return(
            <form onSubmit={clickSubmit}>
                <div className="form-group">
                    <label className="lead">Message</label>
                    <textarea onChange={handleChange('message')} type="text" className="form-control" value={message} required rows="10"/>
                </div>
                <div className="form-group">
                    <label className="lead">Email</label>
                    <input onChange={handleChange('email')} type="text" className="form-control" value={email} required />
                </div>
                <div className="form-group">
                    <label className="lead">Name</label>
                    <input onChange={handleChange('name')} type="text" className="form-control" value={name} required />
                </div>
                <div className="text-center mb-4">
                    <button className="btn btn-primary text-center">
                        {buttonText}
                    </button>
                </div>
            </form>
        )
    }

    return(
        <React.Fragment>
            {showSuccessMessage()}
            {showErrorMessage()}
            {contactForm()}
        </React.Fragment>
    )
}