import {useState} from 'react'


const SignupComponent=()=>{

    const [values, setValues]=useState({
        name:'',
        email:'',
        password:'',
        error:'',
        loading:false,
        message:'',
        showForm:true
    })

    const {name,email,password,error,loading,message,showForm}=values

    const handleSubmit=(e)=>{
        e.preventDefault()
        console.table({name,email,password,error,loading,message,showForm})
    }

    const handleChange=(name)=>e=>{
        setValues({...values, error:false,[name]:e.target.value})
    }

    const signupForm=()=>{
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input value={name} onChange={handleChange('name')} type="text" className="form-control" placeholder="Type Your Name"/>
                </div>  
                <div className="form-group">
                    <input value={email} onChange={handleChange('email')} type="email" className="form-control" placeholder="Type Your Email"/>
                </div> 
                <div className="form-group">
                    <input value={password} onChange={handleChange('password')} type="text" className="form-control" placeholder="Type Your Password"/>
                </div> 
                <div>
                    <button className="btn btn-primary">SignUp</button>
                </div>
            </form>
        )
    }

    return(
        <React.Fragment>
            {signupForm()}
        </React.Fragment>
    )
}


export default SignupComponent